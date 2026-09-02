'use client'

import { useEffect, useState } from 'react'
import MediaField, { MEDIA_FIELD_NAMES } from '../../components/MediaField'
import { ListItemField, TextField, ToggleField } from '../../components/AdminFields'
import {
  ADMIN_BOOLEAN_FIELDS,
  ADMIN_BOOLEAN_LABELS,
  ADMIN_FIELD_DEFAULTS,
  getAdminFieldLabel,
} from '../../fieldConfig'
import type { BlockHeading, ContentSectionKey, SiteContent } from '@/lib/content/types'
import ui from '../../ui.module.css'

export function SectionEditor({
  sectionKey,
  value,
  onChange,
}: {
  sectionKey: ContentSectionKey
  value: unknown
  onChange: (value: unknown) => void
}) {
  switch (sectionKey) {
    case 'brand':
      return <BrandEditor value={value as SiteContent['brand']} onChange={onChange} />
    case 'nav':
      return <ListEditor title="Пункт меню" value={value as SiteContent['nav']} onChange={onChange} fields={['label', 'href']} />
    case 'hero':
      return <HeroEditor value={value as SiteContent['hero']} onChange={onChange} />
    case 'directions':
      return <DirectionsEditor value={value as SiteContent['directions']} onChange={onChange} />
    case 'formats':
      return <FormatsEditor value={value as SiteContent['formats']} onChange={onChange} />
    case 'pricing':
      return <PricingEditor value={value as SiteContent['pricing']} onChange={onChange} />
    case 'lesson':
      return <LessonEditor value={value as SiteContent['lesson']} onChange={onChange} />
    case 'gallery':
      return <GalleryEditor value={value as SiteContent['gallery']} onChange={onChange} />
    case 'faq':
      return <FaqEditor value={value as SiteContent['faq']} onChange={onChange} />
    case 'teachers':
      return <TeachersEditor value={value as SiteContent['teachers']} onChange={onChange} />
    case 'germanDirection':
      return <GermanDirectionEditor value={value as SiteContent['germanDirection']} onChange={onChange} />
    case 'contact':
      return <ContactEditor value={value as SiteContent['contact']} onChange={onChange} />
    case 'contactServices':
      return <StringListEditor title="Послуга" value={value as string[]} onChange={onChange} />
    default:
      return <JsonEditor value={value} onChange={onChange} />
  }
}

function HeadingEditor({
  label,
  value,
  onChange,
}: {
  label: string
  value: BlockHeading
  onChange: (v: BlockHeading) => void
}) {
  return (
    <div className={ui.card} style={{ marginBottom: 12 }}>
      <h3 className={ui.cardTitle}>{label}</h3>
      <TextField label="Перший рядок заголовка" value={value.line1} onChange={(line1) => onChange({ ...value, line1 })} />
      <TextField label="Акцент (курсив, другий рядок)" value={value.line2Em} onChange={(line2Em) => onChange({ ...value, line2Em })} />
    </div>
  )
}

function BrandEditor({ value, onChange }: { value: SiteContent['brand']; onChange: (v: SiteContent['brand']) => void }) {
  return (
    <div className={ui.card}>
      <TextField label="Назва школи" value={value.name} onChange={(name) => onChange({ ...value, name })} />
      <TextField label="Телефон" value={value.phone} onChange={(phone) => onChange({ ...value, phone })} />
      <TextField label="Email" value={value.email} onChange={(email) => onChange({ ...value, email })} />
      <TextField label="Адреса" value={value.address} onChange={(address) => onChange({ ...value, address })} />
      <TextField label="Місто" value={value.city} onChange={(city) => onChange({ ...value, city })} />
      <TextField label="Telegram URL" value={value.telegram} onChange={(telegram) => onChange({ ...value, telegram })} />
      <TextField label="Telegram (нік)" value={value.telegramHandle} onChange={(telegramHandle) => onChange({ ...value, telegramHandle })} />
      <TextField label="Instagram URL" value={value.instagram} onChange={(instagram) => onChange({ ...value, instagram })} />
      <TextField label="Instagram (нік)" value={value.instagramHandle} onChange={(instagramHandle) => onChange({ ...value, instagramHandle })} />
      <MediaField label="Логотип" value={value.logo} onChange={(logo) => onChange({ ...value, logo })} />
      <TextField label="Кнопка в меню (Записатись)" value={value.navCta} onChange={(navCta) => onChange({ ...value, navCta })} />
    </div>
  )
}

function HeroEditor({ value, onChange }: { value: SiteContent['hero']; onChange: (v: SiteContent['hero']) => void }) {
  return (
    <div>
      <div className={ui.card}>
        <h3 className={ui.cardTitle}>Текст Hero</h3>
        <TextField label="Назва бренду (LEXI Education)" value={value.headlineLine1} onChange={(headlineLine1) => onChange({ ...value, headlineLine1 })} />
        <TextField label="Слоган (more than words)" value={value.highlight} onChange={(highlight) => onChange({ ...value, highlight })} />
        <TextField label="Підзаголовок" value={value.headlineLine3} onChange={(headlineLine3) => onChange({ ...value, headlineLine3 })} />
        <TextField label="Опис" value={value.role} onChange={(role) => onChange({ ...value, role })} multiline />
        <TextField label="Текст кнопки" value={value.cta} onChange={(cta) => onChange({ ...value, cta })} />
        <MediaField label="Hero фото" value={value.heroImage} onChange={(heroImage) => onChange({ ...value, heroImage })} />
        <TextField label="Alt текст фото" value={value.heroImageAlt} onChange={(heroImageAlt) => onChange({ ...value, heroImageAlt })} />
      </div>
      <ListEditor
        title="Статистика"
        value={value.stats}
        onChange={(stats) => onChange({ ...value, stats })}
        fields={['value', 'label']}
      />
    </div>
  )
}

function ContactEditor({ value, onChange }: { value: SiteContent['contact']; onChange: (v: SiteContent['contact']) => void }) {
  return (
    <div className={ui.card}>
      <TextField label="Заголовок — рядок 1" value={value.titleLine1} onChange={(titleLine1) => onChange({ ...value, titleLine1 })} />
      <TextField label="Заголовок — рядок 2" value={value.titleLine2} onChange={(titleLine2) => onChange({ ...value, titleLine2 })} />
      <TextField label="Текст над формою" value={value.hookText} onChange={(hookText) => onChange({ ...value, hookText })} />
      <TextField label="Акцент у тексті (курсив)" value={value.hookEm} onChange={(hookEm) => onChange({ ...value, hookEm })} />
      <TextField label="Продовження тексту" value={value.hookSuffix} onChange={(hookSuffix) => onChange({ ...value, hookSuffix })} />
    </div>
  )
}

function DirectionsEditor({ value, onChange }: { value: SiteContent['directions']; onChange: (v: SiteContent['directions']) => void }) {
  return (
    <div>
      <HeadingEditor label="Заголовок блоку" value={value.heading} onChange={(heading) => onChange({ ...value, heading })} />
      <div className={ui.card}>
        <TextField label="Підзаголовок" value={value.lead} onChange={(lead) => onChange({ ...value, lead })} multiline />
        <TextField label="Кнопка «Детальніше»" value={value.ctaMore} onChange={(ctaMore) => onChange({ ...value, ctaMore })} />
        <TextField label="Текст кнопки «Повідомити про старт»" value={value.ctaSoon} onChange={(ctaSoon) => onChange({ ...value, ctaSoon })} />
      </div>
      <ListEditor title="Напрям" value={value.items} onChange={(items) => onChange({ ...value, items })} fields={['id', 'slug', 'title', 'titleEn', 'flag', 'tagline', 'blurb', 'meta', 'href', 'available']} />
    </div>
  )
}

function FormatsEditor({ value, onChange }: { value: SiteContent['formats']; onChange: (v: SiteContent['formats']) => void }) {
  return (
    <div>
      <HeadingEditor label="Заголовок блоку" value={value.heading} onChange={(heading) => onChange({ ...value, heading })} />
      <div className={ui.card}>
        <TextField label="Підзаголовок" value={value.lead} onChange={(lead) => onChange({ ...value, lead })} multiline />
      </div>
      <div>
        {value.items.map((item, index) => (
          <div className={ui.block} key={item.id || index}>
            <div className={ui.blockHead}>
              <h4>{item.title || `Формат #${index + 1}`}</h4>
              <button type="button" className={`${ui.btn} ${ui.btnDanger}`} onClick={() => onChange({ ...value, items: value.items.filter((_, i) => i !== index) })}>Видалити</button>
            </div>
            {(['id', 'title', 'meta'] as const).map((field) => (
              <TextField
                key={field}
                label={getAdminFieldLabel(field)}
                value={item[field]}
                onChange={(v) => {
                  const items = [...value.items]
                  items[index] = { ...items[index]!, [field]: v }
                  onChange({ ...value, items })
                }}
              />
            ))}
            <ToggleField
              label={ADMIN_BOOLEAN_LABELS.accent!.label}
              value={Boolean(item.accent)}
              onChange={(accent) => {
                const items = [...value.items]
                items[index] = { ...items[index]!, accent }
                onChange({ ...value, items })
              }}
              hint={ADMIN_BOOLEAN_LABELS.accent!.hint}
              onLabel={ADMIN_BOOLEAN_LABELS.accent!.on}
              offLabel={ADMIN_BOOLEAN_LABELS.accent!.off}
            />
            <TextField
              label="Текст картки"
              hint="Кілька абзаців — розділяйте символом ||"
              value={item.body.join(' || ')}
              onChange={(v) => {
                const items = [...value.items]
                items[index] = { ...items[index]!, body: v.split('||').map((s) => s.trim()) }
                onChange({ ...value, items })
              }}
              multiline
            />
          </div>
        ))}
        <button type="button" className={`${ui.btn} ${ui.btnSecondary}`} onClick={() => onChange({ ...value, items: [...value.items, { id: `format-${Date.now()}`, title: '', meta: '', body: [''], accent: false }] })}>+ Додати формат</button>
      </div>
    </div>
  )
}

function LessonEditor({ value, onChange }: { value: SiteContent['lesson']; onChange: (v: SiteContent['lesson']) => void }) {
  return (
    <div>
      <HeadingEditor label="Заголовок блоку" value={value.heading} onChange={(heading) => onChange({ ...value, heading })} />
      <div className={ui.card}>
        <TextField label="Підзаголовок" value={value.lead} onChange={(lead) => onChange({ ...value, lead })} multiline />
        <TextField label="Текст кнопки" value={value.cta} onChange={(cta) => onChange({ ...value, cta })} />
      </div>
      <ListEditor title="Крок" value={value.steps} onChange={(steps) => onChange({ ...value, steps })} fields={['num', 'title', 'text']} />
    </div>
  )
}

function GalleryEditor({ value, onChange }: { value: SiteContent['gallery']; onChange: (v: SiteContent['gallery']) => void }) {
  return (
    <div>
      <HeadingEditor label="Заголовок блоку" value={value.heading} onChange={(heading) => onChange({ ...value, heading })} />
      <div className={ui.card}>
        <TextField label="Підзаголовок" value={value.lead} onChange={(lead) => onChange({ ...value, lead })} multiline />
        <TextField label="Lightbox — рядок 1" value={value.lightboxLine1} onChange={(lightboxLine1) => onChange({ ...value, lightboxLine1 })} />
        <TextField label="Lightbox — акцент" value={value.lightboxEm} onChange={(lightboxEm) => onChange({ ...value, lightboxEm })} />
      </div>
      <ListEditor title="Фото" value={value.items} onChange={(items) => onChange({ ...value, items })} fields={['src', 'alt', 'size']} mediaFields={['src']} />
    </div>
  )
}

function FaqEditor({ value, onChange }: { value: SiteContent['faq']; onChange: (v: SiteContent['faq']) => void }) {
  return (
    <div>
      <HeadingEditor label="Заголовок блоку" value={value.heading} onChange={(heading) => onChange({ ...value, heading })} />
      <div className={ui.card}>
        <TextField label="Підзаголовок" value={value.lead} onChange={(lead) => onChange({ ...value, lead })} multiline />
        <TextField label="Telegram — заголовок" value={value.telegramLabel} onChange={(telegramLabel) => onChange({ ...value, telegramLabel })} />
        <TextField label="Telegram — текст" value={value.telegramText} onChange={(telegramText) => onChange({ ...value, telegramText })} multiline />
        <TextField label="Telegram — кнопка" value={value.telegramBtn} onChange={(telegramBtn) => onChange({ ...value, telegramBtn })} />
      </div>
      <ListEditor title="Питання" value={value.items} onChange={(items) => onChange({ ...value, items })} fields={['q', 'a']} />
    </div>
  )
}

function TeachersEditor({ value, onChange }: { value: SiteContent['teachers']; onChange: (v: SiteContent['teachers']) => void }) {
  return (
    <div>
      <HeadingEditor label="Заголовок блоку" value={value.heading} onChange={(heading) => onChange({ ...value, heading })} />
      <div className={ui.card}>
        <TextField label="Кнопка на картці" value={value.cardMore} onChange={(cardMore) => onChange({ ...value, cardMore })} />
        <TextField label="Префікс досвіду" value={value.experiencePrefix} onChange={(experiencePrefix) => onChange({ ...value, experiencePrefix })} />
        <TextField label="CTA — заголовок" value={value.ctaTitle} onChange={(ctaTitle) => onChange({ ...value, ctaTitle })} />
        <TextField label="CTA — текст" value={value.ctaText} onChange={(ctaText) => onChange({ ...value, ctaText })} multiline />
        <TextField label="CTA — кнопка" value={value.ctaBtn} onChange={(ctaBtn) => onChange({ ...value, ctaBtn })} />
      </div>
      <ListEditor title="Таб мови" value={value.tabs} onChange={(tabs) => onChange({ ...value, tabs })} fields={['id', 'label', 'flag', 'active']} />
      <ListEditor title="Викладач" value={value.items} onChange={(items) => onChange({ ...value, items })} fields={['id', 'name', 'fullName', 'language', 'flag', 'level', 'experience', 'bio', 'photo']} mediaFields={['photo']} />
    </div>
  )
}

function PricingEditor({ value, onChange }: { value: SiteContent['pricing']; onChange: (v: SiteContent['pricing']) => void }) {
  return (
    <div>
      <HeadingEditor label="Заголовок блоку" value={value.heading} onChange={(heading) => onChange({ ...value, heading })} />
      <div className={ui.card}>
        <TextField label="Підзаголовок" value={value.intro} onChange={(intro) => onChange({ ...value, intro })} multiline />
        <TextField label="Пробне — badge" value={value.trialBadge} onChange={(trialBadge) => onChange({ ...value, trialBadge })} />
        <TextField label="Пробне — ціна" value={value.trialPrice} onChange={(trialPrice) => onChange({ ...value, trialPrice })} />
        <TextField label="Пробне — заголовок" value={value.trialTitle} onChange={(trialTitle) => onChange({ ...value, trialTitle })} />
        <TextField label="Пробне — текст" value={value.trialText} onChange={(trialText) => onChange({ ...value, trialText })} multiline />
        <TextField label="Пробне — кнопка" value={value.trialCta} onChange={(trialCta) => onChange({ ...value, trialCta })} />
        <TextField label="Примітка комплексу" value={value.comboNote} onChange={(comboNote) => onChange({ ...value, comboNote })} multiline />
        <TextField label="Пакети — заголовок" value={value.packagesTitle} onChange={(packagesTitle) => onChange({ ...value, packagesTitle })} />
        <TextField label="Пакети — підказка" value={value.packagesHint} onChange={(packagesHint) => onChange({ ...value, packagesHint })} />
        <TextField label="Допомога — заголовок" value={value.helpTitle} onChange={(helpTitle) => onChange({ ...value, helpTitle })} />
        <TextField label="Допомога — текст" value={value.helpText} onChange={(helpText) => onChange({ ...value, helpText })} />
        <TextField label="Допомога — кнопка" value={value.helpCta} onChange={(helpCta) => onChange({ ...value, helpCta })} />
      </div>
      <JsonEditor label="Таби та таблиці цін (JSON)" value={{ tabs: value.tabs, examPrices: value.examPrices, comboPrices: value.comboPrices, packages: value.packages }} onChange={(data) => {
        const parsed = data as Pick<SiteContent['pricing'], 'tabs' | 'examPrices' | 'comboPrices' | 'packages'>
        onChange({ ...value, ...parsed })
      }} />
    </div>
  )
}

function GermanDirectionEditor({ value, onChange }: { value: SiteContent['germanDirection']; onChange: (v: SiteContent['germanDirection']) => void }) {
  return (
    <div>
      <div className={ui.card}>
        <TextField label="Hero — заголовок" value={value.heroTitle} onChange={(heroTitle) => onChange({ ...value, heroTitle })} />
        <TextField label="Hero — акцент" value={value.heroTitleEm} onChange={(heroTitleEm) => onChange({ ...value, heroTitleEm })} />
        <TextField label="Hero — tagline" value={value.heroTagline} onChange={(heroTagline) => onChange({ ...value, heroTagline })} />
        <TextField label="Hero — lead" value={value.heroLead} onChange={(heroLead) => onChange({ ...value, heroLead })} multiline />
        <TextField label="Hero — кнопка" value={value.heroCta} onChange={(heroCta) => onChange({ ...value, heroCta })} />
        <TextField label="Процес — заголовок" value={value.processTitle} onChange={(processTitle) => onChange({ ...value, processTitle })} />
        <TextField label="Процес — кнопка" value={value.processCta} onChange={(processCta) => onChange({ ...value, processCta })} />
      </div>
      <ListEditor title="Блок процесу" value={value.process} onChange={(process) => onChange({ ...value, process })} fields={['id', 'title', 'text', 'tone']} />
    </div>
  )
}

function ListEditor<T extends Record<string, unknown>>({
  title,
  value,
  onChange,
  fields,
  mediaFields,
}: {
  title: string
  value: T[]
  onChange: (v: T[]) => void
  fields: Array<keyof T & string>
  mediaFields?: string[]
}) {
  const mediaSet = new Set(mediaFields ?? MEDIA_FIELD_NAMES)

  return (
    <div>
      {value.map((item, index) => (
        <div className={ui.block} key={index}>
          <div className={ui.blockHead}>
            <h4>{title} #{index + 1}</h4>
            <button type="button" className={`${ui.btn} ${ui.btnDanger}`} onClick={() => onChange(value.filter((_, i) => i !== index))}>Видалити</button>
          </div>
          {fields.map((field) => {
            if (mediaSet.has(field)) {
              return (
                <MediaField
                  key={field}
                  label={getAdminFieldLabel(field)}
                  value={String(item[field] ?? '')}
                  onChange={(v) => {
                    const next = [...value]
                    next[index] = { ...next[index]!, [field]: v }
                    onChange(next)
                  }}
                />
              )
            }

            if (ADMIN_BOOLEAN_FIELDS.has(field)) {
              const boolConfig = ADMIN_BOOLEAN_LABELS[field]!
              return (
                <ToggleField
                  key={field}
                  label={boolConfig.label}
                  value={Boolean(item[field])}
                  onChange={(checked) => {
                    const next = [...value]
                    next[index] = { ...next[index]!, [field]: checked }
                    onChange(next)
                  }}
                  hint={boolConfig.hint}
                  onLabel={boolConfig.on}
                  offLabel={boolConfig.off}
                />
              )
            }

            return (
              <ListItemField
                key={field}
                field={field}
                value={item[field]}
                onChange={(next) => {
                  const updated = [...value]
                  updated[index] = { ...updated[index]!, [field]: next }
                  onChange(updated)
                }}
              />
            )
          })}
        </div>
      ))}
      <button type="button" className={`${ui.btn} ${ui.btnSecondary}`} onClick={() => {
        const empty = fields.reduce((acc, field) => {
          acc[field] = field in ADMIN_FIELD_DEFAULTS
            ? ADMIN_FIELD_DEFAULTS[field]
            : ADMIN_BOOLEAN_FIELDS.has(field)
              ? false
              : ''
          return acc
        }, {} as Record<string, unknown>)
        onChange([...value, empty as T])
      }}>+ Додати</button>
    </div>
  )
}

function StringListEditor({ title, value, onChange }: { title: string; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div>
      {value.map((item, index) => (
        <div className={ui.block} key={index}>
          <div className={ui.blockHead}>
            <h4>{title} #{index + 1}</h4>
            <button type="button" className={`${ui.btn} ${ui.btnDanger}`} onClick={() => onChange(value.filter((_, i) => i !== index))}>Видалити</button>
          </div>
          <input className={ui.input} value={item} onChange={(e) => { const next = [...value]; next[index] = e.target.value; onChange(next) }} />
        </div>
      ))}
      <button type="button" className={`${ui.btn} ${ui.btnSecondary}`} onClick={() => onChange([...value, ''])}>+ Додати</button>
    </div>
  )
}

function JsonEditor({ value, onChange, label = 'Розширений JSON' }: { value: unknown; onChange: (v: unknown) => void; label?: string }) {
  const [text, setText] = useState(JSON.stringify(value, null, 2))
  const [localError, setLocalError] = useState('')

  useEffect(() => { setText(JSON.stringify(value, null, 2)) }, [value])

  return (
    <div className={ui.card}>
      <h3 className={ui.cardTitle}>{label}</h3>
      {localError ? <div className={`${ui.message} ${ui.messageError}`}>{localError}</div> : null}
      <textarea className={ui.textarea} style={{ minHeight: 320, fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13 }} value={text} onChange={(e) => {
        setText(e.target.value)
        try { onChange(JSON.parse(e.target.value)); setLocalError('') } catch { setLocalError('Невалідний JSON') }
      }} />
    </div>
  )
}
