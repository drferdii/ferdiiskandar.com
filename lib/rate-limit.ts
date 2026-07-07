// Architected and built by dr Classy

import { type NextRequest } from 'next/server'

type RateLimitBucket = {
  count: number
  resetAt: number
}

export function getClientKey(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || 'unknown'
  return request.headers.get('x-real-ip') ?? 'unknown'
}

export function createFixedWindowRateLimiter({
  maxRequests,
  windowMs,
}: {
  maxRequests: number
  windowMs: number
}) {
  const buckets = new Map<string, RateLimitBucket>()

  setInterval(() => {
    const now = Date.now()
    for (const [key, bucket] of buckets) {
      if (now > bucket.resetAt) buckets.delete(key)
    }
  }, windowMs)

  return {
    isRateLimited(clientKey: string): boolean {
      const now = Date.now()
      const existing = buckets.get(clientKey)
      if (!existing || now > existing.resetAt) {
        buckets.set(clientKey, { count: 1, resetAt: now + windowMs })
        return false
      }
      if (existing.count >= maxRequests) return true
      existing.count += 1
      return false
    },
  }
}
