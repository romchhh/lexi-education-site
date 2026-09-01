import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import { requireSession } from '@/lib/auth/session'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_BYTES = 12 * 1024 * 1024
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'])

function safeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

export async function POST(request: Request) {
  try {
    await requireSession()
  } catch {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_form' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'no_file' }, { status: 400 })
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ ok: false, error: 'invalid_type' }, { status: 400 })
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: 'too_large' }, { status: 400 })
  }

  const ext = path.extname(file.name) || (file.type === 'image/png' ? '.png' : '.jpg')
  const filename = `${Date.now()}-${safeName(path.basename(file.name, ext))}${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  await mkdir(UPLOAD_DIR, { recursive: true })
  await writeFile(path.join(UPLOAD_DIR, filename), buffer)

  return NextResponse.json({
    ok: true,
    url: `/uploads/${filename}`,
    name: file.name,
    size: file.size,
  })
}
