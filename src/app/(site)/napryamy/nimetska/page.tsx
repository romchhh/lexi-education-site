import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content'
import EnglishDirection from '../../../components/EnglishDirection'
import JsonLd from '../../../components/JsonLd'
import {
  breadcrumbJsonLd,
  courseJsonLd,
  createPageMetadata,
  PAGE_SEO,
  webPageJsonLd,
} from '../../../seo'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.german)

export default async function GermanDirectionPage() {
  const content = await getSiteContent()

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
            description: content.germanDirection.heroLead,
            path: '/napryamy/nimetska',
          }),
        ]}
      />
      <main>
        <EnglishDirection
          data={content.germanDirection}
          pricing={content.pricing}
          teachers={content.teachers}
        />
      </main>
    </>
  )
}
