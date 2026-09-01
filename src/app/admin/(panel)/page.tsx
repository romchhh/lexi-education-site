'use client'

import { useEffect, useState, type ReactNode } from 'react'
import {
  ColumnChart,
  DEVICE_COLORS,
  DonutChart,
  LineAreaChart,
  RankedBars,
} from '../components/AnalyticsCharts'
import analytics from '../analytics.module.css'
import ui from '../ui.module.css'
import { formatDateTime } from '@/lib/analytics/parse'

type StatsResponse = {
  applications: {
    total: number
    today: number
    week: number
    byStatus: Record<string, number>
  }
  analytics: {
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
    devices: Array<{ device: string; label: string; count: number }>
    browsers: Array<{ browser: string; count: number }>
    recentViews: Array<{
      path: string
      source: string
      device: string
      browser: string
      createdAt: string
    }>
  }
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(async (res) => {
        if (!res.ok) throw new Error('failed')
        return res.json()
      })
      .then((data) => setStats(data))
      .catch(() => setError('Не вдалося завантажити статистику'))
  }, [])

  const analyticsData = stats?.analytics
  const conversionWeek =
    stats && analyticsData && analyticsData.viewsWeek > 0
      ? Math.round((stats.applications.week / analyticsData.viewsWeek) * 1000) / 10
      : null

  const dayChartData =
    analyticsData?.viewsByDay.map((row) => ({
      label: row.day.slice(5),
      value: row.count,
    })) ?? []

  const hourChartData =
    analyticsData?.viewsByHour.map((row) => ({
      label: String(row.hour).padStart(2, '0'),
      value: row.count,
    })) ?? []

  const weekdayChartData =
    analyticsData?.viewsByWeekday.map((row) => ({
      label: row.label,
      value: row.count,
    })) ?? []

  const deviceChartData =
    analyticsData?.devices.map((row) => ({
      label: row.label,
      value: row.count,
      color: DEVICE_COLORS[row.device] ?? '#9a9490',
    })) ?? []

  return (
    <>
      <div className={ui.pageHeader}>
        <h1 className={ui.pageTitle}>Дашборд</h1>
        <p className={ui.pageLead}>
          Повна аналітика відвідувань, джерел трафіку, пристроїв і заявок на сайті LEXI.education.
        </p>
      </div>

      {error ? <div className={`${ui.message} ${ui.messageError}`}>{error}</div> : null}

      <h2 className={analytics.sectionHeading}>Огляд</h2>
      <div className={`${ui.grid} ${ui.gridStats}`}>
        <StatCard
          value={analyticsData?.viewsToday}
          label="Переглядів сьогодні"
          sub={
            analyticsData?.trendTodayPct != null ? (
              <Trend value={analyticsData.trendTodayPct} suffix=" vs учора" />
            ) : (
              `Учора: ${analyticsData?.viewsYesterday ?? '—'}`
            )
          }
        />
        <StatCard value={analyticsData?.viewsWeek} label="За 7 днів" sub={`Середньо ${analyticsData?.avgDailyWeek ?? '—'} / день`} />
        <StatCard value={analyticsData?.viewsMonth} label="За 30 днів" />
        <StatCard value={analyticsData?.viewsTotal} label="Усього переглядів" />
        <StatCard value={analyticsData?.uniquePagesWeek} label="Унікальних сторінок (7 д)" />
        <StatCard
          value={conversionWeek != null ? `${conversionWeek}%` : '—'}
          label="Конверсія заявок (7 д)"
          sub={`${stats?.applications.week ?? 0} заявок / ${analyticsData?.viewsWeek ?? 0} переглядів`}
        />
        <StatCard value={stats?.applications.today} label="Заявок сьогодні" />
        <StatCard value={stats?.applications.week} label="Заявок за тиждень" />
        <StatCard value={stats?.applications.total} label="Усього заявок" />
      </div>

      <h2 className={analytics.sectionHeading}>Динаміка відвідувань</h2>
      <div className={`${ui.grid} ${ui.gridTwo}`}>
        <div className={ui.card} style={{ gridColumn: '1 / -1' }}>
          <h2 className={ui.cardTitle}>Перегляди за 30 днів</h2>
          <LineAreaChart data={dayChartData} />
        </div>

        <div className={ui.card}>
          <h2 className={ui.cardTitle}>Активність за годинами (7 днів)</h2>
          <ColumnChart data={hourChartData} />
        </div>

        <div className={ui.card}>
          <h2 className={ui.cardTitle}>Дні тижня (30 днів)</h2>
          <ColumnChart data={weekdayChartData} />
        </div>
      </div>

      <h2 className={analytics.sectionHeading}>Звідки приходять</h2>
      <div className={`${ui.grid} ${ui.gridTwo}`}>
        <div className={ui.card}>
          <h2 className={ui.cardTitle}>Джерела трафіку (30 днів)</h2>
          <RankedBars
            items={analyticsData?.referrers.map((row) => ({ label: row.source, count: row.count })) ?? []}
          />
        </div>

        <div className={ui.card}>
          <h2 className={ui.cardTitle}>Топ сторінок (30 днів)</h2>
          <RankedBars
            items={analyticsData?.topPages.map((row) => ({ label: row.path, count: row.count })) ?? []}
          />
        </div>
      </div>

      <h2 className={analytics.sectionHeading}>Пристрої та браузери</h2>
      <div className={`${ui.grid} ${ui.gridTwo}`}>
        <div className={ui.card}>
          <h2 className={ui.cardTitle}>Пристрої (30 днів)</h2>
          <DonutChart data={deviceChartData} />
        </div>

        <div className={ui.card}>
          <h2 className={ui.cardTitle}>Браузери (30 днів)</h2>
          <RankedBars
            items={analyticsData?.browsers.map((row) => ({ label: row.browser, count: row.count })) ?? []}
          />
        </div>
      </div>

      <h2 className={analytics.sectionHeading}>Останні відвідування</h2>
      <div className={ui.card}>
        <div className={ui.tableWrap}>
          <table className={ui.table}>
            <thead>
              <tr>
                <th>Час</th>
                <th>Сторінка</th>
                <th>Джерело</th>
                <th>Пристрій</th>
                <th>Браузер</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData?.recentViews.length ? (
                analyticsData.recentViews.map((row) => (
                  <tr key={`${row.createdAt}-${row.path}`}>
                    <td>{formatDateTime(row.createdAt)}</td>
                    <td>{row.path}</td>
                    <td>{row.source}</td>
                    <td>{row.device}</td>
                    <td>{row.browser}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={ui.empty}>
                    Ще немає відвідувань
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className={analytics.sectionHeading}>Заявки</h2>
      <div className={ui.card} style={{ maxWidth: 420 }}>
        <h2 className={ui.cardTitle}>Заявки за статусом</h2>
        {stats ? (
          <RankedBars
            items={Object.entries(stats.applications.byStatus).map(([status, count]) => ({
              label: statusLabel(status),
              count,
            }))}
          />
        ) : (
          <p className={ui.empty}>Завантаження…</p>
        )}
      </div>
    </>
  )
}

function StatCard({
  value,
  label,
  sub,
}: {
  value: string | number | undefined
  label: string
  sub?: ReactNode
}) {
  return (
    <div className={ui.card}>
      <div className={ui.statValue}>{value ?? '—'}</div>
      <div className={ui.statLabel}>{label}</div>
      {sub ? <div className={analytics.statSub}>{sub}</div> : null}
    </div>
  )
}

function Trend({ value, suffix }: { value: number; suffix?: string }) {
  const cls =
    value > 0 ? analytics.trendUp : value < 0 ? analytics.trendDown : analytics.trendFlat
  const sign = value > 0 ? '+' : ''
  return (
    <span className={cls}>
      {sign}
      {value}%{suffix ?? ''}
    </span>
  )
}

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    new: 'Нові',
    contacted: 'На звʼязку',
    enrolled: 'Записані',
    rejected: 'Відхилені',
    archived: 'Архів',
  }
  return map[status] ?? status
}
