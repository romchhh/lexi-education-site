import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { getDb } from '@/lib/db'
import {
  createSessionToken,
  SESSION_COOKIE,
  verifySessionToken,
  type SessionPayload,
} from './token'

export { SESSION_COOKIE } from './token'

export async function createSession(userId: number, username: string): Promise<string> {
  return createSessionToken(userId, username)
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifySessionToken(token)
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash)
}

export function findUserByUsername(username: string): { id: number; username: string; password_hash: string } | undefined {
  return getDb()
    .prepare('SELECT id, username, password_hash FROM users WHERE username = ?')
    .get(username) as { id: number; username: string; password_hash: string } | undefined
}
