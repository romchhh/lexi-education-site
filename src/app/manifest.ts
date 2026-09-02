import type { MetadataRoute } from 'next'
import { BRAND } from './brand'
import { SITE } from './site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.name,
    short_name: 'LEXI',
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#c45a75',
    lang: 'uk',
    orientation: 'portrait-primary',
    categories: ['education'],
    icons: [
      {
        src: BRAND.icon192,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: BRAND.icon512,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: BRAND.icon512,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
