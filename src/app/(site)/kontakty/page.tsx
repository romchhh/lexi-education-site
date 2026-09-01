import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content'
import ContactSection from '../../components/ContactSection'
import JsonLd from '../../components/JsonLd'
import styles from '../../pageShell.module.css'
import {
  breadcrumbJsonLd,
  createPageMetadata,
  localBusinessJsonLd,
  PAGE_SEO,
  webPageJsonLd,
} from '../../seo'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.contacts)

export default async function ContactsPage() {
  const content = await getSiteContent()

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(PAGE_SEO.contacts),
          breadcrumbJsonLd([
            { name: 'Головна', path: '/' },
            { name: 'Контакти', path: '/kontakty' },
          ]),
          localBusinessJsonLd(),
        ]}
      />
      <main className={styles.main}>
        <h1 className={styles.srOnly}>Контакти та запис — {content.brand.name}</h1>
        <ContactSection brand={content.brand} content={content.contact} />
      </main>
    </>
  )
}
