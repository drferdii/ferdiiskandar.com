import fs from 'node:fs'
import path from 'node:path'

import { publicRoutes } from '@/lib/public-routes'
import sitemap from '@/app/sitemap'

describe('sitemap', () => {
  it('lists all public editorial routes from the registry on the production domain', () => {
    const entries = sitemap()
    const urls = entries.map((entry) => entry.url)

    expect(urls).toEqual(publicRoutes.map((route) => route.path === '/' ? 'https://ferdiiskandar.com' : `https://ferdiiskandar.com${route.path}`))
    expect(urls).toContain('https://ferdiiskandar.com/sebelum-pasien-jatuh')
    expect(new Set(urls).size).toBe(urls.length)
    expect(urls.every((url) => url.startsWith('https://ferdiiskandar.com'))).toBe(true)
    expect(urls.every((url) => !url.includes('/api/'))).toBe(true)
  })

  it('keeps the registry aligned with concrete app page files', () => {
    const appDir = path.join(process.cwd(), 'app')
    const routePaths = publicRoutes.map((route) => route.path)

    for (const routePath of routePaths) {
      const pagePath = routePath === '/' ? path.join(appDir, 'page.tsx') : path.join(appDir, routePath.slice(1), 'page.tsx')
      expect(fs.existsSync(pagePath), `${routePath} must have app page.tsx`).toBe(true)
    }
  })
})
