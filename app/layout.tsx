import { Fragment_Mono, Geist, Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import type { ReactNode } from 'react'

import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import { buildSiteMetadata } from '@/lib/site-metadata'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700'],
  variable: '--font-playfair',
})

const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-fragment-mono',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
})

export const metadata = buildSiteMetadata()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${fragmentMono.variable} ${jetBrainsMono.variable} ${geist.variable} ${playfairDisplay.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head />
      <body suppressHydrationWarning>
        <a className="fi-skip-link" href="#main-content">
          Skip to content
        </a>
        <SmoothScrollProvider />
        {children}
      </body>
    </html>
  )
}
