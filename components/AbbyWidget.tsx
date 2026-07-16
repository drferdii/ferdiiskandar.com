'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'

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
  website: string
  formStartedAt: number
}

const MAX_USER_QUESTIONS = 10
const QUESTION_LIMIT_MESSAGE =
  'Anda sudah mencapai batas 10 pertanyaan untuk sesi ini. Silakan mulai percakapan baru nanti, atau lanjut lewat Contact Desk kalau perlu tindak lanjut langsung.'

const WELCOME_TITLE = 'Halo, saya Abby.'
const WELCOME_BODY =
  'Saya mendampingi Anda menjelajahi perjalanan, karya, dan cara berpikir dr. Ferdi Iskandar. Kita bisa mulai dari mana saja.'

const QUICK_STARTERS: Array<{ label: string; message: string }> = [
  { label: 'Siapa Ferdi?', message: 'Siapa dr. Ferdi Iskandar?' },
  { label: 'Apa yang sedang ia bangun?', message: 'Apa yang sedang dr. Ferdi bangun sekarang?' },
  {
    label: 'Pemikiran tentang AI dan kesehatan',
    message: 'Bagaimana pemikiran dr. Ferdi tentang AI dan kesehatan?',
  },
  { label: 'Hubungi Ferdi', message: 'Saya ingin menghubungi dr. Ferdi.' },
]

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
    pattern:
      /\b(healthcare ai|clinical decision support|diskusi ai|ai kesehatan|rumah sakit.*ai)\b/i,
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

const createDefaultLeadForm = (): LeadFormState => ({
  name: '',
  email: '',
  organization: '',
  purpose: 'general_inquiry',
  message: '',
  consent: false,
  website: '',
  formStartedAt: Date.now(),
})

const createIdempotencyKey = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return 'abby-lead-' + Date.now() + '-' + Math.random().toString(36).slice(2)
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

const MARKDOWN_LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g

function renderMessageText(text: string) {
  const parts = text.split(MARKDOWN_LINK_PATTERN)
  const nodes: React.ReactNode[] = []

  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(<Fragment key={`t-${i}`}>{parts[i]}</Fragment>)
    const label = parts[i + 1]
    const href = parts[i + 2]
    if (label && href) {
      const isInternal = href.startsWith('/')
      nodes.push(
        <Link
          key={`l-${i}`}
          href={href}
          className="abby-bubble-link"
          {...(!isInternal && { target: '_blank', rel: 'noreferrer' })}
        >
          {label}
        </Link>,
      )
    }
  }

  return nodes
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
  const [collapsedVisible, setCollapsedVisible] = useState(false)
  const [phase, setPhase] = useState<'welcome' | 'chat'>('welcome')
  const [visitorMode, setVisitorMode] = useState<VisitorMode | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [leadFormOpen, setLeadFormOpen] = useState(false)
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadError, setLeadError] = useState<string | null>(null)
  const [leadForm, setLeadForm] = useState<LeadFormState>(() => createDefaultLeadForm())
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const notifSoundRef = useRef<HTMLAudioElement>(null)
  const prevMessageCountRef = useRef(0)

  const detectedLeadPurpose = useMemo(() => {
    for (const message of [...messages].reverse()) {
      if (message.role !== 'user') continue
      const detected = detectLeadPurpose(message.text)
      if (detected) return detected
    }
    return null
  }, [messages])

  const userQuestionCount = useMemo(
    () => messages.filter((m) => m.role === 'user').length,
    [messages],
  )
  const questionLimitReached = userQuestionCount >= MAX_USER_QUESTIONS

  function playNotifSound() {
    const audio = notifSoundRef.current
    if (!audio) return
    audio.currentTime = 0
    audio.play().catch(() => {})
  }

  useEffect(() => {
    const id = setTimeout(() => {
      setCollapsedVisible(true)
      playNotifSound()
    }, 1200)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    if (messages.length > prevMessageCountRef.current) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage?.role === 'assistant') playNotifSound()
    }
    prevMessageCountRef.current = messages.length
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
    setLeadForm(createDefaultLeadForm())
  }

  function handleBack() {
    resetChat()
    setPhase('welcome')
  }

  function handleQuickStart(message: string) {
    setPhase('chat')
    sendMessage(message)
  }

  function openLeadForm(purpose: AbbyLeadPurpose = detectedLeadPurpose ?? 'general_inquiry') {
    const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.text
    setLeadError(null)
    setLeadForm((prev) => ({
      ...prev,
      purpose,
      message: prev.message || lastUserMessage || '',
    }))
    setLeadForm((prev) => ({ ...prev, formStartedAt: Date.now() }))
    setLeadFormOpen(true)
    if (!messages.some((message) => message.text === LEAD_PROMPT_MESSAGE)) {
      setMessages((prev) => [...prev, { role: 'assistant', text: LEAD_PROMPT_MESSAGE }])
    }
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    if (questionLimitReached) {
      setInput('')
      return
    }

    setPhase('chat')
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

    const payload = {
      name: leadForm.name,
      email: leadForm.email,
      organization: leadForm.organization || undefined,
      purpose: leadForm.purpose,
      message: leadForm.message,
      consent: leadForm.consent,
      visitorMode: visitorMode?.label,
      conversationSummary: createConversationSummary(messages),
      website: leadForm.website,
      formStartedAt: leadForm.formStartedAt,
      idempotencyKey: createIdempotencyKey(),
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
      setLeadForm(createDefaultLeadForm())
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
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- short UI notification chime, no spoken content */}
      <audio ref={notifSoundRef} src="/assets/sounds/notif.mp3" preload="auto" />

      {!open && collapsedVisible && (
        <button
          type="button"
          className="abby-term-card abby-collapsed-enter"
          aria-label="Tanya Abby"
          onClick={() => setOpen(true)}
        >
          <div className="abby-term-titlebar">
            <span className="abby-term-dots" aria-hidden="true">
              <span className="abby-term-dot red" />
              <span className="abby-term-dot yellow" />
              <span className="abby-term-dot green" />
            </span>
            <span className="abby-term-breadcrumb">SENTRA / ABBY</span>
          </div>
          <div className="abby-term-body">
            <span className="abby-term-index">01</span>
            <Image
              src="/assets/abby/abby.png"
              alt="Abby"
              width={600}
              height={900}
              className="abby-term-photo"
              priority
            />
            <h3 className="abby-term-title">Abby</h3>
            <p className="abby-term-desc">
              Pemandu virtual dr Ferdi Iskandar — tanya apa saja soal karya dan pemikirannya.
            </p>
            <span className="abby-term-link">KLIK DI SINI</span>
          </div>
        </button>
      )}

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
          <div className="abby-term-titlebar">
            <span className="abby-term-dots" aria-hidden="true">
              <span className="abby-term-dot red" />
              <span className="abby-term-dot yellow" />
              <span className="abby-term-dot green" />
            </span>
            <span className="abby-term-breadcrumb">SENTRA / ABBY</span>
            <div className="abby-header-actions">
              {phase === 'chat' && (
                <button
                  type="button"
                  className="abby-back-btn"
                  onClick={handleBack}
                  aria-label="Kembali ke awal"
                >
                  ← Awal
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
          </div>

          {phase === 'welcome' && (
            <div className="abby-welcome">
              <div className="abby-welcome-copy">
                <h3 className="abby-welcome-title">{WELCOME_TITLE}</h3>
                <p className="abby-welcome-body">{WELCOME_BODY}</p>
                <div className="abby-starters">
                  {QUICK_STARTERS.map((starter) => (
                    <button
                      key={starter.label}
                      type="button"
                      className="abby-starter-btn"
                      onClick={() => handleQuickStart(starter.message)}
                    >
                      {starter.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="abby-welcome-photo">
                <Image
                  src="/assets/abby/abby.png"
                  alt="Abby"
                  width={600}
                  height={900}
                  className="abby-welcome-photo-img"
                  priority
                />
              </div>
            </div>
          )}

          {phase === 'chat' && (
            <>
              <div className="abby-body" aria-live="polite">
                {messages.map((msg, i) => (
                  <div key={i} className={`abby-bubble abby-bubble-${msg.role}`}>
                    <p>{renderMessageText(msg.text)}</p>
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
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={leadForm.website}
                      onChange={(e) => setLeadForm((prev) => ({ ...prev, website: e.target.value }))}
                      aria-hidden="true"
                      className="abby-lead-honeypot"
                    />

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
            </>
          )}

          {questionLimitReached && <p className="abby-limit-notice">{QUESTION_LIMIT_MESSAGE}</p>}

          <form className="abby-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="abby-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                questionLimitReached
                  ? 'Batas pertanyaan tercapai'
                  : 'Tanyakan apa saja kepada Abby…'
              }
              disabled={loading || questionLimitReached}
              aria-label="Pesan untuk Abby"
              maxLength={2000}
            />
            <button
              type="submit"
              className="abby-send"
              disabled={loading || questionLimitReached || input.trim().length === 0}
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
        </div>
      )}
    </>
  )
}
