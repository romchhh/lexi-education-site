import type { Metadata } from 'next'
import { TEACHERS } from '../brand'
import TeachersSection from '../components/TeachersSection'
import JsonLd from '../components/JsonLd'
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  PAGE_SEO,
  webPageJsonLd,
} from '../seo'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.teachers)

function teachersJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Викладачі LEXI.education',
    itemListElement: TEACHERS.map((teacher, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: teacher.fullName,
        jobTitle: `Викладач ${teacher.language}`,
        description: teacher.bio,
        image: teacher.photo,
        worksFor: {
          '@type': 'EducationalOrganization',
          name: 'LEXI.education',
          url: absoluteUrl('/'),
        },
      },
    })),
  }
}

export default function TeachersPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(PAGE_SEO.teachers),
          breadcrumbJsonLd([
            { name: 'Головна', path: '/' },
            { name: 'Викладачі', path: '/vykladachi' },
          ]),
          teachersJsonLd(),
        ]}
      />
      <main>
        <TeachersSection />
      </main>
    </>
  )
}
