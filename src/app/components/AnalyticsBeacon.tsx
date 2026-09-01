'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function AnalyticsBeacon() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return

    const payload = JSON.stringify({ path: pathname })
    const url = '/api/analytics/view'

    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const blob = new Blob([payload], { type: 'application/json' })
      navigator.sendBeacon(url, blob)
      return
    }

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {})
  }, [pathname])

  return null
}
