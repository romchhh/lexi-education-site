'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowIcon } from './EnrollButton'
import { useEnroll } from './EnrollContext'
import styles from './FloatingEnroll.module.css'

function getScrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0
}

export default function FloatingEnroll() {
  const [mounted, setMounted] = useState(false)
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const { open, openEnroll } = useEnroll()

  useEffect(() => {
    setMounted(true)
    setPortalRoot(document.querySelector('.lexi') as HTMLElement | null)
  }, [])

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById('hero')
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom
        setVisible(heroBottom <= window.innerHeight * 0.35)
        return
      }
      setVisible(getScrollY() > 180)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const show = mounted && visible && !open && !dismissed

  if (!mounted || !portalRoot) return null

  return createPortal(
    <div className={`${styles.wrap} ${show ? styles.visible : ''}`} aria-hidden={!show}>
      <div className={styles.card}>
        <button
          type="button"
          className={styles.close}
          onClick={() => setDismissed(true)}
          aria-label="Закрити"
        >
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
    </div>,
    portalRoot,
  )
}
