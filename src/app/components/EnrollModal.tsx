'use client'

import { useEffect, useId, useRef } from 'react'
import { useEnroll } from './EnrollContext'
import EnrollForm from './EnrollForm'
import styles from './EnrollModal.module.css'

export default function EnrollModal() {
  const { open, closeEnroll } = useEnroll()
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>('input, button')
      first?.focus()
    }, 40)
    return () => window.clearTimeout(t)
  }, [open])

  if (!open) return null

  return (
    <div className={styles.root} role="presentation">
      <button type="button" className={styles.backdrop} aria-label="Закрити" onClick={closeEnroll} />
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-enroll-dialog
      >
        <button type="button" className={styles.close} onClick={closeEnroll} aria-label="Закрити">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4 L24 24 M24 4 L4 24" />
          </svg>
        </button>

        <div className={styles.glow} aria-hidden="true" />

        <header className={styles.header}>
          <h2 id={titleId}>
            отримай
            <br />
            <em>безкоштовне</em>
            <br />
            заняття
          </h2>
        </header>

        <EnrollForm idPrefix="modal" compact onSuccess={closeEnroll} />
      </div>
    </div>
  )
}
