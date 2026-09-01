import Link from 'next/link'
import type { DirectionsContent } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import styles from './DirectionsSection.module.css'

type Props = {
  content?: DirectionsContent
}

export default function DirectionsSection({ content = getDefaultContent().directions }: Props) {
  return (
    <section id="napryamy" className={styles.section}>
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

        <div className={styles.grid}>
          {content.items.map((item, index) => {
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
                      {content.ctaMore}
                      <span aria-hidden="true">→</span>
                    </span>
                  ) : (
                    <span className={styles.wait}>{content.ctaSoon}</span>
                  )}
                </div>
              </>
            )

            return item.available ? (
              <Link
                key={item.id}
                href={item.href}
                className={className}
                data-reveal="scale"
                style={{ ['--reveal-delay' as string]: `${index * 90}ms` }}
              >
                {body}
              </Link>
            ) : (
              <div
                key={item.id}
                className={className}
                aria-disabled="true"
                data-reveal="scale"
                style={{ ['--reveal-delay' as string]: `${index * 90}ms` }}
              >
                {body}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
