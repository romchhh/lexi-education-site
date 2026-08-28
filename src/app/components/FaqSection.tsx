'use client'

import { useState } from 'react'
import { FAQ } from '../brand'
import styles from './FaqSection.module.css'

export default function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.heading}>
            Часті
            <br />
            <em>питання</em>
          </h2>
          <p className={styles.lead}>
            Короткі відповіді про формати, пробне заняття, групи та пакети.
            Якщо залишились питання — напишіть нам.
          </p>
        </header>

        <div className={styles.list}>
          {FAQ.map((item, index) => {
            const isOpen = open === index
            return (
              <div key={item.q} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span>{item.q}</span>
                  <span className={styles.icon} aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div className={styles.answer} hidden={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
