import Image from 'next/image'
import type { HeroContent, StatItem } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import EnrollButton from './EnrollButton'
import styles from './Hero.module.css'

const DEFAULT_HERO = getDefaultContent().hero

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
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
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

      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.copy}>
            <h1 className={styles.titleBlock}>
              <span className={styles.brandTitle}>{hero.headlineLine1}</span>
              <span className={styles.tagline}>{hero.highlight}</span>
            </h1>
            <p className={styles.subhead}>{hero.headlineLine3}</p>
            <p className={styles.lead}>{hero.role}</p>
            <EnrollButton className={styles.heroCta}>{hero.cta}</EnrollButton>
          </div>

          <div className={styles.portrait}>
            <Image
              src={hero.heroImage}
              alt={hero.heroImageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.portraitImage}
            />
          </div>
        </div>

        <div className={styles.statsRow} aria-label="Про школу">
          {hero.stats.map((stat) => (
            <div key={`${stat.icon ?? 'stat'}-${stat.value}-${stat.label}`} className={styles.statCard}>
              <StatIcon icon={stat.icon} />
              <div className={styles.statCopy}>
                {stat.value ? <p className={styles.statValue}>{stat.value}</p> : null}
                {stat.label ? <p className={styles.statLabel}>{stat.label.replace(/\|/g, ' ')}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
