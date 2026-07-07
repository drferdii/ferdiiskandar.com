'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaKaggle, FaLinkedinIn, FaMedium, FaXTwitter } from 'react-icons/fa6'

import SectionNumberMark from '@/components/SectionNumberMark'
import {
  getRevealInitial,
  motionVariants,
  staggerContainer,
  motionViewport,
  transitions,
} from '@/lib/motion-variants'
import { socialLinks } from '@/lib/site-content'
import { useMotionReady } from '@/lib/use-motion-ready'

type IconKey = 'linkedin' | 'x' | 'medium' | 'github' | 'kaggle' | 'email'

const icons: Record<IconKey, React.ReactNode> = {
  linkedin: <FaLinkedinIn />,
  x: <FaXTwitter />,
  medium: <FaMedium />,
  github: <FaGithub />,
  kaggle: <FaKaggle />,
  email: <FaEnvelope />,
}

export default function Contact() {
  const shouldReduce = useReducedMotion()
  const isMotionReady = useMotionReady()
  const revealInitial = getRevealInitial(isMotionReady, shouldReduce, 'hidden')

  return (
    <section aria-labelledby="contact-title" className="fi-section" id="contact">
      <motion.div
        className="fi-section-head"
        initial={revealInitial}
        whileInView="visible"
        viewport={motionViewport}
        variants={motionVariants.fadeUp}
        transition={shouldReduce ? { duration: 0 } : transitions.medium}
      >
        <SectionNumberMark number="06" />
        <div>
          <div className="fi-kicker">Kontak</div>
          <h2 className="fi-section-title" id="contact-title">
            Permukaan yang tepat untuk percakapan yang tepat.
          </h2>
          <p className="fi-section-lead" style={{ marginTop: '20px' }}>
            Setiap kanal memiliki fungsi yang berbeda. Pilih permukaan yang paling sesuai dengan
            maksud, konteks, dan arah percakapan Anda.
          </p>
        </div>
      </motion.div>

      <motion.ul
        className="fi-contact-list"
        role="list"
        initial={revealInitial}
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer(0.1, 0.15)}
        transition={shouldReduce ? { staggerChildren: 0, delayChildren: 0 } : undefined}
      >
        {socialLinks.map((link) => (
          <motion.li
            className="fi-contact-row"
            key={link.icon}
            variants={motionVariants.fadeUp}
            transition={shouldReduce ? { duration: 0 } : transitions.medium}
          >
            <a
              aria-label={link.label}
              className="fi-contact-link"
              href={link.href}
              rel="noreferrer noopener"
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
            >
              <span className="fi-contact-platform">
                <span className="fi-contact-platform-icon" aria-hidden="true">
                  {icons[link.icon as IconKey]}
                </span>
                <span className="fi-contact-platform-name">{link.label}</span>
              </span>
              <span className="fi-contact-rule" aria-hidden="true" />
              <span className="fi-contact-desc">{link.value}</span>
              <motion.span
                className="fi-contact-arrow"
                aria-hidden="true"
                animate={shouldReduce ? undefined : { x: [0, 3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
              >
                ↗
              </motion.span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
