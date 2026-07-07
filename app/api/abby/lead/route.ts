import leadConfig from '@/src/config/abby.lead-capture.json'
import type { AbbyLeadPayload, AbbyLeadPurpose } from '@/types/abby-lead'

export const runtime = 'nodejs'

type LeadMode = 'console' | 'none' | 'email'

const ALLOWED_PURPOSES = new Set<AbbyLeadPurpose>(
  leadConfig.lead_capture.purposes.map((purpose) => purpose.id as AbbyLeadPurpose),
)

const MAX_MESSAGE_LENGTH = leadConfig.lead_capture.max_message_length
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MEDICAL_DATA_RE =
  /\b(diagnosis|diagnosa|gejala|keluhan|demam|batuk|sesak|nyeri|mual|muntah|pusing|hasil lab|laboratorium|rontgen|ct scan|mri|rekam medis|nomor rekam medis|pasien|obat|resep|terapi|dosis|tekanan darah|gula darah|kolesterol|riwayat penyakit|alergi|hamil|kehamilan|diagnose|symptom|symptoms|medical record|lab result|medication|prescription|patient)\b/i

const JSON_HEADERS: HeadersInit = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
}

function getLeadMode(): LeadMode {
  const configuredMode = process.env.ABBY_LEAD_MODE ?? leadConfig.lead_capture.default_mode
  if (configuredMode === 'console' || configuredMode === 'none' || configuredMode === 'email') {
    return configuredMode
  }
  return leadConfig.lead_capture.default_mode as LeadMode
}

function problem(status: number, detail: string, code: string) {
  return Response.json({ ok: false, code, detail }, { status, headers: JSON_HEADERS })
}

function cleanString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function isAllowedPurpose(value: string): value is AbbyLeadPurpose {
  return ALLOWED_PURPOSES.has(value as AbbyLeadPurpose)
}

function hasMedicalData(value: string): boolean {
  return MEDICAL_DATA_RE.test(value)
}

function createConversationSummary(value: unknown): string | undefined {
  const summary = cleanString(value)
  if (!summary) return undefined
  return summary.slice(0, 1000)
}

function toPayload(body: Record<string, unknown>): AbbyLeadPayload | Response {
  const name = cleanString(body.name)
  const email = cleanString(body.email).toLowerCase()
  const organization = cleanString(body.organization)
  const purpose = cleanString(body.purpose)
  const message = cleanString(body.message)
  const consent = body.consent === true
  const visitorMode = cleanString(body.visitorMode)
  const conversationSummary = createConversationSummary(body.conversationSummary)

  if (name.length < 2) {
    return problem(400, 'Nama wajib diisi minimal 2 karakter.', 'invalid_name')
  }
  if (!EMAIL_RE.test(email)) {
    return problem(400, 'Email wajib diisi dengan format yang valid.', 'invalid_email')
  }
  if (!isAllowedPurpose(purpose)) {
    return problem(400, 'Tujuan kontak tidak valid.', 'invalid_purpose')
  }
  if (message.length < 10) {
    return problem(400, 'Pesan singkat wajib diisi minimal 10 karakter.', 'invalid_message')
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return problem(400, `Pesan terlalu panjang. Maksimal ${MAX_MESSAGE_LENGTH} karakter.`, 'message_too_long')
  }
  if (!consent) {
    return problem(
      400,
      'Consent wajib diberikan sebelum inquiry dikirim.',
      'consent_required',
    )
  }
  if (hasMedicalData(message)) {
    return problem(
      400,
      leadConfig.lead_capture.medical_data_rejection_message,
      'medical_data_rejected',
    )
  }

  return {
    name,
    email,
    organization: organization || undefined,
    purpose,
    message,
    consent,
    visitorMode: visitorMode || undefined,
    conversationSummary,
    createdAt: new Date().toISOString(),
  }
}

async function persistLead(payload: AbbyLeadPayload): Promise<{ stored: boolean; mode: LeadMode }> {
  const mode = getLeadMode()

  if (mode === 'none') {
    return { stored: false, mode }
  }

  if (mode === 'console') {
    if (process.env.NODE_ENV === 'development') {
      console.info('[Abby Lead] Received lead:', {
        ...payload,
        message: payload.message.slice(0, 500),
        conversationSummary: payload.conversationSummary?.slice(0, 500),
      })
    }
    return { stored: process.env.NODE_ENV === 'development', mode }
  }

  const toEmail = process.env.ABBY_LEAD_TO_EMAIL
  if (!toEmail) {
    throw new Error('ABBY_LEAD_TO_EMAIL is required for ABBY_LEAD_MODE=email.')
  }

  throw new Error('ABBY_LEAD_MODE=email is not implemented because no email provider is installed.')
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const payloadOrResponse = toPayload(body)

    if (payloadOrResponse instanceof Response) return payloadOrResponse

    const result = await persistLead(payloadOrResponse)

    return Response.json(
      {
        ok: true,
        mode: result.mode,
        stored: result.stored,
        message: leadConfig.lead_capture.success_message,
      },
      { headers: JSON_HEADERS },
    )
  } catch (error) {
    const isDev = process.env.NODE_ENV === 'development'
    console.error('[Abby Lead] Submission error:', error)
    return problem(
      500,
      isDev && error instanceof Error
        ? error.message
        : 'Inquiry belum bisa diproses saat ini. Silakan coba lagi melalui jalur kontak resmi.',
      'lead_submission_failed',
    )
  }
}
