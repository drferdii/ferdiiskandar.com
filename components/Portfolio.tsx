'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Fragment } from 'react'

import CountUp from '@/components/CountUp'
import SectionNumberMark from '@/components/SectionNumberMark'
import {
  getRevealInitial,
  motionVariants,
  staggerContainer,
  motionViewport,
  transitions,
} from '@/lib/motion-variants'
import { useMotionReady } from '@/lib/use-motion-ready'

type RegistryItem = {
  name: string
  description: string
}

type RegistrySection = {
  className?: string
  dotTone: 'testing' | 'built' | 'inbuild' | 'planned'
  title: string
  items: readonly RegistryItem[]
}

type RegistryColumn = {
  sections: readonly RegistrySection[]
}

type FeaturedSystem = {
  articleClassName: string
  description: string
  descriptionClassName?: string
  imageAlt: string
  imageClassName: string
  imageSrc: string
  illustrationClassName: string
  label: string
  subtitle: string
  title: string
}

const featuredSystems: readonly FeaturedSystem[] = [
  {
    articleClassName: 'fi-feature-card fi-feature-aadi',
    description:
      'AADI mengumpulkan, memverifikasi, dan mendokumentasikan informasi pasien secara otonom lintas sistem, sehingga gesekan saat admisi menurun dan akurasi meningkat sejak awal proses.',
    descriptionClassName: 'fi-feature-body-italic',
    imageAlt: 'Tampilan sistem AADI',
    imageClassName: 'fi-feature-product-image fi-feature-product-image-aadi',
    imageSrc: '/aadi.png',
    illustrationClassName: 'fi-feature-illustration',
    label: 'Sistem Unggulan 01',
    subtitle: 'Kecerdasan Admisi dan Dokumentasi Otonom',
    title: 'AADI',
  },
  {
    articleClassName: 'fi-feature-card fi-feature-assist',
    description:
      'Sentra Assist adalah Chrome Side Panel berbasis AI yang membaca dokumen klinis, melakukan ekstraksi OCR, dan menerapkan algoritma field-matching probabilistik untuk membantu penyelesaian formulir EMR secara end-to-end dengan tinjauan klinisi.',
    imageAlt: 'Tampilan sistem Sentra Assist',
    imageClassName: 'fi-feature-product-image fi-feature-product-image-assist',
    imageSrc: '/assist.webp',
    illustrationClassName: 'fi-feature-illustration fi-assist-visual fi-sentra-assist-sketch',
    label: 'Sistem Unggulan 02',
    subtitle: 'Panel samping Chrome berbasis AI untuk kelengkapan EMR',
    title: 'Sentra Assist',
  },
]

const registryColumns: readonly RegistryColumn[] = [
  {
    sections: [
      {
        dotTone: 'testing',
        title: 'Sedang Diuji · 6',
        items: [
          { name: 'AADI', description: 'Autonomous Artificial Diagnostic Intelligence' },
          { name: 'Audrey', description: 'Voice-First Clinical Intelligence' },
          { name: 'Intelligence Dashboard', description: 'Unified Clinical Operations Platform' },
          { name: 'Sentra Assist', description: 'AI Chrome Side Panel for EMR Automation' },
          { name: 'Telemedicine', description: 'Remote Clinical Consultation' },
          { name: 'ReferraLink', description: 'Awareness-Intelligence Protocol' },
        ],
      },
    ],
  },
  {
    sections: [
      {
        dotTone: 'built',
        title: 'Sudah Dibangun · 1',
        items: [
          { name: 'Med-Cognitive', description: 'Neural Memory Architecture for Clinical AI' },
        ],
      },
      {
        className: 'mt',
        dotTone: 'inbuild',
        title: 'Sedang Dibangun · 11',
        items: [
          { name: 'MELLY', description: 'Hyper-Personalized Augmented Virtual Agent' },
          { name: 'Melinda Dashboard', description: 'Zero-Friction Interoperability Platform' },
          { name: 'Melinda Shield', description: 'Cognitive Cybersecurity Infrastructure' },
          { name: 'Autonomous Admission', description: 'Admission & Journey Tracking' },
          { name: 'Smart Triage', description: 'Pediatric & Maternal Algorithmic Assessment' },
        ],
      },
    ],
  },
  {
    sections: [
      {
        dotTone: 'inbuild',
        title: 'Pembangunan Berlanjut',
        items: [
          { name: 'Proactive Care Navigator', description: 'Post-Partum & Preventive Monitoring' },
          { name: 'Ambient Scribe', description: 'Clinical Voice-to-EMR Engine' },
          { name: 'Critical Alert System', description: 'Proactive NICU & Telemetry Intelligence' },
          { name: 'Predictive Bed Management', description: 'Autonomous Turnaround Orchestration' },
          { name: 'Hospital management Auditor', description: 'Clinical Coding & Claim Defense' },
          { name: 'Hospital Orchestrator', description: 'Smart Operating Room Logistics' },
        ],
      },
    ],
  },
  {
    sections: [
      {
        dotTone: 'planned',
        title: 'Akan Dibangun · 4',
        items: [
          { name: 'POGS', description: 'Pregnancy Observation Global System' },
          { name: 'CDOS', description: 'Clinical Decision Orchestration System' },
          { name: 'TRIAGE', description: 'Severity Scoring & Predictive Triage Engine' },
          { name: 'PREDICTION', description: 'Predictive Analytics Engine' },
        ],
      },
    ],
  },
]

export default function Portfolio() {
  const shouldReduce = useReducedMotion()
  const isMotionReady = useMotionReady()
  const mv = shouldReduce ? undefined : motionVariants
  const revealInitial = getRevealInitial(isMotionReady, shouldReduce, 'hidden')

  const renderRegistryColumn = (column: RegistryColumn, columnIndex: number) => (
    <motion.article
      className="fi-registry-column"
      key={columnIndex}
      variants={mv?.fadeUp}
      transition={shouldReduce ? { duration: 0 } : transitions.medium}
    >
      {column.sections.map((section) => (
        <Fragment key={section.title}>
          <h4 className={section.className}>
            <span className={`dot ${section.dotTone}`}></span>
            {section.title}
          </h4>
          <ul>
            {section.items.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </motion.article>
  )

  return (
    <section
      aria-labelledby="systems-dossier-title"
      className="fi-section fi-systems-dossier"
      id="portfolio"
    >
      {/* ── LEFT: Dossier Index ── */}
      <motion.aside
        aria-label="Indeks dossier inisiatif dan sistem"
        className="fi-dossier-index"
        initial={revealInitial}
        whileInView="visible"
        viewport={motionViewport}
        variants={mv?.slideIn}
        transition={shouldReduce ? { duration: 0 } : transitions.medium}
      >
        <div className="fi-dossier-index-title">Indeks Inisiatif</div>
        <nav aria-label="Bagian inisiatif dan sistem" className="fi-dossier-nav">
          <Link href="#portfolio">
            <span>01</span>
            <strong>Laboratorium</strong>
            <em>Riset teknologi sejak Februari 2025</em>
          </Link>
          <Link href="#featured-systems">
            <span>02</span>
            <strong>Sistem Unggulan</strong>
            <em>AADI dan Sentra Assist</em>
          </Link>
          <Link href="#registry-foundations">
            <span>03</span>
            <strong>Fondasi Kerja</strong>
            <em>Kepercayaan, data, dan tanggung jawab klinis</em>
          </Link>
          <Link href="#registry-all-systems">
            <span>04</span>
            <strong>Registri Sistem</strong>
            <em>Semua sistem sekilas</em>
          </Link>
          <Link href="#registry-roadmap">
            <span>05</span>
            <strong>Arah Lanjut</strong>
            <em>Ruang pembangunan berikutnya</em>
          </Link>
        </nav>
      </motion.aside>

      {/* ── CENTER: Dossier Main ── */}
      <div className="fi-dossier-main">
        {/* Header */}
        <motion.header
          className="fi-dossier-hero fi-dossier-hero-numbered"
          initial={revealInitial}
          whileInView="visible"
          viewport={motionViewport}
          variants={mv?.fadeUp}
          transition={shouldReduce ? { duration: 0 } : transitions.medium}
        >
          <SectionNumberMark number="03" />
          <div className="fi-dossier-titleblock">
            <span className="fi-dossier-section">Inisiatif &amp; Sistem</span>
            <h2 id="systems-dossier-title">
              Dari Laboratorium Teknologi Sederhana untuk Indonesia
            </h2>
            <p>
              Sejak Februari 2025, dr Ferdi Iskandar memulai riset dan pembangunan teknologi dari
              kebutuhan nyata di lapangan. Prosesnya tidak berhenti pada eksperimen awal; setiap
              temuan diuji kembali, dikembangkan, dan dirapikan menjadi sistem yang lebih berguna
              bagi layanan kesehatan Indonesia.
            </p>
            <div className="fi-dossier-rule">
              <span>Balowerti II 69, Kediri Jawa Timur</span>
            </div>
          </div>
          <blockquote className="fi-dossier-quote">
            <span aria-hidden="true">&ldquo;</span>
            <p>Saya percaya teknologi terbaik adalah yang bekerja dalam diam.</p>
            <cite>Praktik sistem founder</cite>
          </blockquote>
        </motion.header>

        {/* Featured Systems */}
        <motion.section
          aria-label="Sistem unggulan"
          className="fi-feature-panel"
          id="featured-systems"
          initial={revealInitial}
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.18, 0.1)}
          transition={shouldReduce ? { staggerChildren: 0, delayChildren: 0 } : undefined}
        >
          {featuredSystems.map((system) => (
            <motion.article
              className={system.articleClassName}
              key={system.title}
              variants={mv?.scaleReveal}
              transition={shouldReduce ? { duration: 0 } : transitions.medium}
              whileHover={shouldReduce ? undefined : { y: -8, transition: { duration: 0.3 } }}
            >
              <div className="fi-feature-copy">
                <span>{system.label}</span>
                <h3>{system.title}</h3>
                <p className="fi-feature-subtitle">{system.subtitle}</p>
                <p className={system.descriptionClassName}>{system.description}</p>
                <div className="fi-feature-status">
                  <small>Status</small>
                  <b className="is-testing">Sedang Diuji</b>
                </div>
                <Link
                  aria-label={`Telusuri ${system.title} di registri`}
                  href="#registry-all-systems"
                >
                  Jelajahi system →
                </Link>
              </div>
              <div className={system.illustrationClassName}>
                <Image
                  alt={system.imageAlt}
                  className={system.imageClassName}
                  height={520}
                  src={system.imageSrc}
                  width={720}
                />
              </div>
            </motion.article>
          ))}
        </motion.section>

        {/* Registry Proof */}
        <motion.section
          aria-label="Prinsip dan metrik registri"
          className="fi-registry-proof"
          id="registry-foundations"
          initial={revealInitial}
          whileInView="visible"
          viewport={motionViewport}
          variants={mv?.fadeUp}
          transition={shouldReduce ? { duration: 0 } : transitions.medium}
        >
          <div aria-hidden="true" className="fi-hands-card">
            <svg
              viewBox="0 0 180 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', opacity: 0.45 }}
            >
              <path
                d="M 40 80 Q 60 40 90 60 Q 120 80 140 40"
                stroke="#aa8548"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <circle
                cx="90"
                cy="60"
                r="18"
                stroke="#6b5a3e"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
              <circle cx="90" cy="60" r="4" fill="#aa8548" opacity="0.6" />
            </svg>
          </div>
          <blockquote>
            <span aria-hidden="true">&ldquo;</span>
            <p>
              Sistem kami dirancang bersama klinisi dan pasien. Kepercayaan mereka harus dibangun,
              bukan diasumsikan.
            </p>
            <cite>Sentra Healthcare AI</cite>
          </blockquote>
          <div aria-label="Registry summary" className="fi-proof-metrics">
            <div>
              <strong>
                <CountUp to={22} duration={1.6} />
              </strong>
              <span>Sistem</span>
              <small>Lintas layanan kesehatan, pendidikan, kerja, dan permukaan digital</small>
            </div>
            <div>
              <strong>
                <CountUp to={4} duration={1.2} />
              </strong>
              <span>Domain Kapabilitas</span>
              <small>Perawatan, pembelajaran, koordinasi, dan pengalaman publik</small>
            </div>
            <div>
              <strong>
                <CountUp to={1} duration={0.8} />
              </strong>
              <span>Commitment</span>
              <small>Kecerdasan bertanggung jawab dalam kondisi operasional nyata.</small>
            </div>
          </div>
        </motion.section>

        {/* Registry Board */}
        <section
          aria-label="Registri semua sistem"
          className="fi-registry-board"
          id="registry-all-systems"
        >
          <div className="fi-registry-board-head">
            <h3>Registri: Semua Sistem</h3>
            <span>Lihat sebagai daftar ☷</span>
          </div>
          <motion.div
            className="fi-registry-columns"
            initial={revealInitial}
            whileInView="visible"
            viewport={motionViewport}
            variants={staggerContainer(0.1, 0.05)}
            transition={shouldReduce ? { staggerChildren: 0, delayChildren: 0 } : undefined}
          >
            {registryColumns.map(renderRegistryColumn)}
          </motion.div>
          <p className="fi-registry-boundary">
            <strong>Batas klinis:</strong> Sistem Sentra dirancang sebagai pendukung keputusan,
            kecerdasan alur kerja, dan infrastruktur koordinasi perawatan. Sistem ini tidak
            menggantikan penilaian medis profesional.
          </p>
        </section>
      </div>

      {/* ── RIGHT: Glance Sidebar ── */}
      <motion.aside
        aria-label="Ringkasan semua sistem"
        className="fi-dossier-glance"
        initial={revealInitial}
        whileInView="visible"
        viewport={motionViewport}
        variants={mv?.slideInRight}
        transition={shouldReduce ? { duration: 0 } : { ...transitions.medium, delay: 0.2 }}
      >
        <div className="fi-glance-head">
          <strong>Semua Sistem Sekilas</strong>
          <span>22 Sistem</span>
        </div>
        <section data-fi-scroll="fade">
          <h3>
            <span className="dot testing"></span>Sedang Diuji · 6
          </h3>
          <ul>
            <li>AADI</li>
            <li>Audrey</li>
            <li>Intelligence Dashboard</li>
            <li>Sentra Assist</li>
            <li>Telemedicine</li>
            <li>ReferraLink</li>
          </ul>
        </section>
        <section data-fi-scroll="fade" style={{ '--fi-scroll-delay': '100ms' } as CSSProperties}>
          <h3>
            <span className="dot built"></span>Sudah Dibangun · 1
          </h3>
          <ul>
            <li>Med-Cognitive</li>
          </ul>
        </section>
        <section data-fi-scroll="fade" style={{ '--fi-scroll-delay': '200ms' } as CSSProperties}>
          <h3>
            <span className="dot inbuild"></span>Sedang Dibangun · 11
          </h3>
          <ul>
            <li>MELLY</li>
            <li>Melinda Dashboard</li>
            <li>Melinda Shield</li>
            <li>Autonomous Admission</li>
            <li>Smart Triage</li>
            <li>Proactive Care Navigator</li>
            <li>Ambient Scribe</li>
            <li>Critical Alert System</li>
            <li>Predictive Bed Management</li>
            <li>Hospital management Auditor</li>
            <li>Hospital Orchestrator</li>
          </ul>
        </section>
        <section
          data-fi-scroll="fade"
          id="registry-roadmap"
          style={{ '--fi-scroll-delay': '300ms' } as CSSProperties}
        >
          <h3>
            <span className="dot planned"></span>Akan Dibangun · 4
          </h3>
          <ul>
            <li>POGS</li>
            <li>CDOS</li>
            <li>TRIAGE</li>
            <li>PREDICTION</li>
          </ul>
        </section>
      </motion.aside>
    </section>
  )
}
