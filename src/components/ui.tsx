import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/utils'

type Variant = 'primary' | 'outline' | 'ghost'

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
        : variant === 'ghost'
          ? 'btn-ghost'
          : 'btn'
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
