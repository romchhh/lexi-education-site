import type { Metadata } from 'next'
import ContactSection from '../components/ContactSection'
import JsonLd from '../components/JsonLd'
import styles from '../pageShell.module.css'
import {
  breadcrumbJsonLd,
  createPageMetadata,
  localBusinessJsonLd,
  PAGE_SEO,
  webPageJsonLd,
} from '../seo'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.contacts)

export default function ContactsPage() {
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
        <h1 className={styles.srOnly}>Контакти та запис — LEXI.education</h1>
        <ContactSection />
      </main>
    </>
  )
}
