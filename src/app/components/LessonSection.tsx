import { LESSON_STEPS } from '../brand'
import EnrollButton from './EnrollButton'
import styles from './LessonSection.module.css'

export default function LessonSection() {
  return (
    <section id="urok" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.heading}>
            Почніть із
            <br />
            <em>пробного</em>
          </h2>
          <p className={styles.lead}>
            Пробне заняття — безкоштовне. Ви не повинні самостійно вирішувати,
            який формат вам потрібен — ми допоможемо підібрати його разом.
          </p>
        </header>

        <ol className={styles.steps}>
          {LESSON_STEPS.map((step) => (
            <li key={step.num} className={styles.step}>
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

        <EnrollButton className={styles.cta}>
          Записатись на пробне заняття
        </EnrollButton>
      </div>
    </section>
  )
}
