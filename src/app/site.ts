import { BRAND } from './brand'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://lexi.education'

export const SITE = {
  url: SITE_URL,
  name: BRAND.name,
  locale: 'uk_UA',
  title: 'LEXI.education — школа іноземних мов для дітей у Львові',
  titleTemplate: '%s · LEXI.education',
  description:
    'Школа іноземних мов у Львові. Англійська, німецька та французька для дітей у невеликих групах. Безкоштовне пробне заняття.',
  keywords: [
    'школа іноземних мов Львів',
    'англійська для дітей Львів',
    'німецька мова Львів',
    'французька для дітей',
    'курси англійської Львів',
    'LEXI education',
    'пробне заняття безкоштовно',
  ],
  ogImage: BRAND.heroImage,
} as const
