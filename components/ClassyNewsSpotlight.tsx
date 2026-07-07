// Architected and built by dr Classy

import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import SectionNumberMark from '@/components/SectionNumberMark'
import { classyNewsHomeSpotlight } from '@/lib/classy-news-content'

const scrollDelay = (ms: number): CSSProperties =>
  ({ '--fi-scroll-delay': `${ms}ms` }) as CSSProperties

export default function ClassyNewsSpotlight() {
  return (
    <section
      aria-labelledby="classy-news-spotlight-title"
      className="fi-home-news-spotlight"
      id="classy-news-spotlight"
    >
      <div className="fi-section-head fi-home-news-spotlight-section-head">
        <SectionNumberMark number="05" />
        <div>
          <div className="fi-kicker">{classyNewsHomeSpotlight.kicker}</div>
        </div>
      </div>
      <div className="fi-home-news-spotlight-shell">
        <div className="fi-home-news-spotlight-copy">
          <div className="fi-home-news-spotlight-head" data-fi-scroll="up">
            <h2 id="classy-news-spotlight-title">{classyNewsHomeSpotlight.title}</h2>
          </div>
          <p data-fi-scroll="up" style={scrollDelay(110)}>
            {classyNewsHomeSpotlight.body}
          </p>
          <div
            className="fi-home-news-spotlight-actions"
            data-fi-scroll="up"
            style={scrollDelay(220)}
          >
            <Link className="fi-button" href={classyNewsHomeSpotlight.primaryHref}>
              {classyNewsHomeSpotlight.primaryLabel}
            </Link>
            <Link className="fi-button secondary" href={classyNewsHomeSpotlight.secondaryHref}>
              {classyNewsHomeSpotlight.secondaryLabel}
            </Link>
          </div>
        </div>
        <figure
          className="fi-home-news-spotlight-visual"
          data-fi-scroll="right"
          style={scrollDelay(160)}
        >
          <Image
            alt="Permukaan editorial Classy News"
            height={720}
            priority={false}
            src="/hero-news.png"
            width={960}
          />
        </figure>
      </div>
    </section>
  )
}
