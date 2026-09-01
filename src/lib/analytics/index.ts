import { getDb } from '@/lib/db'
import type { Application, ApplicationStatus } from '@/lib/content/types'

export type ApplicationFilters = {
  status?: ApplicationStatus | 'all'
  search?: string
  sort?: 'newest' | 'oldest' | 'name'
  limit?: number
  offset?: number
}

export function insertApplication(data: {
  name: string
  phone: string
  email: string
  source?: string
  pageUrl?: string
  pageTitle?: string
}): number {
  const result = getDb()
    .prepare(
      `INSERT INTO applications (name, phone, email, source, page_url, page_title)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(
      data.name,
      data.phone,
      data.email,
      data.source ?? null,
      data.pageUrl ?? null,
      data.pageTitle ?? null,
    )
  return Number(result.lastInsertRowid)
}

export function listApplications(filters: ApplicationFilters = {}): {
  items: Application[]
  total: number
} {
  const conditions: string[] = []
  const params: unknown[] = []

  if (filters.status && filters.status !== 'all') {
    conditions.push('status = ?')
    params.push(filters.status)
  }

  if (filters.search?.trim()) {
    const q = `%${filters.search.trim()}%`
    conditions.push('(name LIKE ? OR phone LIKE ? OR email LIKE ? OR source LIKE ?)')
    params.push(q, q, q, q)
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

  let order = 'created_at DESC'
  if (filters.sort === 'oldest') order = 'created_at ASC'
  if (filters.sort === 'name') order = 'name COLLATE NOCASE ASC'

  const limit = filters.limit ?? 50
  const offset = filters.offset ?? 0

  const totalRow = getDb()
    .prepare(`SELECT COUNT(*) AS c FROM applications ${where}`)
    .get(...params) as { c: number }

  const items = getDb()
    .prepare(
      `SELECT id, name, phone, email, source, page_url, page_title, status, notes, created_at
       FROM applications ${where}
       ORDER BY ${order}
       LIMIT ? OFFSET ?`,
    )
    .all(...params, limit, offset) as Application[]

  return { items, total: totalRow.c }
}

export function updateApplication(
  id: number,
  data: Partial<Pick<Application, 'status' | 'notes'>>,
): Application | null {
  const existing = getDb()
    .prepare('SELECT id FROM applications WHERE id = ?')
    .get(id) as { id: number } | undefined
  if (!existing) return null

  if (data.status !== undefined) {
    getDb().prepare('UPDATE applications SET status = ? WHERE id = ?').run(data.status, id)
  }
  if (data.notes !== undefined) {
    getDb().prepare('UPDATE applications SET notes = ? WHERE id = ?').run(data.notes, id)
  }

  return getDb()
    .prepare(
      `SELECT id, name, phone, email, source, page_url, page_title, status, notes, created_at
       FROM applications WHERE id = ?`,
    )
    .get(id) as Application
}

export function getApplicationStats(): {
  total: number
  today: number
  week: number
  byStatus: Record<string, number>
} {
  const db = getDb()
  const total = (db.prepare('SELECT COUNT(*) AS c FROM applications').get() as { c: number }).c
  const today = (
    db
      .prepare(`SELECT COUNT(*) AS c FROM applications WHERE date(created_at) = date('now', 'localtime')`)
      .get() as { c: number }
  ).c
  const week = (
    db
      .prepare(
        `SELECT COUNT(*) AS c FROM applications WHERE created_at >= datetime('now', '-7 days', 'localtime')`,
      )
      .get() as { c: number }
  ).c

  const statusRows = db
    .prepare('SELECT status, COUNT(*) AS c FROM applications GROUP BY status')
    .all() as Array<{ status: string; c: number }>

  const byStatus: Record<string, number> = {}
  for (const row of statusRows) {
    byStatus[row.status] = row.c
  }

  return { total, today, week, byStatus }
}
