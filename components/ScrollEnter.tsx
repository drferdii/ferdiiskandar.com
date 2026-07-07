'use client'

import { useEffect } from 'react'

/**
 * Zero-DOM scroll-reveal driver for server-rendered dossier pages.
 * Observes every element carrying [data-fi-scroll] and flips on the
 * .fi-scroll-in class once it enters the viewport. The hidden initial
 * state only applies after .fi-scroll-ready lands on <html>, so content
 * stays fully visible without JavaScript.
 */
export default function ScrollEnter() {
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
