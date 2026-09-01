'use client'

import { DragEvent, useCallback, useRef, useState } from 'react'
import ui from '../ui.module.css'
import styles from './media.module.css'

type Props = {
  label: string
  value: string
  onChange: (url: string) => void
}

export const MEDIA_FIELD_NAMES = ['src', 'photo', 'logo', 'heroImage', 'image'] as const

async function uploadFile(file: File): Promise<string> {
  const body = new FormData()
  body.append('file', file)

  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    body,
    credentials: 'same-origin',
  })

  const data = (await res.json()) as { ok?: boolean; url?: string; error?: string }
  if (!res.ok || !data.url) {
    throw new Error(data.error ?? 'upload_failed')
  }
  return data.url
}

function isImageUrl(url: string): boolean {
  return Boolean(url && (url.startsWith('/') || url.startsWith('http')))
}

export default function MediaField({ label, value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const file = files[0]
      if (!file) return
      if (!file.type.startsWith('image/')) {
        setError('Дозволені лише зображення (JPG, PNG, WebP, GIF, SVG)')
        return
      }

      setUploading(true)
      setError('')
      try {
        const url = await uploadFile(file)
        onChange(url)
      } catch {
        setError('Не вдалося завантажити файл')
      } finally {
        setUploading(false)
      }
    },
    [onChange],
  )

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    if (uploading) return
    void handleFiles(e.dataTransfer.files)
  }

  return (
    <div className={ui.field}>
      <label>{label}</label>
      <div
        className={`${styles.dropzone} ${dragging ? styles.dropzoneActive : ''} ${uploading ? styles.dropzoneUploading : ''} ${error ? styles.dropzoneError : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${label}: перетягніть файл або натисніть для вибору`}
      >
        {isImageUrl(value) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className={styles.preview} />
        ) : null}

        <p className={styles.hint}>
          {uploading ? (
            'Завантаження…'
          ) : (
            <>
              <strong>Перетягніть фото</strong> сюди або натисніть для вибору
            </>
          )}
        </p>
        <p className={styles.subhint}>JPG, PNG, WebP, GIF, SVG · до 12 MB</p>
        {error ? <p className={styles.error}>{error}</p> : null}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          className={styles.hiddenInput}
          onChange={(e) => {
            if (e.target.files) void handleFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      <input
        className={ui.input}
        style={{ marginTop: 10 }}
        value={value}
        placeholder="Або вставте URL зображення"
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
