import type { BrandContent, ContactContent } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import EnrollForm from './EnrollForm'
import styles from './ContactSection.module.css'

type Props = {
  brand?: BrandContent
  content?: ContactContent
}

export default function ContactSection({
  brand = getDefaultContent().brand,
  content = getDefaultContent().contact,
}: Props) {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <h2 className={`${styles.title} reveal-heading`} data-reveal>
          {content.titleLine1}
          <br />
          {content.titleLine2}
        </h2>

        <div className={styles.content}>
          <div className={styles.hook} data-reveal="left">
            <span className={styles.arrow} aria-hidden="true">
              ↘
            </span>
            <p className={styles.hookText}>
              {content.hookText} <em>{content.hookEm}</em> {content.hookSuffix}
            </p>
          </div>

          <div className={styles.formWrap} data-reveal="right" style={{ ['--reveal-delay' as string]: '100ms' }}>
            <EnrollForm idPrefix="contact" compact />
          </div>

          <ul className={styles.meta} data-reveal style={{ ['--reveal-delay' as string]: '180ms' }}>
            <li>
              <span>Телефон</span>
              <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a>
            </li>
            <li>
              <span>Email</span>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
            <li>
              <span>Адреса</span>
              <p>
                {brand.address}, {brand.city}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
