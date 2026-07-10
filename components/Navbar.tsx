'use client'

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { FadeIn } from '@/components/HeroMotion'
import { primaryNav } from '@/lib/site-content'
import { useMotionReady } from '@/lib/use-motion-ready'

const speakingNav = [
  { label: 'Profil', href: '/about' },
  { label: 'Karya', href: '/works' },
  { label: 'Catatan', href: '/notes' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'CV', href: '/cv' },
  { label: 'Kontak', href: '/#contact' },
] as const

type HoverRect = { left: number; width: number }

export default function Navbar() {
  const isMotionReady = useMotionReady()
  const pathname = usePathname()
  const router = useRouter()
  const isSpeakingPage = pathname === '/speaking'
  const navItems = isSpeakingPage ? speakingNav : primaryNav

  const [isScrolled, setIsScrolled] = useState(false)
  const [hoverRect, setHoverRect] = useState<HoverRect | null>(null)
  const linksRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function isActive(href: string) {
    if (href === '/#contact') return pathname === '/'
    return pathname === href
  }

  function handleLinkHover(event: React.MouseEvent<HTMLElement>) {
    const container = linksRef.current
    if (!container) return
    const linkRect = event.currentTarget.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    setHoverRect({ left: linkRect.left - containerRect.left, width: linkRect.width })
  }

  return (
    <LazyMotion features={domAnimation}>
      <header
        aria-label={isSpeakingPage ? 'Primary navigation' : 'Navigasi utama'}
        className={['fi-nav', 'fi-nav-modernized', isScrolled ? 'is-scrolled' : '']
          .join(' ')
          .trim()}
      >
        <FadeIn
          as="div"
          delay={0.06}
          distance={14}
          duration={0.82}
          motionReady={isMotionReady}
          y={-14}
        >
          <div className="fi-shell fi-nav-editorial-shell">
            <Link
              aria-label={isSpeakingPage ? 'Back to homepage' : 'Kembali ke beranda'}
              className="fi-nav-editorial-mark"
              href="/"
            >
              <Image
                alt="Classy mark"
                className="fi-nav-editorial-mark-image"
                height={48}
                priority
                src="/classy-square.png"
                width={48}
              />
            </Link>

            <div className="fi-nav-editorial-stack">
              <div className="fi-nav-editorial-edition">
                {isSpeakingPage
                  ? 'Current issue / Speaker dossier 2026'
                  : 'Edisi aktif / Dossier pendiri 2026'}
              </div>

              <nav
                aria-label={isSpeakingPage ? 'Primary navigation' : 'Navigasi utama'}
                className="fi-nav-editorial-links"
                onMouseLeave={() => setHoverRect(null)}
                ref={linksRef}
              >
                <AnimatePresence>
                  {hoverRect && (
                    <m.span
                      animate={{ opacity: 1, x: hoverRect.left, width: hoverRect.width }}
                      className="fi-nav-hover-pill"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0, x: hoverRect.left, width: hoverRect.width }}
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </AnimatePresence>
                {navItems.map((item) => {
                  if (item.label === 'Karya') {
                    return (
                      <div className="fi-nav-dropdown" key={item.label}>
                        <Link
                          className={[
                            'fi-nav-editorial-link fi-focus-ring',
                            isActive(item.href) ? 'is-active' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          href={item.href}
                          onMouseEnter={handleLinkHover}
                        >
                          {item.label}{' '}
                          <span
                            style={{ fontSize: '8px', marginLeft: '4px', verticalAlign: 'middle' }}
                          >
                            ▼
                          </span>
                        </Link>
                        <div className="fi-nav-dropdown-content">
                          <Link href="/works" className="fi-nav-dropdown-item">
                            Semua Karya
                          </Link>
                          <a
                            href="https://sentrahai.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="fi-nav-dropdown-item"
                          >
                            Sentraverse
                          </a>
                        </div>
                      </div>
                    )
                  }
                  return (
                    <Link
                      className={[
                        'fi-nav-editorial-link fi-focus-ring',
                        isActive(item.href) ? 'is-active' : '',
                        item.label === (isSpeakingPage ? 'Contact' : 'Kontak') ? 'is-contact' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      href={item.href}
                      key={item.label}
                      onClick={() => {
                        if (!item.href.startsWith('/#')) return
                        router.push(item.href)
                      }}
                      onMouseEnter={handleLinkHover}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </FadeIn>
      </header>
    </LazyMotion>
  )
}
