'use client'

import { m, useReducedMotion } from 'framer-motion'
import { createElement, type CSSProperties, type ReactNode } from 'react'

const motionElements = {
  article: m.article,
  aside: m.aside,
  nav: m.nav,
  p: m.p,
  section: m.section,
  span: m.span,
  div: m.div,
} as const

type MotionTag = keyof typeof motionElements

type BaseFadeInProps = {
  as?: MotionTag
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  duration?: number
  distance?: number
  x?: number
  y?: number
  motionReady?: boolean
}

const ENTRANCE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function createStaticNode(tag: MotionTag, props: BaseFadeInProps) {
  const { as = 'div', children, className, style } = props
  return createElement(as, { className, style }, children)
}

export function FadeIn({
  as = 'div',
  children,
  className,
  style,
  delay = 0,
  duration = 0.82,
  distance = 24,
  x,
  y,
  motionReady = false,
}: BaseFadeInProps) {
  const isReduced = useReducedMotion()
  const shouldAnimate = motionReady && !isReduced

  const initialX = x ?? 0
  const initialY = y ?? distance
  const MotionElement = motionElements[as]

  if (!shouldAnimate) {
    return createStaticNode(as, {
      as,
      children,
      className,
      style,
    })
  }

  return (
    <MotionElement
      animate={{ opacity: 1, x: 0, y: 0 }}
      className={className}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      style={style}
      transition={{ duration, delay, ease: ENTRANCE_EASE }}
    >
      {children}
    </MotionElement>
  )
}
