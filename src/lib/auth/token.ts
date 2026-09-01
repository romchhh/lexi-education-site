import { createHmac, timingSafeEqual } from 'crypto'

export const SESSION_COOKIE = 'lexi_admin_session'
const SESSION_DAYS = 7

export type SessionPayload = {
  userId: number
  username: string
  exp: number
}

export function getAuthSecret(): string {
  const secret = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD
  if (!secret) {
    throw new Error('ADMIN_SECRET or ADMIN_PASSWORD must be set')
  }
  return secret
}

export function signSession(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = createHmac('sha256', getAuthSecret()).update(body).digest('base64url')
  return `${body}.${sig}`
}

export function verifySessionToken(token: string): SessionPayload | null {
  const [body, sig] = token.split('.')
  if (!body || !sig) return null

  let secret: string
  try {
    secret = getAuthSecret()
  } catch {
    return null
  }

  const expected = createHmac('sha256', secret).update(body).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload
    if (!payload.exp || payload.exp < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

export function createSessionToken(userId: number, username: string): string {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  return signSession({ userId, username, exp })
}
