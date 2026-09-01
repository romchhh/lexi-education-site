import Image from 'next/image'
import type { HeroContent } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import EnrollButton from './EnrollButton'
import styles from './Hero.module.css'

const GLASS_POS = [styles.glassLeft, styles.glassMid, styles.glassRight] as const
const DEFAULT_HERO = getDefaultContent().hero

function statLines(label: string): string[] {
  return label.split(' ')
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
        <div className={styles.copy}>
          <h1 className={styles.headline}>
            {hero.headlineLine1}
            <br />
            {hero.headlineMiddle}
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
            sizes="(max-width: 768px) 100vw, 55vw"
            className={styles.portraitImage}
          />
        </div>

        <div className={styles.glassCells} aria-label="Про школу">
          {hero.stats.map((stat, index) => (
            <div key={stat.label} className={`${styles.glassCard} ${GLASS_POS[index]}`}>
              <span className={styles.glassOrb} aria-hidden="true" />
              <div className={styles.glassRow}>
                <span className={styles.glassValue}>{stat.value}</span>
                <span className={styles.glassMeta}>
                  {statLines(stat.label).map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
