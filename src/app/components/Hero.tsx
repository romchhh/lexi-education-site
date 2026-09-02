import Image from 'next/image'
import type { HeroContent, StatItem } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import EnrollButton from './EnrollButton'
import styles from './Hero.module.css'

const DEFAULT_HERO = getDefaultContent().hero

function statLines(label: string): string[] {
  if (!label) return []
  if (label.includes('|')) return label.split('|').map((line) => line.trim()).filter(Boolean)
  return [label]
}

function StatIcon({ icon }: { icon?: StatItem['icon'] }) {
  if (!icon) return null

  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (icon === 'globe') {
    return (
      <span className={styles.statIcon} aria-hidden="true">
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.8 3.2 2.8 14.8 0 18M12 3c-2.8 3.2-2.8 14.8 0 18" />
        </svg>
      </span>
    )
  }

  if (icon === 'group') {
    return (
      <span className={styles.statIcon} aria-hidden="true">
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="16.5" cy="9.5" r="2.5" />
          <path d="M4.5 18.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5M14 18.5c0-1.8 1.4-3.2 3-3.2" />
        </svg>
      </span>
    )
  }

  return (
    <span className={styles.statIcon} aria-hidden="true">
      <svg {...common}>
        <path d="M4 18V8l4-3 4 3v10M14 18V10l4-3 2 1.5V18" />
        <path d="M8 14h2M8 11h2" />
      </svg>
    </span>
  )
}

type Props = {
  hero?: HeroContent
}

export default function Hero({ hero = DEFAULT_HERO }: Props) {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgGlow2} aria-hidden="true" />

      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.copy}>
            <h1 className={styles.headline}>
              {hero.headlineLine1}
              <br />
              {(hero.headlineMiddle || 'у ').trimEnd()}
              {' '}
              <em>{hero.highlight}</em>
              <br />
              {hero.headlineLine3}
            </h1>
            <p className={styles.role}>{hero.role}</p>
            <EnrollButton className={styles.heroCta}>{hero.cta}</EnrollButton>
          </div>

          <div className={styles.portrait}>
            <div className={styles.portraitGlow} aria-hidden="true" />
            <Image
              src={hero.heroImage}
              alt={hero.heroImageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 58vw"
              className={styles.portraitImage}
            />
          </div>
        </div>

        <div className={styles.statsRow} aria-label="Про школу">
          {hero.stats.map((stat) => (
            <div key={`${stat.icon ?? 'stat'}-${stat.value}-${stat.label}`} className={styles.statCard}>
              <StatIcon icon={stat.icon} />
              <div className={styles.statRow}>
                {stat.value ? <span className={styles.statValue}>{stat.value}</span> : null}
                {stat.label ? (
                  <span className={`${styles.statMeta} ${!stat.value ? styles.statMetaOnly : ''}`}>
                    {statLines(stat.label).map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
