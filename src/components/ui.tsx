import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/utils'

type Variant = 'primary' | 'outline' | 'ghost' | 'danger'

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const cls =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'outline'
        ? 'btn-outline'
        : variant === 'danger'
          ? 'btn-danger'
          : 'btn-ghost'
  return <button className={cn(cls, className)} {...props} />
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('card p-5', className)} {...props} />
}

export function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cn('badge', className)}>{children}</span>
}

export function SectionHeading({
  title,
  subtitle,
  center,
}: {
  title: string
  subtitle?: string
  center?: boolean
}) {
  return (
    <div className={cn('mb-6', center && 'text-center')}>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-slate-500 dark:text-slate-400">{subtitle}</p>}
    </div>
  )
}

interface SegmentOption<V extends string = string> {
  value: V
  label: ReactNode
  hint?: string
  disabled?: boolean
}

/** Accessible segmented control (radio group semantics). */
export function SegmentedControl<V extends string = string>({
  value,
  options,
  onChange,
  size = 'md',
  className,
  ariaLabel,
}: {
  value: V
  options: SegmentOption<V>[]
  onChange: (v: V) => void
  size?: 'sm' | 'md'
  className?: string
  ariaLabel?: string
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn('flex flex-wrap gap-2', className)}
    >
      {options.map((o) => {
        const selected = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={o.disabled}
            onClick={() => onChange(o.value)}
            title={o.hint}
            className={cn(
              'rounded-xl border font-medium transition-all',
              size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm',
              selected
                ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm dark:bg-brand-900/30 dark:text-brand-200'
                : 'border-slate-200 text-slate-600 hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:bg-brand-900/20 dark:hover:text-brand-200',
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/** Friendly empty state with an icon, message and optional call to action. */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-slate-700">
      {icon && (
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-900/30 dark:text-brand-300">
          {icon}
        </div>
      )}
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

/** Compact labelled metric card. */
export function StatCard({
  icon,
  label,
  value,
  sub,
  className,
}: {
  icon?: ReactNode
  label: string
  value: ReactNode
  sub?: string
  className?: string
}) {
  return (
    <Card className={cn('flex flex-col justify-center', className)}>
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
        {icon}
        {label}
      </div>
      <div className="mt-1.5 text-2xl font-bold tracking-tight">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-slate-400">{sub}</div>}
    </Card>
  )
}

/** Loading placeholder block. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-xl bg-slate-200/70 dark:bg-slate-800/70',
        className,
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10" />
    </div>
  )
}
