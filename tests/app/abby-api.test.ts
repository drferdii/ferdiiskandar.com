import { NextRequest } from 'next/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { POST } from '@/app/api/abby/route'

describe('Abby AI Chat API route dynamic resolution', () => {
  let originalEnv: NodeJS.ProcessEnv

  beforeEach(() => {
    originalEnv = { ...process.env }
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'Halo dari AI mock!' } }],
        }),
      }),
    )
  })

  afterEach(() => {
    for (const key in process.env) {
      if (!(key in originalEnv)) {
        delete process.env[key]
      }
    }
    Object.assign(process.env, originalEnv)
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('resolves gemini provider dynamically when process.env.AI_PROVIDER is gemini', async () => {
    process.env.AI_PROVIDER = 'gemini'
    process.env.GEMINI_API_KEY = 'mock-gemini-key'
    process.env.ABBY_MODEL = 'gemini-2.5-flash'

    const req = new NextRequest('http://localhost/api/abby', {
      method: 'POST',
      headers: {
        'x-real-ip': '127.0.0.1',
      },
      body: JSON.stringify({ message: 'Halo' }),
    })

    const res = await POST(req)
    expect(res.status).toBe(200)

    const data = (await res.json()) as { reply: string }
    expect(data.reply).toBe('Halo dari AI mock!')

    expect(fetch).toHaveBeenCalledWith(
      'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer mock-gemini-key',
        }),
        body: expect.stringContaining('"model":"gemini-2.5-flash"'),
      }),
    )
  })

  it('resolves deepseek provider dynamically when process.env.AI_PROVIDER is deepseek', async () => {
    process.env.AI_PROVIDER = 'deepseek'
    process.env.DEEPSEEK_API_KEY = 'mock-deepseek-key'
    process.env.ABBY_MODEL = 'deepseek-chat'

    const req = new NextRequest('http://localhost/api/abby', {
      method: 'POST',
      headers: {
        'x-real-ip': '127.0.0.2',
      },
      body: JSON.stringify({ message: 'Halo' }),
    })

    const res = await POST(req)
    expect(res.status).toBe(200)

    expect(fetch).toHaveBeenCalledWith(
      'https://api.deepseek.com/chat/completions',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer mock-deepseek-key',
        }),
        body: expect.stringContaining('"model":"deepseek-chat"'),
      }),
    )
  })

  it('updates provider dynamically between sequential requests', async () => {
    // Request 1: Gemini
    process.env.AI_PROVIDER = 'gemini'
    process.env.GEMINI_API_KEY = 'mock-gemini-key-1'

    const req1 = new NextRequest('http://localhost/api/abby', {
      method: 'POST',
      headers: { 'x-real-ip': '127.0.0.3' },
      body: JSON.stringify({ message: 'Halo 1' }),
    })

    const res1 = await POST(req1)
    expect(res1.status).toBe(200)
    expect(fetch).toHaveBeenLastCalledWith(
      'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer mock-gemini-key-1',
        }),
      }),
    )

    // Request 2: OpenRouter
    process.env.AI_PROVIDER = 'openrouter'
    process.env.OPENROUTER_API_KEY = 'mock-openrouter-key-2'

    const req2 = new NextRequest('http://localhost/api/abby', {
      method: 'POST',
      headers: { 'x-real-ip': '127.0.0.4' },
      body: JSON.stringify({ message: 'Halo 2' }),
    })

    const res2 = await POST(req2)
    expect(res2.status).toBe(200)
    expect(fetch).toHaveBeenLastCalledWith(
      'https://openrouter.ai/api/v1/chat/completions',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer mock-openrouter-key-2',
        }),
      }),
    )
  })
  it('limits OpenRouter models array to at most 3 items to satisfy API constraints', async () => {
    process.env.AI_PROVIDER = 'openrouter'
    process.env.OPENROUTER_API_KEY = 'mock-openrouter-key'
    process.env.ABBY_MODEL = 'openai/gpt-oss-120b:free'
    process.env.ABBY_MODEL_FALLBACKS = 'model1:free,model2:free,model3:free,model4:free'

    const req = new NextRequest('http://localhost/api/abby', {
      method: 'POST',
      headers: {
        'x-real-ip': '127.0.0.6',
      },
      body: JSON.stringify({ message: 'Halo' }),
    })

    const res = await POST(req)
    expect(res.status).toBe(200)

    const fetchCalls = vi.mocked(fetch).mock.calls
    const lastCall = fetchCalls[fetchCalls.length - 1]
    const bodyObj = JSON.parse(lastCall[1]!.body as string) as { models: string[] }
    expect(bodyObj.models).toBeDefined()
    expect(bodyObj.models.length).toBeLessThanOrEqual(3)
    expect(bodyObj.models).toEqual(['openai/gpt-oss-120b:free', 'model1:free', 'model2:free'])
  })

  it('returns 500 when the resolved provider configuration has an error (e.g. missing API key)', async () => {
    process.env.AI_PROVIDER = 'gemini'
    delete process.env.GEMINI_API_KEY

    const req = new NextRequest('http://localhost/api/abby', {
      method: 'POST',
      headers: {
        'x-real-ip': '127.0.0.5',
      },
      body: JSON.stringify({ message: 'Halo' }),
    })

    const res = await POST(req)
    expect(res.status).toBe(500)

    const data = (await res.json()) as { title: string; detail: string }
    expect(data.title).toBe('Server Configuration Error')
    expect(data.detail).toMatch(/Missing GEMINI_API_KEY|Konfigurasi server tidak lengkap\./)
  })
})
