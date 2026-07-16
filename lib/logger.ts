import 'server-only'
import crypto from 'node:crypto'

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
const SECRET_RE = /(api[_-]?key|authorization|bearer|token|password|secret)(\s*[:=]\s*)[^\s,}]+/gi

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export function getRequestId(headers: Headers): string {
  const incoming = headers.get('x-request-id')?.trim()
  if (incoming && /^[a-zA-Z0-9._:-]{8,80}$/.test(incoming)) return incoming
  return crypto.randomUUID()
}

export function sanitizeLogValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.replace(EMAIL_RE, '[redacted-email]').replace(SECRET_RE, '$1$2[redacted]')
  }
  if (Array.isArray(value)) return value.map(sanitizeLogValue)
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [key, nested] of Object.entries(value)) {
      if (/email|name|ip|message|summary|authorization|apiKey|token|secret/i.test(key)) {
        out[key] = '[redacted]'
      } else {
        out[key] = sanitizeLogValue(nested)
      }
    }
    return out
  }
  return value
}

export function logEvent(level: LogLevel, event: string, fields: Record<string, unknown> = {}): void {
  const payload = {
    level,
    event,
    timestamp: new Date().toISOString(),
    ...(sanitizeLogValue(fields) as Record<string, unknown>),
  }
  const line = JSON.stringify(payload)
  if (level === 'error') console.error(line)
  else if (level === 'warn') console.warn(line)
  else console.info(line)
}
