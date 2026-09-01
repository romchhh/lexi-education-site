'use client'

import { useState } from 'react'
import type { PricingContent } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import EnrollButton from './EnrollButton'
import styles from './PricingSection.module.css'

type Props = {
  pricing?: PricingContent
}

export default function PricingSection({ pricing = getDefaultContent().pricing }: Props) {
  const [activeId, setActiveId] = useState(pricing.tabs[0]?.id ?? 'individual')
  const active = pricing.tabs.find((tab) => tab.id === activeId) ?? pricing.tabs[0]
  const isExams = active?.id === 'exams'

  if (!active) return null

  return (
    <section id="ciny" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={`${styles.header} reveal-heading`} data-reveal>
          <h2 className={styles.heading}>
            {pricing.heading.line1}
            <br />
            <em>{pricing.heading.line2Em}</em>
          </h2>
          <p className={styles.lead}>{pricing.intro}</p>
        </header>

        <div className={styles.trial} data-reveal="scale" style={{ ['--reveal-delay' as string]: '80ms' }}>
          <span className={styles.freeTag} aria-hidden="true">
            {pricing.trialBadge}
          </span>
          <div className={styles.trialBadge}>{pricing.trialPrice}</div>
          <div className={styles.trialCopy}>
            <h3>{pricing.trialTitle}</h3>
            <p>{pricing.trialText}</p>
          </div>
          <EnrollButton className={styles.trialCta}>{pricing.trialCta}</EnrollButton>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Формати цін" data-reveal="fade" style={{ ['--reveal-delay' as string]: '140ms' }}>
          {pricing.tabs.map((tab) => (
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

        <div className={styles.panel} role="tabpanel" data-reveal style={{ ['--reveal-delay' as string]: '180ms' }}>
          <div className={styles.panelHead}>
            <h3>{active.title}</h3>
            <p className={styles.subtitle}>{active.subtitle}</p>
            {active.note ? <p className={styles.note}>{active.note}</p> : null}
          </div>

          {isExams ? (
            <div className={styles.priceList}>
              {pricing.examPrices.rows.map((row) => (
                <div key={row[0]} className={styles.priceRow}>
                  <span className={styles.rowLabel}>{row[0]}</span>
                  <div className={styles.examLevels}>
                    {pricing.examPrices.headers.slice(1).map((level, i) => (
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

          {active.id === 'combo' ? <p className={styles.comboNote}>{pricing.comboNote}</p> : null}
        </div>

        <div className={styles.packages}>
          <p className={styles.packagesTitle}>{pricing.packagesTitle}</p>
          <div className={styles.packageChips}>
            {pricing.packages.standard.map((item) => (
              <span key={item.name} className={styles.chip}>
                {item.name}
                <strong>{item.discount === '—' ? '0%' : item.discount}</strong>
              </span>
            ))}
          </div>
          <p className={styles.packagesHint}>{pricing.packagesHint}</p>
        </div>

        <div className={styles.help} data-reveal style={{ ['--reveal-delay' as string]: '240ms' }}>
          <div>
            <h3>{pricing.helpTitle}</h3>
            <p>{pricing.helpText}</p>
          </div>
          <EnrollButton className={styles.helpCta}>{pricing.helpCta}</EnrollButton>
        </div>
      </div>
    </section>
  )
}
