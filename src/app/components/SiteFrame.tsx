import { Manrope, Montserrat, Oswald, Unbounded } from 'next/font/google'
import { getSiteContent } from '@/lib/content'
import SiteShell from './SiteShell'
import '../lexi.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700', '800'],
  variable: '--font-unbounded',
  display: 'swap',
})

export default async function SiteFrame({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent()

  return (
    <div
      className={`lexi ${manrope.variable} ${oswald.variable} ${montserrat.variable} ${unbounded.variable}`}
    >
      <SiteShell brand={content.brand} nav={content.nav}>
        {children}
      </SiteShell>
    </div>
  )
}
