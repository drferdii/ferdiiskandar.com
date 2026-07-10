import { type NextRequest } from 'next/server'

import { ABBY_KNOWLEDGE, ABBY_SYSTEM_PROMPT } from '../../../lib/abby-knowledge'
import { createFixedWindowRateLimiter, getClientKey } from '../../../lib/rate-limit'

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

function resolveProvider(): ProviderConfig | { error: string } {
  const provider = (process.env.AI_PROVIDER ?? 'gemini').toLowerCase()
  const model = process.env.ABBY_MODEL ?? 'deepseek-chat'

  if (provider === 'gemini') {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey)
      return { error: isDev ? 'Missing GEMINI_API_KEY for AI_PROVIDER=gemini' : ERR_CONFIG }
    return {
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
      apiKey,
      // gemini-3.5-flash's free tier is capped at 20 requests/day (new-model
      // launch restriction) — 2.5-flash has a much higher free daily quota.
      model: process.env.ABBY_MODEL ?? 'gemini-2.5-flash',
      // Keep thinking budget low so the visible reply doesn't get truncated by max_tokens.
      extraBody: { reasoning_effort: 'low' },
    }
  }

  if (provider === 'openrouter') {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey)
      return {
        error: isDev ? 'Missing OPENROUTER_API_KEY for AI_PROVIDER=openrouter' : ERR_CONFIG,
      }
    return {
      baseUrl: process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1',
      apiKey,
      model: process.env.ABBY_MODEL ?? 'deepseek/deepseek-v4-flash',
      extraHeaders: {
        'HTTP-Referer': process.env.OPENROUTER_SITE_URL ?? 'https://ferdiiskandar.com',
        'X-Title': process.env.OPENROUTER_APP_NAME ?? 'Abby by dr Classy',
      },
    }
  }

  if (provider === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey)
      return { error: isDev ? 'Missing OPENAI_API_KEY for AI_PROVIDER=openai' : ERR_CONFIG }
    return { baseUrl: 'https://api.openai.com/v1', apiKey, model }
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey)
    return { error: isDev ? 'Missing DEEPSEEK_API_KEY for AI_PROVIDER=deepseek' : ERR_CONFIG }
  return { baseUrl: process.env.DEEPSEEK_BASE_URL ?? 'https://api.deepseek.com', apiKey, model }
}

// Resolved once at module load — env vars are static at runtime
const PROVIDER = resolveProvider()

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

    if ('error' in PROVIDER) {
      console.error('[Abby API] Provider config error:', PROVIDER.error)
      return problem(
        500,
        'Server Configuration Error',
        PROVIDER.error,
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

    const upstreamResponse = await fetch(`${PROVIDER.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PROVIDER.apiKey}`,
        'Content-Type': 'application/json',
        ...(PROVIDER.extraHeaders ?? {}),
      },
      body: JSON.stringify({
        model: PROVIDER.model,
        messages: [
          { role: 'system', content: systemContent },
          ...safeHistory,
          { role: 'user', content: trimmed },
        ],
        max_tokens: 1024,
        temperature: 0.72,
        top_p: 0.9,
        ...(PROVIDER.extraBody ?? {}),
      }),
      signal: AbortSignal.timeout(28_000),
    })

    if (!upstreamResponse.ok) {
      const errorText = await upstreamResponse.text()
      const upstreamMessage = getUpstreamErrorMessage(errorText)
      console.error('[Abby API] Upstream error:', upstreamResponse.status, errorText)

      if (upstreamResponse.status === 401 || upstreamResponse.status === 403) {
        return problem(
          502,
          'Upstream Authentication Error',
          isDev
            ? (upstreamMessage ??
                'Provider AI menolak kredensial atau akses model. Periksa GEMINI_API_KEY / DEEPSEEK_API_KEY / OPENAI_API_KEY dan model yang dipakai.')
            : 'Layanan AI tidak tersedia saat ini. Silakan coba lagi.',
          '/v1/problems/upstream-authentication',
        )
      }
      if (upstreamResponse.status === 429) {
        return problem(
          429,
          'Upstream Rate Limited',
          isDev
            ? (upstreamMessage ?? errorText)
            : 'Layanan AI sedang sibuk. Silakan coba beberapa saat lagi.',
          '/v1/problems/upstream-rate-limited',
        )
      }
      return problem(
        502,
        'Upstream Service Error',
        isDev && upstreamMessage
          ? upstreamMessage
          : 'Layanan AI tidak tersedia saat ini. Silakan coba lagi.',
        '/v1/problems/upstream-service-error',
      )
    }

    const data = await upstreamResponse.json()
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
