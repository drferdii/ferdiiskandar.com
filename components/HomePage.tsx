import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import AbbyWidget from '@/components/AbbyWidget'
import ClassyNewsSpotlight from '@/components/ClassyNewsSpotlight'
import Contact from '@/components/Contact'
import Expertise from '@/components/Expertise'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Impact from '@/components/Impact'
import Navbar from '@/components/Navbar'
import Portfolio from '@/components/Portfolio'
import ScrollEnter from '@/components/ScrollEnter'
import ScrollReveal from '@/components/ScrollReveal'
import StoryOfSentra from '@/components/StoryOfSentra'
import { sectionIds, siteIdentity } from '@/lib/site-content'

const homeReadingOrder = sectionIds.filter((section) => section.id !== 'top')

const scrollDelay = (ms: number): CSSProperties =>
  ({ '--fi-scroll-delay': `${ms}ms` }) as CSSProperties

export default function HomePage() {
  return (
    <div id="ferdi-editorial-site">
      <div aria-hidden="true" id="top" />
      <ScrollEnter />
      <Navbar />
      <main className="fi-shell" id="main-content">
        <Hero />
        <section aria-labelledby="home-dossier-title" className="fi-home-preface">
          <div className="fi-home-preface-head" data-fi-scroll="up">
            <p className="fi-home-preface-kicker">Dossier Pendiri / Peta Isi Beranda</p>
            <div>
              <h2 id="home-dossier-title">Clinical Intelligence, Built from Real Practice</h2>
              <p>
                Sebuah ringkasan terkurasi mengenai pemikiran, sistem, dan inisiatif yang dibangun
                dr Ferdi Iskandar melalui Sentra Artificial Intelligence.
              </p>
            </div>
          </div>

          <div className="fi-home-preface-grid">
            <article className="fi-home-preface-card" data-fi-scroll="up">
              <span>Posisi</span>
              <strong>{siteIdentity.headline}</strong>
              <p>
                Dibangun dari tanggung jawab klinis, kepercayaan publik, dan cara berpikir sistem
                yang dipimpin pendiri, bukan sekadar penanda personal-brand yang generik.
              </p>
            </article>

            <article className="fi-home-preface-card" data-fi-scroll="up" style={scrollDelay(100)}>
              <span>Peta Isi</span>
              <nav aria-label="Peta isi beranda">
                <ul className="fi-home-preface-index">
                  {homeReadingOrder.map((section, index) => (
                    <li
                      data-fi-scroll="fade"
                      key={section.id}
                      style={scrollDelay(180 + index * 60)}
                    >
                      <Link href={`/#${section.id}`}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <strong>{section.label}</strong>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </article>

            <article className="fi-home-preface-card" data-fi-scroll="up" style={scrollDelay(200)}>
              <span>Basis & Fokus</span>
              <strong>Kediri, Jawa Timur, Indonesia</strong>
              <figure
                className="fi-home-preface-card-visual"
                aria-label="Simpang Lima Gumul Kediri"
              >
                <Image
                  alt="Simpang Lima Gumul Kediri"
                  className="fi-home-preface-card-visual-image"
                  height={400}
                  src="/slg.png"
                  width={600}
                />
              </figure>
              <p>
                Berfokus pada pengembangan healthcare AI, clinical decision support, dan AI-native
                healthcare operations untuk mendukung sistem kesehatan yang lebih terkoordinasi,
                manusiawi, dan adaptif.
              </p>
            </article>
          </div>
        </section>
        <ScrollReveal direction="left">
          <Impact />
        </ScrollReveal>
        <ScrollReveal direction="scale">
          <Expertise />
        </ScrollReveal>
        <ScrollReveal direction="right">
          <Portfolio />
        </ScrollReveal>
        <ScrollReveal direction="blur">
          <StoryOfSentra />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <ClassyNewsSpotlight />
        </ScrollReveal>
        <ScrollReveal direction="fade" delay={0.15}>
          <Contact />
        </ScrollReveal>
        <AbbyWidget />
      </main>
      <Footer />
    </div>
  )
}
