'use client'

import { useEffect, useRef } from 'react'

export function useSmoothScroll() {
  const rafId = useRef<number>(0)

  useEffect(() => {
    // Detect touch device — disable smooth scroll (native is better for touch)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const lerp = 0.15
    const maxDeltaPerEvent = 120 // Cap individual events (prevents jump)
    const maxAccumulatedDelta = 380 // Cap total per gesture

    let targetY = window.scrollY
    let lastSetY = window.scrollY
    let isAnimating = false
    let accumulatedDelta = 0
    let lastWheelTime = 0

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const now = Date.now()
      const timeSinceLastWheel = now - lastWheelTime
      lastWheelTime = now

      // Reset if gap between events (new gesture started)
      if (timeSinceLastWheel > 100) {
        accumulatedDelta = 0
        // Sync target to current position on new gesture
        targetY = window.scrollY
      }

      // Normalize delta — handle trackpad vs mouse
      let delta = e.deltaY

      // Trackpads often send deltaMode 0 (pixels) with large values
      // Mice often send deltaMode 1 (lines) — normalize to pixels
      if (e.deltaMode === 1) {
        delta *= 40
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight
      }

      // Cap individual event delta
      if (Math.abs(delta) > maxDeltaPerEvent) {
        delta = Math.sign(delta) * maxDeltaPerEvent
      }

      // Accumulate with smoother multiplier
      accumulatedDelta += delta * 0.8
      if (Math.abs(accumulatedDelta) > maxAccumulatedDelta) {
        accumulatedDelta = Math.sign(accumulatedDelta) * maxAccumulatedDelta
      }

      // Calculate target from actual current scroll position
      targetY = window.scrollY + accumulatedDelta

      // Clamp to document bounds
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      targetY = Math.max(0, Math.min(targetY, maxScroll))

      if (!isAnimating) {
        isAnimating = true
        animate()
      }
    }

    const animate = () => {
      const currentY = window.scrollY
      const diff = targetY - currentY

      // Stop when close enough
      if (Math.abs(diff) < 0.5) {
        window.scrollTo(0, targetY)
        lastSetY = targetY
        isAnimating = false
        accumulatedDelta = 0
        return
      }

      const nextY = currentY + diff * lerp
      lastSetY = nextY
      window.scrollTo(0, nextY)
      rafId.current = requestAnimationFrame(animate)
    }

    // Detect external scroll (scrollbar drag, anchor click) — reset to avoid fighting native position
    const handleScroll = () => {
      if (Math.abs(window.scrollY - lastSetY) > 2) {
        targetY = window.scrollY
        lastSetY = window.scrollY
        isAnimating = false
        accumulatedDelta = 0
        cancelAnimationFrame(rafId.current)
      }
    }

    // Handle keyboard navigation gracefully
    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollKeys = ['PageUp', 'PageDown', 'Home', 'End', 'Space', 'ArrowUp', 'ArrowDown']
      if (scrollKeys.includes(e.key)) {
        // Stop smooth scroll animation, let native handle keyboard
        isAnimating = false
        accumulatedDelta = 0
        targetY = window.scrollY
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [])
}
