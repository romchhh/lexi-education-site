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
    'Школа іноземних мов у Львові. Англійська для дітей у невеликих групах до 6 учнів — гра, живе спілкування та результат уже з перших занять. Безкоштовне пробне заняття.',
  keywords: [
    'школа іноземних мов Львів',
    'англійська для дітей Львів',
    'курси англійської для дітей',
    'мінігрупи англійська',
    'пробне заняття англійська безкоштовно',
    'LEXI education',
    'школа англійської Львів',
    'англійська для дошкільнят',
    'англійська для підлітків Львів',
  ],
  ogImage: BRAND.heroImage,
  geo: {
    latitude: 49.842,
    longitude: 24.0315,
  },
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
    {
      days: ['Saturday'],
      opens: '10:00',
      closes: '15:00',
    },
  ],
} as const
