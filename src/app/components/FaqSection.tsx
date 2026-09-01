'use client'

import { useState } from 'react'
import type { BrandContent, FaqContent } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import styles from './FaqSection.module.css'

type Props = {
  content?: FaqContent
  brand?: BrandContent
}

export default function FaqSection({
  content = getDefaultContent().faq,
  brand = getDefaultContent().brand,
}: Props) {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={`${styles.header} reveal-heading`} data-reveal>
          <h2 className={styles.heading}>
            {content.heading.line1}
            <br />
            <em>{content.heading.line2Em}</em>
          </h2>
          <p className={styles.lead}>{content.lead}</p>
        </header>

        <div className={styles.content}>
          <div className={styles.list}>
            {content.items.map((item, index) => {
              const isOpen = open === index
              return (
                <div
                  key={item.q}
                  className={`${styles.item} ${isOpen ? styles.open : ''}`}
                  data-reveal
                  style={{ ['--reveal-delay' as string]: `${index * 60}ms` }}
                >
                  <button
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span>{item.q}</span>
                    <span className={styles.icon} aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div className={styles.answer} hidden={!isOpen}>
                    <p>{item.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.telegramCard} data-reveal style={{ ['--reveal-delay' as string]: '240ms' }}>
          <p className={styles.telegramLabel}>{content.telegramLabel}</p>
          <p className={styles.telegramText}>{content.telegramText}</p>
          <a href={brand.telegram} className={styles.telegramBtn} target="_blank" rel="noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8-1.56 7.36c-.12.54-.43.67-.87.42l-2.4-1.77-1.16 1.12c-.13.13-.24.24-.49.24l.17-2.43 4.45-4.02c.19-.17-.04-.27-.3-.1l-5.5 3.46-2.37-.74c-.51-.16-.52-.51.11-.76l9.27-3.57c.43-.16.8.1.55.79z" />
            </svg>
            <span>{content.telegramBtn}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
