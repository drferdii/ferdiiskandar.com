import { type NextRequest } from 'next/server'
import https from 'node:https'

import { ABBY_SYSTEM_PROMPT, buildAbbyKnowledgeContext } from '../../../lib/abby-knowledge'
import { getUpstreamErrorMessage, parseAssistantReply, resolveProvider, type HistoryItem } from '../../../lib/abby/provider'
import { getRequestId, logEvent } from '../../../lib/logger'
import { createFixedWindowRateLimiter, getClientKey } from '../../../lib/rate-limit'

export const runtime = 'nodejs'

const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 20
const MAX_BODY_BYTES = 32_000
const MAX_MESSAGE_CHARS = 2000
const MAX_HISTORY_ITEMS = 10
const MAX_HISTORY_ITEM_CHARS = 1200
const PROVIDER_TIMEOUT_MS = 28_000
const PROVIDER_RETRY_DELAY_MS = process.env.NODE_ENV === 'test' ? 0 : 300
const RETRYABLE_UPSTREAM_STATUSES = new Set([502, 503, 504])
const rateLimiter = createFixedWindowRateLimiter({ maxRequests: MAX_REQUESTS_PER_WINDOW, windowMs: WINDOW_MS })

const RESPONSE_VOICE_DIRECTIVE = `## Final Response Voice — highest priority for phrasing

The knowledge above is a factual source, not a writing template. Never imitate its registry, policy, legal, or dossier tone.

- Sound like a regular, transparent virtual assistant: friendly, neutral, clear, and efficient.
- Do not pretend to be human or add a human persona, emotional intimacy, banter, wit, teasing, or humor.
- Start with the answer naturally. Do not open with a generic thank-you, formal preamble, or repeated disclaimer.
- Default to 2–5 conversational sentences in one or two short paragraphs. Expand only when the visitor asks for detail.
- Do not label sections "Intinya", "Konteks", or "Bisa lanjut ke" unless the visitor asks for a structured format.
- Use simple Indonesian, natural transitions, and varied sentence rhythm. Avoid corporate or customer-service language.
- Apply governance silently. Mention verification limits or disclaimers only when the question actually triggers them.
- Do not add personality flourishes. Ask at most one practical follow-up only when needed.
- For a safety refusal, begin with brief empathy, state the boundary plainly, then give one practical next step.`

const JSON_HEADERS: HeadersInit = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
}

function nativePost(url: string, headers: Record<string, string>, body: string): Promise<{ status: number; text: string }> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url)
    const options = {
      method: 'POST',
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: { ...headers, 'Content-Length': Buffer.byteLength(body) },
      timeout: PROVIDER_TIMEOUT_MS,
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.setEncoding('utf-8')
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => resolve({ status: res.statusCode ?? 500, text: data }))
    })
    req.on('error', reject)
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

async function postWithTransientRetry(
  url: string,
  headers: Record<string, string>,
  body: string,
): Promise<{ status: number; text: string; attempts: number }> {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const result = await nativePost(url, headers, body)
      if (attempt === 1 && RETRYABLE_UPSTREAM_STATUSES.has(result.status)) {
        await new Promise((resolve) => setTimeout(resolve, PROVIDER_RETRY_DELAY_MS))
        continue
      }
      return { ...result, attempts: attempt }
    } catch (error) {
      if (attempt === 2 || isTimeoutError(error)) throw error
      await new Promise((resolve) => setTimeout(resolve, PROVIDER_RETRY_DELAY_MS))
    }
  }

  throw new Error('Provider retry loop completed without a response.')
}

function withRequestHeaders(headers: HeadersInit, requestId: string, extra?: HeadersInit): HeadersInit {
  return { ...headers, ...extra, 'X-Request-ID': requestId }
}

function problem(status: number, title: string, detail: string, type: string, requestId: string, extraHeaders?: HeadersInit) {
  return Response.json(
    { type, title, status, detail, requestId },
    { status, headers: withRequestHeaders(JSON_HEADERS, requestId, extraHeaders) },
  )
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

function isTimeoutError(error: unknown): boolean {
  return error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')
}

async function parseBoundedJson(request: NextRequest): Promise<Record<string, unknown> | { error: 'too_large' | 'invalid_json' }> {
  const contentLength = Number(request.headers.get('content-length') ?? '0')
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return { error: 'too_large' }
  try {
    const text = await request.text()
    if (Buffer.byteLength(text, 'utf8') > MAX_BODY_BYTES) return { error: 'too_large' }
    return JSON.parse(text) as Record<string, unknown>
  } catch {
    return { error: 'invalid_json' }
  }
}

function createSafeHistory(history: unknown): HistoryItem[] {
  if (!Array.isArray(history)) return []
  return history
    .filter((h): h is HistoryItem => typeof h === 'object' && h !== null && (h as HistoryItem).role && ((h as HistoryItem).role === 'user' || (h as HistoryItem).role === 'assistant') && typeof (h as HistoryItem).content === 'string')
    .slice(-MAX_HISTORY_ITEMS)
    .map((item) => ({ role: item.role, content: item.content.slice(0, MAX_HISTORY_ITEM_CHARS) }))
}

export async function POST(request: NextRequest) {
  const startedAt = Date.now()
  const requestId = getRequestId(request.headers)
  let providerName = 'unknown'
  let model = 'unknown'

  try {
    const clientKey = getClientKey(request, 'abby-chat')
    const limit = await rateLimiter.check(clientKey)
    if (!limit.allowed) {
      logEvent('warn', 'abby.rate_limited', { requestId, route: '/api/abby', retryAfterSeconds: limit.retryAfterSeconds })
      return problem(429, 'Rate Limit Exceeded', 'Terlalu banyak permintaan. Silakan coba beberapa saat lagi.', '/v1/problems/rate-limit-exceeded', requestId, { 'Retry-After': String(limit.retryAfterSeconds ?? 60) })
    }

    const body = await parseBoundedJson(request)
    if ('error' in body) {
      return problem(body.error === 'too_large' ? 413 : 400, body.error === 'too_large' ? 'Payload Too Large' : 'Invalid JSON', body.error === 'too_large' ? 'Payload terlalu besar.' : 'Body request harus JSON valid.', body.error === 'too_large' ? '/v1/problems/payload-too-large' : '/v1/problems/invalid-json', requestId)
    }

    const { message, visitorMode, history } = body
    if (!message || typeof message !== 'string') return problem(400, 'Invalid Request', 'Field "message" harus berupa string.', '/v1/problems/invalid-request', requestId)
    const trimmed = message.trim()
    if (!trimmed) return problem(400, 'Empty Message', 'Pesan tidak boleh kosong.', '/v1/problems/empty-message', requestId)
    if (trimmed.length > MAX_MESSAGE_CHARS) return problem(400, 'Message Too Long', `Pesan terlalu panjang. Maks ${MAX_MESSAGE_CHARS} karakter.`, '/v1/problems/message-too-long', requestId)

    const safeHistory = createSafeHistory(history)
    const safeVisitorMode = typeof visitorMode === 'string' ? visitorMode.slice(0, 80) : undefined
    const providerConfig = resolveProvider()
    if ('error' in providerConfig) {
      logEvent('error', 'abby.provider.failed', { requestId, route: '/api/abby', reason: 'config', detail: providerConfig.error })
      return problem(500, 'Server Configuration Error', providerConfig.error, '/v1/problems/server-configuration', requestId)
    }
    providerName = providerConfig.provider
    model = providerConfig.model

    const retrieval = buildAbbyKnowledgeContext({ message: trimmed, visitorMode: safeVisitorMode, history: safeHistory })
    const modeContext = safeVisitorMode ? `\n\nCurrent visitor mode: ${safeVisitorMode}. Sesuaikan respons untuk konteks dan kebutuhan visitor ini.` : ''
    const systemContent = `${ABBY_SYSTEM_PROMPT}\n\n## Selected Knowledge Base — dr Ferdi Iskandar\n\nGunakan konteks terpilih berikut. Jangan mengarang fakta yang tidak ada di sini.\n\n${retrieval.context}${modeContext}\n\n${RESPONSE_VOICE_DIRECTIVE}`

    const requestBody = JSON.stringify({
      model: providerConfig.model,
      messages: [{ role: 'system', content: systemContent }, ...safeHistory, { role: 'user', content: trimmed }],
      max_tokens: 1024,
      temperature: 0.65,
      top_p: 0.9,
      ...(providerConfig.extraBody ?? {}),
    })

    const upstreamHeaders = { Authorization: `Bearer ${providerConfig.apiKey}`, 'Content-Type': 'application/json', ...(providerConfig.extraHeaders ?? {}) }
    const { status: upstreamStatus, text, attempts } = await postWithTransientRetry(`${providerConfig.baseUrl}/chat/completions`, upstreamHeaders, requestBody)
    if (attempts > 1) {
      logEvent('warn', 'abby.provider.retried', { requestId, route: '/api/abby', provider: providerName, model, attempts, upstreamStatus })
    }

    if (upstreamStatus < 200 || upstreamStatus >= 300) {
      const upstreamMessage = getUpstreamErrorMessage(text)
      logEvent('error', 'abby.provider.failed', { requestId, route: '/api/abby', provider: providerName, model, upstreamStatus, upstreamMessage })
      if (upstreamStatus === 401 || upstreamStatus === 403) return problem(502, 'Upstream Authentication Error', process.env.NODE_ENV === 'development' ? (upstreamMessage ?? 'Provider AI menolak kredensial atau akses model.') : 'Layanan AI menolak kredensial. Periksa konfigurasi provider.', '/v1/problems/upstream-authentication', requestId)
      if (upstreamStatus === 429) return problem(429, 'Upstream Rate Limited', process.env.NODE_ENV === 'development' ? (upstreamMessage ?? 'Provider rate limited.') : 'Layanan AI sedang sibuk. Silakan coba beberapa saat lagi.', '/v1/problems/upstream-rate-limited', requestId, { 'Retry-After': '60' })
      return problem(502, 'Upstream Service Error', process.env.NODE_ENV === 'development' ? (upstreamMessage ?? `HTTP ${upstreamStatus}`) : `Layanan AI mengalami gangguan: HTTP ${upstreamStatus}. Silakan coba beberapa saat lagi.`, '/v1/problems/upstream-service-error', requestId)
    }

    const parsedReply = parseAssistantReply(text)
    if (typeof parsedReply !== 'string') {
      logEvent('error', 'abby.provider.failed', { requestId, route: '/api/abby', provider: providerName, model, reason: 'malformed_response' })
      return problem(502, 'Malformed Upstream Response', 'Layanan AI mengembalikan format respons yang tidak valid.', '/v1/problems/malformed-upstream-response', requestId)
    }

    const reply = normalizeAssistantReply(parsedReply)
    logEvent('info', 'abby.request.completed', { requestId, route: '/api/abby', provider: providerName, model, status: 200, latencyMs: Date.now() - startedAt, selectedKnowledgeIds: retrieval.metadata.selectedDocumentIds, chunkCount: retrieval.metadata.chunkCount, contextSize: retrieval.metadata.contextSize, rateLimitRemaining: limit.remaining })
    return Response.json({ reply }, { headers: withRequestHeaders(JSON_HEADERS, requestId) })
  } catch (error) {
    if (isTimeoutError(error)) {
      logEvent('error', 'abby.provider.failed', { requestId, route: '/api/abby', provider: providerName, model, reason: 'timeout', latencyMs: Date.now() - startedAt })
      return problem(504, 'Gateway Timeout', 'Respons AI terlalu lama. Silakan coba lagi.', '/v1/problems/gateway-timeout', requestId)
    }
    logEvent('error', 'abby.request.completed', { requestId, route: '/api/abby', provider: providerName, model, status: 500, latencyMs: Date.now() - startedAt, error: error instanceof Error ? error.message : String(error) })
    return problem(500, 'Internal Server Error', 'Terjadi kesalahan internal. Silakan coba lagi.', '/v1/problems/internal-server-error', requestId)
  }
}
