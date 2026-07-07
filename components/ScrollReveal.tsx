'use client'

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import { getRevealInitial } from '@/lib/motion-variants'
import { useMotionReady } from '@/lib/use-motion-ready'

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'fade'

type ScrollRevealProps = {
  children: ReactNode
  direction?: RevealDirection
  delay?: number
  duration?: number
  distance?: number
}

const directionConfig: Record<RevealDirection, { initial: Record<string, number | string>; animate: Record<string, number | string> }> = {
  up: {
    initial: { y: 28, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
  down: {
    initial: { y: -28, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
  left: {
    initial: { x: -60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
  right: {
    initial: { x: 60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
  scale: {
    initial: { scale: 0.92, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
  blur: {
    initial: { filter: 'blur(12px)', opacity: 0 },
    animate: { filter: 'blur(0px)', opacity: 1 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.68,
  distance,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const isMotionReady = useMotionReady()
  const config = directionConfig[direction]

  // Allow distance override for up/down/left/right
  const customInitial = { ...config.initial }
  if (distance !== undefined) {
    if ('y' in customInitial) customInitial.y = direction === 'down' ? -distance : distance
    if ('x' in customInitial) customInitial.x = direction === 'right' ? -distance : distance
  }

  const revealInitial = getRevealInitial(isMotionReady, shouldReduceMotion, customInitial)
  const revealAnimate = isMotionReady && !shouldReduceMotion ? config.animate : undefined

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={revealInitial}
        transition={
          isMotionReady && !shouldReduceMotion
            ? { duration, delay, ease: [0.16, 1, 0.3, 1] }
            : undefined
        }
        viewport={{ once: true, amount: 0.18 }}
        whileInView={revealAnimate}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
