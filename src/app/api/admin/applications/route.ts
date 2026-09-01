import { NextResponse } from 'next/server'
import { requireSession } from '@/lib/auth/session'
import { listApplications, updateApplication } from '@/lib/analytics/index'
import type { ApplicationStatus } from '@/lib/content/types'

const VALID_STATUSES: ApplicationStatus[] = ['new', 'contacted', 'enrolled', 'rejected', 'archived']

export async function GET(request: Request) {
  try {
    await requireSession()
  } catch {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') ?? 'all'
  const search = searchParams.get('search') ?? undefined
  const sort = (searchParams.get('sort') as 'newest' | 'oldest' | 'name') || 'newest'
  const page = Math.max(1, Number(searchParams.get('page') || 1))
  const limit = Math.min(100, Math.max(10, Number(searchParams.get('limit') || 25)))
  const offset = (page - 1) * limit

  const result = listApplications({
    status: status as ApplicationStatus | 'all',
    search,
    sort,
    limit,
    offset,
  })

  return NextResponse.json({
    ok: true,
    ...result,
    page,
    limit,
  })
}

export async function PATCH(request: Request) {
  try {
    await requireSession()
  } catch {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const { id, status, notes } = body as {
    id?: number
    status?: ApplicationStatus
    notes?: string
  }

  if (!id || typeof id !== 'number') {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 })
  }

  if (status && !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ ok: false, error: 'invalid_status' }, { status: 400 })
  }

  const updated = updateApplication(id, {
    status,
    notes: notes !== undefined ? String(notes).slice(0, 2000) : undefined,
  })

  if (!updated) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, item: updated })
}
