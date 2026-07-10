'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, type ReactNode } from 'react'

gsap.registerPlugin(ScrollTrigger)

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'fade'

type ScrollRevealProps = {
  children: ReactNode
  direction?: RevealDirection
  delay?: number
  duration?: number
  distance?: number
}

const directionConfig: Record<
  RevealDirection,
  { hidden: gsap.TweenVars; visible: gsap.TweenVars }
> = {
  up: {
    hidden: { y: 28, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  down: {
    hidden: { y: -28, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  left: {
    hidden: { x: -60, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  right: {
    hidden: { x: 60, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  scale: {
    hidden: { scale: 0.92, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  blur: {
    hidden: { filter: 'blur(12px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.68,
  distance,
}: ScrollRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const config = directionConfig[direction]

    // Allow distance override for up/down/left/right
    const hidden = { ...config.hidden }
    if (distance !== undefined) {
      if ('y' in hidden) hidden.y = direction === 'down' ? -distance : distance
      if ('x' in hidden) hidden.x = direction === 'right' ? -distance : distance
    }

    const ctx = gsap.context(() => {
      gsap.set(root, hidden)
      gsap.to(root, {
        ...config.visible,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [direction, delay, duration, distance])

  return <div ref={rootRef}>{children}</div>
}
