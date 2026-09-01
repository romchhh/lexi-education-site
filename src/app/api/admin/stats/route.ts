import { NextResponse } from 'next/server'
import { requireSession } from '@/lib/auth/session'
import { getApplicationStats } from '@/lib/analytics/index'
import { getAnalyticsStats } from '@/lib/analytics/views'

export async function GET() {
  try {
    await requireSession()
  } catch {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  const applications = getApplicationStats()
  const analytics = getAnalyticsStats()

  return NextResponse.json({
    ok: true,
    applications,
    analytics,
  })
}
