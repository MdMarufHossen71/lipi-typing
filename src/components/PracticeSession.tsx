import { useMemo, useState } from 'react'
import { RotateCcw, Shuffle } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { Button, Card, SegmentedControl } from './ui'
import { compareChars, segment } from '../lib/typingEngine'
import { testTexts } from '../data/testTexts'
import type { TestLang } from '../types'
import { cn } from '../lib/utils'

// Casual practice: pick a drill, type it, get instant per-character feedback.
// No timers, no modes, nothing is saved to history — that is what the Typing
// Test page is for (see the honesty note in the test page i18n strings).

type Drill = 'beginner' | 'sentence' | 'free'

export function PracticeSession() {
  const { t } = useI18n()
  const [lang, setLang] = useState<TestLang>('bn')
  const [drill, setDrill] = useState<Drill>('beginner')
  const [seed, setSeed] = useState(0)
  const [input, setInput] = useState('')

  const text = useMemo(() => {
    if (drill === 'free') return ''
    const pool = testTexts[lang][drill === 'beginner' ? 'beginner' : 'sentences']
    return pool[seed % pool.length]
  }, [lang, drill, seed])

  const cmp = useMemo(() => compareChars(text, input), [text, input])
  const correct = cmp.filter((c) => c.state === 'correct').length
  const total = cmp.filter((c) => c.target).length
  const typedCount = segment(input).length

  function pickDrill(v: string) {
    setDrill(v as Drill)
    setSeed(0)
    setInput('')
  }

  function pickLang(v: string) {
    setLang(v as TestLang)
    setInput('')
  }

  return (
    <div className="space-y-5">
      <Card className="space-y-5">
        <div>
          <div className="label">{t('test.language')}</div>
          <SegmentedControl
            value={lang}
            ariaLabel={t('test.language')}
            options={[
              { value: 'bn', label: t('common.bangla') },
              { value: 'en', label: t('common.english') },
            ]}
            onChange={pickLang}
          />
        </div>
        <div>
          <div className="label">{t('pages.practice.title')}</div>
          <SegmentedControl
            value={drill}
            ariaLabel={t('pages.practice.title')}
            options={[
              { value: 'beginner', label: t('test.modeBeginner') },
              { value: 'sentence', label: t('test.modeSentence') },
              { value: 'free', label: t('practice.free') },
            ]}
            onChange={pickDrill}
          />
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{t('pages.practice.intro')}</p>
        </div>
      </Card>

      {drill === 'free' ? (
        <Card>
          <div className="label">{t('practice.free')}</div>
          <textarea
            className="input min-h-28 font-bangla"
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('practice.freeHint')}
            aria-label={t('practice.free')}
          />
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              {t('test.charsTyped')}: {typedCount}
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200"
              onClick={() => setInput('')}
            >
              <RotateCcw size={12} /> {t('lesson.practiceReset')}
            </button>
          </div>
        </Card>
      ) : (
        <Card>
          <div
            className="rounded-xl bg-slate-50 p-4 font-bangla text-lg leading-relaxed dark:bg-slate-800/50"
            dir="ltr"
            aria-label={t('test.target')}
          >
            {cmp.map((c, i) => (
              <span
                key={i}
                className={cn(
                  c.state === 'correct' && 'text-emerald-600 dark:text-emerald-400',
                  c.state === 'incorrect' && 'rounded bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300',
                  c.state === 'extra' && 'text-red-400 line-through',
                  c.state === 'pending' && 'text-slate-400 dark:text-slate-500',
                )}
              >
                {c.target === ' ' ? '\u00A0' : c.target}
                {i === typedCount && <span className="typing-cursor align-middle" />}
              </span>
            ))}
          </div>
          <textarea
            className="input mt-3 resize-none font-bangla"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('test.typeHere')}
            aria-label={t('test.typeHere')}
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>
              {correct}/{total} {t('test.correctChars')}
              {total > 0 && typedCount >= total && (
                <span className="ml-2 font-medium text-emerald-600 dark:text-emerald-400">
                  {t('lesson.practiceDone')}
                </span>
              )}
            </span>
            <span className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200"
                onClick={() => setInput('')}
              >
                <RotateCcw size={12} /> {t('lesson.practiceReset')}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
                onClick={() => {
                  setSeed((s) => s + 1)
                  setInput('')
                }}
              >
                <Shuffle size={12} /> {t('practice.newDrill')}
              </button>
            </span>
          </div>
        </Card>
      )}
    </div>
  )
}
