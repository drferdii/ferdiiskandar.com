'use client'

// Architected and built by dr Classy
// Visual port of the Manifesto section from apps/healthcare/sentraverse
// (components/About.tsx) — same mark, frame, portrait, and copy, re-implemented
// with this repo's custom CSS instead of Tailwind (ferdiiskandar-main has no
// Tailwind pipeline).

import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Caveat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { FaBullseye, FaClock, FaGlobe, FaPuzzlePiece } from 'react-icons/fa'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const caveat = Caveat({ subsets: ['latin'], weight: ['600'], variable: '--font-caveat' })

const INK = '#002147'
const ACCENT = '#eb5939'

const PILLARS = [
  {
    id: '01',
    title: 'Keyakinan Inti',
    body: 'Temukan akar lebih awal.\nPangkas kebisingan.\nBerikan pasien waktu sebelum keadaan berubah menjadi terlambat.',
    Icon: FaBullseye,
  },
  {
    id: '02',
    title: 'Posisi',
    body: 'Saya tidak membangun teknologi untuk menggantikan dokter.\nSaya membangun kecerdasan klinis untuk mempercepat keputusan yang benar.',
    Icon: FaGlobe,
  },
  {
    id: '03',
    title: 'Memandang Pasien',
    body: 'Pasien bukan data.\nPasien adalah manusia dengan pola, risiko, dan cerita klinis yang harus dibaca dengan jernih.',
    Icon: FaPuzzlePiece,
  },
  {
    id: '04',
    title: 'Janji',
    body: 'Bukan kompleksitas — kejelasan.\nBukan kebisingan — prioritas.\nBukan ego — keselamatan pasien.',
    Icon: FaClock,
  },
]

const VALUES = ['Kecerdasan Klinis', 'Waktu Lebih Dulu', 'Kesederhanaan sebagai Disiplin']

const TICK_ANGLES = Array.from({ length: 16 }, (_, i) => i * 22.5)

// Mark: tongkat Asclepius di dalam lingkaran jam, jarum accent — sama seperti
// mark asli di sentraverse.
function AsclepiusClock() {
  return (
    <svg viewBox="0 0 100 100" className="fi-manifesto-mark" aria-hidden>
      {TICK_ANGLES.map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="5"
          x2="50"
          y2={deg % 90 === 0 ? '12' : '10'}
          stroke={deg === 0 ? ACCENT : INK}
          strokeWidth={deg === 0 ? 3 : 2}
          strokeLinecap="round"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <polygon points="51,48.5 84,19 77,30" fill={ACCENT} />
      <circle cx="50" cy="18" r="4.2" fill={INK} />
      <line x1="50" y1="21" x2="50" y2="88" stroke={INK} strokeWidth="3.6" strokeLinecap="round" />
      <path
        d="M62 28 C 67 30, 65 35, 59 34 C 42 32, 39 40, 50 44 C 62 48, 62 56, 50 60 C 38 64, 38 72, 50 76 C 58 79, 57 85, 49 86"
        fill="none"
        stroke={INK}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="62.5" cy="27.5" r="3" fill={INK} />
      <circle cx="50" cy="49" r="2.4" fill={ACCENT} />
    </svg>
  )
}

// Deterministic PRNG (mulberry32) — same seeded sketch-line layout on server
// and client.
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type SketchLine = {
  orientation: 'h' | 'v'
  offset: number
  start: number
  length: number
  delay: number
  duration: number
}

function makeSketchLines(seed: number, count: number): SketchLine[] {
  const random = mulberry32(seed)
  const rand = (min: number, max: number) => min + random() * (max - min)
  return Array.from(
    { length: count },
    (_, i): SketchLine => ({
      orientation: i % 2 === 0 ? 'h' : 'v',
      offset: rand(8, 92),
      start: rand(0, 45),
      length: rand(20, 55),
      delay: rand(0, 0.6),
      duration: rand(0.5, 0.9),
    }),
  )
}

function SketchLines() {
  const lines = useMemo(() => makeSketchLines(19940217, 10), [])

  return (
    <div className="fi-manifesto-sketch-lines" aria-hidden>
      {lines.map((line, index) => (
        <motion.span
          key={index}
          className="fi-manifesto-sketch-line"
          style={
            line.orientation === 'h'
              ? {
                  top: `${line.offset}%`,
                  left: `${line.start}%`,
                  width: `${line.length}%`,
                  height: 1,
                  transformOrigin: 'left center',
                }
              : {
                  left: `${line.offset}%`,
                  top: `${line.start}%`,
                  height: `${line.length}%`,
                  width: 1,
                  transformOrigin: 'center top',
                }
          }
          initial={{
            scaleX: line.orientation === 'h' ? 0 : 1,
            scaleY: line.orientation === 'v' ? 0 : 1,
            opacity: 0,
          }}
          whileInView={{ scaleX: 1, scaleY: 1, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: line.delay, duration: line.duration, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  )
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const tesisRef = useRef<HTMLParagraphElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 92%', toggleActions: 'play none none none' },
      })

      tl.fromTo(
        content,
        { x: -96, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0,
      )
      ;[tesisRef.current, pillarsRef.current, quoteRef.current].forEach((el, i) => {
        if (!el) return
        tl.fromTo(
          el,
          { x: -48, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          0.12 + i * 0.12,
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="manifesto" className="fi-manifesto-section">
      <SketchLines />

      <div ref={contentRef} className="fi-manifesto-content">
        <div className="fi-manifesto-portrait" aria-label="Kolaborator Sentra">
          <div className="fi-manifesto-portrait-card">
            <motion.span
              className="fi-manifesto-portrait-border fi-manifesto-portrait-border-top"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
            />
            <motion.span
              className="fi-manifesto-portrait-border fi-manifesto-portrait-border-right"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.4, ease: 'easeOut' }}
            />
            <motion.span
              className="fi-manifesto-portrait-border fi-manifesto-portrait-border-bottom"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3, duration: 0.4, ease: 'easeOut' }}
            />
            <motion.span
              className="fi-manifesto-portrait-border fi-manifesto-portrait-border-left"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.7, duration: 0.4, ease: 'easeOut' }}
            />

            <motion.div
              className="fi-manifesto-portrait-titlebar"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              <span className="fi-manifesto-dot fi-manifesto-dot-red" />
              <span className="fi-manifesto-dot fi-manifesto-dot-yellow" />
              <span className="fi-manifesto-dot fi-manifesto-dot-green" />
              <span className="fi-manifesto-portrait-titlebar-rule" />
              <span className="fi-manifesto-portrait-titlebar-label">
                sentra / dr-ferdi-iskandar
              </span>
            </motion.div>

            <motion.div
              className="fi-manifesto-portrait-image-wrap"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/drferdi.png"
                alt="dr Ferdi Iskandar"
                width={800}
                height={800}
                className="fi-manifesto-portrait-image"
              />
            </motion.div>
          </div>
        </div>

        <div className="fi-manifesto-masthead">
          <AsclepiusClock />
          <div className="fi-manifesto-mark-rule" aria-hidden />
          <h2 className="fi-manifesto-heading">Manifesto</h2>
          <div className="fi-manifesto-heading-rule" aria-hidden>
            <span />
            <span className="fi-manifesto-heading-dot" />
            <span />
          </div>
          <div className="fi-manifesto-signature">
            <Link href="/" className={`${caveat.variable} fi-manifesto-signature-link`}>
              dr Ferdi Iskandar
            </Link>
            <p className="fi-manifesto-signature-caption">Sentra Artificial Intelligence</p>
          </div>
        </div>

        <p ref={tesisRef} className="fi-manifesto-tesis">
          Kedokteran bukan sekadar tindakan. Ia adalah perlombaan melawan waktu. Kecerdasan klinis
          harus membantu menemukan akar masalah lebih awal, memangkas kebisingan, dan memberi pasien
          hal yang paling menentukan hasil: waktu yang tepat untuk diselamatkan.
        </p>

        <div ref={pillarsRef} className="fi-manifesto-grid">
          {PILLARS.map((pillar) => (
            <div key={pillar.id} className="fi-manifesto-cell">
              <div className="fi-manifesto-cell-head">
                <span className="fi-manifesto-cell-num">{pillar.id}</span>
                <pillar.Icon className="fi-manifesto-cell-icon" aria-hidden />
              </div>
              <h3>{pillar.title}</h3>
              <div className="fi-manifesto-cell-rule" aria-hidden />
              <p>{pillar.body}</p>
            </div>
          ))}
        </div>

        <div ref={quoteRef} className="fi-manifesto-closing">
          <blockquote className="fi-manifesto-quote">
            <span className="fi-manifesto-quote-mark">&ldquo;</span>
            Yang saya bangun bukan sekadar sistem.
            <br />
            Yang saya perjuangkan adalah kesempatan kedua sebelum waktu habis.
            <span className="fi-manifesto-quote-mark">&rdquo;</span>
          </blockquote>
          <div className="fi-manifesto-heading-rule" aria-hidden>
            <span />
            <span className="fi-manifesto-heading-dot" />
            <span />
          </div>
          <ul className="fi-manifesto-values">
            {VALUES.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
