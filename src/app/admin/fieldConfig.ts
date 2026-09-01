export type AdminSelectOption = {
  value: string
  label: string
  hint?: string
}

/** Українські підписи полів замість технічних ключів */
export const ADMIN_FIELD_LABELS: Record<string, string> = {
  id: 'ID (внутрішній ключ)',
  slug: 'Slug (частина URL)',
  src: 'Фото',
  photo: 'Фото',
  logo: 'Логотип',
  heroImage: 'Зображення',
  image: 'Зображення',
  alt: 'Alt — опис зображення',
  size: 'Розмір у галереї',
  tone: 'Колір картки',
  available: 'Статус напряму',
  active: 'Активний таб',
  accent: 'Виділити картку',
  label: 'Назва',
  href: 'Посилання',
  title: 'Заголовок',
  titleEn: 'Назва англійською',
  flag: 'Прапор (емодзі)',
  tagline: 'Короткий слоган',
  blurb: 'Опис',
  meta: 'Мітка (badge)',
  value: 'Число / значення',
  num: 'Номер кроку',
  text: 'Текст',
  q: 'Питання',
  a: 'Відповідь',
  name: 'Імʼя на картці',
  fullName: 'Повне імʼя',
  language: 'Мова',
  level: 'Рівень',
  experience: 'Досвід',
  bio: 'Про викладача',
}

/** Підказки під полями */
export const ADMIN_FIELD_HINTS: Record<string, string> = {
  id: 'Латиниця без пробілів. Змінюйте лише якщо знаєте навіщо.',
  slug: 'Наприклад: nimetska — частина адреси /napryamy/nimetska',
  href: 'Наприклад: /napryamy/nimetska або /#ciny',
  alt: 'Коротко опишіть, що на фото — для людей із screen reader.',
  flag: 'Один емодзі прапора, наприклад 🇩🇪',
  meta: 'Коротка мітка на картці, наприклад «Група» або «1:1»',
  num: 'Номер у списку, наприклад 01, 02, 03',
}

/** Випадаючі списки для полів з фіксованим набором значень */
export const ADMIN_SELECT_OPTIONS: Record<string, AdminSelectOption[]> = {
  size: [
    {
      value: 'large',
      label: 'Велике',
      hint: 'Широка висока плитка — займає більшу частину сітки',
    },
    {
      value: 'tall',
      label: 'Високе',
      hint: 'Вузька плитка на два ряди',
    },
    {
      value: 'wide',
      label: 'Широке',
      hint: 'Горизонтальна плитка на один ряд',
    },
    {
      value: 'square',
      label: 'Квадрат',
      hint: 'Компактна квадратна плитка',
    },
  ],
  tone: [
    { value: 'blush', label: 'Рожевий', hint: 'Світло-рожевий фон' },
    { value: 'warm', label: 'Теплий беж', hint: 'Нейтральний теплий відтінок' },
    { value: 'white', label: 'Світлий', hint: 'Майже білий фон з тонкою рамкою' },
    { value: 'graphite', label: 'Темний', hint: 'Темний фон, білий текст' },
    { value: 'rose', label: 'Акцентний рожевий', hint: 'Яскравий брендовий колір' },
    { value: 'soft', label: 'Блакитно-сірий', hint: 'Холодний світлий відтінок' },
  ],
}

export const ADMIN_BOOLEAN_FIELDS = new Set(['available', 'active', 'accent'])

export const ADMIN_BOOLEAN_LABELS: Record<
  string,
  { label: string; hint?: string; on: string; off: string }
> = {
  available: {
    label: 'Статус напряму',
    hint: 'Відкритий напрям має посилання; «Скоро» — без переходу',
    on: 'Відкрито',
    off: 'Скоро',
  },
  active: {
    label: 'Активний таб',
    hint: 'Який таб мови показувати першим на сторінці викладачів',
    on: 'Так, активний',
    off: 'Ні',
  },
  accent: {
    label: 'Виділити картку',
    hint: 'Акцентна картка формату — темніша, помітніша',
    on: 'Так, виділити',
    off: 'Звичайна',
  },
}

/** Значення за замовчуванням при додаванні нового елемента списку */
export const ADMIN_FIELD_DEFAULTS: Record<string, unknown> = {
  size: 'square',
  tone: 'white',
  available: false,
  active: false,
  accent: false,
}

export function getAdminFieldLabel(field: string): string {
  return ADMIN_FIELD_LABELS[field] ?? field
}

export function getAdminFieldHint(field: string): string | undefined {
  return ADMIN_FIELD_HINTS[field]
}

export function getAdminSelectOptions(field: string): AdminSelectOption[] | undefined {
  return ADMIN_SELECT_OPTIONS[field]
}
