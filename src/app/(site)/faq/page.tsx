import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content'
import FaqSection from '../../components/FaqSection'
import JsonLd from '../../components/JsonLd'
import styles from '../../pageShell.module.css'
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  PAGE_SEO,
  webPageJsonLd,
} from '../../seo'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.faq)

export default async function FaqPage() {
  const content = await getSiteContent()

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(PAGE_SEO.faq),
          breadcrumbJsonLd([
            { name: 'Головна', path: '/' },
            { name: 'Часті питання', path: '/faq' },
          ]),
          faqPageJsonLd(content.faq.items),
        ]}
      />
      <main className={styles.main}>
        <h1 className={styles.srOnly}>Часті питання — LEXI.education</h1>
        <FaqSection content={content.faq} brand={content.brand} />
      </main>
    </>
  )
}
