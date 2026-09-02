'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { BrandContent, NavItem } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import { useEnroll } from './EnrollContext'
import styles from './Navbar.module.css'

type Props = {
  transparent?: boolean
  brand?: BrandContent
  nav?: NavItem[]
}

export default function Navbar({
  transparent = false,
  brand = getDefaultContent().brand,
  nav = getDefaultContent().nav,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { open, openEnroll } = useEnroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) return
    if (!menuOpen) return
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [menuOpen, open])

  const handleEnroll = () => {
    setMenuOpen(false)
    window.setTimeout(() => openEnroll(), 0)
  }

  return (
    <>
      <nav className={`${styles.nav} ${transparent && !scrolled ? styles.transparent : styles.solid}`}>
        <Link href="/" className={styles.brand}>
          <Image
            src={brand.logo}
            alt={brand.name}
            width={168}
            height={168}
            priority
            className={styles.brandLogo}
          />
        </Link>

        <div className={styles.center}>
          {nav.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </div>

        <div className={styles.right}>
          <button type="button" className={styles.cta} onClick={openEnroll}>
            {brand.navCta}
            <span className={styles.ctaIcon} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12 L12 2 M5 2 H12 V9" />
              </svg>
            </span>
          </button>
        </div>

        <button className={styles.menuBtn} onClick={() => setMenuOpen(true)} aria-label="Відкрити меню">
          [menu]
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 14 L14 2 M6 2 H14 V10" />
          </svg>
        </button>
      </nav>

      <div className={`${styles.drawer} ${menuOpen ? styles.open : ''}`} role="dialog" aria-modal="true">
        <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label="Закрити">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4 L24 24 M24 4 L4 24" />
          </svg>
        </button>
        <Link href="/" className={styles.drawerLogo} onClick={() => setMenuOpen(false)}>
          <Image
            src={brand.logo}
            alt={brand.name}
            width={168}
            height={168}
            className={styles.drawerLogoImg}
          />
        </Link>
        {nav.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <button type="button" className={styles.drawerCta} onClick={handleEnroll}>
          Записатись
          <span className={styles.ctaIcon} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12 L12 2 M5 2 H12 V9" />
            </svg>
          </span>
        </button>
      </div>
    </>
  )
}
