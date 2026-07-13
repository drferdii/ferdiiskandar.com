import {
  contactCards,
  footerMeta,
  primaryNav,
  sectionIds,
  siteIdentity,
  socialLinks,
  thinkingMeta,
} from '@/lib/site-content'

describe('site content', () => {
  it('defines the current homepage reading order', () => {
    expect(sectionIds).toEqual([
      { id: 'top', label: 'Awal' },
      { id: 'impact', label: 'Fokus' },
      { id: 'expertise', label: 'Prinsip Berpikir' },
      { id: 'portfolio', label: 'Inisiatif & Sistem' },
      { id: 'story-sentra', label: 'Perjalanan' },
      { id: 'contact', label: 'Kontak' },
    ])
  })

  it('uses route-based navigation for the current public surfaces', () => {
    expect(primaryNav).toEqual([
      { label: 'Profil', href: '/about' },
      { label: 'Karya', href: '/works' },
      { label: 'Kisah Sentra', href: '/kisah-sentra' },
      { label: 'Human – AI Collab', href: '/bagaimana-sentra-dibangun' },
      { label: 'Tanpa Naskah', href: '/tanpa-naskah' },
      { label: 'Catatan', href: '/notes' },
      { label: 'Speaking', href: '/speaking' },
      { label: 'CV', href: '/cv' },
      { label: 'Kontak', href: '/#contact' },
    ])
  })

  it('keeps contact cards intentionally non-clickable while public links stay direct', () => {
    expect(contactCards.every((card) => card.href === null)).toBe(true)
    expect(socialLinks).toHaveLength(6)
    expect(
      socialLinks.every(
        (link) => link.href.startsWith('https://') || link.href.startsWith('mailto:'),
      ),
    ).toBe(true)
  })

  it('keeps the current founder identity metadata stable', () => {
    expect(siteIdentity.headline).toBe('Augmented Intelligence Architect')
    expect(thinkingMeta.editionLabel).toBe('Edisi Aktif')
    expect(footerMeta.year).toBe(new Date().getFullYear())
  })
})
