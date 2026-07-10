export const siteIdentity = {
  name: 'dr. Ferdi Iskandar',
  shortName: 'Ferdi Iskandar',
  tagline: 'Kecerdasan Terapan / Indonesia',
  headline: 'Augmented Intelligence Architect',
  location: 'Kota Kediri, Jawa Timur, Indonesia',
}

export const sectionIds = [
  { id: 'top', label: 'Awal' },
  { id: 'impact', label: 'Fokus' },
  { id: 'expertise', label: 'Prinsip Berpikir' },
  { id: 'portfolio', label: 'Inisiatif & Sistem' },
  { id: 'story-sentra', label: 'Perjalanan' },
  { id: 'contact', label: 'Kontak' },
] as const

export const primaryNav = [
  { label: 'Profil', href: '/about' },
  { label: 'Karya', href: '/works' },
  { label: 'Catatan', href: '/notes' },
  { label: 'Berita', href: '/classy-news' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'CV', href: '/cv' },
  { label: 'Kontak', href: '/#contact' },
] as const

export const contactCards = [
  {
    label: 'Kolaborasi Strategis',
    value: 'Kanal koordinasi resmi pendiri',
    description:
      'Digunakan untuk pembahasan sistem kecerdasan lintas sektor, strategi institusional, dan kolaborasi yang dipimpin langsung oleh pendiri.',
    href: null,
  },
  {
    label: 'Program Institusional',
    value: 'Arah transformasi dan implementasi',
    description:
      'Digunakan ketika percakapan menyentuh layanan kesehatan, pendidikan, tenaga kerja, atau sistem digital yang berhadapan dengan publik.',
    href: null,
  },
  {
    label: 'Kontak Langsung',
    value: 'Tautan publik dan email langsung',
    description:
      'Permukaan publik terpilih tersedia di bawah ini untuk korespondensi, publikasi, dan kontak profesional.',
    href: null,
  },
] as const

export const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dr-ferdi-iskandar-1b620a3b5/',
    value: 'Profil profesional dan kehadiran eksekutif',
    icon: 'linkedin',
  },
  {
    label: 'X',
    href: 'https://x.com/ClaudesyI81047',
    value: 'Komentar publik dan aliran sinyal',
    icon: 'x',
  },
  {
    label: 'Medium',
    href: 'https://medium.com/',
    value: 'Tulisan panjang dan refleksi editorial',
    icon: 'medium',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/',
    value: 'Permukaan publik untuk kode',
    icon: 'github',
  },
  {
    label: 'Kaggle',
    href: 'https://www.kaggle.com/drferdiiskandar',
    value: 'Eksplorasi data dan model',
    icon: 'kaggle',
  },
  {
    label: 'Email',
    href: 'mailto:drferdiiskandar@sentrahai.com',
    value: 'drferdiiskandar@sentrahai.com',
    icon: 'email',
  },
] as const

export const thinkingMeta = {
  sectionLabel: 'Kecerdasan Klinis',
  editionLabel: 'Edisi Aktif',
  notesLabel: 'Catatan Pendiri / Aktif',
  lastUpdatedLabel: 'Terus berkembang',
} as const

export const footerMeta = {
  year: new Date().getFullYear(),
  location: siteIdentity.location,
  organization: 'Sentra Healthcare Artificial Intelligence',
} as const
