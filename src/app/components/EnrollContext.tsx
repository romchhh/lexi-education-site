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
import { lockBodyScroll, unlockBodyScroll } from '@/lib/scroll-lock'

type EnrollContextValue = {
  open: boolean
  openEnroll: () => void
  closeEnroll: () => void
}

const EnrollContext = createContext<EnrollContextValue | null>(null)

export function EnrollProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openEnroll = useCallback(() => setOpen(true), [])
  const closeEnroll = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    lockBodyScroll()

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
      unlockBodyScroll()
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
