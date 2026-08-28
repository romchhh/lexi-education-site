'use client'

import { useEnroll } from './EnrollContext'
import styles from './EnrollButton.module.css'

type Props = {
  children: React.ReactNode
  className?: string
  ariaLabel?: string
  /** Hide the circle+arrow when the button should be text-only */
  plain?: boolean
}

function ArrowIcon() {
  return (
    <span className={styles.icon} aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12 L12 2 M5 2 H12 V9" />
      </svg>
    </span>
  )
}

export default function EnrollButton({ children, className, ariaLabel, plain = false }: Props) {
  const { openEnroll } = useEnroll()

  return (
    <button type="button" className={`${styles.base} ${className ?? ''}`} aria-label={ariaLabel} onClick={openEnroll}>
      <span className={styles.label}>{children}</span>
      {!plain ? <ArrowIcon /> : null}
    </button>
  )
}

export { ArrowIcon }
