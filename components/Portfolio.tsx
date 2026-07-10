'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState, type CSSProperties } from 'react'

import SectionNumberMark from '@/components/SectionNumberMark'
import {
  getRevealInitial,
  motionVariants,
  motionViewport,
  transitions,
} from '@/lib/motion-variants'
import { useMotionReady } from '@/lib/use-motion-ready'

/* ────────── Data ────────── */

type SystemData = {
  id: string
  name: string
  desc: string
  status: 'testing' | 'built' | 'inbuild' | 'planned'
  progress: number
}

const systems: readonly SystemData[] = [
  { id: 'SYS-01', name: 'AADI', desc: 'Autonomous Diagnostic Intelligence', status: 'testing', progress: 85 },
  { id: 'SYS-02', name: 'Audrey', desc: 'Voice-First Clinical Intelligence', status: 'testing', progress: 80 },
  { id: 'SYS-03', name: 'Intelligence Dashboard', desc: 'Unified Clinical Operations', status: 'testing', progress: 90 },
  { id: 'SYS-04', name: 'Asisten Medis', desc: 'AI Client-Agent for EMR', status: 'testing', progress: 85 },
  { id: 'SYS-05', name: 'Telemedicine', desc: 'Remote Clinical Consultation', status: 'testing', progress: 75 },
  { id: 'SYS-06', name: 'ReferraLink', desc: 'Awareness-Intelligence Protocol', status: 'testing', progress: 80 },
  { id: 'SYS-07', name: 'Med-Cognitive', desc: 'Neural Memory Architecture', status: 'built', progress: 100 },
  { id: 'SYS-08', name: 'MELLY', desc: 'Augmented Virtual Agent', status: 'inbuild', progress: 50 },
  { id: 'SYS-09', name: 'Melinda Dashboard', desc: 'Interoperability Platform', status: 'inbuild', progress: 45 },
  { id: 'SYS-10', name: 'Melinda Shield', desc: 'Cognitive Cybersecurity', status: 'inbuild', progress: 40 },
  { id: 'SYS-11', name: 'Autonomous Admission', desc: 'Admission & Journey Tracking', status: 'inbuild', progress: 60 },
  { id: 'SYS-12', name: 'Smart Triage', desc: 'Algorithmic Triage Assessment', status: 'inbuild', progress: 55 },
  { id: 'SYS-13', name: 'Proactive Care Navigator', desc: 'Post-Partum Monitoring', status: 'inbuild', progress: 35 },
  { id: 'SYS-14', name: 'Ambient Scribe', desc: 'Voice-to-EMR Engine', status: 'inbuild', progress: 45 },
  { id: 'SYS-15', name: 'Critical Alert System', desc: 'NICU & Telemetry Intelligence', status: 'inbuild', progress: 30 },
  { id: 'SYS-16', name: 'Predictive Bed Mgmt', desc: 'Turnaround Orchestration', status: 'inbuild', progress: 40 },
  { id: 'SYS-17', name: 'Hospital Auditor', desc: 'Clinical Coding & Claims', status: 'inbuild', progress: 50 },
  { id: 'SYS-18', name: 'Hospital Orchestrator', desc: 'Smart OR Logistics', status: 'inbuild', progress: 45 },
  { id: 'SYS-19', name: 'POGS', desc: 'Pregnancy Observation System', status: 'planned', progress: 15 },
  { id: 'SYS-20', name: 'CDOS', desc: 'Decision Orchestration System', status: 'planned', progress: 10 },
  { id: 'SYS-21', name: 'TRIAGE', desc: 'Predictive Triage Engine', status: 'planned', progress: 15 },
  { id: 'SYS-22', name: 'PREDICTION', desc: 'Predictive Analytics Engine', status: 'planned', progress: 5 },
]

type TabType = 'all' | 'testing' | 'built' | 'inbuild' | 'planned'

const tabs: { key: TabType; label: string; dot?: string }[] = [
  { key: 'all', label: 'Semua' },
  { key: 'testing', label: 'Sedang Diuji', dot: 'dot-testing' },
  { key: 'built', label: 'Selesai', dot: 'dot-built' },
  { key: 'inbuild', label: 'Dibangun', dot: 'dot-inbuild' },
  { key: 'planned', label: 'Direncanakan', dot: 'dot-planned' },
]

const statusLabels: Record<SystemData['status'], string> = {
  testing: 'Sedang Diuji',
  built: 'Selesai',
  inbuild: 'Sedang Dibangun',
  planned: 'Direncanakan',
}

const statusCounts = (status: TabType) =>
  status === 'all' ? systems.length : systems.filter((s) => s.status === status).length

/* ────────── Component ────────── */

export default function Portfolio() {
  const shouldReduce = useReducedMotion()
  const isMotionReady = useMotionReady()
  const mv = shouldReduce ? undefined : motionVariants
  const revealInitial = getRevealInitial(isMotionReady, shouldReduce, 'hidden')

  const [activeTab, setActiveTab] = useState<TabType>('all')

  const filtered = systems.filter(
    (s) => activeTab === 'all' || s.status === activeTab,
  )

  return (
    <section
      aria-labelledby="portfolio-title"
      className="fi-section fi-portfolio-v2"
      id="portfolio"
    >
      {/* ── Animated Motion Lines ── */}
      <div className="fp-motion-lines" aria-hidden="true">
        <span className="fp-line-h" />
        <span className="fp-line-h" />
        <span className="fp-line-h" />
        <span className="fp-line-h" />
        <span className="fp-line-v" />
        <span className="fp-line-v" />
        <span className="fp-line-v" />
        <span className="fp-line-v" />
      </div>

      {/* ── Header ── */}
      <motion.div
        className="fp-header"
        initial={revealInitial}
        whileInView="visible"
        viewport={motionViewport}
        variants={mv?.fadeUp}
        transition={shouldReduce ? { duration: 0 } : transitions.medium}
      >
        <div className="fp-header-top">
          <SectionNumberMark number="03" />
          <span className="fp-badge">Registri Sistem</span>
        </div>

        <h2 id="portfolio-title" className="fp-title">
          Dari Laboratorium Teknologi<br />
          Sederhana untuk Indonesia
        </h2>

        <p className="fp-lead">
          Sejak Februari 2025, dr Ferdi Iskandar membangun dan menguji sistem kecerdasan klinis
          dari kebutuhan nyata di lapangan — bukan dari teori di atas kertas.
        </p>
      </motion.div>

      {/* ── Stats row ── */}
      <motion.div
        className="fp-stats"
        initial={revealInitial}
        whileInView="visible"
        viewport={motionViewport}
        variants={mv?.fadeUp}
        transition={shouldReduce ? { duration: 0 } : transitions.medium}
      >
        {tabs.filter((t) => t.key !== 'all').map((t) => (
          <button
            key={t.key}
            className={`fp-stat-card ${activeTab === t.key ? 'is-active' : ''}`}
            onClick={() => setActiveTab((prev) => (prev === t.key ? 'all' : t.key))}
            type="button"
          >
            <strong>{statusCounts(t.key)}</strong>
            <span className={`fp-stat-dot ${t.dot}`} />
            <span className="fp-stat-label">{t.label}</span>
          </button>
        ))}
        <div className="fp-stat-total">
          <strong>{systems.length}</strong>
          <span>Total Sistem</span>
        </div>
      </motion.div>

      {/* ── Filter tabs ── */}
      <div className="fp-filters" role="tablist" aria-label="Filter status sistem">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={activeTab === t.key}
            className={`fp-filter ${activeTab === t.key ? 'is-active' : ''}`}
            onClick={() => setActiveTab(t.key)}
            type="button"
          >
            {t.dot && <span className={`fp-dot ${t.dot}`} />}
            {t.label}
            <span className="fp-count">{statusCounts(t.key)}</span>
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <motion.div layout className="fp-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((sys) => (
            <motion.article
              layout
              key={sys.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`fp-card fp-card--${sys.status}`}
            >
              <div className="fp-card-head">
                <code className="fp-card-id">{sys.id}</code>
                <span className={`fp-card-dot ${sys.status}`} />
              </div>
              <h4 className="fp-card-name">{sys.name}</h4>
              <p className="fp-card-desc">{sys.desc}</p>
              <div className="fp-card-foot">
                <div className="fp-card-meta">
                  <span>{statusLabels[sys.status]}</span>
                  <span>{sys.progress}%</span>
                </div>
                <div className="fp-bar">
                  <div
                    className={`fp-bar-fill fp-bar--${sys.status}`}
                    style={{ width: `${sys.progress}%` } as CSSProperties}
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Boundary ── */}
      <div className="fp-boundary">
        <p>
          <strong>Batas klinis:</strong> Sistem Sentra dirancang sebagai pendukung keputusan
          dan infrastruktur koordinasi — bukan pengganti penilaian klinis profesional.
        </p>
      </div>
    </section>
  )
}
