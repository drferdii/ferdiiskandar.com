'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

import abbyConfig from '@/src/config/abby.config.json'
import leadCaptureConfig from '@/src/config/abby.lead-capture.json'
import type { AbbyLeadPayload, AbbyLeadPurpose } from '@/types/abby-lead'

type Message = { role: 'user' | 'assistant'; text: string }
type VisitorMode = (typeof abbyConfig.visitor_modes)[number]
type LeadPurposeOption = (typeof leadCaptureConfig.lead_capture.purposes)[number]

type LeadFormState = {
  name: string
  email: string
  organization: string
  purpose: AbbyLeadPurpose
  message: string
  consent: boolean
}

const CTA_HREF_OVERRIDE: Record<string, string> = {
  '/media-kit': '/cv',
  '/writings': '/notes',
  '/projects': '/works',
  '/contact': '/#contact',
  '/projects/sentra': '/works',
}

const FEATURED_CTAS = abbyConfig.cta_mapping
  .filter((c) =>
    ['learn_profile', 'speaking_request', 'explore_projects', 'collaboration'].includes(c.intent),
  )
  .map((c) => ({ ...c, href: CTA_HREF_OVERRIDE[c.href] ?? c.href }))

const LEAD_INTENT_PATTERNS: Array<{ purpose: AbbyLeadPurpose; pattern: RegExp }> = [
  {
    purpose: 'speaking_invitation',
    pattern: /\b(speaking|seminar|pembicara|keynote|narasumber|mengundang|undang)\b/i,
  },
  {
    purpose: 'media_interview',
    pattern: /\b(media|jurnalis|wartawan|wawancara|interview|podcast|artikel)\b/i,
  },
  {
    purpose: 'healthcare_ai_discussion',
    pattern: /\b(healthcare ai|clinical decision support|diskusi ai|ai kesehatan|rumah sakit.*ai)\b/i,
  },
  {
    purpose: 'partnership',
    pattern: /\b(partnership|partner|kemitraan|kerja sama|kerjasama|rumah sakit)\b/i,
  },
  {
    purpose: 'collaboration',
    pattern: /\b(kolaborasi|collaboration|collab|bekerja sama|berkolaborasi)\b/i,
  },
]

const DEFAULT_LEAD_FORM: LeadFormState = {
  name: '',
  email: '',
  organization: '',
  purpose: 'general_inquiry',
  message: '',
  consent: false,
}

const LEAD_PROMPT_MESSAGE =
  'Baik, saya bantu rapikan jalur kontaknya. Isi data singkat berikut agar pesan Anda bisa ditinjau dengan konteks yang jelas.'

function detectLeadPurpose(text: string): AbbyLeadPurpose | null {
  return LEAD_INTENT_PATTERNS.find(({ pattern }) => pattern.test(text))?.purpose ?? null
}

function purposeLabel(purpose: AbbyLeadPurpose): string {
  return (
    leadCaptureConfig.lead_capture.purposes.find(
      (option): option is LeadPurposeOption => option.id === purpose,
    )?.label ?? 'Pertanyaan Umum'
  )
}

function createConversationSummary(messages: Message[]): string {
  return messages
    .slice(-6)
    .map((message) => `${message.role}: ${message.text}`)
    .join('\n')
    .slice(0, 1000)
}

export default function AbbyWidget() {
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<'welcome' | 'chat'>('welcome')
  const [visitorMode, setVisitorMode] = useState<VisitorMode | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [leadFormOpen, setLeadFormOpen] = useState(false)
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadError, setLeadError] = useState<string | null>(null)
  const [leadForm, setLeadForm] = useState<LeadFormState>(DEFAULT_LEAD_FORM)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const detectedLeadPurpose = useMemo(() => {
    for (const message of [...messages].reverse()) {
      if (message.role !== 'user') continue
      const detected = detectLeadPurpose(message.text)
      if (detected) return detected
    }
    return null
  }, [messages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, leadFormOpen])

  useEffect(() => {
    if (!open || phase !== 'chat' || leadFormOpen) return
    const id = setTimeout(() => inputRef.current?.focus(), 100)
    return () => clearTimeout(id)
  }, [open, phase, leadFormOpen])

  function resetChat() {
    setMessages([])
    setError(null)
    setInput('')
    setLeadFormOpen(false)
    setLeadError(null)
    setLeadForm(DEFAULT_LEAD_FORM)
  }

  function handleModeSelect(mode: VisitorMode) {
    resetChat()
    setVisitorMode(mode)
    setPhase('chat')
  }

  function handleBack() {
    resetChat()
    setPhase('welcome')
    setVisitorMode(null)
  }

  function openLeadForm(purpose: AbbyLeadPurpose = detectedLeadPurpose ?? 'general_inquiry') {
    const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.text
    setLeadError(null)
    setLeadForm((prev) => ({
      ...prev,
      purpose,
      message: prev.message || lastUserMessage || '',
    }))
    setLeadFormOpen(true)
    if (!messages.some((message) => message.text === LEAD_PROMPT_MESSAGE)) {
      setMessages((prev) => [...prev, { role: 'assistant', text: LEAD_PROMPT_MESSAGE }])
    }
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const detectedPurpose = detectLeadPurpose(trimmed)

    setError(null)
    const history = messages.map((m) => ({ role: m.role, content: m.text }))
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setLoading(true)

    if (detectedPurpose) {
      setLeadForm((prev) => ({
        ...prev,
        purpose: detectedPurpose,
        message: prev.message || trimmed,
      }))
    }

    try {
      const res = await fetch('/api/abby', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, visitorMode: visitorMode?.label, history }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail ?? 'Gagal menghubungi Abby.')
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await sendMessage(input)
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLeadError(null)
    setLeadSubmitting(true)

    const payload: Omit<AbbyLeadPayload, 'createdAt'> = {
      name: leadForm.name,
      email: leadForm.email,
      organization: leadForm.organization || undefined,
      purpose: leadForm.purpose,
      message: leadForm.message,
      consent: leadForm.consent,
      visitorMode: visitorMode?.label,
      conversationSummary: createConversationSummary(messages),
    }

    try {
      const res = await fetch('/api/abby/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail ?? 'Inquiry belum bisa dikirim.')

      setMessages((prev) => [...prev, { role: 'assistant', text: data.message }])
      setLeadFormOpen(false)
      setLeadForm(DEFAULT_LEAD_FORM)
    } catch (err) {
      setLeadError(err instanceof Error ? err.message : 'Inquiry belum bisa dikirim.')
    } finally {
      setLeadSubmitting(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    e.stopPropagation()
    if (e.key === 'Escape') setOpen(false)
  }

  function stopPageScroll(e: React.UIEvent) {
    e.stopPropagation()
  }

  return (
    <>
      <button
        type="button"
        className="abby-toggle"
        aria-label={open ? 'Tutup Abby' : 'Tanya Abby'}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="abby-toggle-avatar">
          <Image
            src="/abby.png"
            alt="Abby"
            width={600}
            height={687}
            className="abby-toggle-img"
          />
        </span>
        {!open && <span className="abby-toggle-label">Tanya Abby</span>}
        {open && (
          <span className="abby-toggle-close" aria-hidden="true">
            ✕
          </span>
        )}
      </button>

      {open && (
        <div
          className="abby-drawer"
          role="dialog"
          aria-label="Abby — Asisten AI pribadi dr Ferdi Iskandar"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          onWheel={stopPageScroll}
          onWheelCapture={stopPageScroll}
          onTouchMove={stopPageScroll}
        >
          <header className="abby-header">
            <div className="abby-header-identity">
              <Image
                src="/abby.png"
                alt="Abby"
                width={600}
                height={687}
                className="abby-header-avatar"
              />
              <div>
                <strong className="abby-header-name">Abby</strong>
                <span className="abby-header-sub">Asisten AI pribadi dr Ferdi Iskandar</span>
              </div>
            </div>
            <div className="abby-header-actions">
              {phase === 'chat' && (
                <button
                  type="button"
                  className="abby-back-btn"
                  onClick={handleBack}
                  aria-label="Kembali ke pilihan mode"
                >
                  ← Mode
                </button>
              )}
              <button
                type="button"
                className="abby-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Tutup Abby"
              >
                ✕
              </button>
            </div>
          </header>

          {phase === 'welcome' && (
            <div className="abby-welcome">
              <div className="abby-welcome-image">
                <Image
                  src="/abby.png"
                  alt="Abby, asisten AI dr Ferdi Iskandar"
                  width={600}
                  height={687}
                  className="abby-main-img"
                  priority
                />
              </div>
              <p className="abby-opening">{abbyConfig.opening_message.id}</p>
              <p className="abby-mode-prompt">Siapa Anda hari ini?</p>
              <div className="abby-modes">
                {abbyConfig.visitor_modes.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    className="abby-mode-btn"
                    onClick={() => handleModeSelect(mode)}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === 'chat' && visitorMode && (
            <>
              <div className="abby-body" aria-live="polite">
                {messages.length === 0 && (
                  <div className="abby-suggestions">
                    <p className="abby-suggestions-label">Pertanyaan untuk {visitorMode.label}:</p>
                    {visitorMode.suggested_questions.map((q, i) => (
                      <button
                        key={i}
                        type="button"
                        className="abby-suggestion-btn"
                        onClick={() => sendMessage(q)}
                        disabled={loading}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={`abby-bubble abby-bubble-${msg.role}`}>
                    <p>{msg.text}</p>
                  </div>
                ))}

                {detectedLeadPurpose && !leadFormOpen && (
                  <div className="abby-lead-nudge" aria-label="Jalur inquiry terdeteksi">
                    <p>
                      Saya menangkap ini sebagai {purposeLabel(detectedLeadPurpose).toLowerCase()}.
                    </p>
                    <button
                      type="button"
                      className="abby-lead-nudge-btn"
                      onClick={() => openLeadForm(detectedLeadPurpose)}
                    >
                      Buka form inquiry
                    </button>
                  </div>
                )}

                {leadFormOpen && (
                  <form className="abby-lead-form" onSubmit={handleLeadSubmit}>
                    <div className="abby-lead-form-head">
                      <strong>Kirim Inquiry</strong>
                      <span>Data minimal, consent jelas, tanpa data medis pribadi.</span>
                    </div>

                    <label>
                      <span>Nama</span>
                      <input
                        type="text"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))}
                        required
                        minLength={2}
                        disabled={leadSubmitting}
                      />
                    </label>

                    <label>
                      <span>Email</span>
                      <input
                        type="email"
                        value={leadForm.email}
                        onChange={(e) =>
                          setLeadForm((prev) => ({ ...prev, email: e.target.value }))
                        }
                        required
                        disabled={leadSubmitting}
                      />
                    </label>

                    <label>
                      <span>Institusi / Organisasi</span>
                      <input
                        type="text"
                        value={leadForm.organization}
                        onChange={(e) =>
                          setLeadForm((prev) => ({ ...prev, organization: e.target.value }))
                        }
                        disabled={leadSubmitting}
                      />
                    </label>

                    <label>
                      <span>Tujuan Kontak</span>
                      <select
                        value={leadForm.purpose}
                        onChange={(e) =>
                          setLeadForm((prev) => ({
                            ...prev,
                            purpose: e.target.value as AbbyLeadPurpose,
                          }))
                        }
                        required
                        disabled={leadSubmitting}
                      >
                        {leadCaptureConfig.lead_capture.purposes.map((purpose) => (
                          <option key={purpose.id} value={purpose.id}>
                            {purpose.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      <span>Pesan Singkat</span>
                      <textarea
                        value={leadForm.message}
                        onChange={(e) =>
                          setLeadForm((prev) => ({ ...prev, message: e.target.value }))
                        }
                        required
                        minLength={10}
                        maxLength={leadCaptureConfig.lead_capture.max_message_length}
                        disabled={leadSubmitting}
                      />
                    </label>

                    <label className="abby-lead-consent">
                      <input
                        type="checkbox"
                        checked={leadForm.consent}
                        onChange={(e) =>
                          setLeadForm((prev) => ({ ...prev, consent: e.target.checked }))
                        }
                        required
                        disabled={leadSubmitting}
                      />
                      <span>{leadCaptureConfig.lead_capture.consent_text}</span>
                    </label>

                    {leadError && <p className="abby-lead-error">{leadError}</p>}

                    <div className="abby-lead-actions">
                      <button type="submit" className="abby-lead-submit" disabled={leadSubmitting}>
                        {leadSubmitting ? 'Mengirim...' : 'Kirim Inquiry'}
                      </button>
                      <button
                        type="button"
                        className="abby-lead-cancel"
                        onClick={() => setLeadFormOpen(false)}
                        disabled={leadSubmitting}
                      >
                        Tutup
                      </button>
                    </div>
                  </form>
                )}

                {loading && (
                  <div className="abby-bubble abby-bubble-assistant">
                    <p className="abby-typing-dots">
                      <span />
                      <span />
                      <span />
                    </p>
                  </div>
                )}

                {error && (
                  <div className="abby-error">
                    <p>{error}</p>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              <div className="abby-cta-row" aria-label="Tautan cepat">
                <button
                  type="button"
                  className="abby-cta-btn"
                  onClick={() => openLeadForm(detectedLeadPurpose ?? 'general_inquiry')}
                >
                  Kirim Inquiry
                </button>
                <button
                  type="button"
                  className="abby-cta-btn"
                  onClick={() =>
                    sendMessage(
                      'Boleh bantu rapikan pesan singkat untuk speaking, media, kolaborasi, atau partnership?',
                    )
                  }
                  disabled={loading}
                >
                  Bantu Rapikan Pesan
                </button>
                <Link href="/#contact" className="abby-cta-btn">
                  Lanjut ke Contact Desk
                </Link>
                {FEATURED_CTAS.slice(0, 2).map((cta) => (
                  <Link key={cta.intent} href={cta.href} className="abby-cta-btn">
                    {cta.label}
                  </Link>
                ))}
              </div>

              <form className="abby-form" onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  className="abby-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={abbyConfig.ui.placeholder}
                  disabled={loading}
                  aria-label="Pesan untuk Abby"
                  maxLength={2000}
                />
                <button
                  type="submit"
                  className="abby-send"
                  disabled={loading || input.trim().length === 0}
                  aria-label="Kirim pesan"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}
