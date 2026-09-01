const SITE_HOSTS = ['lexieducation.com.ua', 'localhost']

export type ReferrerSource = {
  label: string
  domain: string
}

export function parseReferrerSource(referrer: string | null | undefined): ReferrerSource {
  if (!referrer?.trim()) {
    return { label: 'Прямий перехід', domain: 'direct' }
  }

  try {
    const url = new URL(referrer)
    const host = url.hostname.replace(/^www\./, '').toLowerCase()

    if (SITE_HOSTS.some((site) => host === site || host.endsWith(`.${site}`))) {
      return { label: 'Внутрішній', domain: 'internal' }
    }
    if (host.includes('google.')) return { label: 'Google', domain: 'google' }
    if (host.includes('facebook.') || host === 'fb.com' || host.startsWith('l.facebook')) {
      return { label: 'Facebook', domain: 'facebook' }
    }
    if (host.includes('instagram.')) return { label: 'Instagram', domain: 'instagram' }
    if (host.includes('t.me') || host.includes('telegram.')) return { label: 'Telegram', domain: 'telegram' }
    if (host.includes('youtube.') || host === 'youtu.be') return { label: 'YouTube', domain: 'youtube' }
    if (host.includes('tiktok.')) return { label: 'TikTok', domain: 'tiktok' }
    if (host.includes('bing.')) return { label: 'Bing', domain: 'bing' }

    return { label: host, domain: host }
  } catch {
    return { label: 'Інше', domain: 'other' }
  }
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'unknown'

export function parseDevice(userAgent: string | null | undefined): DeviceType {
  if (!userAgent) return 'unknown'
  const ua = userAgent.toLowerCase()
  if (/ipad|tablet|playbook|silk/.test(ua)) return 'tablet'
  if (/mobile|iphone|ipod|android.*mobile|windows phone/.test(ua)) return 'mobile'
  if (/android/.test(ua)) return 'tablet'
  if (/mozilla|chrome|safari|firefox|edge|opera/.test(ua)) return 'desktop'
  return 'unknown'
}

export const DEVICE_LABELS: Record<DeviceType, string> = {
  mobile: 'Мобільні',
  tablet: 'Планшети',
  desktop: 'Десктоп',
  unknown: 'Невідомо',
}

export function parseBrowser(userAgent: string | null | undefined): string {
  if (!userAgent) return 'Невідомо'
  const ua = userAgent

  if (/Edg\//.test(ua)) return 'Edge'
  if (/OPR\//.test(ua) || /Opera/.test(ua)) return 'Opera'
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return 'Chrome'
  if (/Firefox\//.test(ua)) return 'Firefox'
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'Safari'

  return 'Інше'
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso.replace(' ', 'T'))
  if (Number.isNaN(date.getTime())) return iso

  return date.toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
