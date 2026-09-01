import { NextResponse } from 'next/server'
import { trackPageView } from '@/lib/analytics/views'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const { path: pagePath } = body as { path?: string }
  if (!pagePath || typeof pagePath !== 'string' || pagePath.length > 500) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  if (pagePath.startsWith('/admin') || pagePath.startsWith('/api')) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const referrer = request.headers.get('referer') ?? undefined
  const userAgent = request.headers.get('user-agent') ?? undefined

  try {
    trackPageView({ path: pagePath, referrer, userAgent })
  } catch (error) {
    console.error('Analytics track failed:', error)
  }

  return NextResponse.json({ ok: true })
}
