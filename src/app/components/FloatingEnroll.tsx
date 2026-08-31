'use client'

import { useEffect, useState } from 'react'
import { ArrowIcon } from './EnrollButton'
import { useEnroll } from './EnrollContext'
import styles from './FloatingEnroll.module.css'

const DISMISS_KEY = 'lexi-floating-enroll-dismissed'

export default function FloatingEnroll() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const { open, openEnroll } = useEnroll()

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === '1') {
        setDismissed(true)
      }
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById('hero')
      const threshold = hero
        ? Math.max(hero.offsetHeight * 0.65, window.innerHeight * 0.55)
        : 120
      setVisible(window.scrollY > threshold)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  const show = visible && !open && !dismissed

  return (
    <div className={`${styles.wrap} ${show ? styles.visible : ''}`} aria-hidden={!show}>
      <div className={styles.card}>
        <button type="button" className={styles.close} onClick={dismiss} aria-label="Закрити">
          <svg width="14" height="14" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4 L24 24 M24 4 L4 24" />
          </svg>
        </button>
        <p className={styles.text}>Бажаєте записатися на безкоштовне заняття?</p>
        <button type="button" className={styles.btn} onClick={openEnroll}>
          <span>Забронювати</span>
          <ArrowIcon />
        </button>
      </div>
    </div>
  )
}
