import type { Metadata } from 'next'
import { afterEach, describe, expect, it } from 'vitest'

import { buildPageMetadata, buildSiteMetadata, getSiteUrl } from '@/lib/site-metadata'

function expectSocialPreviewMetadata(metadata: Metadata) {
  expect(metadata.metadataBase?.toString()).toBe('https://ferdiiskandar.com/')
  expect(metadata.icons).toEqual({
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  })
  expect(metadata.openGraph?.images).toEqual([
    {
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      type: 'image/jpeg',
      alt: 'dr. Ferdi Iskandar — Augmented Intelligence Architect',
    },
  ])
  expect(metadata.twitter?.images).toEqual(['/og-image.jpg'])
}

describe('site metadata', () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL
  })

  it('falls back to the production public site url when no public site url is set', () => {
    expect(getSiteUrl()).toBe('https://ferdiiskandar.com')
  })

  it('normalizes configured public site urls without trailing slashes', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://preview.ferdiiskandar.com/'

    expect(getSiteUrl()).toBe('https://preview.ferdiiskandar.com')
  })

  it('falls back safely when the configured public site url is invalid', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'not a url'

    expect(getSiteUrl()).toBe('https://ferdiiskandar.com')
  })

  it('builds about-page metadata with route-specific title and pathname', () => {
    const metadata = buildPageMetadata({
      title: 'About',
      description:
        'Professional positioning dan worldview dr. Ferdi Iskandar sebagai physician-founder yang membangun applied intelligence di sektor healthcare, education, workforce, dan digital experience.',
      pathname: '/about',
    })

    expect(metadata.title).toBe('About | dr. Ferdi Iskandar')
    expect(metadata.description).toContain('worldview')
    expect(metadata.alternates?.canonical).toBe('/about')
    expect(metadata.openGraph?.url).toBe('/about')
    expectSocialPreviewMetadata(metadata)
  })

  it('builds classy-news metadata with the new route pathname', () => {
    const metadata = buildPageMetadata({
      title: 'Classy News',
      description:
        'Halaman editorial khusus Classy News di dalam ferdiiskandar: signal AI, open-source watch, dan jembatan terkurasi ke notes, works, speaking, serta contact surface.',
      pathname: '/classy-news',
    })

    expect(metadata.title).toBe('Classy News | dr. Ferdi Iskandar')
    expect(String(metadata.description)).toContain('Classy News')
    expect(metadata.alternates?.canonical).toBe('/classy-news')
    expect(metadata.openGraph?.url).toBe('/classy-news')
    expectSocialPreviewMetadata(metadata)
  })

  it('preserves the founder-style homepage title with social preview metadata', () => {
    const metadata = buildSiteMetadata()

    expect(metadata.title).toBe('dr. Ferdi Iskandar — Augmented Intelligence Architect')
    expect(String(metadata.description)).toContain('kecerdasan terapan')
    expect(String(metadata.description)).toContain('Profil pribadi')
    expect(metadata.alternates?.canonical).toBe('/')
    expect(metadata.openGraph?.url).toBe('/')
    expectSocialPreviewMetadata(metadata)
  })
})
