'use client'

import { useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Props {
  to: number
  duration?: number
  className?: string
}

export default function CountUp({ to, duration = 1.8, className }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const shouldReduce = useReducedMotion()
  const displayCount = count

  useEffect(() => {
    if (!isInView) return

    let frameId = 0

    if (shouldReduce) {
      frameId = requestAnimationFrame(() => {
        setCount(to)
      })

      return () => {
        cancelAnimationFrame(frameId)
      }
    }

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * to))
      if (progress < 1) frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [duration, isInView, shouldReduce, to])

  return (
    <span ref={ref} className={className}>
      {displayCount}
    </span>
  )
}
