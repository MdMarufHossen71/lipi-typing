import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { Card } from '../components/ui'
import { VirtualKeyboard } from '../components/VirtualKeyboard'
import { bijoyRows } from '../data/bijoyLayout'
import { fingerColors, fingerLabels, qwertyRows } from '../data/qwertyLayout'
import type { Finger } from '../data/qwertyLayout'
import { cn } from '../lib/utils'

type LayoutName = 'qwerty' | 'bijoy'

export default function InteractiveKeyboardPage() {
  const { t, lang } = useI18n()
  const [layout, setLayout] = useState<LayoutName>('qwerty')
  const [shift, setShift] = useState(false)
  const [activeCode, setActiveCode] = useState<string | undefined>(undefined)
  const [showFingers, setShowFingers] = useState(true)

  useEffect(() => {
    // Highlight-only: never preventDefault — Tab must keep moving focus and
    // Space must keep scrolling. Skip highlight handling while the user is
    // typing in a text field.
    const isFormField = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (!el) return false
      return (
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'SELECT' ||
        el.isContentEditable
      )
    }
    const down = (e: KeyboardEvent) => {
      if (isFormField(e)) return
      setShift(e.shiftKey)
      setActiveCode(e.code)
    }
    const up = (e: KeyboardEvent) => {
      if (isFormField(e)) return
      setShift(e.shiftKey)
      window.setTimeout(() => setActiveCode(undefined), 120)
    }
    const clear = () => setActiveCode(undefined)
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('blur', clear)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('blur', clear)
    }
  }, [])

  const rows = layout === 'qwerty' ? qwertyRows : bijoyRows

  return (
    <>
      <Seo title={`${t('pages.keyboard.title')} — ${t('brand.name')}`} description={t('pages.keyboard.intro')} />
      <div className="container-page py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('pages.keyboard.title')}</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t('pages.keyboard.intro')}</p>

        <Card className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2">
              {(['qwerty', 'bijoy'] as LayoutName[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLayout(l)}
                  className={cn(
                    'rounded-lg border px-3 py-1.5 text-sm',
                    layout === l
                      ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200'
                      : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800',
                  )}
                >
                  {l === 'qwerty' ? 'QWERTY (English)' : 'Bijoy (বাংলা)'}
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setShift((s) => !s)}
                className={cn(
                  'rounded-lg border px-3 py-1.5 text-sm',
                  shift
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200'
                    : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800',
                )}
              >
                {shift ? t('pages.keyboard.shiftOn') : t('pages.keyboard.shiftOff')}
              </button>
              {layout === 'qwerty' && (
                <button
                  onClick={() => setShowFingers((s) => !s)}
                  className={cn(
                    'rounded-lg border px-3 py-1.5 text-sm',
                    showFingers
                      ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200'
                      : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800',
                  )}
                >
                  {lang === 'bn' ? 'আঙুল কালার' : 'Finger colors'}
                </button>
              )}
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">{t('pages.keyboard.pressKey')}</p>

          <div className="mt-2">
            <VirtualKeyboard
              rows={rows}
              shift={shift}
              activeCode={activeCode}
              showFingers={layout === 'qwerty' && showFingers}
            />
          </div>
        </Card>

        {layout === 'qwerty' && showFingers && (
          <Card className="mt-4">
            <h2 className="mb-3 text-sm font-semibold">
              {lang === 'bn' ? 'আঙুল গাইড' : 'Finger guide'}
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {(Object.keys(fingerLabels) as Finger[]).map((f) => (
                <div key={f} className={cn('rounded-lg px-3 py-2 text-xs', fingerColors[f])}>
                  {lang === 'bn' ? fingerLabels[f].bn : fingerLabels[f].en}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </>
  )
}
