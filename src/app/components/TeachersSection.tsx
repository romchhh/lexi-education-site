'use client'

import Image from 'next/image'
import type { TeachersContent } from '@/lib/content/types'
import { getDefaultContent } from '@/lib/content/defaults'
import { useEnroll } from './EnrollContext'
import styles from './TeachersSection.module.css'

type Props = {
  language?: string
  showTabs?: boolean
  headingAs?: 'h1' | 'h2'
  content?: TeachersContent
}

export default function TeachersSection({
  language,
  showTabs = true,
  headingAs = 'h1',
  content = getDefaultContent().teachers,
}: Props) {
  const { openEnroll } = useEnroll()
  const teachers = language
    ? content.items.filter((teacher) => teacher.language === language)
    : content.items
  const Heading = headingAs

  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={`${styles.header} reveal-heading`} data-reveal>
          <Heading className={styles.heading}>
            {content.heading.line1}
            <br />
            <em>{content.heading.line2Em}</em>
          </Heading>
        </header>

        {showTabs ? (
          <div className={styles.tabs} role="tablist" aria-label="Мови викладачів">
            {content.tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tab.active}
                className={`${styles.tab} ${tab.active ? styles.tabActive : ''}`}
                disabled={!tab.active}
              >
                <span aria-hidden="true">{tab.flag}</span>
                {tab.label}
              </button>
            ))}
          </div>
        ) : null}

        <div className={styles.grid}>
          {teachers.map((teacher, index) => (
            <article
              key={teacher.id}
              className={styles.card}
              data-reveal="scale"
              style={{ ['--reveal-delay' as string]: `${index * 80}ms` }}
            >
              <Image
                src="/images/lexi/paperclip.png"
                alt=""
                width={140}
                height={140}
                className={styles.clip}
                aria-hidden="true"
                unoptimized
              />
              <div className={styles.copy}>
                <p className={styles.lang}>
                  {teacher.language}{' '}
                  <span aria-hidden="true">{teacher.flag}</span>
                </p>
                <h3 className={styles.name}>{teacher.name}</h3>
                <p className={styles.meta}>
                  <span className={styles.metaIcon} aria-hidden="true">
                    ✦
                  </span>
                  <span>{teacher.level}</span>
                  <span className={styles.dot} aria-hidden="true">
                    ·
                  </span>
                  <span>
                    {content.experiencePrefix} {teacher.experience}
                  </span>
                </p>
                <p className={styles.bio}>{teacher.bio}</p>
                <button type="button" className={styles.more} onClick={openEnroll}>
                  {content.cardMore}
                  <span aria-hidden="true">→</span>
                </button>
              </div>

              <div className={styles.photoCol}>
                <div className={styles.photoWrap}>
                  <Image
                    src={teacher.photo}
                    alt={teacher.fullName}
                    fill
                    sizes="(max-width: 560px) 100vw, (max-width: 900px) 42vw, 240px"
                    className={styles.photo}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.ctaCard}>
          <h3>{content.ctaTitle}</h3>
          <p>{content.ctaText}</p>
          <button type="button" className={styles.cta} onClick={openEnroll}>
            <span>{content.ctaBtn}</span>
            <span className={styles.ctaIcon} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12 L12 2 M5 2 H12 V9" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
