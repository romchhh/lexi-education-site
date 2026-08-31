'use client'

import { useState } from 'react'
import EnrollButton from './EnrollButton'
import {
  EXAM_PRICES,
  PACKAGES,
  PRICING_INTRO,
  PRICING_TABS,
} from '../brand'
import styles from './PricingSection.module.css'

export default function PricingSection() {
  const [activeId, setActiveId] = useState(PRICING_TABS[0].id)
  const active = PRICING_TABS.find((tab) => tab.id === activeId) ?? PRICING_TABS[0]
  const isExams = active.id === 'exams'

  return (
    <section id="ciny" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.heading}>
            Вартість
            <br />
            <em>навчання</em>
          </h2>
          <p className={styles.lead}>{PRICING_INTRO}</p>
        </header>

        <div className={styles.trial}>
          <span className={styles.freeTag} aria-hidden="true">
            🔥 FREE
          </span>
          <div className={styles.trialBadge}>0 грн</div>
          <div className={styles.trialCopy}>
            <h3>Пробне заняття — безкоштовно</h3>
            <p>Визначимо рівень, обговоримо цілі та підберемо формат.</p>
          </div>
          <EnrollButton className={styles.trialCta}>Записатись</EnrollButton>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Формати цін">
          {PRICING_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === activeId}
              className={`${styles.tab} ${tab.id === activeId ? styles.tabActive : ''}`}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.panel} role="tabpanel">
          <div className={styles.panelHead}>
            <h3>{active.title}</h3>
            <p className={styles.subtitle}>{active.subtitle}</p>
            {active.note ? <p className={styles.note}>{active.note}</p> : null}
          </div>

          {isExams ? (
            <div className={styles.priceList}>
              {EXAM_PRICES.rows.map((row) => (
                <div key={row[0]} className={styles.priceRow}>
                  <span className={styles.rowLabel}>{row[0]}</span>
                  <div className={styles.examLevels}>
                    {EXAM_PRICES.headers.slice(1).map((level, i) => (
                      <span key={level} className={styles.examLevel}>
                        <span>{level}</span>
                        <strong>{row[i + 1]}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.priceBlocks}>
              {active.tables.map((table) => (
                <div key={`${active.id}-${table.heading ?? 'main'}`} className={styles.priceBlock}>
                  {(table.heading || table.meta) && (
                    <div className={styles.blockHead}>
                      {table.heading ? <h4>{table.heading}</h4> : null}
                      {table.meta ? <span>{table.meta}</span> : null}
                    </div>
                  )}
                  <ul className={styles.priceList}>
                    {table.rows.map((row) => (
                      <li key={row.level} className={styles.priceRow}>
                        <span className={styles.rowLabel}>{row.level}</span>
                        <strong className={styles.price}>{row.price}</strong>
                      </li>
                    ))}
                  </ul>
                  {table.footer ? <p className={styles.saveNote}>{table.footer}</p> : null}
                </div>
              ))}
            </div>
          )}

          {active.id === 'combo' ? (
            <p className={styles.comboNote}>
              При навчанні 2 рази на тиждень у кожному форматі — до 16 занять на місяць.
            </p>
          ) : null}
        </div>

        <div className={styles.packages}>
          <p className={styles.packagesTitle}>Пакети зі знижкою</p>
          <div className={styles.packageChips}>
            {PACKAGES.standard.map((item) => (
              <span key={item.name} className={styles.chip}>
                {item.name}
                <strong>{item.discount === '—' ? '0%' : item.discount}</strong>
              </span>
            ))}
          </div>
          <p className={styles.packagesHint}>
            Sprachklub: 8 занять −5% · 12 занять −8%
          </p>
        </div>

        <div className={styles.help}>
          <div>
            <h3>Не знаєте, який формат обрати?</h3>
            <p>Почніть із безкоштовного пробного заняття.</p>
          </div>
          <EnrollButton className={styles.helpCta}>Записатись на пробне</EnrollButton>
        </div>
      </div>
    </section>
  )
}
