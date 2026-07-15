import { type NextRequest } from 'next/server'
import https from 'node:https'

import { ABBY_KNOWLEDGE, ABBY_SYSTEM_PROMPT } from '../../../lib/abby-knowledge'
import { createFixedWindowRateLimiter, getClientKey } from '../../../lib/rate-limit'

function nativePost(url: string, headers: Record<string, string>, body: string): Promise<{ status: number; text: string }> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url)
    const options = {
      method: 'POST',
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        ...headers,
        'Content-Length': Buffer.byteLength(body),
      },
      timeout: 28_000,
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.setEncoding('utf-8')
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        resolve({
          status: res.statusCode ?? 500,
          text: data,
        })
      })
    })

    req.on('error', (err) => {
      reject(err)
    })

    req.on('timeout', () => {
      req.destroy()
      const timeoutError = new Error('Gateway Timeout')
      timeoutError.name = 'TimeoutError'
      reject(timeoutError)
    })

    req.write(body)
    req.end()
  })
}

export const runtime = 'nodejs'

const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 20
const rateLimiter = createFixedWindowRateLimiter({
  maxRequests: MAX_REQUESTS_PER_WINDOW,
  windowMs: WINDOW_MS,
})

type ChatRole = 'user' | 'assistant'
interface HistoryItem {
  role: ChatRole
  content: string
}

interface ProviderConfig {
  baseUrl: string
  apiKey: string
  model: string
  extraHeaders?: Record<string, string>
  extraBody?: Record<string, unknown>
}

const ERR_CONFIG = 'Konfigurasi server tidak lengkap.'
const isDev = process.env.NODE_ENV === 'development'

function normalizeOpenRouterModel(model: string): string {
  const trimmed = model.trim()
  if (trimmed === 'gemini-2.5-flash') return 'google/gemini-2.5-flash'
  if (trimmed === 'gemini-2.5-flash:free') return 'google/gemini-2.5-flash:free'
  if (trimmed === 'deepseek-chat') return 'deepseek/deepseek-chat'
  return trimmed
}

function resolveProvider(): ProviderConfig | { error: string } {
  const provider = (process.env.AI_PROVIDER ?? 'gemini').toLowerCase().trim()
  const rawModel = process.env.ABBY_MODEL ?? ''
  const model = rawModel.trim() || 'deepseek-chat'

  if (provider === 'gemini') {
    const apiKey = process.env.GEMINI_API_KEY?.trim()
    if (!apiKey)
      return { error: isDev ? 'Missing GEMINI_API_KEY for AI_PROVIDER=gemini' : ERR_CONFIG }
    const geminiModel = model !== 'deepseek-chat' ? model : 'gemini-2.5-flash'
    return {
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
      apiKey,
      model: geminiModel,
      extraBody: {},
    }
  }

  if (provider === 'openrouter') {
    const apiKey = process.env.OPENROUTER_API_KEY?.trim()
    if (!apiKey)
      return {
        error: isDev ? 'Missing OPENROUTER_API_KEY for AI_PROVIDER=openrouter' : ERR_CONFIG,
      }
    const resolvedModel = model !== 'deepseek-chat' ? model : 'openai/gpt-oss-120b:free'
    const primaryModel = normalizeOpenRouterModel(resolvedModel)
    const fallbackModels = (
      process.env.ABBY_MODEL_FALLBACKS ??
      'openai/gpt-oss-20b:free,google/gemma-4-31b-it:free,google/gemma-4-26b-a4b-it:free'
    )
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean)
    return {
      baseUrl: (process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1').trim(),
      apiKey,
      model: primaryModel,
      extraHeaders: {
        'HTTP-Referer': (process.env.OPENROUTER_SITE_URL ?? 'https://ferdiiskandar.com').trim(),
        'X-Title': (process.env.OPENROUTER_APP_NAME ?? 'Abby by dr Classy').trim(),
      },
      // OpenRouter tries `models` in order and falls back automatically on
      // rate-limit, downtime, or moderation errors from the earlier entries.
      // OpenRouter restricts the models array to a maximum of 3 items.
      extraBody: { models: [primaryModel, ...fallbackModels].slice(0, 3) },
    }
  }

  if (provider === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY?.trim()
    if (!apiKey)
      return { error: isDev ? 'Missing OPENAI_API_KEY for AI_PROVIDER=openai' : ERR_CONFIG }
    return { baseUrl: 'https://api.openai.com/v1', apiKey, model }
  }

  const apiKey = process.env.DEEPSEEK_API_KEY?.trim()
  if (!apiKey)
    return { error: isDev ? 'Missing DEEPSEEK_API_KEY for AI_PROVIDER=deepseek' : ERR_CONFIG }
  return {
    baseUrl: (process.env.DEEPSEEK_BASE_URL ?? 'https://api.deepseek.com').trim(),
    apiKey,
    model,
  }
}

// Precomputed once — knowledge base does not change between requests
const SYSTEM_BASE = `${ABBY_SYSTEM_PROMPT}

## Knowledge Base — dr Ferdi Iskandar

Gunakan knowledge base berikut untuk menjawab pertanyaan dengan akurat. Jangan mengarang fakta yang tidak ada di sini.

${ABBY_KNOWLEDGE}`

const JSON_HEADERS: HeadersInit = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
}

function problem(status: number, title: string, detail: string, type: string) {
  return Response.json({ type, title, status, detail }, { status, headers: JSON_HEADERS })
}

function getUpstreamErrorMessage(errorText: string): string | null {
  if (!errorText) return null

  try {
    const parsed = JSON.parse(errorText) as { error?: { message?: string } }
    return typeof parsed.error?.message === 'string' ? parsed.error.message : null
  } catch {
    return null
  }
}

function normalizeAssistantReply(content: string): string {
  return content
    .replace(/\r\n/g, '\n')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(^|[\s(])(\*|_)([^*_]+?)\2(?=[\s).,!?]|$)/g, '$1$3')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export async function POST(request: NextRequest) {
  let providerConfig: ProviderConfig | { error: string } | null = null
  try {
    const clientKey = getClientKey(request)
    if (rateLimiter.isRateLimited(clientKey)) {
      return problem(
        429,
        'Rate Limit Exceeded',
        'Terlalu banyak permintaan. Silakan coba beberapa saat lagi.',
        '/v1/problems/rate-limit-exceeded',
      )
    }

    providerConfig = resolveProvider()
    if ('error' in providerConfig) {
      console.error('[Abby API] Provider config error:', providerConfig.error)
      return problem(
        500,
        'Server Configuration Error',
        providerConfig.error,
        '/v1/problems/server-configuration',
      )
    }

    const body = await request.json()
    const { message, visitorMode, history } = body as {
      message: unknown
      visitorMode?: unknown
      history?: unknown
    }

    if (!message || typeof message !== 'string') {
      return problem(
        400,
        'Invalid Request',
        'Field "message" harus berupa string.',
        '/v1/problems/invalid-request',
      )
    }

    const trimmed = message.trim()
    if (trimmed.length === 0) {
      return problem(
        400,
        'Empty Message',
        'Pesan tidak boleh kosong.',
        '/v1/problems/empty-message',
      )
    }
    if (trimmed.length > 2000) {
      return problem(
        400,
        'Message Too Long',
        'Pesan terlalu panjang. Maks 2000 karakter.',
        '/v1/problems/message-too-long',
      )
    }

    const safeHistory: HistoryItem[] = Array.isArray(history)
      ? history
          .filter(
            (h): h is { role: ChatRole; content: string } =>
              typeof h === 'object' &&
              h !== null &&
              (h.role === 'user' || h.role === 'assistant') &&
              typeof h.content === 'string',
          )
          .slice(-10)
      : []

    const modeContext =
      typeof visitorMode === 'string' && visitorMode
        ? `\n\nCurrent visitor mode: ${visitorMode}. Sesuaikan respons untuk konteks dan kebutuhan visitor ini.`
        : ''

    const systemContent = modeContext ? `${SYSTEM_BASE}${modeContext}` : SYSTEM_BASE

    const requestBody = JSON.stringify({
      model: providerConfig.model,
      messages: [
        { role: 'system', content: systemContent },
        ...safeHistory,
        { role: 'user', content: trimmed },
      ],
      max_tokens: 1024,
      temperature: 0.72,
      top_p: 0.9,
      ...(providerConfig.extraBody ?? {}),
    })

    const upstreamHeaders = {
      Authorization: `Bearer ${providerConfig.apiKey}`,
      'Content-Type': 'application/json',
      ...(providerConfig.extraHeaders ?? {}),
    }

    const { status: upstreamStatus, text: errorText } = await nativePost(
      `${providerConfig.baseUrl}/chat/completions`,
      upstreamHeaders,
      requestBody
    )

    const isOk = upstreamStatus >= 200 && upstreamStatus < 300

    if (!isOk) {
      const upstreamMessage = getUpstreamErrorMessage(errorText)
      console.error('[Abby API] Upstream error:', upstreamStatus, errorText)

      if (upstreamStatus === 401 || upstreamStatus === 403) {
        return problem(
          502,
          'Upstream Authentication Error',
          isDev
            ? (upstreamMessage ??
                'Provider AI menolak kredensial atau akses model. Periksa GEMINI_API_KEY / DEEPSEEK_API_KEY / OPENAI_API_KEY dan model yang dipakai.')
            : 'Layanan AI menolak kredensial. Periksa API key dan akses model di dashboard provider.',
          '/v1/problems/upstream-authentication',
        )
      }
      if (upstreamStatus === 429) {
        return problem(
          429,
          'Upstream Rate Limited',
          isDev
            ? (upstreamMessage ?? errorText)
            : 'Layanan AI sedang sibuk. Silakan coba beberapa saat lagi.',
          '/v1/problems/upstream-rate-limited',
        )
      }
      const upstreamDetail = isDev
        ? (upstreamMessage ?? errorText ?? `HTTP ${upstreamStatus}`)
        : `Layanan AI mengalami gangguan: HTTP ${upstreamStatus}. Silakan coba beberapa saat lagi.`
      return problem(
        502,
        'Upstream Service Error',
        upstreamDetail,
        '/v1/problems/upstream-service-error',
      )
    }

    let data: any
    try {
      data = JSON.parse(errorText)
    } catch (parseError) {
      console.error('[Abby API] Failed to parse upstream JSON:', parseError)
      throw new Error(
        `Upstream returned ${upstreamStatus} but failed to parse as JSON. Raw response: ${errorText.slice(0, 1000)}. Parser error: ${parseError instanceof Error ? parseError.message : String(parseError)}`
      )
    }
    const rawReply =
      data?.choices?.[0]?.message?.content ||
      'Maaf, saya belum bisa menghasilkan respons saat ini. Silakan coba lagi.'
    const reply = normalizeAssistantReply(rawReply)

    return Response.json({ reply }, { headers: JSON_HEADERS })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      return problem(
        504,
        'Gateway Timeout',
        'Respons AI terlalu lama. Silakan coba lagi.',
        '/v1/problems/gateway-timeout',
      )
    }
    console.error('[Abby API] Unexpected error:', error)
    return problem(
      500,
      'Internal Server Error',
      'Terjadi kesalahan internal. Silakan coba lagi.',
      '/v1/problems/internal-server-error',
    )
  }
}
