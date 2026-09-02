export type BlockHeading = {
  line1: string
  line2Em: string
}

export type BrandContent = {
  name: string
  phone: string
  email: string
  address: string
  city: string
  telegram: string
  telegramHandle: string
  instagram: string
  instagramHandle: string
  logo: string
  navCta: string
}

export type NavItem = { label: string; href: string }
export type StatItem = { value: string; label: string; icon?: 'globe' | 'group' | 'levels' }

export type HeroContent = {
  headlineLine1: string
  headlineMiddle: string
  highlight: string
  headlineLine3: string
  role: string
  cta: string
  heroImage: string
  heroImageAlt: string
  stats: StatItem[]
}

export type FormatItem = {
  id: string
  title: string
  meta: string
  accent?: boolean
  body: string[]
}

export type LessonStep = { num: string; title: string; text: string }

export type GalleryItem = {
  src: string
  alt: string
  size: 'large' | 'tall' | 'wide' | 'square'
}

export type FaqItem = { q: string; a: string }

export type DirectionItem = {
  id: string
  slug: string
  title: string
  titleEn: string
  flag: string
  tagline: string
  blurb: string
  meta: string
  href: string
  available: boolean
}

export type TeacherItem = {
  id: string
  name: string
  fullName: string
  language: string
  flag: string
  level: string
  experience: string
  bio: string
  photo: string
}

export type TeacherLangTab = { id: string; label: string; flag: string; active: boolean }

export type DirectionsContent = {
  heading: BlockHeading
  lead: string
  ctaMore: string
  ctaSoon: string
  items: DirectionItem[]
}

export type FormatsContent = {
  heading: BlockHeading
  lead: string
  items: FormatItem[]
}

export type LessonContent = {
  heading: BlockHeading
  lead: string
  cta: string
  steps: LessonStep[]
}

export type GalleryContent = {
  heading: BlockHeading
  lead: string
  lightboxLine1: string
  lightboxEm: string
  items: GalleryItem[]
}

export type FaqContent = {
  heading: BlockHeading
  lead: string
  telegramLabel: string
  telegramText: string
  telegramBtn: string
  items: FaqItem[]
}

export type TeachersContent = {
  heading: BlockHeading
  cardMore: string
  experiencePrefix: string
  ctaTitle: string
  ctaText: string
  ctaBtn: string
  tabs: TeacherLangTab[]
  items: TeacherItem[]
}

export type PricingContent = {
  heading: BlockHeading
  intro: string
  trialBadge: string
  trialPrice: string
  trialTitle: string
  trialText: string
  trialCta: string
  comboNote: string
  packagesTitle: string
  packagesHint: string
  helpTitle: string
  helpText: string
  helpCta: string
  tabs: Array<{
    id: string
    label: string
    title: string
    subtitle: string
    note?: string
    tables: Array<{
      heading?: string
      meta?: string
      headers: [string, string]
      rows: Array<{ level: string; price: string }>
      footer?: string
    }>
  }>
  examPrices: {
    headers: string[]
    rows: string[][]
  }
  comboPrices: {
    headers: string[]
    rows: string[][]
  }
  packages: {
    standard: Array<{ name: string; discount: string }>
    sprachklub: Array<{ name: string; discount: string }>
  }
}

export type ContactContent = {
  titleLine1: string
  titleLine2: string
  hookText: string
  hookEm: string
  hookSuffix: string
}

export type GermanDirectionContent = {
  slug: string
  title: string
  titleEn: string
  flag: string
  heroTitle: string
  heroTitleEm: string
  heroTagline: string
  heroLead: string
  heroCta: string
  processTitle: string
  processCta: string
  process: Array<{
    id: string
    title: string
    text: string
    tone: string
  }>
}

export type SiteContent = {
  brand: BrandContent
  nav: NavItem[]
  hero: HeroContent
  directions: DirectionsContent
  formats: FormatsContent
  pricing: PricingContent
  lesson: LessonContent
  gallery: GalleryContent
  faq: FaqContent
  teachers: TeachersContent
  germanDirection: GermanDirectionContent
  contact: ContactContent
  contactServices: string[]
}

export type ContentSectionKey = keyof SiteContent

export type ApplicationStatus = 'new' | 'contacted' | 'enrolled' | 'rejected' | 'archived'

export type Application = {
  id: number
  name: string
  phone: string
  email: string
  source: string | null
  page_url: string | null
  page_title: string | null
  status: ApplicationStatus
  notes: string | null
  created_at: string
}
