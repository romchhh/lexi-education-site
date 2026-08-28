'use client'

import { usePathname } from 'next/navigation'
import { EnrollProvider } from './EnrollContext'
import EnrollModal from './EnrollModal'
import FloatingEnroll from './FloatingEnroll'
import Footer from './Footer'
import Navbar from './Navbar'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const transparent = pathname === '/'

  return (
    <EnrollProvider>
      <Navbar transparent={transparent} />
      {children}
      <Footer />
      <FloatingEnroll />
      <EnrollModal />
    </EnrollProvider>
  )
}
