import type { ContentSectionKey } from './types'

export const CONTENT_SECTIONS: Array<{
  key: ContentSectionKey
  label: string
  page: string
  description: string
}> = [
  { key: 'brand', label: 'Бренд і контакти', page: 'Загальне', description: 'Назва, телефон, email, адреса, кнопка в меню' },
  { key: 'nav', label: 'Навігація', page: 'Загальне', description: 'Пункти меню сайту' },
  { key: 'hero', label: 'Hero (головний екран)', page: 'Головна', description: 'Заголовок, підзаголовок, кнопка, фото, статистика' },
  { key: 'directions', label: 'Напрями', page: 'Головна', description: 'Заголовок блоку, текст і картки мов' },
  { key: 'formats', label: 'Формати навчання', page: 'Головна', description: 'Заголовок, опис і картки форматів' },
  { key: 'pricing', label: 'Ціни', page: 'Головна', description: 'Заголовок, пробне, таби, пакети, CTA' },
  { key: 'lesson', label: 'Як проходить заняття', page: 'Головна', description: 'Заголовок, опис, кроки, кнопка' },
  { key: 'gallery', label: 'Галерея', page: 'Головна', description: 'Заголовок, опис і фото' },
  { key: 'contact', label: 'Контакти / форма', page: 'Головна', description: 'Заголовок і текст над формою' },
  { key: 'faq', label: 'FAQ', page: 'FAQ', description: 'Заголовок, Telegram-блок і питання' },
  { key: 'teachers', label: 'Викладачі', page: 'Викладачі', description: 'Заголовок, CTA, таби і картки' },
  { key: 'germanDirection', label: 'Сторінка німецької', page: 'Напрями', description: 'Hero, процес, кнопки /napryamy/nimetska' },
  { key: 'contactServices', label: 'Послуги у формі', page: 'Форма', description: 'Варіанти у формі заявки' },
]
