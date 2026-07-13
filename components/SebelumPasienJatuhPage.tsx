import Link from 'next/link'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { RichText } from '@/components/RichText'
import {
  sebelumPasienJatuhHero,
  sebelumPasienJatuhSections,
  type EssayBlock,
} from '@/lib/sebelum-pasien-jatuh-content'

function speakerLabel(speaker: 'ferdi' | 'voss') {
  return speaker === 'ferdi' ? 'dr. Ferdi' : 'Voss'
}

const sessionGroups = [
  {
    label: 'Sesi 01 (1/2)',
    date: '05 Juli 2026',
    title: 'Dari Velocity Menuju Compensatory Reserve',
    sections: sebelumPasienJatuhSections.slice(0, 5),
    startIndex: 0,
    defaultOpen: false,
  },
  {
    label: 'Sesi 01 (2/2)',
    date: '05 Juli 2026',
    title: 'Dataset, C-STDI, dan FTDR',
    sections: sebelumPasienJatuhSections.slice(5, 10),
    startIndex: 5,
    defaultOpen: false,
  },
  {
    label: 'Sesi 02 (1/2)',
    date: '10 Juli 2026 · Lanjutan',
    title: 'Cross-System Coupling Detection',
    sections: sebelumPasienJatuhSections.slice(10, 13),
    startIndex: 10,
    defaultOpen: false,
  },
  {
    label: 'Sesi 02 (2/2)',
    date: '10 Juli 2026 · Lanjutan',
    title: 'Arsitektur Final & Penutup',
    sections: sebelumPasienJatuhSections.slice(13),
    startIndex: 13,
    defaultOpen: false,
  },
] as const

function EssayBlockRenderer({ block }: { block: EssayBlock }) {
  if (block.type === 'paragraph') {
    return (
      <p className="fi-story-reader-paragraph">
        <RichText text={block.text} />
      </p>
    )
  }

  if (block.type === 'formula') {
    return (
      <div className={`fi-pasien-jatuh-formula fi-pasien-jatuh-formula--${block.speaker}`}>
        <span className="fi-pasien-jatuh-formula-channel">{speakerLabel(block.speaker)}</span>
        {block.lines.map((line) => (
          <div className="fi-pasien-jatuh-formula-line" key={line}>
            {line}
          </div>
        ))}
      </div>
    )
  }

  if (block.type === 'list') {
    return (
      <ul className="fi-pasien-jatuh-list">
        {block.items.map((item) => (
          <li key={item}>
            <RichText text={item} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className={`fi-pasien-jatuh-quote fi-pasien-jatuh-quote--${block.speaker}`}>
      <p className="fi-pasien-jatuh-quote-text">
        <span className="fi-pasien-jatuh-quote-channel">
          {speakerLabel(block.speaker).toUpperCase()}:{' '}
        </span>
        <RichText text={block.text} />
      </p>
      <p className="fi-pasien-jatuh-quote-note">{block.note}</p>
    </div>
  )
}

export default function SebelumPasienJatuhPage() {
  return (
    <div className="fi-pasien-jatuh-page" id="sebelum-pasien-jatuh-page">
      <Navbar />
      <main className="fi-pasien-jatuh-shell" id="main-content">
        <header className="fi-pasien-jatuh-hero">
          <Link className="fi-kisah-sentra-back" href="/">
            ← Kembali ke Beranda
          </Link>
          <div className="fi-kicker">{sebelumPasienJatuhHero.sectionLabel}</div>
          <h1 className="fi-story-title">{sebelumPasienJatuhHero.title}</h1>
          <p className="fi-story-subtitle">{sebelumPasienJatuhHero.subtitle}</p>
          <dl className="fi-pasien-jatuh-meta">
            <div className="fi-pasien-jatuh-meta-row">
              <dt>Direkam</dt>
              <dd>{sebelumPasienJatuhHero.recordedAt}</dd>
            </div>
            <div className="fi-pasien-jatuh-meta-row">
              <dt>Peserta</dt>
              <dd>
                {sebelumPasienJatuhHero.participants.map((participant) => (
                  <span key={participant}>{participant}</span>
                ))}
              </dd>
            </div>
            <div className="fi-pasien-jatuh-meta-row">
              <dt>Status</dt>
              <dd>{sebelumPasienJatuhHero.status}</dd>
            </div>
          </dl>
          <div className="fi-pasien-jatuh-hero-copy">
            {sebelumPasienJatuhHero.intro.map((paragraph) => (
              <p className="fi-story-reader-paragraph" key={paragraph}>
                <RichText text={paragraph} />
              </p>
            ))}
            <p className="fi-pasien-jatuh-thesis" data-tag="Pertanyaan Inti">
              <RichText text={sebelumPasienJatuhHero.thesis} />
            </p>
          </div>
        </header>

        <div className="fi-pasien-jatuh-segment-groups">
          {sessionGroups.map((group) => (
            <details
              className="fi-pasien-jatuh-segment-group"
              key={group.label}
              open={group.defaultOpen}
            >
              <summary className="fi-pasien-jatuh-segment-summary">
                <span className="fi-pasien-jatuh-segment-summary-label">
                  {group.label} — {group.date}
                </span>
                <span className="fi-pasien-jatuh-segment-summary-title">{group.title}</span>
              </summary>
              <div className="fi-pasien-jatuh-sections">
                {group.sections.map((section, sectionIndex) => (
                  <section
                    aria-labelledby={`section-${section.heading}`}
                    className="fi-pasien-jatuh-section"
                    key={section.heading}
                  >
                    <span className="fi-pasien-jatuh-part">
                      Bagian {String(group.startIndex + sectionIndex + 1).padStart(2, '0')}
                    </span>
                    <h2 className="fi-pasien-jatuh-section-title" id={`section-${section.heading}`}>
                      {section.heading}
                    </h2>
                    <div className="fi-pasien-jatuh-section-body">
                      {section.blocks.map((block, index) => (
                        <EssayBlockRenderer
                          block={block}
                          key={`${section.heading}-${block.type}-${index}`}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              <p className="fi-pasien-jatuh-segment-end">— Akhir {group.label} —</p>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
