import type { Metadata } from 'next'
import LegalPage from '../../components/LegalPage'
import JsonLd from '../../components/JsonLd'
import { OFFERTA } from '../../legal'
import {
  breadcrumbJsonLd,
  createPageMetadata,
  PAGE_SEO,
  webPageJsonLd,
} from '../../seo'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.oferta)

export default function OfertaPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(PAGE_SEO.oferta),
          breadcrumbJsonLd([
            { name: 'Головна', path: '/' },
            { name: 'Публічна оферта', path: '/oferta' },
          ]),
        ]}
      />
      <main>
        <LegalPage document={OFFERTA} />
      </main>
    </>
  )
}
