'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { CONTENT_SECTIONS } from '@/lib/content/sections'
import ui from '../../ui.module.css'

export default function ContentIndexPage() {
  const [query, setQuery] = useState('')

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = q
      ? CONTENT_SECTIONS.filter(
          (section) =>
            section.label.toLowerCase().includes(q) ||
            section.description.toLowerCase().includes(q) ||
            section.page.toLowerCase().includes(q) ||
            section.key.toLowerCase().includes(q),
        )
      : CONTENT_SECTIONS

    return filtered.reduce<Record<string, typeof CONTENT_SECTIONS>>((acc, section) => {
      acc[section.page] = acc[section.page] ?? []
      acc[section.page].push(section)
      return acc
    }, {})
  }, [query])

  const total = Object.values(grouped).reduce((sum, sections) => sum + sections.length, 0)

  return (
    <>
      <div className={ui.pageHeader}>
        <h1 className={ui.pageTitle}>Контент сайту</h1>
        <p className={ui.pageLead}>
          Редагуйте блоки по сторінках. Зміни зберігаються в SQLite і кешуються — публічний сайт
          залишається швидким.
        </p>
      </div>

      <div className={ui.searchWrap}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          className={`${ui.input} ${ui.searchInput}`}
          placeholder="Пошук розділу…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {total === 0 ? (
        <p className={ui.empty}>Нічого не знайдено за запитом «{query}»</p>
      ) : (
        Object.entries(grouped).map(([page, sections]) => (
          <section key={page} style={{ marginBottom: 28 }}>
            <h2 className={ui.cardTitle} style={{ marginBottom: 12 }}>
              {page}
            </h2>
            <div className={ui.sectionList}>
              {sections.map((section) => (
                <Link key={section.key} href={`/admin/content/${section.key}`} className={ui.sectionCard}>
                  <div>
                    <h3>{section.label}</h3>
                    <p>{section.description}</p>
                  </div>
                  <span className={ui.sectionMeta}>Редагувати →</span>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </>
  )
}
