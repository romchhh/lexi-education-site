import { getDefaultContent } from './defaults'
import type { SiteContent } from './types'

function normalizeBrandContacts(brand: SiteContent['brand'], defaults: SiteContent['brand']): SiteContent['brand'] {
  const phoneDigits = brand.phone.replace(/\D/g, '')
  const email = brand.email.trim().toLowerCase()

  return {
    ...defaults,
    ...brand,
    phone: STALE_PHONE_DIGITS.has(phoneDigits) ? defaults.phone : brand.phone,
    email: STALE_EMAILS.has(email) ? defaults.email : brand.email,
    telegram: brand.telegram?.includes('lexi_education') ? brand.telegram : defaults.telegram,
    telegramHandle: brand.telegramHandle || defaults.telegramHandle,
    instagram: brand.instagram || defaults.instagram,
    instagramHandle: brand.instagramHandle || defaults.instagramHandle,
  }
}

const STALE_PHONE_DIGITS = new Set(['380670000000', '3806700000'])
const STALE_EMAILS = new Set(['hello@lexi.education', 'info@lexi.education', 'hello@lexieducation.com.ua'])

function normalizePricing(pricing: SiteContent['pricing'], defaults: SiteContent['pricing']): SiteContent['pricing'] {
  const tabsJson = JSON.stringify(pricing.tabs)
  const isStale =
    tabsJson.includes('800 грн') ||
    tabsJson.includes('960 грн') ||
    pricing.packages.standard.some((item) => item.discount === '−15%') ||
    !pricing.comboPrices?.rows?.length

  if (!isStale) return pricing

  return {
    ...pricing,
    tabs: defaults.tabs,
    examPrices: defaults.examPrices,
    comboPrices: defaults.comboPrices,
    packages: defaults.packages,
    packagesTitle: defaults.packagesTitle,
    packagesHint: defaults.packagesHint,
  }
}

function normalizeFaqItems(items: SiteContent['faq']['items'], defaultItems: SiteContent['faq']['items']): SiteContent['faq']['items'] {
  const json = JSON.stringify(items)
  const isStale = json.includes('−15% за 32') || json.includes('Економія — 150 грн')
  return isStale ? defaultItems : items
}

function normalizeGallery(gallery: SiteContent['gallery'], defaults: SiteContent['gallery']): SiteContent['gallery'] {
  const json = JSON.stringify(gallery.items)
  const isStale = json.includes('unsplash.com') || json.includes('/images/lexi/hero.jpg')
  if (!isStale) return gallery
  return { ...gallery, items: defaults.items }
}

function normalizeHero(hero: SiteContent['hero'], defaults: SiteContent['hero']): SiteContent['hero'] {
  const statsJson = JSON.stringify(hero.stats)
  const isStale =
    hero.heroImage.includes('hero.jpg') ||
    hero.heroImage.includes('unsplash') ||
    statsJson.includes('8+') ||
    statsJson.includes('420+') ||
    statsJson.includes('1:6') ||
    statsJson.includes('в парі') ||
    !statsJson.includes('"icon"')
  if (!isStale) return hero
  return { ...hero, heroImage: defaults.heroImage, heroImageAlt: defaults.heroImageAlt, stats: defaults.stats }
}

function normalizeDirections(
  directions: SiteContent['directions'],
  defaults: SiteContent['directions'],
): SiteContent['directions'] {
  if (directions.ctaSoon === 'Скоро відкриємо') {
    return { ...directions, ctaSoon: defaults.ctaSoon }
  }
  return directions
}

/** Merge cached content from older CMS schema into current shape. */
export function migrateSiteContent(raw: Partial<SiteContent> & Record<string, unknown>): SiteContent {
  const defaults = getDefaultContent()

  const hero =
    raw.hero && typeof raw.hero === 'object' && 'stats' in (raw.hero as object)
      ? normalizeHero(raw.hero as SiteContent['hero'], defaults.hero)
      : {
          ...defaults.hero,
          stats: Array.isArray(raw.stats) ? (raw.stats as SiteContent['hero']['stats']) : defaults.hero.stats,
        }

  const directions =
    raw.directions && typeof raw.directions === 'object' && 'items' in (raw.directions as object)
      ? normalizeDirections(raw.directions as SiteContent['directions'], defaults.directions)
      : {
          ...defaults.directions,
          items: Array.isArray(raw.directions) ? (raw.directions as SiteContent['directions']['items']) : defaults.directions.items,
        }

  const formats =
    raw.formats && typeof raw.formats === 'object' && 'items' in (raw.formats as object)
      ? (raw.formats as SiteContent['formats'])
      : {
          ...defaults.formats,
          items: Array.isArray(raw.formats) ? (raw.formats as SiteContent['formats']['items']) : defaults.formats.items,
        }

  const lesson =
    raw.lesson && typeof raw.lesson === 'object' && 'steps' in (raw.lesson as object)
      ? (raw.lesson as SiteContent['lesson'])
      : {
          ...defaults.lesson,
          steps: Array.isArray(raw.lessonSteps)
            ? (raw.lessonSteps as SiteContent['lesson']['steps'])
            : defaults.lesson.steps,
        }

  const gallery =
    raw.gallery && typeof raw.gallery === 'object' && 'items' in (raw.gallery as object)
      ? normalizeGallery(raw.gallery as SiteContent['gallery'], defaults.gallery)
      : {
          ...defaults.gallery,
          items: Array.isArray(raw.gallery) ? (raw.gallery as SiteContent['gallery']['items']) : defaults.gallery.items,
        }

  const faq =
    raw.faq && typeof raw.faq === 'object' && 'items' in (raw.faq as object)
      ? {
          ...(raw.faq as SiteContent['faq']),
          items: normalizeFaqItems((raw.faq as SiteContent['faq']).items, defaults.faq.items),
        }
      : {
          ...defaults.faq,
          items: Array.isArray(raw.faq) ? (raw.faq as SiteContent['faq']['items']) : defaults.faq.items,
        }

  const teachers =
    raw.teachers && typeof raw.teachers === 'object' && 'items' in (raw.teachers as object)
      ? (raw.teachers as SiteContent['teachers'])
      : {
          ...defaults.teachers,
          items: Array.isArray(raw.teachers)
            ? (raw.teachers as SiteContent['teachers']['items'])
            : defaults.teachers.items,
          tabs: Array.isArray(raw.teacherLangTabs)
            ? (raw.teacherLangTabs as SiteContent['teachers']['tabs'])
            : defaults.teachers.tabs,
        }

  const brand = normalizeBrandContacts(
    raw.brand && typeof raw.brand === 'object'
      ? {
          ...defaults.brand,
          ...(raw.brand as SiteContent['brand']),
          navCta:
            (raw.brand as SiteContent['brand']).navCta ??
            defaults.brand.navCta,
        }
      : defaults.brand,
    defaults.brand,
  )

  return {
    ...defaults,
    ...raw,
    brand,
    hero,
    directions,
    formats,
    lesson,
    gallery,
    faq,
    teachers,
    pricing: raw.pricing
      ? normalizePricing({ ...defaults.pricing, ...(raw.pricing as SiteContent['pricing']) }, defaults.pricing)
      : defaults.pricing,
    germanDirection: raw.germanDirection
      ? { ...defaults.germanDirection, ...(raw.germanDirection as SiteContent['germanDirection']) }
      : defaults.germanDirection,
    contact: raw.contact ? { ...defaults.contact, ...(raw.contact as SiteContent['contact']) } : defaults.contact,
    nav: Array.isArray(raw.nav) ? (raw.nav as SiteContent['nav']) : defaults.nav,
    contactServices: Array.isArray(raw.contactServices)
      ? (raw.contactServices as SiteContent['contactServices'])
      : defaults.contactServices,
  }
}
