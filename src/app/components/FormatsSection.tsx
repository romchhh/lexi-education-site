import type { FormatsContent } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import styles from './FormatsSection.module.css'

const BADGE_TILTS = [styles.tiltA, styles.tiltB, styles.tiltC, styles.tiltD, styles.tiltE, styles.tiltF] as const

type Props = {
  content?: FormatsContent
}

export default function FormatsSection({ content = getDefaultContent().formats }: Props) {
  return (
    <section id="formaty" className={styles.section}>
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
          {content.items.map((format, index) => (
            <article
              key={format.id}
              className={`${styles.card} ${format.accent ? styles.accent : ''}`}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${index * 70}ms` }}
            >
              <span className={`${styles.badge} ${BADGE_TILTS[index % BADGE_TILTS.length]}`}>
                {format.meta}
              </span>
              <span className={styles.index} aria-hidden="true">
                {index + 1}
              </span>
              <div className={styles.body}>
                <h3>{format.title}</h3>
                {format.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
