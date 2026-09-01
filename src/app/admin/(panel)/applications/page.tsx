'use client'

import { useCallback, useEffect, useState } from 'react'
import ui from '../../ui.module.css'
import type { Application, ApplicationStatus } from '@/lib/content/types'

const STATUSES: Array<{ value: ApplicationStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Усі' },
  { value: 'new', label: 'Нові' },
  { value: 'contacted', label: 'На звʼязку' },
  { value: 'enrolled', label: 'Записані' },
  { value: 'rejected', label: 'Відхилені' },
  { value: 'archived', label: 'Архів' },
]

export default function ApplicationsPage() {
  const [items, setItems] = useState<Application[]>([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState<ApplicationStatus | 'all'>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'newest' | 'oldest' | 'name'>('newest')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Application | null>(null)
  const [notes, setNotes] = useState('')
  const [message, setMessage] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({
      status,
      sort,
      page: String(page),
      limit: '25',
    })
    if (search.trim()) params.set('search', search.trim())

    const res = await fetch(`/api/admin/applications?${params}`)
    const data = await res.json()
    setItems(data.items ?? [])
    setTotal(data.total ?? 0)
    setLoading(false)
  }, [status, sort, page, search])

  useEffect(() => {
    load()
  }, [load])

  async function updateStatus(id: number, nextStatus: ApplicationStatus) {
    const res = await fetch('/api/admin/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: nextStatus }),
    })
    if (res.ok) {
      setMessage('Статус оновлено')
      setSelected((prev) => (prev?.id === id ? { ...prev, status: nextStatus } : prev))
      load()
    }
  }

  async function saveNotes() {
    if (!selected) return
    const res = await fetch('/api/admin/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id, notes }),
    })
    if (res.ok) {
      setMessage('Нотатки збережено')
      load()
    }
  }

  const pages = Math.max(1, Math.ceil(total / 25))

  return (
    <>
      <div className={ui.pageHeader}>
        <h1 className={ui.pageTitle}>Заявки</h1>
        <p className={ui.pageLead}>
          Усі заявки з форм сайту. Фільтруйте, сортуйте та додавайте нотатки.
        </p>
      </div>

      {message ? <div className={`${ui.message} ${ui.messageSuccess}`}>{message}</div> : null}

      <div className={ui.toolbar}>
        <select
          className={ui.select}
          style={{ width: 'auto', minWidth: 160 }}
          value={status}
          onChange={(e) => {
            setPage(1)
            setStatus(e.target.value as ApplicationStatus | 'all')
          }}
        >
          {STATUSES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <select
          className={ui.select}
          style={{ width: 'auto', minWidth: 160 }}
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
        >
          <option value="newest">Спочатку нові</option>
          <option value="oldest">Спочатку старі</option>
          <option value="name">За імʼям</option>
        </select>

        <input
          className={ui.input}
          style={{ maxWidth: 320, flex: 1 }}
          placeholder="Пошук: імʼя, телефон, email…"
          value={search}
          onChange={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
        />
      </div>

      <div className={ui.card}>
        <div className={ui.tableWrap}>
          <table className={ui.table}>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Імʼя</th>
                <th>Контакти</th>
                <th>Джерело</th>
                <th>Статус</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6}>
                    <div className={`${ui.skeleton} ${ui.skeletonBlock}`} style={{ margin: 12 }} />
                  </td>
                </tr>
              ) : items.length ? (
                items.map((item) => (
                  <tr key={item.id}>
                    <td>{formatDate(item.created_at)}</td>
                    <td>{item.name}</td>
                    <td>
                      <div>{item.phone}</div>
                      <div style={{ color: 'var(--admin-muted)', fontSize: 12 }}>{item.email}</div>
                    </td>
                    <td>{item.source || '—'}</td>
                    <td>
                      <span className={`${ui.badge} ${badgeClass(item.status)}`}>
                        {statusLabel(item.status)}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`${ui.btn} ${ui.btnSecondary}`}
                        onClick={() => {
                          setSelected(item)
                          setNotes(item.notes ?? '')
                          setMessage('')
                        }}
                      >
                        Відкрити
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={ui.empty}>
                    Заявок не знайдено
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={ui.btnRow}>
          <button
            type="button"
            className={`${ui.btn} ${ui.btnSecondary}`}
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Назад
          </button>
          <span style={{ alignSelf: 'center', color: 'var(--admin-muted)', fontSize: 14 }}>
            Сторінка {page} з {pages} · {total} заявок
          </span>
          <button
            type="button"
            className={`${ui.btn} ${ui.btnSecondary}`}
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Далі →
          </button>
        </div>
      </div>

      {selected ? (
        <>
          <button
            type="button"
            className={ui.drawerOverlay}
            aria-label="Закрити"
            onClick={() => setSelected(null)}
          />
          <aside className={ui.drawer} role="dialog" aria-modal="true" aria-label="Деталі заявки">
            <div className={ui.drawerHead}>
              <div>
                <h2>{selected.name}</h2>
                <p style={{ margin: '4px 0 0', color: 'var(--admin-muted)', fontSize: 13 }}>
                  {formatDate(selected.created_at)}
                </p>
              </div>
              <button type="button" className={ui.drawerClose} onClick={() => setSelected(null)}>
                ×
              </button>
            </div>

            <div className={ui.drawerBody}>
              <div className={ui.quickLinks}>
                <a href={`tel:${selected.phone.replace(/\s/g, '')}`}>Подзвонити</a>
                <a href={`mailto:${selected.email}`}>Написати email</a>
              </div>

              <p style={{ margin: '0 0 16px', lineHeight: 1.5 }}>
                <strong>{selected.phone}</strong>
                <br />
                {selected.email}
              </p>

              {(selected.page_title || selected.page_url) && (
                <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--admin-muted)' }}>
                  Сторінка: {selected.page_title || selected.page_url}
                  {selected.source ? ` · ${selected.source}` : ''}
                </p>
              )}

              <div className={ui.toolbar} style={{ marginBottom: 16 }}>
                {STATUSES.filter((s) => s.value !== 'all').map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    className={`${ui.btn} ${selected.status === s.value ? ui.btnPrimary : ui.btnSecondary}`}
                    onClick={() => updateStatus(selected.id, s.value as ApplicationStatus)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className={ui.field}>
                <label htmlFor="notes">Нотатки</label>
                <textarea
                  id="notes"
                  className={ui.textarea}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className={ui.btnRow}>
                <button type="button" className={`${ui.btn} ${ui.btnPrimary}`} onClick={saveNotes}>
                  Зберегти нотатки
                </button>
              </div>
            </div>
          </aside>
        </>
      ) : null}
    </>
  )
}

function formatDate(value: string): string {
  const date = new Date(value.replace(' ', 'T'))
  return date.toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function statusLabel(status: ApplicationStatus): string {
  const map: Record<ApplicationStatus, string> = {
    new: 'Нова',
    contacted: 'На звʼязку',
    enrolled: 'Записана',
    rejected: 'Відхилена',
    archived: 'Архів',
  }
  return map[status]
}

function badgeClass(status: ApplicationStatus): string {
  const map: Record<ApplicationStatus, string> = {
    new: ui.badgeNew,
    contacted: ui.badgeContacted,
    enrolled: ui.badgeEnrolled,
    rejected: ui.badgeRejected,
    archived: ui.badgeArchived,
  }
  return map[status]
}
