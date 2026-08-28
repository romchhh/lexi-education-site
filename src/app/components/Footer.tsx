import Image from 'next/image'
import { BRAND, NAV } from '../brand'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandBlock}>
          <Image
            src={BRAND.logo}
            alt={BRAND.name}
            width={180}
            height={60}
            className={styles.brandLogo}
          />
          <p className={styles.tag}>Школа іноземних мов у Львові</p>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <h3>Графік</h3>
            <p>Пн–Пт: 9:00 – 19:00</p>
            <p>Сб: 10:00 – 15:00</p>
          </div>
          <div className={styles.col}>
            <h3>Контакти</h3>
            <p>
              {BRAND.address}
              <br />
              {BRAND.city}
            </p>
            <p>{BRAND.phone}</p>
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </div>
          <div className={styles.col}>
            <h3>Навігація</h3>
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} LEXI.education. Усі права захищені.</span>
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
