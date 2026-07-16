import { validateLeadBody } from '@/lib/lead/validation'

describe('Abby lead validation', () => {
  const validBody = {
    name: 'Ferdi Tester',
    email: 'ferdi@example.com',
    organization: 'Sentra',
    purpose: 'collaboration',
    message: 'Saya ingin membahas kolaborasi institusional untuk program edukasi publik.',
    consent: true,
    visitorMode: 'Kolaborator',
    conversationSummary: 'Ringkasan inquiry kolaborasi.',
    idempotencyKey: 'lead-test-key-123456',
    formStartedAt: Date.now() - 5000,
    website: '',
  }

  it('accepts valid lead payloads', () => {
    const result = validateLeadBody(validBody)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.payload.email).toBe('ferdi@example.com')
      expect(result.idempotencyKey).toBe('lead-test-key-123456')
    }
  })

  it('rejects honeypot submissions', () => {
    const result = validateLeadBody({ ...validBody, website: 'https://spam.example' })
    expect(result).toMatchObject({ ok: false, code: 'spam_rejected' })
  })

  it('rejects too fast submissions', () => {
    const result = validateLeadBody({ ...validBody, formStartedAt: Date.now() })
    expect(result).toMatchObject({ ok: false, code: 'too_fast' })
  })

  it('rejects medical data before persistence', () => {
    const result = validateLeadBody({ ...validBody, message: 'Pasien saya demam dan butuh resep obat.' })
    expect(result).toMatchObject({ ok: false, code: 'medical_data_rejected' })
  })

  it('requires valid idempotency key', () => {
    const result = validateLeadBody({ ...validBody, idempotencyKey: 'short' })
    expect(result).toMatchObject({ ok: false, code: 'invalid_idempotency_key' })
  })
})
