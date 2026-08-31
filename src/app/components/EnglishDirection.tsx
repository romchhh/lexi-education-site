import { ENGLISH_DIRECTION } from '../brand'
import EnrollButton from './EnrollButton'
import PricingSection from './PricingSection'
import TeachersSection from './TeachersSection'
import styles from './EnglishDirection.module.css'

const TONE_CLASS = {
  blush: styles.toneBlush,
  warm: styles.toneWarm,
  white: styles.toneWhite,
  graphite: styles.toneGraphite,
  rose: styles.toneRose,
  soft: styles.toneSoft,
} as const

export default function EnglishDirection() {
  const data = ENGLISH_DIRECTION

  return (
    <article className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              {data.heroTitle}
              <br />
              <em>{data.heroTitleEm}</em>
            </h1>
            <p className={styles.heroTagline}>{data.heroTagline}</p>
            <p className={styles.heroLead}>{data.heroLead}</p>
            <EnrollButton className={styles.enroll}>Записатись на пробне</EnrollButton>
          </div>
          <div className={styles.heroFlag} aria-hidden="true">
            {data.flag}
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>{data.processTitle}</h2>
          <div className={styles.processGrid}>
            {data.process.map((item) => (
              <article
                key={item.id}
                className={`${styles.processCard} ${TONE_CLASS[item.tone]}`}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className={styles.centerCta}>
            <EnrollButton className={styles.enroll}>Записатись</EnrollButton>
          </div>
        </div>
      </section>

      <PricingSection />
      <TeachersSection language="Англійська" showTabs={false} headingAs="h2" />
    </article>
  )
}
