import crypto from 'node:crypto'
import { type NextRequest } from 'next/server'

export type RateLimitResult = {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
  retryAfterSeconds?: number
}

type RateLimitBucket = {
  count: number
  resetAt: number
}

export interface RateLimiter {
  check(clientKey: string): Promise<RateLimitResult> | RateLimitResult
}

export function getClientKey(request: NextRequest | Request, endpoint = 'default'): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  return crypto.createHash('sha256').update(`${endpoint}:${ip}`).digest('hex')
}

export function createFixedWindowRateLimiter({
  maxRequests,
  windowMs,
}: {
  maxRequests: number
  windowMs: number
}): RateLimiter & { isRateLimited(clientKey: string): boolean } {
  const buckets = new Map<string, RateLimitBucket>()

  const timer = setInterval(() => {
    const now = Date.now()
    for (const [key, bucket] of buckets) {
      if (now > bucket.resetAt) buckets.delete(key)
    }
  }, windowMs)
  timer.unref?.()

  function check(clientKey: string): RateLimitResult {
    const now = Date.now()
    const existing = buckets.get(clientKey)
    const limit = maxRequests
    if (!existing || now > existing.resetAt) {
      const resetAt = now + windowMs
      buckets.set(clientKey, { count: 1, resetAt })
      return { allowed: true, limit, remaining: Math.max(0, limit - 1), resetAt }
    }
    if (existing.count >= limit) {
      return {
        allowed: false,
        limit,
        remaining: 0,
        resetAt: existing.resetAt,
        retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
      }
    }
    existing.count += 1
    return { allowed: true, limit, remaining: Math.max(0, limit - existing.count), resetAt: existing.resetAt }
  }

  return {
    check,
    isRateLimited(clientKey: string): boolean {
      return !check(clientKey).allowed
    },
  }
}
