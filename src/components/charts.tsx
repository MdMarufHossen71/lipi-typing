import { useI18n } from '../i18n/I18nContext'
import { formatDate } from '../lib/utils'

// Lightweight inline-SVG charts. No charting dependency — the dataset is
// small (capped history) and the visuals are simple polylines/bars.

/** Sparkline: polyline of values, min/max normalised. */
export function Sparkline({
  values,
  height = 48,
  className = '',
  stroke = 'stroke-brand-500',
  label,
}: {
  values: number[]
  height?: number
  className?: string
  stroke?: string
  label?: string
}) {
  const width = 220
  if (values.length < 2) {
    return <div className={className} aria-hidden style={{ height }} />
  }
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1
  const step = width / (values.length - 1)
  const points = values
    .map((v, i) => `${(i * step).toFixed(1)},${(height - 4 - ((v - min) / span) * (height - 8)).toFixed(1)}`)
    .join(' ')
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ width: '100%', height }}
      role="img"
      aria-label={label}
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={stroke}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/** Horizontal comparison bars (e.g. per-method best CPM). */
export function BarsRow({
  items,
  label,
}: {
  items: { label: string; value: number; max: number }[]
  label: string
}) {
  return (
    <div className="space-y-2.5" role="img" aria-label={label}>
      {items.map((it) => {
        const pct = it.max > 0 ? Math.round((it.value / it.max) * 100) : 0
        return (
          <div key={it.label}>
            <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{it.label}</span>
              <span className="font-semibold tabular-nums">{it.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-[width] duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** 14-day activity heat strip from ISO dates. */
export function ActivityStrip({ dates, label }: { dates: string[]; label: string }) {
  const { t } = useI18n()
  const days = 14
  const today = new Date()
  const counts = new Map<string, number>()
  for (const iso of dates) {
    const key = iso.slice(0, 10)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  const cells: { key: string; count: number; title: string }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    cells.push({ key, count: counts.get(key) ?? 0, title: formatDate(key) })
  }
  const max = Math.max(1, ...cells.map((c) => c.count))
  return (
    <div role="img" aria-label={label}>
      <div className="flex gap-1">
        {cells.map((c) => (
          <div
            key={c.key}
            title={`${c.title}: ${c.count}`}
            className={
              'h-6 flex-1 rounded-sm ' +
              (c.count === 0
                ? 'bg-slate-100 dark:bg-slate-800'
                : c.count >= max
                  ? 'bg-brand-600'
                  : 'bg-brand-400 dark:bg-brand-500')
            }
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-slate-400">
        <span>{t('dashboard.activityOlder')}</span>
        <span>{t('dashboard.activityToday')}</span>
      </div>
    </div>
  )
}
