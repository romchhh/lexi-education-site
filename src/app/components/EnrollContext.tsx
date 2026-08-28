'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type EnrollContextValue = {
  open: boolean
  openEnroll: () => void
  closeEnroll: () => void
}

const EnrollContext = createContext<EnrollContextValue | null>(null)

function lockScroll() {
  const scrollY = window.scrollY
  const { html, body } = { html: document.documentElement, body: document.body }

  html.style.overflow = 'hidden'
  body.style.overflow = 'hidden'
  body.style.position = 'fixed'
  body.style.top = `-${scrollY}px`
  body.style.left = '0'
  body.style.right = '0'
  body.style.width = '100%'
  body.dataset.scrollLockY = String(scrollY)
}

function unlockScroll() {
  const { html, body } = { html: document.documentElement, body: document.body }
  const scrollY = Number(body.dataset.scrollLockY || '0')

  html.style.overflow = ''
  body.style.overflow = ''
  body.style.position = ''
  body.style.top = ''
  body.style.left = ''
  body.style.right = ''
  body.style.width = ''
  delete body.dataset.scrollLockY

  window.scrollTo(0, scrollY)
}

export function EnrollProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openEnroll = useCallback(() => setOpen(true), [])
  const closeEnroll = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    lockScroll()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const preventTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-enroll-dialog]')) return
      e.preventDefault()
    }

    window.addEventListener('keydown', onKey)
    document.addEventListener('touchmove', preventTouchMove, { passive: false })

    return () => {
      unlockScroll()
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('touchmove', preventTouchMove)
    }
  }, [open])

  const value = useMemo(
    () => ({ open, openEnroll, closeEnroll }),
    [open, openEnroll, closeEnroll],
  )

  return <EnrollContext.Provider value={value}>{children}</EnrollContext.Provider>
}

export function useEnroll() {
  const ctx = useContext(EnrollContext)
  if (!ctx) throw new Error('useEnroll must be used within EnrollProvider')
  return ctx
}
