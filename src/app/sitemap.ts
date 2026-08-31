import type { MetadataRoute } from 'next'
import { SITE } from './site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${SITE.url}/napryamy/nimetska`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE.url}/vykladachi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE.url}/kontakty`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/oferta`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE.url}/polityka-konfidentsiynosti`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
