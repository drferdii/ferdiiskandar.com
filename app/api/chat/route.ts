import { type NextRequest } from 'next/server'

import { CHAT_SYSTEM_PROMPT } from '@/lib/chat-knowledge'
import { createFixedWindowRateLimiter, getClientKey } from '@/lib/rate-limit'

const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1'
const MODEL = 'meta/llama-3.3-70b-instruct'
const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 20
const rateLimiter = createFixedWindowRateLimiter({
  maxRequests: MAX_REQUESTS_PER_WINDOW,
  windowMs: WINDOW_MS,
})

function jsonHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
  }
}

function problem(status: number, title: string, detail: string, type: string) {
  return Response.json(
    {
      type,
      title,
      status,
      detail,
    },
    { status, headers: jsonHeaders() },
  )
}

export async function POST(request: NextRequest) {
  try {
    const clientKey = getClientKey(request)
    if (rateLimiter.isRateLimited(clientKey)) {
      return problem(
        429,
        'Rate Limit Exceeded',
        'Too many requests. Please try again shortly.',
        '/v1/problems/rate-limit-exceeded',
      )
    }

    const apiKey = process.env.NVIDIA_API_KEY

    if (!apiKey) {
      return problem(
        500,
        'Server Configuration Error',
        'Server configuration missing: NVIDIA_API_KEY is not set.',
        '/v1/problems/server-configuration',
      )
    }

    const body = await request.json()
    const userMessage = body?.message

    if (!userMessage || typeof userMessage !== 'string') {
      return problem(
        400,
        'Invalid Request Body',
        'Missing or invalid "message" field.',
        '/v1/problems/invalid-request',
      )
    }

    const trimmed = userMessage.trim()

    if (trimmed.length === 0) {
      return problem(
        400,
        'Invalid Message',
        'Message cannot be empty.',
        '/v1/problems/invalid-message',
      )
    }

    if (trimmed.length > 2000) {
      return problem(
        400,
        'Message Too Long',
        'Message too long. Please keep under 2000 characters.',
        '/v1/problems/message-too-long',
      )
    }

    const nvidiaResponse = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: CHAT_SYSTEM_PROMPT },
          { role: 'user', content: trimmed },
        ],
        max_tokens: 600,
        temperature: 0.7,
        top_p: 0.9,
      }),
      signal: AbortSignal.timeout(25_000),
    })

    if (!nvidiaResponse.ok) {
      const errorText = await nvidiaResponse.text()
      console.error('NVIDIA NIM error:', nvidiaResponse.status, errorText)

      if (nvidiaResponse.status === 429) {
        return problem(
          429,
          'Upstream Rate Limited',
          'The upstream AI service is rate limited. Please try again shortly.',
          '/v1/problems/upstream-rate-limited',
        )
      }

      return problem(
        502,
        'Upstream Service Error',
        'The AI service is currently unavailable. Please try again later.',
        '/v1/problems/upstream-service-error',
      )
    }

    const data = await nvidiaResponse.json()
    const reply =
      data?.choices?.[0]?.message?.content || 'I could not generate a response at this time.'

    return Response.json({ reply }, { headers: jsonHeaders() })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      return problem(
        504,
        'Gateway Timeout',
        'The AI response took too long. Please try again.',
        '/v1/problems/gateway-timeout',
      )
    }

    console.error('Chat API unexpected error:', error)
    return problem(
      500,
      'Internal Server Error',
      'An internal error occurred. Please try again later.',
      '/v1/problems/internal-server-error',
    )
  }
}
