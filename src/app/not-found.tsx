import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: 'Сторінку не знайдено',
  description: 'Цієї сторінки немає. Поверніться на головну LEXI.education.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.glowSoft} aria-hidden="true" />

      <div className={styles.body}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 className={styles.title}>
          Ой, цієї
          <br />
          <em>сторінки</em> немає
        </h1>
        <p className={styles.lead}>
          Можливо, посилання застаріле або адресу введено з помилкою.
          Поверніться на головну — там усе на місці.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>
            <span>На головну</span>
            <span className={styles.icon} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12 L12 2 M5 2 H12 V9" />
              </svg>
            </span>
          </Link>
          <Link href="/#contact" className={styles.secondary}>
            Безкоштовне заняття
          </Link>
        </div>
      </div>
    </main>
  )
}
