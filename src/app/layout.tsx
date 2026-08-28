import type { Metadata, Viewport } from 'next'
import { BRAND } from './brand'
import SiteShell from './components/SiteShell'
import { SITE } from './site'
import './globals.css'
import './lexi.css'

export const viewport: Viewport = {
  themeColor: '#c45a75',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: SITE.titleTemplate,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name, url: SITE.url }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: 'education',
  alternates: {
    canonical: '/',
    languages: { uk: '/', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: BRAND.name,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${BRAND.name} — школа іноземних мов у Львові`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
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
  icons: {
    icon: [{ url: BRAND.logo, type: 'image/png' }],
    apple: [{ url: BRAND.logo }],
  },
  other: {
    'geo.region': 'UA-46',
    'geo.placename': BRAND.city,
  },
}

function JsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: BRAND.name,
    url: SITE.url,
    logo: `${SITE.url}${BRAND.logo}`,
    image: `${SITE.url}${BRAND.heroImage}`,
    description: SITE.description,
    email: BRAND.email,
    telephone: BRAND.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND.address,
      addressLocality: BRAND.city,
      addressCountry: 'UA',
    },
    sameAs: [BRAND.telegram],
    areaServed: {
      '@type': 'City',
      name: BRAND.city,
    },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: SITE.url,
    inLanguage: 'uk-UA',
    publisher: { '@type': 'Organization', name: BRAND.name },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <JsonLd />
        <div className="lexi">
          <SiteShell>{children}</SiteShell>
        </div>
      </body>
    </html>
  )
}
