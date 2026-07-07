import Image from 'next/image'
import type { CSSProperties } from 'react'

import { footerMeta, siteIdentity } from '@/lib/site-content'

const scrollDelay = (ms: number): CSSProperties =>
  ({ '--fi-scroll-delay': `${ms}ms` }) as CSSProperties

export default function Footer() {
  return (
    <footer className="fi-shell fi-footer">
      <div className="fi-footer-meta" data-fi-scroll="fade">
        <span>
          © {footerMeta.year} {siteIdentity.name} · {footerMeta.organization}
        </span>
        <span>{footerMeta.location}</span>
      </div>
      <div
        aria-label="Panel tanda tangan"
        className="fi-footer-signature"
        data-fi-scroll="fade"
        style={scrollDelay(140)}
      >
        <Image
          alt="Tanda tangan dr. Ferdi Iskandar"
          className="fi-footer-signature-image"
          height={120}
          src="/sign.png"
          width={300}
        />
      </div>
    </footer>
  )
}
