import Image from 'next/image'
import Link from 'next/link'
import type { BrandContent, NavItem } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import { LEGAL_LINKS } from '../legal'
import styles from './Footer.module.css'

type Props = {
  brand?: BrandContent
  nav?: NavItem[]
}

export default function Footer({
  brand = getDefaultContent().brand,
  nav = getDefaultContent().nav,
}: Props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.top} data-reveal="fade">
        <div className={styles.brandBlock}>
          <Image
            src={brand.logo}
            alt={brand.name}
            width={136}
            height={136}
            className={styles.brandLogo}
          />
          <p className={styles.tagline}>Онлайн-школа іноземних мов</p>
          <p className={styles.taglineEm}>more than words</p>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <h3>Контакти</h3>
            <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={brand.telegram} target="_blank" rel="noreferrer">
              Telegram · {brand.telegramHandle}
            </a>
            <a href={brand.instagram} target="_blank" rel="noreferrer">
              Instagram · {brand.instagramHandle}
            </a>
          </div>
          <div className={styles.col}>
            <h3>Навігація</h3>
            {nav.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} LEXI.education. Усі права захищені.</span>
        <div className={styles.legal}>
          {LEGAL_LINKS.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <p className={styles.credit}>
          Розроблено{' '}
          <a href="https://telebots.site/uk" target="_blank" rel="noopener noreferrer">
            TeleBots
          </a>
        </p>
      </div>
    </footer>
  )
}
