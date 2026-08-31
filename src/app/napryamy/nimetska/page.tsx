import type { Metadata } from 'next'
import { GERMAN_DIRECTION } from '../../brand'
import EnglishDirection from '../../components/EnglishDirection'
import JsonLd from '../../components/JsonLd'
import {
  breadcrumbJsonLd,
  courseJsonLd,
  createPageMetadata,
  PAGE_SEO,
  webPageJsonLd,
} from '../../seo'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.german)

export default function GermanDirectionPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(PAGE_SEO.german),
          breadcrumbJsonLd([
            { name: 'Головна', path: '/' },
            { name: 'Німецька', path: '/napryamy/nimetska' },
          ]),
          courseJsonLd({
            name: PAGE_SEO.german.title,
            description: GERMAN_DIRECTION.heroLead,
            path: '/napryamy/nimetska',
          }),
        ]}
      />
      <main>
        <EnglishDirection />
      </main>
    </>
  )
}
