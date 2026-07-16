import type { MetadataRoute } from 'next'

export type PublicRoute = {
  path: '/' | '/about' | '/works' | '/notes' | '/kisah-sentra' | '/tanpa-naskah' | '/bagaimana-sentra-dibangun' | '/sebelum-pasien-jatuh' | '/speaking' | '/cv'
  label: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
  nav?: boolean
}

export const publicRoutes = [
  { path: '/', label: 'Beranda', changeFrequency: 'monthly', priority: 1 },
  { path: '/about', label: 'Profil', changeFrequency: 'monthly', priority: 0.8, nav: true },
  { path: '/works', label: 'Karya', changeFrequency: 'monthly', priority: 0.8, nav: true },
  { path: '/notes', label: 'Catatan', changeFrequency: 'monthly', priority: 0.8, nav: true },
  { path: '/kisah-sentra', label: 'Kisah Sentra', changeFrequency: 'monthly', priority: 0.7, nav: true },
  { path: '/tanpa-naskah', label: 'Tanpa Naskah', changeFrequency: 'monthly', priority: 0.7, nav: true },
  { path: '/bagaimana-sentra-dibangun', label: 'Human – AI Collab', changeFrequency: 'monthly', priority: 0.7, nav: true },
  { path: '/sebelum-pasien-jatuh', label: 'Sebelum Pasien Jatuh', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/speaking', label: 'Speaking', changeFrequency: 'monthly', priority: 0.8, nav: true },
  { path: '/cv', label: 'CV', changeFrequency: 'monthly', priority: 0.8, nav: true },
] as const satisfies readonly PublicRoute[]

export function routeToUrl(baseUrl: string, routePath: PublicRoute['path']): string {
  const normalizedBase = baseUrl.replace(/\/$/, '')
  return routePath === '/' ? normalizedBase : `${normalizedBase}${routePath}`
}
