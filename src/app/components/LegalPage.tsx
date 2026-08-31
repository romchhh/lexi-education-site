import type { LegalDocument } from '../legal'
import styles from './LegalPage.module.css'

type Props = {
  document: LegalDocument
}

export default function LegalPage({ document }: Props) {
  return (
    <article className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>{document.title}</h1>
          <p className={styles.updated}>Оновлено: {document.updated}</p>
          {document.intro ? <p className={styles.intro}>{document.intro}</p> : null}
        </header>

        <div className={styles.sections}>
          {document.sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
