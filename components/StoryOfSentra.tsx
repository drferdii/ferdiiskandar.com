'use client'

// Architected and built by dr Classy

import Link from 'next/link'
import SectionNumberMark from '@/components/SectionNumberMark'

const storyTimeline = [
  { date: 'Februari 2025', label: 'Insiden klinis dan titik mula tesis keselamatan sistemik' },
  { date: 'Maret 2025', label: 'Pemetaan kebutuhan layanan primer dan dokumentasi lapangan' },
  { date: 'Juni 2025', label: 'Perumusan struktur kerja awal dan eksperimen kolaborasi AI' },
  { date: 'November 2025', label: 'Arah ekosistem mulai mengkristal melampaui program awal' },
  { date: 'Januari 2026', label: 'Integrasi arsitektur Sentra mencapai titik ekuilibrium' },
  { date: 'Juli 2026', label: 'Komitmen ekosistem Human-AI diposisikan sebagai arah publik' },
] as const

// Rendered as a static sibling outside the panned scroll-story wrapper (see
// PortfolioStory.tsx) so the title never gets carried off-screen by the
// scene's internal pan transform.
export function StoryHeader() {
  return (
    <header className="fi-story-head">
      <SectionNumberMark number="04" />
      <div className="fi-story-headline">
        <div className="fi-story-headline-copy">
          <div className="fi-kicker">Kisah Sentra</div>
          <h2 className="fi-story-title" id="story-sentra-title">
            Perjalanan Sentra Artificial Intelligence
          </h2>
          <p className="fi-story-subtitle">
            Dari Inisiatif CSR menuju Ekosistem Human-AI untuk Kesehatan, Edukasi, dan Desain
          </p>
          <Link className="fi-story-readmore-link fi-story-readmore-link--hero" href="/kisah-sentra">
            Baca Selengkapnya
          </Link>
        </div>
        <figure aria-label="Kolaborator Sentra" className="fi-story-portrait">
          <video
            aria-label="Video promosi Sentra Artificial Intelligence"
            autoPlay
            className="fi-story-portrait-image"
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="/assets/video/promovideo.mp4" type="video/mp4" />
          </video>
        </figure>
      </div>
    </header>
  )
}

export default function StoryOfSentra() {
  return (
    <article className="fi-story fi-story--timeline" aria-label="Linimasa perkembangan Sentra">
      <div className="fi-story-timeline-shell">
        <div className="fi-story-timeline-head">
          <span className="fi-story-reader-marker">Timeline Motion</span>
          <p className="fi-story-timeline-range">Februari 2025 → Juli 2026</p>
        </div>
        <div className="fi-story-timeline-track" role="list">
          {storyTimeline.map((item) => (
            <article className="fi-story-timeline-item" key={item.date} role="listitem">
              <span className="fi-story-timeline-date">{item.date}</span>
              <div className="fi-story-timeline-node" aria-hidden="true" />
              <p className="fi-story-timeline-copy">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </article>
  )
}
