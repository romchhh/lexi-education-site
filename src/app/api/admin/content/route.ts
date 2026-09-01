import { NextResponse } from 'next/server'
import { requireSession } from '@/lib/auth/session'
import { buildContentBundle, getContentSectionFromDb, saveContentSection } from '@/lib/content/store'
import { CONTENT_SECTIONS } from '@/lib/content/sections'
import type { ContentSectionKey, SiteContent } from '@/lib/content/types'

export async function GET() {
  try {
    await requireSession()
  } catch {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    ok: true,
    sections: CONTENT_SECTIONS,
    content: buildContentBundle(),
  })
}

export async function PUT(request: Request) {
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

  const { key, data } = body as { key?: ContentSectionKey; data?: SiteContent[ContentSectionKey] }
  if (!key || !data) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 })
  }

  const validKeys = CONTENT_SECTIONS.map((s) => s.key)
  if (!validKeys.includes(key)) {
    return NextResponse.json({ ok: false, error: 'invalid_section' }, { status: 400 })
  }

  try {
    const content = saveContentSection(key, data)
    return NextResponse.json({ ok: true, section: getContentSectionFromDb(key), contentUpdated: true, content })
  } catch (error) {
    console.error('Failed to save content:', error)
    return NextResponse.json({ ok: false, error: 'save_failed' }, { status: 500 })
  }
}
