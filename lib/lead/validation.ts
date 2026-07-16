import leadConfig from '@/src/config/abby.lead-capture.json'
import type { AbbyLeadPayload, AbbyLeadPurpose } from '@/types/abby-lead'

const ALLOWED_PURPOSES = new Set<AbbyLeadPurpose>(leadConfig.lead_capture.purposes.map((purpose) => purpose.id as AbbyLeadPurpose))
const MAX_MESSAGE_LENGTH = leadConfig.lead_capture.max_message_length
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MEDICAL_DATA_RE = /\b(diagnosis|diagnosa|gejala|keluhan|demam|batuk|sesak|nyeri|mual|muntah|pusing|hasil\s*lab|laboratorium|rontgen|ct\s*scan|mri|rekam\s*medis|nomor\s*rekam\s*medis|pasien|obat|resep|terapi|dosis|tekanan\s*darah|gula\s*darah|kolesterol|riwayat\s*penyakit|alergi|hamil|kehamilan|diagnose|symptom|symptoms|medical\s*record|lab\s*result|medication|prescription|patient)\b/i

export type LeadValidationResult = { ok: true; payload: AbbyLeadPayload; idempotencyKey: string } | { ok: false; status: number; code: string; detail: string }

function cleanString(value: unknown): string {
  return typeof value === 'string' ? value.normalize('NFKC').trim() : ''
}

function isAllowedPurpose(value: string): value is AbbyLeadPurpose {
  return ALLOWED_PURPOSES.has(value as AbbyLeadPurpose)
}

function hasMedicalData(value: string): boolean {
  return MEDICAL_DATA_RE.test(value.normalize('NFKC'))
}

function createConversationSummary(value: unknown): string | undefined {
  const summary = cleanString(value)
  if (!summary) return undefined
  return summary.replace(/[\r\n]{3,}/g, '\n\n').slice(0, 1000)
}

export function validateLeadBody(body: Record<string, unknown>): LeadValidationResult {
  const honeypot = cleanString(body.website)
  if (honeypot) return { ok: false, status: 400, code: 'spam_rejected', detail: 'Inquiry tidak dapat diproses.' }

  const formStartedAt = typeof body.formStartedAt === 'number' ? body.formStartedAt : Number(body.formStartedAt ?? 0)
  if (Number.isFinite(formStartedAt) && formStartedAt > 0 && Date.now() - formStartedAt < 2500) {
    return { ok: false, status: 400, code: 'too_fast', detail: 'Form dikirim terlalu cepat.' }
  }

  const name = cleanString(body.name)
  const email = cleanString(body.email).toLowerCase()
  const organization = cleanString(body.organization)
  const purpose = cleanString(body.purpose)
  const message = cleanString(body.message)
  const consent = body.consent === true
  const visitorMode = cleanString(body.visitorMode)
  const conversationSummary = createConversationSummary(body.conversationSummary)
  const idempotencyKey = cleanString(body.idempotencyKey) || cleanString(body.idempotency_key)

  if (name.length < 2) return { ok: false, status: 400, code: 'invalid_name', detail: 'Nama wajib diisi minimal 2 karakter.' }
  if (!EMAIL_RE.test(email)) return { ok: false, status: 400, code: 'invalid_email', detail: 'Email wajib diisi dengan format yang valid.' }
  if (!isAllowedPurpose(purpose)) return { ok: false, status: 400, code: 'invalid_purpose', detail: 'Tujuan kontak tidak valid.' }
  if (message.length < 10) return { ok: false, status: 400, code: 'invalid_message', detail: 'Pesan singkat wajib diisi minimal 10 karakter.' }
  if (message.length > MAX_MESSAGE_LENGTH) return { ok: false, status: 400, code: 'message_too_long', detail: `Pesan terlalu panjang. Maksimal ${MAX_MESSAGE_LENGTH} karakter.` }
  if (!consent) return { ok: false, status: 400, code: 'consent_required', detail: 'Consent wajib diberikan sebelum inquiry dikirim.' }
  if (hasMedicalData(message) || hasMedicalData(conversationSummary ?? '')) return { ok: false, status: 400, code: 'medical_data_rejected', detail: leadConfig.lead_capture.medical_data_rejection_message }
  if (!idempotencyKey || !/^[a-zA-Z0-9._:-]{16,120}$/.test(idempotencyKey)) return { ok: false, status: 400, code: 'invalid_idempotency_key', detail: 'Idempotency key tidak valid.' }

  return {
    ok: true,
    idempotencyKey,
    payload: { name, email, organization: organization || undefined, purpose, message, consent, visitorMode: visitorMode || undefined, conversationSummary, createdAt: new Date().toISOString() },
  }
}
