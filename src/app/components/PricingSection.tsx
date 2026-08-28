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
            <h3>Пробне заняття безкоштовно</h3>
            <p>Визначимо рівень, обговоримо цілі та підберемо формат саме під вас.</p>
          </div>
          <EnrollButton className={styles.trialCta}>
            Записатись
          </EnrollButton>
        </div>

        <div className={styles.switcher}>
          <p className={styles.switcherLabel}>Оберіть формат</p>
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
        </div>

        <div className={styles.panel} role="tabpanel">
          <div className={styles.panelHead}>
            <div>
              <h3>{active.title}</h3>
              <p className={styles.subtitle}>{active.subtitle}</p>
            </div>
            {active.note ? <p className={styles.note}>{active.note}</p> : null}
          </div>

          {isExams ? (
            <div className={styles.examGrid}>
              {EXAM_PRICES.rows.map((row) => (
                <article key={row[0]} className={styles.examCard}>
                  <h4>{row[0]}</h4>
                  <ul>
                    {EXAM_PRICES.headers.slice(1).map((level, i) => (
                      <li key={level}>
                        <span className={styles.levelChip}>{level}</span>
                        <strong className={styles.price}>{row[i + 1]}</strong>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <div className={`${styles.priceGroups} ${active.tables.length > 1 ? styles.priceGroupsSplit : ''}`}>
              {active.tables.map((table) => (
                <div key={`${active.id}-${table.heading ?? 'main'}`} className={styles.priceGroup}>
                  {(table.heading || table.meta) && (
                    <div className={styles.groupHead}>
                      {table.heading ? <h4>{table.heading}</h4> : null}
                      {table.meta ? <span className={styles.groupMeta}>{table.meta}</span> : null}
                    </div>
                  )}
                  <ul className={styles.priceList}>
                    {table.rows.map((row) => (
                      <li key={row.level}>
                        <span className={styles.levelChip}>{row.level}</span>
                        <div className={styles.priceWrap}>
                          <strong className={styles.price}>{row.price}</strong>
                          <span className={styles.perLesson}>/ заняття</span>
                        </div>
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
          <div className={styles.packagesIntro}>
            <h3>Пакети зі знижкою</h3>
            <p>Чим більше занять плануєте наперед — тим вигідніше.</p>
          </div>
          <div className={styles.packageGrid}>
            <div className={styles.packageCol}>
              <h4>Усі формати</h4>
              <ul>
                {PACKAGES.standard.map((item) => (
                  <li key={item.name}>
                    <span>{item.name}</span>
                    <strong className={item.discount === '—' ? styles.noDiscount : undefined}>
                      {item.discount === '—' ? 'без знижки' : item.discount}
                    </strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.packageCol}>
              <h4>Sprachklub</h4>
              <ul>
                {PACKAGES.sprachklub.map((item) => (
                  <li key={item.name}>
                    <span>{item.name}</span>
                    <strong>{item.discount}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.help}>
          <div>
            <h3>Не знаєте, який формат обрати?</h3>
            <p>
              Не хвилюйтеся — вам не потрібно самостійно визначати свій рівень або вирішувати,
              який формат підійде найкраще. Почніть із безкоштовного пробного заняття в LEXI.
            </p>
          </div>
          <EnrollButton className={styles.helpCta}>
            Записатись на пробне
          </EnrollButton>
        </div>
      </div>
    </section>
  )
}
