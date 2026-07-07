'use client'

import { LazyMotion, domAnimation } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import { FadeIn } from '@/components/HeroMotion'
import { EditorialBlueprintReveal } from '@/components/visual/EditorialBlueprintReveal'
import { useMotionReady } from '@/lib/use-motion-ready'

const HeroTerminal = dynamic(() => import('@/components/HeroTerminal'), {
  ssr: false,
  loading: () => <div className="fi-hero-terminal-fallback" />,
})

export default function Hero() {
  const isMotionReady = useMotionReady()

  return (
    <LazyMotion features={domAnimation}>
      <section aria-labelledby="hero-title" className="fi-hero fi-home-dossier-hero fi-hero-clean">
        <EditorialBlueprintReveal />
        <div className="fi-hero-editorial">
          <FadeIn
            as="div"
            className="fi-hero-editorial-row fi-hero-editorial-row-intro"
            delay={0.9}
            distance={16}
            duration={0.6}
            motionReady={isMotionReady}
          >
            <div className="fi-hero-headline-group">
              <h1 id="hero-title" className="fi-hero-headline">
                <span className="fi-hero-headline-line fi-enter-word fi-enter-word-1">
                  Physician.
                </span>
                <span className="fi-hero-headline-line fi-enter-word fi-enter-word-2">
                  Founder.
                </span>
                <span className="fi-hero-headline-line fi-hero-headline-line-accent fi-enter-word fi-enter-word-3">
                  Builder of clinical intelligence.
                </span>
              </h1>
            </div>
            <div className="fi-hero-editorial-rail">
              <HeroTerminal />
              <div aria-label="Institutional ecosystem" className="fi-hero-logo-row">
                <a
                  aria-label="Buka situs Sentra Healthcare AI"
                  className="fi-hero-logo-link"
                  href="https://sentrahai.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Image
                    alt="Sentra"
                    className="fi-hero-logo fi-hero-logo-sentra"
                    height={395}
                    src="/sentra.png"
                    width={1013}
                  />
                </a>
                <a
                  aria-label="Buka situs RSIA Melinda"
                  className="fi-hero-logo-link"
                  href="https://melinda.co.id/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Image
                    alt="RSIA Melinda DHAI"
                    className="fi-hero-logo fi-hero-logo-melinda"
                    height={358}
                    src="/melinda.png"
                    width={768}
                  />
                </a>
                <a
                  aria-label="Buka GitHub dr Classy"
                  className="fi-hero-logo-link"
                  href="https://github.com/drclassy"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Image
                    alt="Sidelab"
                    className="fi-hero-logo fi-hero-logo-sidelab"
                    height={412}
                    src="/sidelab-logo2.png"
                    width={1539}
                  />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </LazyMotion>
  )
}
