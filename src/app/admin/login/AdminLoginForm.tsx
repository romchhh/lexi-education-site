'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { BRAND } from '@/app/brand'
import shell from '../admin.module.css'
import ui from '../ui.module.css'

export default function AdminLoginForm() {
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        setError('Невірний логін або пароль')
        return
      }

      const next = searchParams.get('next') || '/admin'
      window.location.assign(next)
    } catch {
      setError('Помилка зʼєднання. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={shell.adminRoot}>
      <div className={ui.loginPage}>
        <form className={ui.loginCard} onSubmit={onSubmit}>
        <div className={ui.loginLogoWrap}>
          <Image
            src={BRAND.logo}
            alt={BRAND.name}
            width={96}
            height={96}
            className={ui.loginLogo}
            priority
          />
        </div>
        <h1>LEXI Admin</h1>
        <p>Увійдіть, щоб керувати сайтом, заявками та контентом.</p>

        {error ? <div className={`${ui.message} ${ui.messageError}`}>{error}</div> : null}

        <div className={ui.field}>
          <label htmlFor="username">Логін</label>
          <input
            id="username"
            className={ui.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className={ui.field}>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            className={ui.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit" className={`${ui.btn} ${ui.btnPrimary} ${ui.loginSubmit}`} disabled={loading}>
          {loading ? 'Вхід…' : 'Увійти'}
        </button>
        </form>
      </div>
    </div>
  )
}
