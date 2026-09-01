import { getDb } from '@/lib/db'
import {
  DEVICE_LABELS,
  parseBrowser,
  parseDevice,
  parseReferrerSource,
  type DeviceType,
} from './parse'

export function trackPageView(data: {
  path: string
  referrer?: string
  userAgent?: string
}): void {
  getDb()
    .prepare('INSERT INTO page_views (path, referrer, user_agent) VALUES (?, ?, ?)')
    .run(data.path, data.referrer ?? null, data.userAgent ?? null)
}

export type AnalyticsStats = {
  viewsToday: number
  viewsYesterday: number
  viewsWeek: number
  viewsMonth: number
  viewsTotal: number
  avgDailyWeek: number
  uniquePagesWeek: number
  trendTodayPct: number | null
  topPages: Array<{ path: string; count: number }>
  viewsByDay: Array<{ day: string; count: number }>
  viewsByHour: Array<{ hour: number; count: number }>
  viewsByWeekday: Array<{ weekday: number; label: string; count: number }>
  referrers: Array<{ source: string; domain: string; count: number }>
  devices: Array<{ device: DeviceType; label: string; count: number }>
  browsers: Array<{ browser: string; count: number }>
  recentViews: Array<{
    path: string
    source: string
    device: string
    browser: string
    createdAt: string
  }>
}

const WEEKDAY_LABELS = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] as const
const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0]

function countSince(db: ReturnType<typeof getDb>, sql: string): number {
  return (db.prepare(sql).get() as { c: number }).c
}

function localDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function fillDays(rows: Array<{ day: string; count: number }>, days: number): Array<{ day: string; count: number }> {
  const map = new Map(rows.map((row) => [row.day, row.count]))
  const result: Array<{ day: string; count: number }> = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const key = localDateKey(date)
    result.push({ day: key, count: map.get(key) ?? 0 })
  }

  return result
}

function fillHours(rows: Array<{ hour: number; count: number }>): Array<{ hour: number; count: number }> {
  const map = new Map(rows.map((row) => [row.hour, row.count]))
  return Array.from({ length: 24 }, (_, hour) => ({ hour, count: map.get(hour) ?? 0 }))
}

function aggregateReferrers(
  rows: Array<{ referrer: string | null; count: number }>,
): Array<{ source: string; domain: string; count: number }> {
  const map = new Map<string, { source: string; domain: string; count: number }>()

  for (const row of rows) {
    const parsed = parseReferrerSource(row.referrer)
    const existing = map.get(parsed.domain)
    if (existing) {
      existing.count += row.count
    } else {
      map.set(parsed.domain, { source: parsed.label, domain: parsed.domain, count: row.count })
    }
  }

  return Array.from(map.values()).sort((a, b) => b.count - a.count).slice(0, 10)
}

function aggregateDevices(
  rows: Array<{ user_agent: string | null; count: number }>,
): Array<{ device: DeviceType; label: string; count: number }> {
  const map = new Map<DeviceType, number>()

  for (const row of rows) {
    const device = parseDevice(row.user_agent)
    map.set(device, (map.get(device) ?? 0) + row.count)
  }

  return Array.from(map.entries())
    .map(([device, count]) => ({ device, label: DEVICE_LABELS[device], count }))
    .sort((a, b) => b.count - a.count)
}

function aggregateBrowsers(
  rows: Array<{ user_agent: string | null; count: number }>,
): Array<{ browser: string; count: number }> {
  const map = new Map<string, number>()

  for (const row of rows) {
    const browser = parseBrowser(row.user_agent)
    map.set(browser, (map.get(browser) ?? 0) + row.count)
  }

  return Array.from(map.entries())
    .map(([browser, count]) => ({ browser, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
}

export function getAnalyticsStats(): AnalyticsStats {
  const db = getDb()

  const viewsToday = countSince(
    db,
    `SELECT COUNT(*) AS c FROM page_views WHERE date(created_at, 'localtime') = date('now', 'localtime')`,
  )

  const viewsYesterday = countSince(
    db,
    `SELECT COUNT(*) AS c FROM page_views WHERE date(created_at, 'localtime') = date('now', '-1 day', 'localtime')`,
  )

  const viewsWeek = countSince(
    db,
    `SELECT COUNT(*) AS c FROM page_views WHERE created_at >= datetime('now', '-7 days', 'localtime')`,
  )

  const viewsMonth = countSince(
    db,
    `SELECT COUNT(*) AS c FROM page_views WHERE created_at >= datetime('now', '-30 days', 'localtime')`,
  )

  const viewsTotal = countSince(db, `SELECT COUNT(*) AS c FROM page_views`)

  const uniquePagesWeek = countSince(
    db,
    `SELECT COUNT(DISTINCT path) AS c FROM page_views WHERE created_at >= datetime('now', '-7 days', 'localtime')`,
  )

  const avgDailyWeek = viewsWeek > 0 ? Math.round((viewsWeek / 7) * 10) / 10 : 0

  let trendTodayPct: number | null = null
  if (viewsYesterday > 0) {
    trendTodayPct = Math.round(((viewsToday - viewsYesterday) / viewsYesterday) * 100)
  } else if (viewsToday > 0) {
    trendTodayPct = 100
  }

  const topPages = db
    .prepare(
      `SELECT path, COUNT(*) AS count FROM page_views
       WHERE created_at >= datetime('now', '-30 days', 'localtime')
       GROUP BY path ORDER BY count DESC LIMIT 10`,
    )
    .all() as Array<{ path: string; count: number }>

  const viewsByDayRaw = db
    .prepare(
      `SELECT date(created_at, 'localtime') AS day, COUNT(*) AS count FROM page_views
       WHERE created_at >= datetime('now', '-30 days', 'localtime')
       GROUP BY day ORDER BY day ASC`,
    )
    .all() as Array<{ day: string; count: number }>

  const viewsByHourRaw = db
    .prepare(
      `SELECT CAST(strftime('%H', created_at, 'localtime') AS INTEGER) AS hour, COUNT(*) AS count
       FROM page_views
       WHERE created_at >= datetime('now', '-7 days', 'localtime')
       GROUP BY hour ORDER BY hour ASC`,
    )
    .all() as Array<{ hour: number; count: number }>

  const viewsByWeekdayRaw = db
    .prepare(
      `SELECT CAST(strftime('%w', created_at, 'localtime') AS INTEGER) AS weekday, COUNT(*) AS count
       FROM page_views
       WHERE created_at >= datetime('now', '-30 days', 'localtime')
       GROUP BY weekday`,
    )
    .all() as Array<{ weekday: number; count: number }>

  const weekdayMap = new Map(viewsByWeekdayRaw.map((row) => [row.weekday, row.count]))
  const viewsByWeekday = WEEKDAY_ORDER.map((weekday) => ({
    weekday,
    label: WEEKDAY_LABELS[weekday]!,
    count: weekdayMap.get(weekday) ?? 0,
  }))

  const referrerRows = db
    .prepare(
      `SELECT referrer, COUNT(*) AS count FROM page_views
       WHERE created_at >= datetime('now', '-30 days', 'localtime')
       GROUP BY referrer`,
    )
    .all() as Array<{ referrer: string | null; count: number }>

  const uaRows = db
    .prepare(
      `SELECT user_agent, COUNT(*) AS count FROM page_views
       WHERE created_at >= datetime('now', '-30 days', 'localtime')
       GROUP BY user_agent`,
    )
    .all() as Array<{ user_agent: string | null; count: number }>

  const recentRaw = db
    .prepare(
      `SELECT path, referrer, user_agent, created_at FROM page_views
       ORDER BY created_at DESC LIMIT 20`,
    )
    .all() as Array<{ path: string; referrer: string | null; user_agent: string | null; created_at: string }>

  const recentViews = recentRaw.map((row) => ({
    path: row.path,
    source: parseReferrerSource(row.referrer).label,
    device: DEVICE_LABELS[parseDevice(row.user_agent)],
    browser: parseBrowser(row.user_agent),
    createdAt: row.created_at,
  }))

  return {
    viewsToday,
    viewsYesterday,
    viewsWeek,
    viewsMonth,
    viewsTotal,
    avgDailyWeek,
    uniquePagesWeek,
    trendTodayPct,
    topPages,
    viewsByDay: fillDays(viewsByDayRaw, 30),
    viewsByHour: fillHours(viewsByHourRaw),
    viewsByWeekday,
    referrers: aggregateReferrers(referrerRows),
    devices: aggregateDevices(uaRows),
    browsers: aggregateBrowsers(uaRows),
    recentViews,
  }
}
