'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

import Portfolio from '@/components/Portfolio'
import StoryOfSentra, { StoryHeader } from '@/components/StoryOfSentra'

gsap.registerPlugin(ScrollTrigger)

/**
 * Horizontal transition from Portfolio into StoryOfSentra. Each panel's own
 * content pans upward first so nothing taller than one viewport is ever
 * clipped, then the track slides right into the next panel — one scrub
 * timeline, one scroll axis, no nested scrollbars. Falls back to plain
 * vertical stacking (no pin, no shift) without JS.
 */
export default function PortfolioStory() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    root.classList.add('fi-portfolio-story-active')

    const ctx = gsap.context(() => {
      const track = root.querySelector<HTMLElement>('[data-story-track]')
      const pans = gsap.utils.toArray<HTMLElement>('[data-story-pan]', root)
      if (!track || pans.length !== 2) return

      const vh = window.innerHeight
      // Measure against each pan's own clipping ancestor (not raw vh) — the
      // story panel's viewport is shorter than 100vh because StoryHeader now
      // sits above it as a static, un-panned sibling.
      const dist0 = Math.max(0, pans[0].scrollHeight - (pans[0].parentElement?.clientHeight || 0))
      const dist1 = Math.max(0, pans[1].scrollHeight - (pans[1].parentElement?.clientHeight || 0))
      const total = dist0 + vh + dist1

      const master = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=' + total,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          refreshPriority: -1,
        },
      })

      if (dist0 > 0) master.to(pans[0], { y: -dist0, duration: dist0 })
      master.to(track, { xPercent: -50, duration: vh })
      if (dist1 > 0) master.to(pans[1], { y: -dist1, duration: dist1 })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="fi-portfolio-story-root">
      <div data-story-track className="fi-portfolio-story-track">
        <div className="fi-portfolio-story-scene">
          <div data-story-pan className="fi-portfolio-story-pan">
            <Portfolio />
          </div>
        </div>
        <div
          aria-labelledby="story-sentra-title"
          className="fi-portfolio-story-scene fi-portfolio-story-scene-story"
          id="story-sentra"
        >
          <StoryHeader />
          <div className="fi-portfolio-story-viewport">
            <div data-story-pan className="fi-portfolio-story-pan fi-portfolio-story-contained">
              <StoryOfSentra />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
