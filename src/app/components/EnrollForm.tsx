'use client'

import { useState } from 'react'
import { BRAND } from '../brand'
import { ArrowIcon } from './EnrollButton'
import styles from './EnrollForm.module.css'

type FormState = {
  name: string
  phone: string
  email: string
}

type Errors = {
  name: boolean
  phone: boolean
  email: boolean
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const initial: FormState = { name: '', phone: '', email: '' }

const SOURCE_LABELS: Record<string, string> = {
  modal: 'Модальне вікно',
  contact: 'Сторінка контактів',
}

type Props = {
  idPrefix?: string
  compact?: boolean
  source?: string
  onSuccess?: () => void
}

export default function EnrollForm({ idPrefix = 'enroll', compact = false, source, onSuccess }: Props) {
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Errors>({ name: false, phone: false, email: false })
  const [status, setStatus] = useState<Status>('idle')

  const set =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setForm((f) => ({ ...f, [key]: value }))
      if (errors[key]) setErrors((err) => ({ ...err, [key]: false }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next: Errors = {
      name: form.name.trim() === '',
      phone: form.phone.trim().length < 10,
      email: form.email.trim() === '' || !form.email.includes('@'),
    }
    setErrors(next)
    if (next.name || next.phone || next.email) return

    setStatus('loading')

    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          source: source ?? SOURCE_LABELS[idPrefix] ?? idPrefix,
          pageUrl: window.location.href,
          pageTitle: document.title,
        }),
      })

      if (!response.ok) throw new Error('submit_failed')

      setStatus('success')
      setForm(initial)
      if (onSuccess) {
        window.setTimeout(() => onSuccess(), 1400)
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <span className={styles.successMark} aria-hidden="true">✓</span>
        <h3>Заявку отримано</h3>
        <p>Ми зв&apos;яжемося з вами найближчим часом.</p>
        <button type="button" className={styles.submit} onClick={() => setStatus('idle')}>
          <span>Надіслати ще</span>
          <ArrowIcon />
        </button>
      </div>
    )
  }

  return (
    <form className={`${styles.form} ${compact ? styles.compact : ''}`} onSubmit={handleSubmit} noValidate>
      <div className={styles.inputs}>
        <label className={`${styles.field} ${errors.name ? styles.invalid : ''}`}>
          <span className={styles.srOnly}>Ім&apos;я</span>
          <input
            id={`${idPrefix}-name`}
            type="text"
            placeholder="ім'я"
            value={form.name}
            onChange={set('name')}
            autoComplete="name"
          />
        </label>
        <label className={`${styles.field} ${errors.phone ? styles.invalid : ''}`}>
          <span className={styles.srOnly}>Телефон</span>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            placeholder="телефон"
            value={form.phone}
            onChange={set('phone')}
            autoComplete="tel"
          />
        </label>
        <label className={`${styles.field} ${errors.email ? styles.invalid : ''}`}>
          <span className={styles.srOnly}>Пошта</span>
          <input
            id={`${idPrefix}-email`}
            type="email"
            placeholder="пошта"
            value={form.email}
            onChange={set('email')}
            autoComplete="email"
          />
        </label>
      </div>

      <div className={styles.actions}>
        {status === 'error' ? (
          <p className={styles.submitError} role="alert">
            Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам у Telegram.
          </p>
        ) : null}
        <button type="submit" className={styles.submit} disabled={status === 'loading'}>
          <span>{status === 'loading' ? 'Надсилання…' : 'Відправити'}</span>
          <ArrowIcon />
        </button>
        <div className={styles.orBlock}>
          <p className={styles.or}>Або</p>
          <div className={styles.telegramRow}>
            <span>Написати нам у</span>
            <a href={BRAND.telegram} className={styles.telegram} target="_blank" rel="noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8-1.56 7.36c-.12.54-.43.67-.87.42l-2.4-1.77-1.16 1.12c-.13.13-.24.24-.49.24l.17-2.43 4.45-4.02c.19-.17-.04-.27-.3-.1l-5.5 3.46-2.37-.74c-.51-.16-.52-.51.11-.76l9.27-3.57c.43-.16.8.1.55.79z" />
              </svg>
              Telegram
            </a>
          </div>
        </div>
      </div>
    </form>
  )
}
