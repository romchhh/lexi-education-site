'use client'

import { usePathname } from 'next/navigation'
import type { BrandContent, NavItem } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import AnalyticsBeacon from './AnalyticsBeacon'
import { EnrollProvider } from './EnrollContext'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollRevealInit from './ScrollRevealInit'

import EnrollModal from './EnrollModal'
import FloatingEnroll from './FloatingEnroll'

type Props = {
  children: React.ReactNode
  brand?: BrandContent
  nav?: NavItem[]
}

export default function SiteShell({
  children,
  brand = getDefaultContent().brand,
  nav = getDefaultContent().nav,
}: Props) {
  const pathname = usePathname()
  const transparent = pathname === '/'

  return (
    <EnrollProvider>
      <ScrollRevealInit />
      <AnalyticsBeacon />
      <Navbar transparent={transparent} brand={brand} nav={nav} />
      {children}
      <Footer brand={brand} nav={nav} />
      <FloatingEnroll />
      <EnrollModal />
    </EnrollProvider>
  )
}
