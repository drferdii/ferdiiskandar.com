'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { FaEnvelope, FaGithub, FaKaggle, FaLinkedinIn, FaMedium, FaXTwitter } from 'react-icons/fa6'

import SectionNumberMark from '@/components/SectionNumberMark'
import { socialLinks } from '@/lib/site-content'

gsap.registerPlugin(ScrollTrigger)

type IconKey = 'linkedin' | 'x' | 'medium' | 'github' | 'kaggle' | 'email'

const icons: Record<IconKey, React.ReactNode> = {
  linkedin: <FaLinkedinIn />,
  x: <FaXTwitter />,
  medium: <FaMedium />,
  github: <FaGithub />,
  kaggle: <FaKaggle />,
  email: <FaEnvelope />,
}

/**
 * Contact section pins briefly and reveals scrubbed directly by scroll
 * position: header first, then each contact row in sequence with its rule
 * line drawing alongside.
 */
export default function Contact() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const head = root.querySelector<HTMLElement>('[data-contact-head]')
      const rows = gsap.utils.toArray<HTMLElement>('[data-contact-row]', root)
      if (!head || rows.length === 0) return

      gsap.set(head, { y: 28, opacity: 0 })
      gsap.set(rows, { y: 24, opacity: 0 })

      const master = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
          refreshPriority: -1,
        },
      })

      master.to(head, { y: 0, opacity: 1, duration: 1 })

      rows.forEach((row) => {
        master.to(row, { y: 0, opacity: 1, duration: 1 }, '+=0.15')
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section aria-labelledby="contact-title" className="fi-section" id="contact" ref={rootRef}>
      <div className="fi-section-head" data-contact-head>
        <SectionNumberMark number="05" />
        <div>
          <div className="fi-kicker">Kontak</div>
          <h2 className="fi-section-title" id="contact-title">
            Kanal Komunikasi & Kolaborasi
          </h2>
          <p className="fi-section-lead" style={{ marginTop: '20px' }}>
            Setiap saluran komunikasi memiliki fungsi spesifik. Silakan pilih kanal yang paling
            sesuai dengan maksud dan konteks percakapan Anda.
          </p>
        </div>
      </div>

      <ul className="fi-contact-logos">
        {socialLinks.map((link) => (
          <li data-contact-row key={link.icon}>
            <a
              aria-label={link.label}
              className="fi-contact-logo-link"
              href={link.href}
              rel="noreferrer noopener"
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              title={link.value}
            >
              {icons[link.icon as IconKey]}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
