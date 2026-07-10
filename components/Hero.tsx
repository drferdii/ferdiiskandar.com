'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { FaLinkedin } from 'react-icons/fa'
import {
  SiMedium,
  SiOrcid,
  SiX,
  SiSubstack,
  SiKaggle,
  SiReddit,
  SiHuggingface,
} from 'react-icons/si'

import { FadeIn } from '@/components/HeroMotion'
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
                  dr Ferdi Iskandar
                </span>
              </h1>
              <p className="fi-hero-subtitle fi-enter-word fi-enter-word-2">
                CEO, Founder. Clinical Intelligence
              </p>
              <p className="fi-hero-affiliations fi-enter-word fi-enter-word-3">
                Sentra Artificial Intelligence · RSIA Melinda DHAI
              </p>
              <div className="fi-hero-signature-wrap">
                {!isMotionReady ? (
                  <div style={{ width: 'fit-content', display: 'inline-block' }}>
                    <Image
                      src="/sign.png"
                      alt="Tanda tangan dr. Ferdi Iskandar"
                      width={180}
                      height={72}
                      className="fi-hero-signature"
                      priority
                    />
                  </div>
                ) : (
                  <m.div
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                    transition={{ duration: 1.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ width: 'fit-content', display: 'inline-block' }}
                  >
                    <Image
                      src="/sign.png"
                      alt="Tanda tangan dr. Ferdi Iskandar"
                      width={180}
                      height={72}
                      className="fi-hero-signature"
                      priority
                    />
                  </m.div>
                )}
              </div>
              <div className="fi-hero-socials">
                <a
                  href="https://medium.com/@drferdiiskandar"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Medium"
                  className="fi-hero-social-link"
                >
                  <SiMedium size={28} />
                </a>
                <a
                  href="https://orcid.org/0009-0003-3788-1307"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="ORCID iD"
                  className="fi-hero-social-link"
                >
                  <SiOrcid size={28} />
                </a>
                <a
                  href="https://x.com/ClaudesyI81047"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X (Twitter)"
                  className="fi-hero-social-link"
                >
                  <SiX size={28} />
                </a>
                <a
                  href="https://substack.com/@drferdiiskandar"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Substack"
                  className="fi-hero-social-link"
                >
                  <SiSubstack size={28} />
                </a>
                <a
                  href="https://www.kaggle.com/drferdiiskandar"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Kaggle"
                  className="fi-hero-social-link"
                >
                  <SiKaggle size={28} />
                </a>
                <a
                  href="https://www.reddit.com/user/SixCupaCoffee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Reddit"
                  className="fi-hero-social-link"
                >
                  <SiReddit size={28} />
                </a>
                <a
                  href="https://www.linkedin.com/in/dr-ferdi-iskandar-1b620a3b5"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="fi-hero-social-link"
                >
                  <FaLinkedin size={28} />
                </a>
                <a
                  href="https://huggingface.co/dr-Ferdi"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Hugging Face"
                  className="fi-hero-social-link"
                >
                  <SiHuggingface size={28} />
                </a>
              </div>
            </div>
            <div className="fi-hero-editorial-rail">
              <HeroTerminal />
            </div>
          </FadeIn>
        </div>
      </section>
    </LazyMotion>
  )
}
