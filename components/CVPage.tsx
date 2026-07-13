import Image from 'next/image'
import type { CSSProperties } from 'react'

import CountUp from '@/components/CountUp'
import { DossierGlanceSections, DossierIndexNav } from '@/components/DossierShared'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ScrollEnter from '@/components/ScrollEnter'
import {
  cvCertifications,
  cvCredentials,
  cvEducation,
  cvExperience,
  cvGlanceSections,
  cvHero,
  cvHeroMetrics,
  cvIndexEntries,
  cvProfile,
  cvPublications,
} from '@/lib/cv-content'

function StatusBadge({ status }: { status: string }) {
  const label =
    status === 'current'
      ? 'Saat Ini'
      : status === 'forthcoming'
        ? 'Forthcoming'
        : status === 'in-preparation'
          ? 'Dalam Persiapan'
          : status === 'under-review'
            ? 'Dalam Tinjauan'
            : status === 'published'
              ? 'Terbit'
              : 'Selesai'
  return (
    <span className="fi-cv-badge" data-status={status}>
      {label}
    </span>
  )
}

const scrollDelay = (ms: number): CSSProperties =>
  ({ '--fi-scroll-delay': `${ms}ms` }) as CSSProperties

export default function CVPage() {
  return (
    <div className="fi-cv-dossier" id="cv-page">
      <ScrollEnter />
      <Navbar />
      <main className="fi-cv-dossier-shell" id="main-content">
        {/* LEFT — Index Sidebar */}
        <aside aria-label="Indeks CV" className="fi-cv-index">
          <div className="fi-cv-index-title">Indeks CV</div>
          <nav aria-label="Bagian CV" className="fi-cv-index-nav">
            <DossierIndexNav entries={cvIndexEntries} />
          </nav>
          <div className="fi-cv-index-card" data-fi-scroll="fade" style={scrollDelay(220)}>
            <p>
              Setiap gelar ditempuh.
              <br />
              Setiap standar dibuktikan.
            </p>
            <span aria-hidden="true">✧</span>
            <small>Registri Kredensial</small>
          </div>
        </aside>

        {/* CENTER — Main */}
        <div className="fi-cv-main">
          {/* HERO */}
          <header className="fi-cv-hero" id="cv-header">
            <div className="fi-cv-hero-copy" data-fi-scroll="up">
              <span className="fi-cv-section-label">{cvHero.sectionLabel}</span>
              <h1>{cvHero.name}</h1>
              <p className="fi-cv-hero-credentials">{cvHero.credentials}</p>
              <p className="fi-cv-hero-profile-eyebrow">{cvHero.profileEyebrow}</p>
              <p className="fi-cv-hero-thesis fi-cv-hero-intersection">
                {cvHero.profileIntersectionLines[0]}
                <br />
                {cvHero.profileIntersectionLines[1]}
              </p>
              <p className="fi-cv-hero-context fi-cv-hero-prose-id">{cvHero.profileBody}</p>
              <div className="fi-cv-hero-motto">
                <p className="fi-cv-hero-motto-line">{cvHero.profileMottoLines[0]}</p>
                <p className="fi-cv-hero-motto-line">{cvHero.profileMottoLines[1]}</p>
              </div>
              <p className="fi-cv-hero-context fi-cv-hero-prose-id">{cvHero.profileClosing}</p>
              <div aria-label="Ringkasan jalur karier" className="fi-cv-hero-ledger">
                {cvHeroMetrics.map((metric, index) => (
                  <div
                    className="fi-cv-hero-ledger-item"
                    data-fi-scroll="up"
                    key={metric.label}
                    style={scrollDelay(200 + index * 90)}
                  >
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                    <em>{metric.detail}</em>
                  </div>
                ))}
              </div>
            </div>
            <div className="fi-cv-hero-portrait" data-fi-scroll="right" style={scrollDelay(160)}>
              <div className="fi-cv-hero-photo">
                <Image
                  alt="dr. Ferdi Iskandar berdiri mengenakan kaos Sentra putih dan celana gelap"
                  height={1448}
                  priority
                  sizes="(max-width: 900px) 100vw, 45vw"
                  src="/assets/site/jeans-transparent.webp"
                  width={1086}
                />
              </div>
              <div className="fi-cv-hero-credential-strip">
                {cvCredentials.map((c, index) => (
                  <div
                    className="fi-cv-credential-item"
                    data-fi-scroll="fade"
                    key={c.code}
                    style={scrollDelay(240 + index * 80)}
                  >
                    <strong>{c.code}</strong>
                    <span>{c.label}</span>
                    <small>{c.source}</small>
                  </div>
                ))}
              </div>
            </div>
          </header>

          {/* SECTION 01 — Profile */}
          <section aria-labelledby="cv-profile-title" className="fi-cv-profile" id="cv-profile">
            <div className="fi-cv-section-head" data-fi-scroll="up">
              <h2 id="cv-profile-title">Profil</h2>
              <span>Bagian 01 &middot; Ringkasan Eksekutif</span>
            </div>
            <div className="fi-cv-profile-body">
              <aside className="fi-cv-profile-aside" data-fi-scroll="left">
                <span className="fi-cv-panel-label">{cvProfile.eyebrow}</span>
                <p className="fi-cv-profile-tagline">{cvProfile.tagline}</p>
              </aside>
              <div className="fi-cv-profile-copy" data-fi-scroll="up" style={scrollDelay(120)}>
                {cvProfile.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 02 — Experience */}
          <section
            aria-labelledby="cv-experience-title"
            className="fi-cv-experience"
            id="cv-experience"
          >
            <div className="fi-cv-section-head" data-fi-scroll="up">
              <h2 id="cv-experience-title">Pengalaman</h2>
              <span>Bagian 02 &middot; Linimasa Karier</span>
            </div>
            <div className="fi-cv-timeline">
              {cvExperience.map((item, index) => (
                <article
                  className="fi-cv-timeline-row"
                  data-fi-scroll="up"
                  data-status={item.status}
                  key={item.id}
                  style={scrollDelay(Math.min(index * 70, 280))}
                >
                  <div className="fi-cv-timeline-meta">
                    <span className="fi-cv-entry-num">{item.number}</span>
                    <StatusBadge status={item.status} />
                    <span className="fi-cv-timeline-years">{item.years}</span>
                  </div>
                  <div className="fi-cv-timeline-body">
                    <div className="fi-cv-timeline-title-row">
                      <strong>{item.displayTitle ?? item.role}</strong>
                      {!item.displayTitle ? <em>{item.organization}</em> : null}
                    </div>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION 03 — Education */}
          <section
            aria-labelledby="cv-education-title"
            className="fi-cv-education"
            id="cv-education"
          >
            <div className="fi-cv-section-head" data-fi-scroll="up">
              <h2 id="cv-education-title">Pendidikan</h2>
              <span>Bagian 03 &middot; Rekam Akademik</span>
            </div>
            <div className="fi-cv-timeline">
              {cvEducation.map((item, index) => (
                <article
                  className="fi-cv-timeline-row"
                  data-fi-scroll="up"
                  key={item.id}
                  style={scrollDelay(Math.min(index * 70, 280))}
                >
                  <div className="fi-cv-timeline-meta">
                    <span className="fi-cv-entry-num">{item.number}</span>
                    <span className="fi-cv-timeline-years">{item.years}</span>
                  </div>
                  <div className="fi-cv-timeline-body">
                    <div className="fi-cv-timeline-title-row">
                      <strong>{item.degree}</strong>
                      <em>
                        {item.field} &middot; {item.institution}
                      </em>
                    </div>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION 04 — Certifications */}
          <section
            aria-labelledby="cv-certifications-title"
            className="fi-cv-certifications"
            id="cv-certifications"
          >
            <div className="fi-cv-section-head" data-fi-scroll="up">
              <h2 id="cv-certifications-title">Sertifikasi</h2>
              <span>Bagian 04 &middot; Kredensial Profesional</span>
            </div>
            <div className="fi-cv-cert-brief" aria-label="Ringkasan sertifikasi">
              <div data-fi-scroll="up">
                <span>Continuous Learning</span>
                <strong>
                  Sertifikasi ini dicatat bukan sebagai pusat klaim keahlian, tetapi sebagai jejak
                  belajar berkelanjutan.
                </strong>
                <p>
                  Memahami AI, governance, prompt engineering, dan sistem kecerdasan yang relevan
                  dengan layanan kesehatan.
                </p>
              </div>
              <dl data-fi-scroll="right" style={scrollDelay(150)}>
                <div>
                  <dt>2026</dt>
                  <dd>
                    <CountUp to={7} /> AI certifications
                  </dd>
                </div>
                <div>
                  <dt>2025</dt>
                  <dd>
                    <CountUp to={5} /> AI and developer credentials
                  </dd>
                </div>
              </dl>
            </div>
            <div className="fi-cv-cert-grid">
              {cvCertifications.map((credential, index) => {
                const year = credential.source.includes('2026')
                  ? '2026'
                  : credential.source.includes('2025')
                    ? '2025'
                    : 'Professional'

                return (
                  <article
                    className="fi-cv-cert-card"
                    data-fi-scroll="up"
                    data-year={year}
                    key={credential.code}
                    style={scrollDelay(Math.min(index * 80, 320))}
                  >
                    <span className="fi-cv-cert-scope" data-scope={credential.scope}>
                      {credential.scope === 'international' ? 'International' : 'Nasional'}
                    </span>
                    <div className="fi-cv-cert-year">{year}</div>
                    <div className="fi-cv-cert-copy">
                      <span>{credential.source}</span>
                      <strong>{credential.code}</strong>
                      <p>{credential.label}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          {/* SECTION 05 — Research & Publications */}
          <section aria-labelledby="cv-research-title" className="fi-cv-research" id="cv-research">
            <div className="fi-cv-section-head" data-fi-scroll="up">
              <h2 id="cv-research-title">Riset &amp; Publikasi</h2>
              <span>Bagian 05</span>
            </div>
            <div className="fi-cv-publications">
              {cvPublications.map((pub, index) => (
                <article
                  className="fi-cv-pub-card"
                  data-fi-scroll="up"
                  key={pub.id}
                  style={scrollDelay(Math.min(index * 80, 240))}
                >
                  <div className="fi-cv-pub-meta">
                    <span className="fi-cv-entry-num">{pub.number}</span>
                    <StatusBadge status={pub.status} />
                    <span className="fi-cv-timeline-years">{pub.year}</span>
                  </div>
                  <div className="fi-cv-pub-body">
                    <h3>{pub.title}</h3>
                    <p className="fi-cv-pub-subtitle">{pub.subtitle}</p>
                    <div className="fi-cv-pub-tags">
                      {pub.tags.map((tag) => (
                        <span className="fi-cv-pub-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="fi-cv-pub-abstract">{pub.abstract}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION 06 — Download */}
          <section aria-labelledby="cv-download-title" className="fi-cv-download" id="cv-download">
            <div className="fi-cv-section-head" data-fi-scroll="up">
              <h2 id="cv-download-title">CV Lengkap</h2>
              <span>Bagian 06 &middot; Dokumen PDF</span>
            </div>
            <div className="fi-cv-download-body">
              <div className="fi-cv-download-copy" data-fi-scroll="left">
                <span className="fi-cv-panel-label">Dokumen Kredensial</span>
                <p>
                  Curriculum vitae lengkap tersedia atas permintaan untuk kebutuhan institusional,
                  akademik, atau profesional.
                </p>
              </div>
              <div
                className="fi-cv-download-actions"
                data-fi-scroll="right"
                style={scrollDelay(140)}
              >
                <a
                  aria-disabled="true"
                  className="fi-button secondary fi-cv-download-btn"
                  href="#cv-download"
                >
                  Unduh PDF <span aria-hidden="true">↓</span>
                </a>
                <p className="fi-cv-download-note">
                  Berkas tersedia atas permintaan melalui halaman speaking atau email langsung.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT — Glance Sidebar */}
        <aside aria-label="Ringkasan CV" className="fi-cv-glance" data-fi-scroll="fade">
          <div className="fi-cv-glance-head">
            <strong>Sekilas</strong>
            <span>Ringkasan kredensial</span>
          </div>
          <DossierGlanceSections sections={cvGlanceSections} />
        </aside>
      </main>
      <Footer />
    </div>
  )
}
