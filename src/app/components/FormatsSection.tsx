import { FORMATS } from '../brand'
import styles from './FormatsSection.module.css'

const BADGE_TILTS = [styles.tiltA, styles.tiltB, styles.tiltC, styles.tiltD, styles.tiltE, styles.tiltF] as const

export default function FormatsSection() {
  return (
    <section id="formaty" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.heading}>
            Формати
            <br />
            <em>навчання</em>
          </h2>
          <p className={styles.lead}>
            Від індивідуальних занять до розмовного клубу — обирайте темп і формат,
            який підходить саме вам. Або почніть із безкоштовного пробного заняття.
          </p>
        </header>

        <div className={styles.grid}>
          {FORMATS.map((format, index) => (
            <article
              key={format.id}
              className={`${styles.card} ${'accent' in format && format.accent ? styles.accent : ''}`}
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
