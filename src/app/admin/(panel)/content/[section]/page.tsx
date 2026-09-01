'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { CONTENT_SECTIONS } from '@/lib/content/sections'
import type { ContentSectionKey } from '@/lib/content/types'
import ui from '../../../ui.module.css'

const SectionEditor = dynamic(
  () => import('../SectionEditors').then((mod) => mod.SectionEditor),
  {
    loading: () => (
      <div>
        <div className={`${ui.skeleton} ${ui.skeletonBlock}`} />
        <div className={`${ui.skeleton} ${ui.skeletonBlock}`} />
      </div>
    ),
  },
)

export default function ContentSectionPage() {
  const params = useParams()
  const sectionKey = params.section as ContentSectionKey
  const meta = CONTENT_SECTIONS.find((s) => s.key === sectionKey)
  const [draft, setDraft] = useState<unknown>(null)
  const [savedSnapshot, setSavedSnapshot] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((data) => {
        const section = data.content[sectionKey]
        setDraft(section)
        setSavedSnapshot(JSON.stringify(section))
      })
      .catch(() => setError('Не вдалося завантажити контент'))
  }, [sectionKey])

  const isDirty = draft != null && JSON.stringify(draft) !== savedSnapshot

  useEffect(() => {
    if (!isDirty) return
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [isDirty])

  async function save() {
    setSaving(true)
    setMessage('')
    setError('')
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: sectionKey, data: draft }),
    })
    setSaving(false)
    if (!res.ok) {
      setError('Не вдалося зберегти')
      return
    }
    setSavedSnapshot(JSON.stringify(draft))
    setMessage('Збережено. Кеш сайту оновлено.')
  }

  if (!meta) {
    return (
      <>
        <p className={ui.empty}>Розділ не знайдено</p>
        <Link href="/admin/content" className={`${ui.btn} ${ui.btnSecondary}`}>
          ← До списку
        </Link>
      </>
    )
  }

  return (
    <>
      <Link href="/admin/content" className={ui.backLink}>
        ← Контент
      </Link>
      <div className={ui.pageHeader}>
        <h1 className={ui.pageTitle}>{meta.label}</h1>
        <p className={ui.pageLead}>{meta.description}</p>
      </div>

      {message ? <div className={`${ui.message} ${ui.messageSuccess}`}>{message}</div> : null}
      {error ? <div className={`${ui.message} ${ui.messageError}`}>{error}</div> : null}

      <div className={ui.card} ref={editorRef}>
        {!draft ? (
          <div>
            <div className={`${ui.skeleton} ${ui.skeletonBlock}`} />
            <div className={`${ui.skeleton} ${ui.skeletonBlock}`} />
          </div>
        ) : (
          <SectionEditor sectionKey={sectionKey} value={draft} onChange={setDraft} />
        )}

        {draft ? (
          <div className={ui.stickyBar}>
            <span className={ui.stickyBarHint}>
              {isDirty ? 'Є незбережені зміни' : 'Усі зміни збережено'}
            </span>
            <div className={ui.btnRow} style={{ marginTop: 0 }}>
              <button
                type="button"
                className={`${ui.btn} ${ui.btnPrimary}`}
                onClick={save}
                disabled={saving || !isDirty}
              >
                {saving ? 'Збереження…' : 'Зберегти зміни'}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
