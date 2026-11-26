import type { LayoutKey } from '../data/qwertyLayout'
import { fingerColors } from '../data/qwertyLayout'
import { cn } from '../lib/utils'

interface VirtualKeyboardProps {
  rows: LayoutKey[][]
  /** When true, the shifted characters are emphasised. */
  shift: boolean
  /** KeyboardEvent.code of the currently pressed key (for highlight). */
  activeCode?: string
  /** Colour keys by touch-typing finger (useful for QWERTY learning). */
  showFingers?: boolean
}

function isBangla(ch: string): boolean {
  return ch.length > 0 && ch.charCodeAt(0) > 127
}
function isInvisible(ch: string): boolean {
  return ch === '' || ch === '‌' || ch === '‍'
}

export function VirtualKeyboard({ rows, shift, activeCode, showFingers }: VirtualKeyboardProps) {
  return (
    <div className="select-none space-y-1.5 overflow-x-auto pb-2">
      {rows.map((row, ri) => (
        <div key={ri} className="flex justify-center gap-1.5">
          {ri === 3 && <div className="w-6" aria-hidden />}
          {row.map((key) => {
            const w = key.w ?? 1
            const active = activeCode === key.code
            const baseActive = !shift
            const shiftChar = key.shift
            const baseChar = key.base
            const showShift = !isInvisible(shiftChar)
            const showBase = !isInvisible(baseChar)
            return (
              <div
                key={key.code}
                title={key.note}
                style={{ width: `${w * 2.6}rem`, minWidth: `${w * 2.6}rem` }}
                className={cn(
                  'relative flex h-12 flex-col items-center justify-center rounded-md border text-sm transition-colors',
                  active
                    ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-400 dark:bg-brand-900/40'
                    : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800',
                  showFingers && !active && fingerColors[key.finger],
                )}
              >
                {showShift && (
                  <span
                    className={cn(
                      'absolute left-1 top-0.5 text-[10px] leading-none',
                      isBangla(shiftChar) ? 'font-bangla' : '',
                      baseActive
                        ? 'text-slate-400 dark:text-slate-500'
                        : 'font-semibold text-brand-600 dark:text-brand-300',
                    )}
                  >
                    {shiftChar}
                  </span>
                )}
                {showBase ? (
                  <span
                    className={cn(
                      'leading-none',
                      isBangla(baseChar) ? 'font-bangla text-base' : 'text-sm',
                      baseActive
                        ? 'font-semibold text-slate-800 dark:text-slate-100'
                        : 'text-slate-400 dark:text-slate-500',
                    )}
                  >
                    {baseChar === ' ' ? '' : baseChar}
                  </span>
                ) : (
                  <span className="text-[9px] text-slate-400">
                    {key.note ?? ''}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
