import leadConfig from '@/src/config/abby.lead-capture.json'

import { createFixedWindowRateLimiter, getClientKey } from '../../../../lib/rate-limit'
import { getRequestId, logEvent } from '../../../../lib/logger'
import { insertLead, updateLeadNotification } from '../../../../lib/lead/repository'
import { notifyLead } from '../../../../lib/lead/notifier'
import { validateLeadBody } from '../../../../lib/lead/validation'

export const runtime = 'nodejs'

const MAX_BODY_BYTES = 24_000
const leadLimiter = createFixedWindowRateLimiter({ maxRequests: 5, windowMs: 10 * 60_000 })

const JSON_HEADERS: HeadersInit = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
}

function headers(requestId: string, extra?: HeadersInit): HeadersInit {
  return { ...JSON_HEADERS, ...extra, 'X-Request-ID': requestId }
}

function problem(status: number, detail: string, code: string, requestId: string, extra?: HeadersInit) {
  return Response.json({ ok: false, code, detail, requestId }, { status, headers: headers(requestId, extra) })
}

async function parseBoundedJson(request: Request): Promise<Record<string, unknown> | { error: 'too_large' | 'invalid_json' }> {
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

function getLeadMode(): string {
  return process.env.ABBY_LEAD_MODE ?? leadConfig.lead_capture.default_mode
}

export async function POST(request: Request) {
  const startedAt = Date.now()
  const requestId = getRequestId(request.headers)

  try {
    const limit = await leadLimiter.check(getClientKey(request, 'abby-lead'))
    if (!limit.allowed) {
      logEvent('warn', 'lead.rate_limited', { requestId, route: '/api/abby/lead', retryAfterSeconds: limit.retryAfterSeconds })
      return problem(429, 'Terlalu banyak inquiry. Silakan coba beberapa saat lagi.', 'rate_limited', requestId, { 'Retry-After': String(limit.retryAfterSeconds ?? 600) })
    }

    const body = await parseBoundedJson(request)
    if ('error' in body) return problem(body.error === 'too_large' ? 413 : 400, body.error === 'too_large' ? 'Payload terlalu besar.' : 'Body request harus JSON valid.', String(body.error), requestId)

    const validation = validateLeadBody(body)
    if (!validation.ok) return problem(validation.status, validation.detail, validation.code, requestId)

    const mode = getLeadMode()
    if (mode === 'none') {
      logEvent('warn', 'lead.accepted', { requestId, route: '/api/abby/lead', mode, stored: false, latencyMs: Date.now() - startedAt })
      return Response.json({ ok: true, mode, stored: false, message: leadConfig.lead_capture.success_message, requestId }, { headers: headers(requestId) })
    }

    if (mode === 'console') {
      logEvent('info', 'lead.accepted', { requestId, route: '/api/abby/lead', mode, stored: process.env.NODE_ENV === 'development', latencyMs: Date.now() - startedAt })
      return Response.json({ ok: true, mode, stored: process.env.NODE_ENV === 'development', message: leadConfig.lead_capture.success_message, requestId }, { headers: headers(requestId) })
    }

    const stored = await insertLead(validation.payload, validation.idempotencyKey)
    let notificationStatus = stored.notificationStatus
    if (!stored.duplicate && (mode === 'database_email' || mode === 'email')) {
      try {
        const notification = await notifyLead(stored.id, validation.payload)
        notificationStatus = notification.status === 'sent' ? 'sent' : 'skipped'
        await updateLeadNotification(stored.id, notificationStatus, notification.status === 'sent' ? notification.messageId : undefined)
      } catch (error) {
        notificationStatus = 'failed'
        await updateLeadNotification(stored.id, 'failed', undefined, error instanceof Error ? error.message : String(error))
        logEvent('error', 'lead.notification.failed', { requestId, route: '/api/abby/lead', leadId: stored.id, error: error instanceof Error ? error.message : String(error) })
      }
    }

    logEvent('info', 'lead.accepted', { requestId, route: '/api/abby/lead', mode, stored: true, leadId: stored.id, duplicate: stored.duplicate, notificationStatus, latencyMs: Date.now() - startedAt })
    return Response.json({ ok: true, mode, stored: true, leadId: stored.id, duplicate: stored.duplicate, notificationStatus, message: leadConfig.lead_capture.success_message, requestId }, { status: notificationStatus === 'failed' ? 202 : 200, headers: headers(requestId) })
  } catch (error) {
    logEvent('error', 'lead.accepted', { requestId, route: '/api/abby/lead', status: 503, latencyMs: Date.now() - startedAt, error: error instanceof Error ? error.message : String(error) })
    return problem(503, 'Inquiry belum bisa diproses saat ini. Silakan coba lagi melalui jalur kontak resmi.', 'lead_storage_unavailable', requestId)
  }
}
