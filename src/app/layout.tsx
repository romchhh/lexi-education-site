import type { Metadata, Viewport } from 'next'
import { BRAND } from './brand'
import { SITE } from './site'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#c45a75',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

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
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: '/',
    languages: { 'uk-UA': '/', 'x-default': '/' },
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
  manifest: '/manifest.webmanifest',
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
  other: {
    'geo.region': 'UA-46',
    'geo.placename': BRAND.city,
    'geo.position': `${SITE.geo.latitude};${SITE.geo.longitude}`,
    ICBM: `${SITE.geo.latitude}, ${SITE.geo.longitude}`,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  )
}
