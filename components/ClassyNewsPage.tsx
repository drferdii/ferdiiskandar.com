// Architected and built by dr Classy

import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { DossierIndexNav } from '@/components/DossierShared'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ScrollEnter from '@/components/ScrollEnter'
import {
  classyNewsBridgeCards,
  classyNewsClosing,
  classyNewsEditorPicks,
  classyNewsFeatureStories,
  classyNewsHero,
  classyNewsIndexEntries,
  classyNewsLeadStory,
  classyNewsSecondaryStories,
  classyNewsSignals,
  classyNewsTrendingStories,
} from '@/lib/classy-news-content'

type NewsStorySummary = {
  category: string
  headline: string
  summary: string
  date: string
  source: string
}

function NewsStoryCopy({
  className,
  categoryClassName = 'fi-news-panel-label',
  story,
}: {
  categoryClassName?: string | null
  className: string
  story: NewsStorySummary
}) {
  return (
    <div className={className}>
      <span className={categoryClassName ?? undefined}>{story.category}</span>
      <h3>{story.headline}</h3>
      <p>{story.summary}</p>
      <small className="fi-news-story-date">{story.date}</small>
      <small className="fi-news-source-line">{story.source}</small>
    </div>
  )
}

const scrollDelay = (ms: number): CSSProperties =>
  ({ '--fi-scroll-delay': `${ms}ms` }) as CSSProperties

export default function ClassyNewsPage() {
  return (
    <div className="fi-page-news fi-news-dossier" id="classy-news-page">
      <ScrollEnter />
      <Navbar />
      <main className="fi-news-shell" id="main-content">
        <aside aria-label="Indeks bagian halaman berita" className="fi-news-index">
          <div className="fi-news-index-title">Indeks Edisi</div>
          <nav aria-label="Urutan baca halaman berita" className="fi-news-index-nav">
            <DossierIndexNav entries={classyNewsIndexEntries} />
          </nav>
          <div className="fi-news-index-card" data-fi-scroll="fade" style={scrollDelay(220)}>
            <p>
              Rujukan lebih dulu.
              <br />
              Makna sebelum riuh.
              <br />
              Struktur sebelum hiasan.
            </p>
            <span aria-hidden="true">+</span>
            <small>{classyNewsHero.issueLabel}</small>
          </div>
        </aside>

        <div className="fi-news-main">
          <header className="fi-news-hero" id="classy-news-foreword">
            <div className="fi-news-hero-copy" data-fi-scroll="up">
              <span className="fi-news-section-label">Bagian 06</span>
              <p className="fi-news-hero-kicker">{classyNewsHero.eyebrow}</p>
              <h1>{classyNewsHero.title}</h1>
              <p className="fi-news-hero-thesis">{classyNewsHero.thesis}</p>
              <p className="fi-news-hero-context">{classyNewsHero.context}</p>
              <div className="fi-news-hero-actions">
                <Link className="fi-button" href="/classy-news#classy-news-headline">
                  Mulai Baca Edisi
                </Link>
                <Link className="fi-button secondary" href="/notes">
                  Buka Catatan
                </Link>
              </div>
            </div>

            <aside
              aria-label="Catatan pembuka redaksi"
              className="fi-news-hero-aside"
              data-fi-scroll="right"
              style={scrollDelay(160)}
            >
              <span className="fi-news-panel-label">Catatan Redaksi</span>
              <p>{classyNewsHero.abstract}</p>
              <div className="fi-news-hero-meta">
                <strong>{classyNewsHero.issueLabel}</strong>
                <span>{classyNewsHero.issueDate}</span>
              </div>
              <ul>
                {classyNewsSignals.map((signal, index) => (
                  <li data-fi-scroll="fade" key={signal} style={scrollDelay(240 + index * 70)}>
                    {signal}
                  </li>
                ))}
              </ul>
            </aside>
          </header>

          <section
            aria-labelledby="classy-news-headline-title"
            className="fi-news-headline-section"
            id="classy-news-headline"
          >
            <article className="fi-news-lead-story" data-fi-scroll="up">
              <a
                className="fi-news-story-link"
                href={classyNewsLeadStory.href}
                rel="noreferrer"
                target="_blank"
              >
                <div className="fi-news-media">
                  <Image
                    alt={classyNewsLeadStory.headline}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    src={classyNewsLeadStory.image}
                  />
                </div>
              </a>
              <span className="fi-news-story-kicker">{classyNewsLeadStory.category}</span>
              <h2 id="classy-news-headline-title">
                <a
                  className="fi-news-story-link fi-news-story-link-inline"
                  href={classyNewsLeadStory.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {classyNewsLeadStory.headline}
                </a>
              </h2>
              <p className="fi-news-lead-summary">{classyNewsLeadStory.summary}</p>
              <div className="fi-news-story-meta">
                <span>{classyNewsLeadStory.meta}</span>
                <span className="fi-news-source-line">{classyNewsLeadStory.source}</span>
                <a href={classyNewsLeadStory.href} rel="noreferrer" target="_blank">
                  {classyNewsLeadStory.cta}
                </a>
              </div>
            </article>

            <div className="fi-news-secondary-column" aria-label="Secondary stories">
              {classyNewsSecondaryStories.map((story, index) => (
                <article
                  className="fi-news-secondary-story"
                  data-fi-scroll="right"
                  key={story.headline}
                  style={scrollDelay(120 + index * 90)}
                >
                  <a
                    className="fi-news-card-link"
                    href={story.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="fi-news-story-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <NewsStoryCopy className="fi-news-secondary-copy" story={story} />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="classy-news-trending-title"
            className="fi-news-signal fi-news-trending-section"
            id="classy-news-trending"
          >
            <div className="fi-news-section-head fi-news-section-head-on-dark" data-fi-scroll="up">
              <h2 id="classy-news-trending-title">Sedang Banyak Dibaca</h2>
              <span>Empat kabar yang paling cepat mengubah arah pembicaraan hari ini.</span>
            </div>

            <div className="fi-news-trending-grid">
              {classyNewsTrendingStories.map((story, index) => (
                <article
                  className="fi-news-trending-card"
                  data-fi-scroll="up"
                  key={story.headline}
                  style={scrollDelay(index * 90)}
                >
                  <a
                    className="fi-news-card-link"
                    href={story.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="fi-news-trending-media">
                      <Image
                        alt={story.headline}
                        fill
                        sizes="(max-width: 900px) 100vw, 25vw"
                        src={story.image}
                      />
                    </div>
                    <NewsStoryCopy
                      categoryClassName={null}
                      className="fi-news-trending-copy"
                      story={story}
                    />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="classy-news-briefing-title"
            className="fi-news-briefing"
            id="classy-news-briefing"
          >
            <div className="fi-news-section-head" data-fi-scroll="up">
              <h2 id="classy-news-briefing-title">Liputan Mendalam</h2>
              <span>Ruang baca yang lebih lapang untuk empat laporan produk dan korporasi.</span>
            </div>

            <div className="fi-news-depth-grid">
              {classyNewsFeatureStories.map((story, index) => (
                <article
                  className="fi-news-depth-card"
                  data-fi-scroll="up"
                  key={story.headline}
                  style={scrollDelay(index * 90)}
                >
                  <a
                    className="fi-news-card-link"
                    href={story.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="fi-news-depth-media">
                      <Image
                        alt={story.headline}
                        fill
                        sizes="(max-width: 900px) 100vw, 30vw"
                        src={story.image}
                      />
                    </div>
                    <NewsStoryCopy className="fi-news-depth-copy" story={story} />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="classy-news-editorial-title"
            className="fi-news-editorial"
            id="classy-news-editorial"
          >
            <div className="fi-news-editorial-intro" data-fi-scroll="up">
              <span className="fi-news-panel-label">Kurasi Khusus</span>
              <h2 id="classy-news-editorial-title">Pilihan Editor</h2>
              <p>
                Blok ini menjadi lapisan baca lanjutan: kumpulan berita yang sudah ditulis ulang
                agar pembaca Indonesia dapat menangkap intinya lebih cepat sebelum membuka sumber
                asal.
              </p>
            </div>

            <div className="fi-news-editorial-list">
              {classyNewsEditorPicks.slice(0, 3).map((story, index) => (
                <article
                  className="fi-news-editorial-card"
                  data-fi-scroll="up"
                  key={story.headline}
                  style={scrollDelay(index * 90)}
                >
                  <a
                    className="fi-news-card-link"
                    href={story.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="fi-news-editorial-media">
                      <Image
                        alt={story.headline}
                        fill
                        sizes="(max-width: 900px) 100vw, 24vw"
                        src={story.image}
                      />
                    </div>
                    <NewsStoryCopy className="fi-news-editorial-copy" story={story} />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="classy-news-bridge-title"
            className="fi-news-bridge"
            id="classy-news-bridge"
          >
            <div className="fi-news-section-head">
              <h2 id="classy-news-bridge-title">Lanjutan Baca</h2>
              <span>Jalur baca berikutnya setelah pembaca selesai membuka rujukan utama.</span>
            </div>
            <div className="fi-news-bridge-grid">
              {classyNewsBridgeCards.map((card, index) => (
                <article
                  className="fi-news-bridge-card"
                  data-fi-scroll="up"
                  key={card.label}
                  style={scrollDelay(index * 90)}
                >
                  <span>{card.label}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <Link href={card.href}>{card.cta}</Link>
                </article>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="classy-news-closing-title"
            className="fi-news-closing"
            id="classy-news-closing"
          >
            <div className="fi-news-closing-copy" data-fi-scroll="left">
              <span className="fi-news-panel-label">Catatan Penutup</span>
              <h2 id="classy-news-closing-title">{classyNewsClosing.title}</h2>
              <p>{classyNewsClosing.body}</p>
              <p>
                Pilihan berita dan pengerjaan halaman ini dikurasi dan dikerjakan oleh Dexton
                (OpenAI GPT-5).
              </p>
            </div>
            <div
              className="fi-news-closing-actions"
              data-fi-scroll="right"
              style={scrollDelay(140)}
            >
              <Link className="fi-button secondary" href={classyNewsClosing.secondaryHref}>
                {classyNewsClosing.secondaryLabel}
              </Link>
              <Link className="fi-button" href={classyNewsClosing.primaryHref}>
                {classyNewsClosing.primaryLabel}
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
