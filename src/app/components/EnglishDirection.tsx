import type { GermanDirectionContent, PricingContent, TeachersContent } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import EnrollButton from './EnrollButton'
import PricingSection from './PricingSection'
import TeachersSection from './TeachersSection'
import styles from './EnglishDirection.module.css'

const TONE_CLASS = {
  blush: styles.toneBlush,
  warm: styles.toneWarm,
  white: styles.toneWhite,
  graphite: styles.toneGraphite,
  rose: styles.toneRose,
  soft: styles.toneSoft,
} as const

function ProcessIcon({ id }: { id: string }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (id) {
    case 'schedule':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="17" rx="3" />
          <path d="M8 3v3M16 3v3M3 10h18" />
          <circle cx="12" cy="15" r="2.5" />
          <path d="M16.5 15.5l1.5 1.5" />
        </svg>
      )
    case 'program':
      return (
        <svg {...common}>
          <path d="M4 6.5A3.5 3.5 0 017.5 3H18v16H7.5A3.5 3.5 0 014 15.5V6.5z" />
          <path d="M8 7h7M8 11h7M8 15h4" />
        </svg>
      )
    case 'structure':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="8" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
          <path d="M13 17h8M13 13h5" />
        </svg>
      )
    case 'speaking':
      return (
        <svg {...common}>
          <path d="M7 10a5 5 0 019.8 1.2c0 2.2-1.8 3.8-4 3.8H11l-2.5 2.5V15H9a5 5 0 01-2-5z" />
          <path d="M17 8.5c1.2 1 2 2.6 2 4.5" />
        </svg>
      )
    case 'formats':
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="2.5" />
          <circle cx="16" cy="9" r="2" />
          <path d="M4.5 18c.8-2.4 2.6-3.8 4.5-3.8s3.7 1.4 4.5 3.8" />
          <path d="M14.5 17.2c.5-1.4 1.5-2.2 2.5-2.2s2 0.8 2.5 2.2" />
        </svg>
      )
    case 'interactive':
      return (
        <svg {...common}>
          <rect x="4" y="8" width="16" height="10" rx="3" />
          <path d="M8 12v2M11 11v4M14 12.5v1M17 11.5v3" />
          <path d="M9 8V6.5A1.5 1.5 0 0110.5 5h3A1.5 1.5 0 0115 6.5V8" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
  }
}

type Props = {
  data?: GermanDirectionContent
  pricing?: PricingContent
  teachers?: TeachersContent
}

export default function EnglishDirection({
  data = getDefaultContent().germanDirection,
  pricing = getDefaultContent().pricing,
  teachers = getDefaultContent().teachers,
}: Props) {
  return (
    <article className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy} data-reveal="left">
            <h1 className={styles.heroTitle}>
              {data.heroTitle}
              <br />
              <em>{data.heroTitleEm}</em>
            </h1>
            <p className={styles.heroTagline}>{data.heroTagline}</p>
            <p className={styles.heroLead}>{data.heroLead}</p>
            <EnrollButton className={styles.enroll}>{data.heroCta}</EnrollButton>
          </div>
          <div className={styles.heroFlag} aria-hidden="true" data-reveal="right" style={{ ['--reveal-delay' as string]: '120ms' }}>
            {data.flag}
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.inner}>
          <h2 className={`${styles.sectionTitle} reveal-heading`} data-reveal>{data.processTitle}</h2>
          <div className={styles.processGrid}>
            {data.process.map((item, index) => (
              <article
                key={item.id}
                className={`${styles.processCard} ${TONE_CLASS[item.tone as keyof typeof TONE_CLASS] ?? styles.toneWhite}`}
                data-reveal="scale"
                style={{ ['--reveal-delay' as string]: `${index * 90}ms` }}
              >
                <span className={styles.processIcon}>
                  <ProcessIcon id={item.id} />
                </span>
                <div className={styles.processBody}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.centerCta}>
            <EnrollButton className={styles.enroll}>{data.processCta}</EnrollButton>
          </div>
        </div>
      </section>

      <PricingSection pricing={pricing} />
      <TeachersSection language="Німецька" showTabs={false} headingAs="h2" content={teachers} />
    </article>
  )
}
