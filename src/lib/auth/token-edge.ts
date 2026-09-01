export const SESSION_COOKIE = 'lexi_admin_session'

export type SessionPayload = {
  userId: number
  username: string
  exp: number
}

const textEncoder = new TextEncoder()

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlDecode(str: string): Uint8Array {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/')
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4))
  const binary = atob(padded + pad)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function getAuthSecret(): string | null {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || null
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  const [body, sig] = token.split('.')
  if (!body || !sig) return null

  const secret = getAuthSecret()
  if (!secret) return null

  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign('HMAC', key, textEncoder.encode(body))
  const expected = base64UrlEncode(new Uint8Array(signature))

  if (expected.length !== sig.length) return null
  let mismatch = 0
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ sig.charCodeAt(i)
  }
  if (mismatch !== 0) return null

  try {
    const json = new TextDecoder().decode(base64UrlDecode(body))
    const payload = JSON.parse(json) as SessionPayload
    if (!payload.exp || payload.exp < Date.now()) return null
    return payload
  } catch {
    return null
  }
}
