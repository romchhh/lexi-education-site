import type { Metadata } from 'next'
import LegalPage from '../components/LegalPage'
import JsonLd from '../components/JsonLd'
import { PRIVACY_POLICY } from '../legal'
import {
  breadcrumbJsonLd,
  createPageMetadata,
  PAGE_SEO,
  webPageJsonLd,
} from '../seo'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.privacy)

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(PAGE_SEO.privacy),
          breadcrumbJsonLd([
            { name: 'Головна', path: '/' },
            { name: 'Політика конфіденційності', path: '/polityka-konfidentsiynosti' },
          ]),
        ]}
      />
      <main>
        <LegalPage document={PRIVACY_POLICY} />
      </main>
    </>
  )
}
