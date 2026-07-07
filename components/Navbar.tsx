'use client'

import { LazyMotion, domAnimation } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { FadeIn } from '@/components/HeroMotion'
import { primaryNav } from '@/lib/site-content'
import { useMotionReady } from '@/lib/use-motion-ready'

const speakingNav = [
  { label: 'Profil', href: '/about' },
  { label: 'Karya', href: '/works' },
  { label: 'Catatan', href: '/notes' },
  { label: 'Berita', href: '/classy-news' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'CV', href: '/cv' },
  { label: 'Kontak', href: '/#contact' },
] as const

export default function Navbar() {
  const isMotionReady = useMotionReady()
  const pathname = usePathname()
  const router = useRouter()
  const isSpeakingPage = pathname === '/speaking'
  const navItems = isSpeakingPage ? speakingNav : primaryNav

  function isActive(href: string) {
    if (href === '/#contact') return pathname === '/'
    return pathname === href
  }

  return (
    <LazyMotion features={domAnimation}>
      <header
        aria-label={isSpeakingPage ? 'Primary navigation' : 'Navigasi utama'}
        className="fi-nav fi-nav-modernized"
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
              >
                {navItems.map((item) => (
                  <Link
                    className={[
                      'fi-nav-editorial-link fi-magnetic-btn fi-nav-slide fi-focus-ring',
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
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </FadeIn>
      </header>
    </LazyMotion>
  )
}
