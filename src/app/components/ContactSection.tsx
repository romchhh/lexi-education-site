import { BRAND } from '../brand'
import EnrollForm from './EnrollForm'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <h2 className={styles.title}>
          LEXI
          <br />
          EDUCATION
        </h2>

        <div className={styles.content}>
          <div className={styles.hook}>
            <span className={styles.arrow} aria-hidden="true">
              ↘
            </span>
            <p className={styles.hookText}>
              отримай <em>безкоштовне</em> заняття
            </p>
          </div>

          <div className={styles.formWrap}>
            <EnrollForm idPrefix="contact" compact />
          </div>

          <ul className={styles.meta}>
            <li>
              <span>Телефон</span>
              <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`}>{BRAND.phone}</a>
            </li>
            <li>
              <span>Email</span>
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            </li>
            <li>
              <span>Адреса</span>
              <p>
                {BRAND.address}, {BRAND.city}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
