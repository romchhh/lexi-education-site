'use client'

import Image from 'next/image'
import { TEACHER_LANG_TABS, TEACHERS } from '../brand'
import { useEnroll } from './EnrollContext'
import styles from './TeachersSection.module.css'

type Props = {
  language?: string
  showTabs?: boolean
  headingAs?: 'h1' | 'h2'
}

export default function TeachersSection({
  language,
  showTabs = true,
  headingAs = 'h1',
}: Props) {
  const { openEnroll } = useEnroll()
  const teachers = language
    ? TEACHERS.filter((teacher) => teacher.language === language)
    : TEACHERS
  const Heading = headingAs

  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <Heading className={styles.heading}>
            Наші викладачі — свої!
            <br />
            <em>Вам точно буде комфортно</em>
          </Heading>
        </header>

        {showTabs ? (
          <div className={styles.tabs} role="tablist" aria-label="Мови викладачів">
            {TEACHER_LANG_TABS.map((tab) => (
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
          {teachers.map((teacher) => (
            <article key={teacher.id} className={styles.card}>
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
                  <span>Досвід: {teacher.experience}</span>
                </p>
                <p className={styles.bio}>{teacher.bio}</p>
                <button type="button" className={styles.more} onClick={openEnroll}>
                  Детальніше
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
                <Image
                  src="/images/lexi/paperclip.png"
                  alt=""
                  width={96}
                  height={96}
                  className={styles.clip}
                  aria-hidden="true"
                />
              </div>
            </article>
          ))}
        </div>

        <div className={styles.ctaCard}>
          <h3>Хочете познайомитись на пробному занятті?</h3>
          <p>Залиште заявку — підберемо зручний час і викладача під вашу дитину.</p>
          <button type="button" className={styles.cta} onClick={openEnroll}>
            <span>Записатись</span>
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
