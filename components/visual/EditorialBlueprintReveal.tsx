'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'

import { useMotionReady } from '@/lib/use-motion-ready'

type Props = {
  className?: string
}

type LineConfig = {
  id: string
  d: string
  opacity: number
  delay: number
  duration: number
  guide?: boolean
  accent?: boolean
}

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]

const LINES: LineConfig[] = [
  { id: 'frame-top', d: 'M 3,8 L 97,8', opacity: 0.3, delay: 0, duration: 0.62 },
  { id: 'frame-bottom', d: 'M 3,92 L 97,92', opacity: 0.24, delay: 0.08, duration: 0.62 },
  { id: 'frame-left', d: 'M 6,3 L 6,97', opacity: 0.24, delay: 0.16, duration: 0.62 },
  { id: 'frame-right', d: 'M 94,3 L 94,97', opacity: 0.24, delay: 0.24, duration: 0.62 },
  { id: 'bracket-tl', d: 'M 0,15 L 0,0 L 15,0', opacity: 0.52, delay: 0.1, duration: 0.54, accent: true },
  { id: 'bracket-tr', d: 'M 85,0 L 100,0 L 100,15', opacity: 0.52, delay: 0.18, duration: 0.54, accent: true },
  { id: 'bracket-bl', d: 'M 0,85 L 0,100 L 15,100', opacity: 0.46, delay: 0.26, duration: 0.54, accent: true },
  { id: 'bracket-br', d: 'M 85,100 L 100,100 L 100,85', opacity: 0.46, delay: 0.34, duration: 0.54, accent: true },
  { id: 'guide-left', d: 'M 13,0 L 13,100', opacity: 0.18, delay: 0.38, duration: 0.72, guide: true },
  { id: 'guide-center', d: 'M 50,0 L 50,100', opacity: 0.13, delay: 0.46, duration: 0.72, guide: true },
  { id: 'guide-right', d: 'M 87,0 L 87,100', opacity: 0.18, delay: 0.54, duration: 0.72, guide: true },
  { id: 'headline-axis', d: 'M 10,34 L 90,34', opacity: 0.22, delay: 0.62, duration: 0.64 },
  { id: 'editorial-baseline', d: 'M 10,64 L 90,64', opacity: 0.34, delay: 0.72, duration: 0.64, accent: true },
  { id: 'copy-axis', d: 'M 20,76 L 80,76', opacity: 0.18, delay: 0.82, duration: 0.58 },
  { id: 'datum-a', d: 'M 18,21 L 31,21 M 18,24 L 26,24', opacity: 0.26, delay: 0.92, duration: 0.42 },
  { id: 'datum-b', d: 'M 69,79 L 82,79 M 74,82 L 82,82', opacity: 0.26, delay: 1, duration: 0.42 },
]

function BlueprintPath({
  d,
  opacity,
  delay,
  duration,
  guide,
  accent,
  ready,
}: LineConfig & { ready: boolean }) {
  const sharedProps = {
    d,
    fill: 'none' as const,
    stroke: accent ? 'var(--fi-blueprint-accent)' : 'var(--fi-blueprint-stroke)',
    strokeLinecap: 'square' as const,
    strokeLinejoin: 'miter' as const,
    strokeOpacity: opacity,
    strokeWidth: accent ? '1.25' : '1',
    vectorEffect: 'non-scaling-stroke' as const,
    className: guide ? 'fi-blueprint-guide' : undefined,
  }

  if (!ready) {
    return <path {...sharedProps} strokeOpacity={0} />
  }

  return (
    <m.path
      {...sharedProps}
      animate={{ opacity: 1, pathLength: 1 }}
      initial={{ pathLength: 0, opacity: 0 }}
      transition={{ duration, delay, ease: EASE }}
    />
  )
}

export function EditorialBlueprintReveal({ className }: Props) {
  const isReady = useMotionReady()

  return (
    <LazyMotion features={domAnimation}>
      <svg
        aria-hidden="true"
        className={['fi-blueprint-svg', className].filter(Boolean).join(' ')}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {LINES.map((line) => (
          <BlueprintPath key={line.id} {...line} ready={isReady} />
        ))}
      </svg>
    </LazyMotion>
  )
}
