import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { RichText } from '@/components/RichText'
import {
  storyChapters,
  storyEpilog,
  storyProlog,
  type StoryChapterQuote,
} from '@/lib/story-sentra-content'

function ChapterParagraphs({
  paragraphs,
  quote,
}: {
  paragraphs: string[]
  quote?: StoryChapterQuote
}) {
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <Fragment key={paragraph}>
          <p className="fi-story-reader-paragraph">
            <RichText text={paragraph} />
          </p>
          {quote && quote.afterParagraph === index ? (
            <blockquote className="fi-kisah-sentra-chapter-quote">
              <RichText text={quote.text} />
            </blockquote>
          ) : null}
        </Fragment>
      ))}
    </>
  )
}

export default function KisahSentraPage() {
  const chapterCount = storyChapters.length

  return (
    <div className="fi-kisah-sentra-page" id="kisah-sentra-page">
      <Navbar />
      <main className="fi-kisah-sentra-shell" id="main-content">
        <header className="fi-kisah-sentra-hero">
          <Link className="fi-kisah-sentra-back" href="/#story-sentra">
            ← Kembali ke Beranda
          </Link>
          <div className="fi-kicker">Kisah Sentra</div>
          <h1 className="fi-story-title">{storyProlog.title}</h1>
          <p className="fi-story-subtitle">{storyProlog.lead}</p>
          <div aria-label="Ringkasan halaman" className="fi-kisah-sentra-meta">
            <span>{String(chapterCount).padStart(2, '0')} bab utama</span>
            <span>Dokumen pendiri 2025-2026</span>
            <span>Narasi editorial</span>
          </div>
        </header>

        <section aria-label={storyProlog.eyebrow} className="fi-kisah-sentra-prolog">
          <span className="fi-story-reader-marker">{storyProlog.eyebrow}</span>
          {storyProlog.paragraphs.map((paragraph) => (
            <p key={paragraph} className="fi-story-reader-paragraph">
              <RichText text={paragraph} />
            </p>
          ))}
        </section>

        <div className="fi-kisah-sentra-chapters">
          {storyChapters.map((chapter, index) => {
            const isSplit = chapter.image?.variant === 'portrait'
            const photo = chapter.image ? (
              <figure
                className={`fi-kisah-sentra-chapter-photo fi-kisah-sentra-chapter-photo--${chapter.image.variant}`}
              >
                <Image
                  alt={chapter.image.alt}
                  height={chapter.image.height}
                  sizes="(max-width: 720px) 100vw, 320px"
                  src={chapter.image.src}
                  width={chapter.image.width}
                />
                <figcaption>{chapter.image.caption}</figcaption>
              </figure>
            ) : null

            return (
              <section
                aria-labelledby={`chapter-${index}-title`}
                className={`fi-kisah-sentra-chapter${isSplit ? ' fi-kisah-sentra-chapter--split' : ''}`}
                id={`chapter-${index}`}
                key={chapter.title}
              >
                <span className="fi-story-reader-marker">
                  {String(index + 1).padStart(2, '0')} — {chapter.marker}
                </span>
                <h2 className="fi-kisah-sentra-chapter-title" id={`chapter-${index}-title`}>
                  {chapter.title}
                </h2>
                {isSplit ? (
                  <div className="fi-kisah-sentra-chapter-body">
                    <div className="fi-kisah-sentra-chapter-text">
                      <ChapterParagraphs paragraphs={chapter.paragraphs} quote={chapter.quote} />
                    </div>
                    {photo}
                  </div>
                ) : (
                  <>
                    <ChapterParagraphs paragraphs={chapter.paragraphs} quote={chapter.quote} />
                    {photo}
                  </>
                )}
              </section>
            )
          })}
        </div>

        <section aria-label={storyEpilog.eyebrow} className="fi-kisah-sentra-epilog">
          <span className="fi-story-reader-marker">{storyEpilog.eyebrow}</span>
          {storyEpilog.paragraphs.map((paragraph) => (
            <p key={paragraph} className="fi-story-reader-paragraph">
              <RichText text={paragraph} />
            </p>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
