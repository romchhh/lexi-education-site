import { escapeTelegramHtml } from './telegram'

export type EnrollPayload = {
  name: string
  phone: string
  email: string
  source?: string
  pageUrl?: string
  pageTitle?: string
}

const PAGE_LABELS: Record<string, string> = {
  '/': 'Головна',
  '/kontakty': 'Контакти',
  '/faq': 'FAQ',
  '/vykladachi': 'Викладачі',
  '/napryamy/nimetska': 'Німецька',
}

function pageLabelFromUrl(pageUrl?: string): string | undefined {
  if (!pageUrl) return undefined

  try {
    const pathname = new URL(pageUrl).pathname
    return PAGE_LABELS[pathname] ?? pathname
  } catch {
    return undefined
  }
}

function formatKyivTime(date: Date): string {
  return new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function buildEnrollTelegramMessage(payload: EnrollPayload, submittedAt = new Date()): string {
  const pageLabel = pageLabelFromUrl(payload.pageUrl)
  const lines = [
    '<b>🆕 Нова заявка LEXI.education</b>',
    '',
    `<b>Ім'я:</b> ${escapeTelegramHtml(payload.name)}`,
    `<b>Телефон:</b> ${escapeTelegramHtml(payload.phone)}`,
    `<b>Email:</b> ${escapeTelegramHtml(payload.email)}`,
    '',
  ]

  if (payload.source) {
    lines.push(`<b>Джерело:</b> ${escapeTelegramHtml(payload.source)}`)
  }

  if (pageLabel) {
    lines.push(`<b>Сторінка:</b> ${escapeTelegramHtml(pageLabel)}`)
  }

  if (payload.pageTitle) {
    lines.push(`<b>Заголовок:</b> ${escapeTelegramHtml(payload.pageTitle)}`)
  }

  if (payload.pageUrl) {
    lines.push(`<b>Посилання:</b> ${escapeTelegramHtml(payload.pageUrl)}`)
  }

  lines.push('', `<b>Час:</b> ${escapeTelegramHtml(formatKyivTime(submittedAt))}`)

  return lines.join('\n')
}
