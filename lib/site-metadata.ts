import type { Metadata } from 'next'

import { siteIdentity } from '@/lib/site-content'

type PageMetadataInput = {
  title: string
  description: string
  pathname: string
}

const DEFAULT_SITE_URL = 'https://ferdiiskandar.com'
const SITE_ICONS = {
  icon: [
    { url: '/favicon.ico', sizes: 'any' },
    { url: '/icon.png', type: 'image/png' },
  ],
  apple: '/apple-icon.png',
}
const SITE_OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  type: 'image/jpeg',
  alt: 'dr. Ferdi Iskandar — Augmented Intelligence Architect',
}

function normalizeSiteUrl(siteUrl: string | undefined): string {
  const candidate = siteUrl?.trim() || DEFAULT_SITE_URL

  try {
    const parsedUrl = new URL(candidate)
    return parsedUrl.toString().replace(/\/$/, '')
  } catch {
    return DEFAULT_SITE_URL
  }
}

export function getSiteUrl() {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
}

export function buildPageMetadata({ title, description, pathname }: PageMetadataInput): Metadata {
  const siteTitle = `${title} | ${siteIdentity.name}`

  return {
    title: siteTitle,
    description,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical: pathname,
    },
    icons: SITE_ICONS,
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      title: siteTitle,
      description,
      url: pathname,
      siteName: siteIdentity.shortName,
      images: [SITE_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description,
      images: [SITE_OG_IMAGE.url],
    },
  }
}

export function buildSiteMetadata(): Metadata {
  const title = `${siteIdentity.name} — ${siteIdentity.headline}`
  const description =
    'Profil dr. Ferdi Iskandar, pendiri di bidang kecerdasan terapan & kepemimpinan institusional untuk layanan kesehatan, pendidikan, dan sistem digital.'

  return {
    title,
    description,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical: '/',
    },
    icons: SITE_ICONS,
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      title,
      description,
      url: '/',
      siteName: siteIdentity.shortName,
      images: [SITE_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SITE_OG_IMAGE.url],
    },
  }
}
