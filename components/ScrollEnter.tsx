'use client'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect } from 'react'

/**
 * Zero-DOM scroll-reveal driver for server-rendered dossier pages.
 * Observes every element carrying [data-fi-scroll] and flips on the
 * .fi-scroll-in class once it enters the viewport. The hidden initial
 * state only applies after .fi-scroll-ready lands on <html>, so content
 * stays fully visible without JavaScript.
 */
export default function ScrollEnter() {
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    // The page pins several sections (GSAP ScrollTrigger); a browser-restored
    // mid-page scroll position on load/refresh can land inside one of those
    // pinned ranges, making the page open mid-story instead of at the top.
    if (!window.location.hash) {
      window.scrollTo(0, 0)
    }
  }, [])

  useEffect(() => {
    // Pinned sections size their scroll-runway from measurements taken at
    // mount. Fonts and the StoryOfSentra video can still be loading then, so
    // the page's true scrollable height keeps growing after that first pass —
    // scrolling to "the bottom" before it settles clamps short of Contact and
    // Footer. Re-measuring once everything has actually loaded fixes that.
    const refresh = () => ScrollTrigger.refresh()
    if (document.readyState === 'complete') {
      refresh()
    } else {
      window.addEventListener('load', refresh)
    }
    document.fonts?.ready?.then(refresh)

    return () => window.removeEventListener('load', refresh)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('fi-scroll-ready')

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-fi-scroll]'))
    if (nodes.length === 0) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((node) => node.classList.add('fi-scroll-in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fi-scroll-in')
            observer.unobserve(entry.target)
          }
        })
      },
      // threshold 0 so elements taller than the viewport still reveal
      { threshold: 0, rootMargin: '0px 0px -40px 0px' },
    )

    nodes.forEach((node) => observer.observe(node))

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
