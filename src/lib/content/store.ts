import fs from 'fs'
import path from 'path'
import { revalidatePath, revalidateTag } from 'next/cache'
import { getDb } from '@/lib/db'
import { getDefaultContent } from './defaults'
import { migrateSiteContent } from './migrate'
import type { ContentSectionKey, SiteContent } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const CACHE_PATH = path.join(DATA_DIR, 'content-cache.json')
export const CONTENT_CACHE_TAG = 'site-content'

function loadOverridesFromDb(): Record<string, unknown> {
  const rows = getDb()
    .prepare('SELECT section_key, data FROM content_sections')
    .all() as Array<{ section_key: string; data: string }>

  const overrides: Record<string, unknown> = {}
  for (const row of rows) {
    try {
      overrides[row.section_key] = JSON.parse(row.data)
    } catch {
      console.error(`Invalid JSON in content section: ${row.section_key}`)
    }
  }
  return overrides
}

export function buildContentBundle(overrides?: Record<string, unknown>): SiteContent {
  const defaults = getDefaultContent()
  const dbOverrides = overrides ?? loadOverridesFromDb()
  return migrateSiteContent({ ...defaults, ...dbOverrides })
}

export function writeContentCache(content: SiteContent): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  fs.writeFileSync(CACHE_PATH, JSON.stringify(content), 'utf8')
}

export function readContentCache(): SiteContent | null {
  if (!fs.existsSync(CACHE_PATH)) return null
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')) as SiteContent
  } catch {
    return null
  }
}

export function refreshContentCache(): SiteContent {
  const content = buildContentBundle()
  writeContentCache(content)
  revalidateTag(CONTENT_CACHE_TAG)
  revalidatePath('/', 'layout')
  return content
}

export function saveContentSection<K extends ContentSectionKey>(
  key: K,
  data: SiteContent[K],
): SiteContent {
  getDb()
    .prepare(
      `INSERT INTO content_sections (section_key, data, updated_at)
       VALUES (?, ?, datetime('now'))
       ON CONFLICT(section_key) DO UPDATE SET
         data = excluded.data,
         updated_at = excluded.updated_at`,
    )
    .run(key, JSON.stringify(data))

  return refreshContentCache()
}

export function getContentSectionFromDb<K extends ContentSectionKey>(key: K): SiteContent[K] | null {
  const row = getDb()
    .prepare('SELECT data FROM content_sections WHERE section_key = ?')
    .get(key) as { data: string } | undefined

  if (!row) return null
  return JSON.parse(row.data) as SiteContent[K]
}
