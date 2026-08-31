import Link from 'next/link'
import { DIRECTIONS } from '../brand'
import styles from './DirectionsSection.module.css'

export default function DirectionsSection() {
  return (
    <section id="napryamy" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.heading}>
            Напрями
            <br />
            <em>навчання</em>
          </h2>
          <p className={styles.lead}>
            Оберіть мову, з якої хочете почати. Зараз відкрита німецька —
            інші напрями з’являться незабаром.
          </p>
        </header>

        <div className={styles.grid}>
          {DIRECTIONS.map((item) => {
            const className = `${styles.card} ${item.available ? styles.available : styles.soon}`
            const body = (
              <>
                <div className={styles.top}>
                  <span className={styles.meta}>{item.meta}</span>
                  <span className={styles.langEn}>{item.titleEn}</span>
                </div>

                <div className={styles.flag} aria-hidden="true">
                  {item.flag}
                </div>

                <div className={styles.copy}>
                  <h3>{item.title}</h3>
                  <p className={styles.tagline}>{item.tagline}</p>
                  <p className={styles.blurb}>{item.blurb}</p>
                  {item.available ? (
                    <span className={styles.cta}>
                      Детальніше
                      <span aria-hidden="true">→</span>
                    </span>
                  ) : (
                    <span className={styles.wait}>Скоро відкриємо</span>
                  )}
                </div>
              </>
            )

            return item.available ? (
              <Link key={item.id} href={item.href} className={className}>
                {body}
              </Link>
            ) : (
              <div key={item.id} className={className} aria-disabled="true">
                {body}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
