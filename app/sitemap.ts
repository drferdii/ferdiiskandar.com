import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/lib/site-metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getSiteUrl(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${getSiteUrl()}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${getSiteUrl()}/works`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${getSiteUrl()}/notes`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${getSiteUrl()}/kisah-sentra`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${getSiteUrl()}/tanpa-naskah`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${getSiteUrl()}/bagaimana-sentra-dibangun`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${getSiteUrl()}/speaking`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${getSiteUrl()}/cv`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
