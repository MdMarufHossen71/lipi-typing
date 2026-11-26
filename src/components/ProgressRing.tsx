import { clamp } from '../lib/utils'

interface ProgressRingProps {
  value: number // 0-100
  size?: number
  stroke?: number
  label?: string
  sublabel?: string
}

export function ProgressRing({
  value,
  size = 72,
  stroke = 7,
  label,
  sublabel,
}: ProgressRingProps) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (clamp(value, 0, 100) / 100) * c
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="text-slate-200 dark:text-slate-700" stroke="currentColor" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" className="text-brand-500 transition-[stroke-dashoffset] duration-500" stroke="currentColor" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className="text-sm font-bold leading-none">{label}</span>}
        {sublabel && <span className="mt-0.5 text-[10px] text-slate-400">{sublabel}</span>}
      </div>
    </div>
  )
}
