'use client'

import styles from '../analytics.module.css'

type Point = { label: string; value: number }

function chartMax(values: number[], min = 1): number {
  return Math.max(...values, min)
}

export function LineAreaChart({ data, title }: { data: Point[]; title?: string }) {
  if (!data.length) return <EmptyChart message="Ще немає даних" />

  const width = 640
  const height = 220
  const padX = 8
  const padY = 16
  const max = chartMax(data.map((d) => d.value))
  const step = data.length > 1 ? (width - padX * 2) / (data.length - 1) : 0

  const points = data.map((item, index) => {
    const x = padX + index * step
    const y = height - padY - (item.value / max) * (height - padY * 2)
    return { x, y, ...item }
  })

  const line = points.map((p) => `${p.x},${p.y}`).join(' ')
  const area = `${points[0]!.x},${height - padY} ${line} ${points[points.length - 1]!.x},${height - padY}`

  const tickIndexes = [0, Math.floor(data.length / 2), data.length - 1].filter(
    (value, index, arr) => arr.indexOf(value) === index,
  )

  return (
    <div className={styles.chartWrap}>
      {title ? <h3 className={styles.chartTitle}>{title}</h3> : null}
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.lineChart} role="img" aria-label={title}>
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(196, 90, 117, 0.35)" />
            <stop offset="100%" stopColor="rgba(196, 90, 117, 0.02)" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1={padX}
            x2={width - padX}
            y1={height - padY - ratio * (height - padY * 2)}
            y2={height - padY - ratio * (height - padY * 2)}
            className={styles.gridLine}
          />
        ))}
        <polygon points={area} fill="url(#areaFill)" />
        <polyline points={line} className={styles.linePath} fill="none" />
        {points.map((point) => (
          <circle key={point.label} cx={point.x} cy={point.y} r="3.5" className={styles.lineDot} />
        ))}
      </svg>
      <div className={styles.axisLabels}>
        {tickIndexes.map((index) => (
          <span key={data[index]!.label}>{data[index]!.label}</span>
        ))}
      </div>
    </div>
  )
}

export function ColumnChart({ data, title }: { data: Point[]; title?: string }) {
  if (!data.length) return <EmptyChart message="Ще немає даних" />

  const max = chartMax(data.map((d) => d.value))

  return (
    <div className={styles.chartWrap}>
      {title ? <h3 className={styles.chartTitle}>{title}</h3> : null}
      <div className={styles.columnChart} role="img" aria-label={title}>
        {data.map((item) => (
          <div key={item.label} className={styles.columnItem}>
            <div className={styles.columnValue}>{item.value || ''}</div>
            <div className={styles.columnTrack}>
              <div
                className={styles.columnFill}
                style={{ height: `${Math.round((item.value / max) * 100)}%` }}
              />
            </div>
            <div className={styles.columnLabel}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DonutChart({
  data,
  title,
}: {
  data: Array<{ label: string; value: number; color: string }>
  title?: string
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  if (!total) return <EmptyChart message="Ще немає даних" />

  let offset = 0
  const segments = data.map((item) => {
    const pct = item.value / total
    const segment = { ...item, pct, offset }
    offset += pct
    return segment
  })

  const gradient = segments
    .map((seg) => `${seg.color} ${Math.round(seg.offset * 100 - seg.pct * 100)}% ${Math.round(seg.offset * 100)}%`)
    .join(', ')

  return (
    <div className={styles.chartWrap}>
      {title ? <h3 className={styles.chartTitle}>{title}</h3> : null}
      <div className={styles.donutLayout}>
        <div className={styles.donut} style={{ background: `conic-gradient(${gradient})` }}>
          <div className={styles.donutHole}>
            <strong>{total}</strong>
            <span>переглядів</span>
          </div>
        </div>
        <ul className={styles.legend}>
          {segments.map((seg) => (
            <li key={seg.label}>
              <span className={styles.legendSwatch} style={{ background: seg.color }} />
              <span>{seg.label}</span>
              <strong>{seg.value}</strong>
              <span className={styles.legendPct}>{Math.round(seg.pct * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function RankedBars({
  items,
  valueKey = 'count',
  labelKey = 'label',
}: {
  items: Array<Record<string, string | number>>
  valueKey?: string
  labelKey?: string
}) {
  if (!items.length) return <EmptyChart message="Ще немає даних" />

  const max = chartMax(items.map((item) => Number(item[valueKey] ?? 0)))

  return (
    <div className={styles.rankedBars}>
      {items.map((item) => {
        const value = Number(item[valueKey] ?? 0)
        const label = String(item[labelKey] ?? '')
        return (
          <div key={`${label}-${value}`} className={styles.rankedRow}>
            <div className={styles.rankedMeta}>
              <span>{label}</span>
              <div className={styles.rankedTrack}>
                <div className={styles.rankedFill} style={{ width: `${Math.round((value / max) * 100)}%` }} />
              </div>
            </div>
            <strong>{value}</strong>
          </div>
        )
      })}
    </div>
  )
}

function EmptyChart({ message }: { message: string }) {
  return <p className={styles.emptyChart}>{message}</p>
}

export const DEVICE_COLORS: Record<string, string> = {
  mobile: '#c45a75',
  desktop: '#2a2826',
  tablet: '#c9872e',
  unknown: '#9a9490',
}
