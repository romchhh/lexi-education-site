import type { LessonContent } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import EnrollButton from './EnrollButton'
import styles from './LessonSection.module.css'

type Props = {
  content?: LessonContent
}

export default function LessonSection({ content = getDefaultContent().lesson }: Props) {
  return (
    <section id="urok" className={styles.section}>
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

        <ol className={styles.steps}>
          {content.steps.map((step, index) => (
            <li
              key={step.num}
              className={styles.step}
              data-reveal="left"
              style={{ ['--reveal-delay' as string]: `${index * 100}ms` }}
            >
              <span className={styles.num} aria-hidden="true">
                {step.num}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div data-reveal style={{ ['--reveal-delay' as string]: '320ms' }}>
          <EnrollButton className={styles.cta}>{content.cta}</EnrollButton>
        </div>
      </div>
    </section>
  )
}
