import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  createSession,
  findUserByUsername,
  SESSION_COOKIE,
  verifyPassword,
} from '@/lib/auth/session'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const { username, password } = body as { username?: string; password?: string }
  if (!username?.trim() || !password) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 })
  }

  const user = findUserByUsername(username.trim())
  if (!user || !verifyPassword(password, user.password_hash)) {
    return NextResponse.json({ ok: false, error: 'invalid_credentials' }, { status: 401 })
  }

  const token = await createSession(user.id, user.username)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  })

  return NextResponse.json({ ok: true })
}
