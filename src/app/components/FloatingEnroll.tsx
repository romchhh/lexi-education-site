'use client'

import { useEffect, useState } from 'react'
import { ArrowIcon } from './EnrollButton'
import { useEnroll } from './EnrollContext'
import styles from './FloatingEnroll.module.css'

export default function FloatingEnroll() {
  const [visible, setVisible] = useState(false)
  const { open, openEnroll } = useEnroll()

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById('hero')
      const threshold = hero
        ? Math.max(hero.offsetHeight * 0.65, window.innerHeight * 0.55)
        : window.innerHeight * 0.75
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

  const show = visible && !open

  return (
    <div className={`${styles.wrap} ${show ? styles.visible : ''}`} aria-hidden={!show}>
      <div className={styles.card}>
        <p className={styles.text}>Бажаєте записатися на безкоштовний урок?</p>
        <button type="button" className={styles.btn} onClick={openEnroll}>
          <span>Забронювати</span>
          <ArrowIcon />
        </button>
      </div>
    </div>
  )
}
