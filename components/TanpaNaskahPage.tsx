import Image from 'next/image'
import Link from 'next/link'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { RichText } from '@/components/RichText'
import ScrollReveal from '@/components/ScrollReveal'
import {
  tanpaNaskahEntries,
  tanpaNaskahIntro,
  type TanpaNaskahQuote,
  type TanpaNaskahSection,
} from '@/lib/tanpa-naskah-content'

type ThemeGroup = {
  key: string
  label: string
  title: string
  description: string
  entryIndices: number[]
}

const themeGroups: ThemeGroup[] = [
  {
    key: 'pribadi',
    label: 'Tema 01',
    title: 'Prinsip Pribadi dan Cara Menempatkan Diri',
    description:
      'Bagian ini memperlihatkan bagaimana dr. Ferdi melihat citra diri, kenyamanan hidup, bantuan, dan rumah sebagai tempat pulang.',
    entryIndices: [0, 1, 3, 13, 20],
  },
  {
    key: 'warisan',
    label: 'Tema 02',
    title: 'Keluarga, Amanah, dan Warisan',
    description:
      'Kutipan-kutipan ini penting untuk memahami bahwa keluarga, amanah, dan masa depan generasi berikutnya adalah pusat dari banyak keputusan besar.',
    entryIndices: [2, 4, 18, 21, 22],
  },
  {
    key: 'sentra',
    label: 'Tema 03',
    title: 'Sentra, AI, dan Tanggung Jawab Publik',
    description:
      'Di sini publik bisa melihat bahwa Sentra tidak diposisikan hanya sebagai teknologi, melainkan sebagai instrumen pelayanan, kejujuran sistem, dan dampak nyata.',
    entryIndices: [5, 6, 7, 8, 9, 10, 11],
  },
  {
    key: 'standar',
    label: 'Tema 04',
    title: 'Standar Kerja, Integritas, dan Ketidaksabaran pada Kepura-puraan',
    description:
      'Tema ini menampakkan sisi dr. Ferdi yang paling keras: soal rapat, kerja nyata, tata kelola, mutu, dan tuntutan untuk berpikir sebagai manusia.',
    entryIndices: [14, 15, 16, 17, 19],
  },
]

function isQuote(entry: (typeof tanpaNaskahEntries)[number]): entry is TanpaNaskahQuote {
  return entry.type === 'quote'
}

function isSection(entry: (typeof tanpaNaskahEntries)[number]): entry is TanpaNaskahSection {
  return entry.type === 'section'
}

function QuoteCard({
  entry,
  index,
  themeLabel,
}: {
  entry: TanpaNaskahQuote
  index: number
  themeLabel: string
}) {
  const previewParagraphs = entry.reflection.slice(0, 2)
  const extraParagraphs = entry.reflection.slice(2)
  const isWide = index % 3 === 0

  return (
    <article
      aria-labelledby={`entry-${index}-quote`}
      className={`fi-tanpa-naskah-entry fi-tanpa-naskah-entry--quote${isWide ? ' fi-tanpa-naskah-entry--wide' : ''}`}
    >
      <span className="fi-tanpa-naskah-entry-label">{themeLabel}</span>
      <blockquote className="fi-tanpa-naskah-quote" id={`entry-${index}-quote`}>
        <RichText text={entry.quote} />
        {entry.year ? <span className="fi-tanpa-naskah-quote-year">{entry.year}</span> : null}
        {entry.confirmedBy ? (
          <span className="fi-tanpa-naskah-quote-confirmed">{entry.confirmedBy}</span>
        ) : null}
      </blockquote>
      <p className="fi-tanpa-naskah-context">
        <span className="fi-story-reader-marker">Konteks</span>
        <RichText text={entry.context} />
      </p>
      <div className="fi-tanpa-naskah-reflection">
        <span className="fi-story-reader-marker">Refleksi</span>
        {previewParagraphs.map((paragraph) => (
          <p className="fi-story-reader-paragraph" key={paragraph}>
            <RichText text={paragraph} />
          </p>
        ))}
        {extraParagraphs.length > 0 ? (
          <details className="fi-tanpa-naskah-reflection-more">
            <summary>Baca refleksi penuh</summary>
            <div className="fi-tanpa-naskah-reflection-more-copy">
              {extraParagraphs.map((paragraph) => (
                <p className="fi-story-reader-paragraph" key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </details>
        ) : null}
      </div>
    </article>
  )
}

export default function TanpaNaskahPage() {
  const entriesByIndex = tanpaNaskahEntries.map((entry, index) => ({ entry, index }))
  const editorialEntry = entriesByIndex.find(
    ({ entry }) => isSection(entry) && entry.heading === 'Catatan Editorial',
  )
  const closingEntries = entriesByIndex.flatMap(({ entry, index }) =>
    isSection(entry) && entry.heading === 'Penutup'
      ? [{ entry, index }]
      : [],
  )

  return (
    <div className="fi-tanpa-naskah-page" id="tanpa-naskah-page">
      <Navbar />
      <main className="fi-tanpa-naskah-shell" id="main-content">
        <header className="fi-tanpa-naskah-hero">
          <Link className="fi-kisah-sentra-back" href="/">
            ← Kembali ke Beranda
          </Link>
          <div className="fi-kicker">Celotehan</div>
          <h1 className="fi-story-title">{tanpaNaskahIntro.title}</h1>
          <p className="fi-story-subtitle">{tanpaNaskahIntro.lead}</p>
          <div className="fi-tanpa-naskah-hero-body">
            <figure className="fi-tanpa-naskah-hero-photo">
              <Image
                alt="dr. Ferdi Iskandar mengenakan kaos bertuliskan Its just..me, tersenyum menghadap kamera"
                height={1402}
                priority
                sizes="(max-width: 900px) 100vw, 420px"
                src="/assets/site/justme.webp"
                width={1122}
              />
            </figure>
            <div className="fi-tanpa-naskah-hero-text">
              <p className="fi-tanpa-naskah-byline">{tanpaNaskahIntro.compiledBy}</p>
              <p className="fi-tanpa-naskah-byline">{tanpaNaskahIntro.reflectionsNote}</p>
              <p className="fi-tanpa-naskah-byline">{tanpaNaskahIntro.workRhythmNote}</p>
            </div>
          </div>
        </header>

        <section aria-label="Pengantar" className="fi-tanpa-naskah-intro">
          {tanpaNaskahIntro.paragraphs.map((paragraph) => (
            <ScrollReveal direction="up" key={paragraph}>
              <p className="fi-story-reader-paragraph">
                <RichText text={paragraph} />
              </p>
            </ScrollReveal>
          ))}
        </section>

        <div className="fi-tanpa-naskah-theme-stack">
          {themeGroups.map((group) => (
            <section className="fi-tanpa-naskah-theme" key={group.key}>
              <ScrollReveal direction="up">
                <div className="fi-tanpa-naskah-theme-head">
                  <span className="fi-story-reader-marker">{group.label}</span>
                  <h2 className="fi-tanpa-naskah-theme-title">{group.title}</h2>
                  <p className="fi-tanpa-naskah-theme-description">{group.description}</p>
                </div>
              </ScrollReveal>

              <div className="fi-tanpa-naskah-theme-grid">
                {group.entryIndices.map((entryIndex) => {
                  const item = entriesByIndex[entryIndex]

                  if (!item || !isQuote(item.entry)) {
                    return null
                  }

                  return (
                    <ScrollReveal direction="up" key={item.entry.quote}>
                      <QuoteCard entry={item.entry} index={item.index} themeLabel={group.label} />
                    </ScrollReveal>
                  )
                })}
              </div>
            </section>
          ))}

          {editorialEntry && isSection(editorialEntry.entry) ? (
            <ScrollReveal direction="up">
              <section
                aria-labelledby={`entry-${editorialEntry.index}-heading`}
                className="fi-tanpa-naskah-entry fi-tanpa-naskah-entry--section fi-tanpa-naskah-entry--editorial"
              >
                <span className="fi-story-reader-marker" id={`entry-${editorialEntry.index}-heading`}>
                  {editorialEntry.entry.heading}
                </span>
                {editorialEntry.entry.paragraphs.map((paragraph) => (
                  <p className="fi-story-reader-paragraph" key={paragraph}>
                    <RichText text={paragraph} />
                  </p>
                ))}
              </section>
            </ScrollReveal>
          ) : null}

          <div className="fi-tanpa-naskah-entries">
            {closingEntries.map(({ entry, index }) => (
              <ScrollReveal direction="up" key={entry.heading}>
                <section
                  aria-labelledby={`entry-${index}-heading`}
                  className={`fi-tanpa-naskah-entry fi-tanpa-naskah-entry--section${entry.heading === 'Penutup' ? ' fi-tanpa-naskah-entry--closing' : ''}`}
                >
                  <h2 className="fi-tanpa-naskah-section-heading" id={`entry-${index}-heading`}>
                    {entry.heading}
                  </h2>
                  {entry.heading === 'Penutup' ? (
                    <div className="fi-tanpa-naskah-closing-layout">
                      <div className="fi-tanpa-naskah-closing-copy">
                        {entry.paragraphs.map((paragraph, paragraphIndex) => (
                          <p
                            className={`fi-story-reader-paragraph${
                              paragraphIndex === 0 ? ' fi-tanpa-naskah-direct-note' : ''
                            }${paragraphIndex === 1 ? ' fi-tanpa-naskah-closing-accent' : ''}`}
                            key={paragraph}
                          >
                            <RichText text={paragraph} />
                          </p>
                        ))}
                        <div className="fi-tanpa-naskah-signoff">
                          <p className="fi-tanpa-naskah-signoff-name">dr Ferdi Iskandar SH. MKN</p>
                          <Image
                            alt="Tanda tangan dr Ferdi Iskandar"
                            className="fi-tanpa-naskah-signoff-image"
                            height={113}
                            sizes="320px"
                            src="/assets/site/sign.png"
                            width={357}
                          />
                        </div>
                      </div>
                      <figure className="fi-tanpa-naskah-closing-photo">
                        <Image
                          alt="dr. Ferdi Iskandar berdiri dengan tangan bersilang mengenakan jas dokter putih dan kaos bertuliskan Im a doctor....I think?"
                          height={1402}
                          sizes="(max-width: 720px) 100vw, 360px"
                          src="/assets/site/imadoctor.webp"
                          width={1122}
                        />
                      </figure>
                    </div>
                  ) : (
                    entry.paragraphs.map((paragraph) => (
                      <p className="fi-story-reader-paragraph" key={paragraph}>
                        <RichText text={paragraph} />
                      </p>
                    ))
                  )}
                </section>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
