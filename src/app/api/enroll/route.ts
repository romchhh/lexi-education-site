import { NextResponse } from 'next/server'
import { insertApplication } from '@/lib/analytics/index'
import { buildEnrollTelegramMessage, type EnrollPayload } from '@/lib/enroll-message'
import { sendTelegramMessage } from '@/lib/telegram'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '')
}

function isValidPayload(body: unknown): body is EnrollPayload {
  if (!body || typeof body !== 'object') return false

  const { name, phone, email } = body as Record<string, unknown>

  if (typeof name !== 'string' || name.trim().length === 0 || name.length > 120) return false
  if (typeof phone !== 'string' || normalizePhone(phone).length < 10 || phone.length > 30) return false
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > 120) return false

  return true
}

function optionalString(value: unknown, max = 500): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  return trimmed.slice(0, max)
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID')
    return NextResponse.json({ ok: false, error: 'server_config' }, { status: 500 })
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 })
  }

  const payload: EnrollPayload = {
    name: body.name.trim(),
    phone: body.phone.trim(),
    email: body.email.trim(),
    source: optionalString(body.source, 120),
    pageUrl: optionalString(body.pageUrl, 500),
    pageTitle: optionalString(body.pageTitle, 200),
  }

  try {
    insertApplication({
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      source: payload.source,
      pageUrl: payload.pageUrl,
      pageTitle: payload.pageTitle,
    })
  } catch (error) {
    console.error('Failed to save application:', error)
  }

  try {
    await sendTelegramMessage({
      token,
      chatId,
      text: buildEnrollTelegramMessage(payload),
    })
  } catch (error) {
    console.error('Failed to send Telegram message:', error)
    return NextResponse.json({ ok: false, error: 'telegram' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
