import 'server-only'

export type ChatRole = 'user' | 'assistant'

export interface HistoryItem {
  role: ChatRole
  content: string
}

export interface ProviderConfig {
  provider: 'gemini' | 'openrouter' | 'openai' | 'deepseek'
  baseUrl: string
  apiKey: string
  model: string
  extraHeaders?: Record<string, string>
  extraBody?: Record<string, unknown>
}

export interface OpenAiCompatibleResponse {
  choices: Array<{
    message?: {
      content?: unknown
    }
  }>
}

export interface UpstreamResult {
  status: number
  text: string
}

const ERR_CONFIG = 'Konfigurasi server tidak lengkap.'
const isDev = process.env.NODE_ENV === 'development'

export function normalizeOpenRouterModel(model: string): string {
  const trimmed = model.trim()
  if (trimmed === 'gemini-2.5-flash') return 'google/gemini-2.5-flash'
  if (trimmed === 'gemini-2.5-flash:free') return 'google/gemini-2.5-flash:free'
  if (trimmed === 'deepseek-chat') return 'deepseek/deepseek-chat'
  return trimmed
}

export function resolveProvider(): ProviderConfig | { error: string } {
  const provider = (process.env.AI_PROVIDER ?? 'gemini').toLowerCase().trim()
  const rawModel = process.env.ABBY_MODEL ?? ''
  const model = rawModel.trim() || 'gemini-3.1-flash-lite'

  if (provider === 'gemini') {
    const apiKey = process.env.GEMINI_API_KEY?.trim()
    if (!apiKey) return { error: isDev ? 'Missing GEMINI_API_KEY for AI_PROVIDER=gemini' : ERR_CONFIG }
    return {
      provider: 'gemini',
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
      apiKey,
      model,
      extraBody: {},
    }
  }

  if (provider === 'openrouter') {
    const apiKey = process.env.OPENROUTER_API_KEY?.trim()
    if (!apiKey) return { error: isDev ? 'Missing OPENROUTER_API_KEY for AI_PROVIDER=openrouter' : ERR_CONFIG }
    const resolvedModel = rawModel.trim() || 'openai/gpt-oss-120b:free'
    const primaryModel = normalizeOpenRouterModel(resolvedModel)
    const fallbackModels = (process.env.ABBY_MODEL_FALLBACKS ?? 'openai/gpt-oss-20b:free,google/gemma-4-31b-it:free,google/gemma-4-26b-a4b-it:free')
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean)
    return {
      provider: 'openrouter',
      baseUrl: (process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1').trim(),
      apiKey,
      model: primaryModel,
      extraHeaders: {
        'HTTP-Referer': (process.env.OPENROUTER_SITE_URL ?? 'https://ferdiiskandar.com').trim(),
        'X-Title': (process.env.OPENROUTER_APP_NAME ?? 'Abby by dr Classy').trim(),
      },
      extraBody: { models: [primaryModel, ...fallbackModels].slice(0, 3) },
    }
  }

  if (provider === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY?.trim()
    if (!apiKey) return { error: isDev ? 'Missing OPENAI_API_KEY for AI_PROVIDER=openai' : ERR_CONFIG }
    return { provider: 'openai', baseUrl: 'https://api.openai.com/v1', apiKey, model }
  }

  const apiKey = process.env.DEEPSEEK_API_KEY?.trim()
  if (!apiKey) return { error: isDev ? 'Missing DEEPSEEK_API_KEY for AI_PROVIDER=deepseek' : ERR_CONFIG }
  return {
    provider: 'deepseek',
    baseUrl: (process.env.DEEPSEEK_BASE_URL ?? 'https://api.deepseek.com').trim(),
    apiKey,
    model: rawModel.trim() || 'deepseek-chat',
  }
}

export function parseAssistantReply(rawJson: string): string | { error: string } {
  let parsed: unknown
  try {
    parsed = JSON.parse(rawJson)
  } catch {
    return { error: 'Provider response is not valid JSON.' }
  }

  const response = parsed as Partial<OpenAiCompatibleResponse>
  const content = response.choices?.[0]?.message?.content
  if (typeof content !== 'string' || content.trim().length === 0) {
    return { error: 'Provider response does not include choices[0].message.content.' }
  }
  return content
}

export function getUpstreamErrorMessage(errorText: string): string | null {
  if (!errorText) return null
  try {
    const parsed = JSON.parse(errorText) as { error?: { message?: string } }
    return typeof parsed.error?.message === 'string' ? parsed.error.message : null
  } catch {
    return null
  }
}
