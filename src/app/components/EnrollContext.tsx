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
  enrollSource: string | null
  openEnroll: (source?: string | unknown) => void
  closeEnroll: () => void
}

const EnrollContext = createContext<EnrollContextValue | null>(null)

export function EnrollProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [enrollSource, setEnrollSource] = useState<string | null>(null)

  const openEnroll = useCallback((source?: string | unknown) => {
    setEnrollSource(typeof source === 'string' ? source : null)
    setOpen(true)
  }, [])

  const closeEnroll = useCallback(() => {
    setOpen(false)
    setEnrollSource(null)
  }, [])

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
    () => ({ open, enrollSource, openEnroll, closeEnroll }),
    [open, enrollSource, openEnroll, closeEnroll],
  )

  return <EnrollContext.Provider value={value}>{children}</EnrollContext.Provider>
}

export function useEnroll() {
  const ctx = useContext(EnrollContext)
  if (!ctx) throw new Error('useEnroll must be used within EnrollProvider')
  return ctx
}
