import type { MetadataRoute } from 'next'

import { publicRoutes, routeToUrl } from '@/lib/public-routes'
import { getSiteUrl } from '@/lib/site-metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  return publicRoutes.map((route) => ({
    url: routeToUrl(siteUrl, route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
