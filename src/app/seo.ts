import type { Metadata } from 'next'
import { BRAND } from './brand'
import { SITE } from './site'

export type PageSeoConfig = {
  title: string
  description: string
  path: string
  keywords?: readonly string[]
  ogImage?: string
  noIndex?: boolean
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE.url}${normalized}`
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = SITE.ogImage,
  noIndex = false,
}: PageSeoConfig): Metadata {
  const canonical = path === '/' ? '/' : path
  const pageUrl = absoluteUrl(canonical)
  const ogTitle = path === '/' ? SITE.title : `${title} · ${BRAND.name}`

  return {
    ...(path === '/' ? { title: SITE.title } : { title }),
    description,
    ...(keywords?.length ? { keywords: [...keywords] } : {}),
    alternates: {
      canonical,
      languages: {
        'uk-UA': canonical,
        'x-default': canonical,
      },
    },
    openGraph: {
      type: 'website',
      locale: SITE.locale,
      url: pageUrl,
      siteName: BRAND.name,
      title: ogTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [ogImage],
    },
    ...(noIndex
      ? { robots: { index: false, follow: true } }
      : {
          robots: {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              'max-image-preview': 'large',
              'max-snippet': -1,
              'max-video-preview': -1,
            },
          },
        }),
  }
}

export const PAGE_SEO = {
  home: {
    title: SITE.title,
    description: SITE.description,
    path: '/',
    keywords: SITE.keywords,
  },
  german: {
    title: 'Німецька мова для дітей у Львові',
    description:
      'Курси німецької для дітей у LEXI.education — мінігрупи до 6 учнів, гра, живе спілкування, Sprachklub та безкоштовне пробне заняття. Формати, ціни, викладачі.',
    path: '/napryamy/nimetska',
    keywords: [
      'німецька для дітей Львів',
      'курси німецької дітям',
      'німецька мінігрупи',
      'школа німецької Львів',
      'LEXI education німецька',
    ],
  },
  teachers: {
    title: 'Викладачі німецької',
    description:
      'Команда викладачів LEXI.education у Львові — досвід роботи з дітьми, Goethe-Zertifikat, Sprachklub та підготовка до іспитів.',
    path: '/vykladachi',
    keywords: [
      'викладачі німецької Львів',
      'репетитори німецької для дітей',
      'вчителі LEXI education',
    ],
  },
  faq: {
    title: 'Часті питання',
    description:
      'Відповіді про пробне заняття, формати навчання, розмір груп, пакети зі знижкою та запис у школу іноземних мов LEXI.education у Львові.',
    path: '/faq',
    keywords: [
      'питання курси німецької',
      'формати навчання LEXI',
      'скільки дітей у групі',
    ],
  },
  contacts: {
    title: 'Контакти та запис',
    description:
      `Запишіться на безкоштовне заняття в LEXI.education: ${BRAND.phone}, ${BRAND.email}, Telegram та Instagram.`,
    path: '/kontakty',
    keywords: [
      'LEXI education контакти',
      'школа іноземних мов Львів',
      'запис на німецьку Львів',
    ],
  },
  oferta: {
    title: 'Публічна оферта',
    description:
      'Публічна оферта LEXI.education — умови надання освітніх послуг, пробне заняття, оплата, перенесення та скасування занять.',
    path: '/oferta',
  },
  privacy: {
    title: 'Політика конфіденційності',
    description:
      'Політика конфіденційності LEXI.education — як ми збираємо, використовуємо та захищаємо персональні дані учнів і відвідувачів сайту.',
    path: '/polityka-konfidentsiynosti',
  },
} as const satisfies Record<string, PageSeoConfig>

type BreadcrumbItem = { name: string; path: string }

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE.url}/#organization`,
    name: BRAND.name,
    url: SITE.url,
    logo: absoluteUrl(BRAND.logo),
    image: absoluteUrl(BRAND.heroImage),
    description: SITE.description,
    email: BRAND.email,
    telephone: BRAND.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BRAND.city,
      addressRegion: 'Львівська область',
      addressCountry: 'UA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    sameAs: [BRAND.telegram, BRAND.instagram],
    areaServed: {
      '@type': 'City',
      name: BRAND.city,
    },
    knowsLanguage: ['uk', 'en'],
  }
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LanguageSchool',
    '@id': `${SITE.url}/#localbusiness`,
    name: BRAND.name,
    url: SITE.url,
    image: absoluteUrl(BRAND.heroImage),
    logo: absoluteUrl(BRAND.logo),
    description: SITE.description,
    telephone: BRAND.phone,
    email: BRAND.email,
    priceRange: '₴₴',
    currenciesAccepted: 'UAH',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: BRAND.city,
      addressRegion: 'Львівська область',
      addressCountry: 'UA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: SITE.openingHours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BRAND.phone,
      email: BRAND.email,
      contactType: 'customer service',
      availableLanguage: ['Ukrainian', 'English'],
      areaServed: 'UA',
    },
    parentOrganization: { '@id': `${SITE.url}/#organization` },
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: BRAND.name,
    url: SITE.url,
    inLanguage: 'uk-UA',
    description: SITE.description,
    publisher: { '@id': `${SITE.url}/#organization` },
    potentialAction: {
      '@type': 'ReserveAction',
      name: 'Запис на безкоштовне пробне заняття',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: absoluteUrl('/kontakty'),
        inLanguage: 'uk-UA',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
    },
  }
}

export function faqPageJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function courseJsonLd({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url: absoluteUrl(path),
    provider: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'uk-UA',
    teaches: 'German language',
    educationalLevel: 'Beginner to Advanced',
    availableLanguage: 'uk',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'UAH',
      description: 'Безкоштовне пробне заняття',
      url: absoluteUrl('/kontakty'),
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'blended',
      courseWorkload: 'PT1H',
      location: {
        '@type': 'Place',
        name: BRAND.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: BRAND.city,
          addressCountry: 'UA',
        },
      },
    },
  }
}

export function howToJsonLd({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: readonly { title: string; text: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.text,
    })),
  }
}

export function webPageJsonLd({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'uk-UA',
  }
}

export function offerJsonLd({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name,
    description,
    url: absoluteUrl(path),
    price: '0',
    priceCurrency: 'UAH',
    availability: 'https://schema.org/InStock',
    seller: { '@id': `${SITE.url}/#organization` },
    eligibleRegion: {
      '@type': 'Country',
      name: 'Ukraine',
    },
  }
}
