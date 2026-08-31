import type { Metadata } from 'next'
import { ENGLISH_DIRECTION } from '../../brand'
import EnglishDirection from '../../components/EnglishDirection'
import JsonLd from '../../components/JsonLd'
import {
  breadcrumbJsonLd,
  courseJsonLd,
  createPageMetadata,
  PAGE_SEO,
  webPageJsonLd,
} from '../../seo'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.english)

export default function EnglishDirectionPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(PAGE_SEO.english),
          breadcrumbJsonLd([
            { name: 'Головна', path: '/' },
            { name: 'Англійська', path: '/napryamy/angliiska' },
          ]),
          courseJsonLd({
            name: PAGE_SEO.english.title,
            description: ENGLISH_DIRECTION.heroLead,
            path: '/napryamy/angliiska',
          }),
        ]}
      />
      <main>
        <EnglishDirection />
      </main>
    </>
  )
}
