import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  ArrowRight,
  Check,
  Copy,
  Gauge,
  RotateCcw,
  Share2,
  Shuffle,
  Target,
  Timer,
} from 'lucide-react'
import type { TestLang, TestMode, TestResult, TypingMethod } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../i18n/I18nContext'
import { compareChars, computeStats, performanceLevel, segment } from '../lib/typingEngine'
import { anotherParagraph, pickText } from '../data/testTexts'
import { saveTestResult } from '../lib/progress'
import { saveTypingResultToCloud } from '../lib/cloudSync'
import { Button, Card, SegmentedControl } from './ui'
import { ProgressRing } from './ProgressRing'
import { cn, clamp, formatDuration, formatNumber } from '../lib/utils'
import { Seo } from './Seo'

type Phase = 'config' | 'running' | 'finished'

const DURATIONS = [60, 120, 180, 300, 600]
const MODES: TestMode[] = ['timed', 'fixed', 'word', 'sentence', 'beginner', 'advanced']
const METHODS: TypingMethod[] = ['avro', 'bijoy', 'english']

const levelKey: Record<string, string> = {
  excellent: 'test.performanceExcellent',
  good: 'test.performanceGood',
  average: 'test.performanceAverage',
  needsWork: 'test.performanceNeedsWork',
}

export function TypingTest() {
  const { t, lang } = useI18n()
  const { user } = useAuth()
  const [phase, setPhase] = useState<Phase>('config')
  const [testLang, setTestLang] = useState<TestLang>('bn')
  const [method, setMethod] = useState<TypingMethod>('avro')
  const [mode, setMode] = useState<TestMode>('timed')
  const [durationSec, setDurationSec] = useState(60)
  // Kept as a string so the field can be temporarily empty while typing;
  // sanitisedCustomMin is the only value the timer ever uses.
  const [customMin, setCustomMin] = useState('5')
  const [target, setTarget] = useState('')
  const [input, setInput] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [result, setResult] = useState<TestResult | null>(null)
  const [copied, setCopied] = useState(false)

  const inputEl = useRef<HTMLTextAreaElement>(null)
  const targetRef = useRef('')
  const inputValRef = useRef('')
  // "Custom" stores durationSec = 0; the real length is then customMin minutes.
  // App-level clamp: empty, negative, decimal and absurd inputs all resolve to
  // a safe 1–60 integer before the timer or text generation ever sees them.
  const parsedCustomMin = Math.round(Number(customMin))
  const sanitisedCustomMin = Number.isFinite(parsedCustomMin) ? clamp(parsedCustomMin, 1, 60) : 5
  const effectiveDuration = durationSec === 0 ? sanitisedCustomMin * 60 : durationSec
  // Bangla is typed with Avro or Bijoy; English text with the QWERTY layout.
  const methodOptions: TypingMethod[] =
    testLang === 'en' ? ['english'] : METHODS.filter((m) => m !== 'english')

  const cfgRef = useRef({ testLang, method, mode, durationSec, effectiveDuration })
  // Wall-clock anchor: elapsed time is derived from Date.now() so a throttled
  // or background tab (missing interval ticks) cannot make the timer drift.
  const startedAtRef = useRef(0)
  // Re-entrancy guard: interval expiry, the target-complete effect and the
  // Finish button must never save a result twice.
  const finishedRef = useRef(false)

  useEffect(() => {
    cfgRef.current = { testLang, method, mode, durationSec, effectiveDuration }
  }, [testLang, method, mode, durationSec, effectiveDuration])
  useEffect(() => {
    targetRef.current = target
  }, [target])
  useEffect(() => {
    inputValRef.current = input
  }, [input])

  function readElapsed(): number {
    return startedAtRef.current > 0 ? (Date.now() - startedAtRef.current) / 1000 : 0
  }

  const isTimed = mode === 'timed'
  const timeLeft = Math.max(0, effectiveDuration - elapsed)

  const live = useMemo(
    () => computeStats(target, input, elapsed || 0.001),
    [target, input, elapsed],
  )
  const cmp = useMemo(() => compareChars(target, input), [target, input])
  const typedCount = useMemo(() => segment(input).length, [input])

  function focusInput() {
    setTimeout(() => inputEl.current?.focus(), 0)
  }

  // The saved method must match the language, otherwise the dashboard's
  // per-method best speeds would mix English and Bangla results.
  function pickTestLang(v: string) {
    const next = v as TestLang
    setTestLang(next)
    setMethod((m) => (next === 'en' ? 'english' : m === 'english' ? 'avro' : m))
  }

  function start() {
    const text = pickText(testLang, mode, effectiveDuration || 120)
    targetRef.current = text
    setTarget(text)
    resetRun()
    setPhase('running')
    focusInput()
  }

  function finish(elapsedVal: number) {
    if (finishedRef.current) return
    finishedRef.current = true
    const ev = Math.max(elapsedVal, readElapsed())
    const stats = computeStats(targetRef.current, inputValRef.current, ev)
    const cfg = cfgRef.current
    const saved = saveTestResult({
      lang: cfg.testLang,
      method: cfg.method,
      mode: cfg.mode,
      durationSec: cfg.mode === 'timed' ? cfg.effectiveDuration : Math.round(ev),
      elapsedSec: Math.round(ev),
      totalTyped: stats.totalTyped,
      correct: stats.correct,
      incorrect: stats.incorrect,
      accuracy: stats.accuracy,
      cpm: stats.cpm,
      wpm: stats.wpm,
      target: targetRef.current.slice(0, 160),
    })
    // Signed-in users also get a cloud copy (fire-and-forget); the local
    // record stays as the offline cache, and Account > Sync can retry gaps.
    if (user) {
      void saveTypingResultToCloud(user.id, saved).catch(() => {})
    }
    setResult(saved)
    setPhase('finished')
  }

  useEffect(() => {
    if (phase !== 'running') return
    const id = setInterval(() => {
      const cfg = cfgRef.current
      const current = readElapsed()
      if (cfg.mode === 'timed' && current >= cfg.effectiveDuration) {
        // Side effects stay out of setState updaters (StrictMode double-invokes
        // updaters, which would save twice).
        finish(cfg.effectiveDuration)
      } else {
        setElapsed(current)
      }
    }, 200)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  useEffect(() => {
    if (phase !== 'running' || !target) return
    const tgCount = segment(target).length
    if (tgCount > 0 && typedCount >= tgCount) {
      finish(readElapsed())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, phase, target])

  function resetRun() {
    startedAtRef.current = Date.now()
    finishedRef.current = false
    setInput('')
    inputValRef.current = ''
    setElapsed(0)
    setResult(null)
  }

  function restart() {
    resetRun()
    setPhase('running')
    focusInput()
  }

  function another() {
    // Timed tests need duration-scaled text — a single paragraph would end the
    // test almost immediately via the target-complete effect.
    const text =
      mode === 'fixed'
        ? anotherParagraph(testLang, target)
        : pickText(testLang, mode, effectiveDuration || 120)
    targetRef.current = text
    setTarget(text)
    resetRun()
    setPhase('running')
    focusInput()
  }

  function summaryText(r: TestResult): string {
    return [
      `${t('brand.name')} — ${t('test.results')}`,
      `${t('test.cpm')}: ${r.cpm}`,
      `${t('test.wpm')}: ${r.wpm}`,
      `${t('test.accuracy')}: ${r.accuracy}%`,
      `${t('test.correctChars')}: ${r.correct} / ${t('test.incorrectChars')}: ${r.incorrect}`,
      `${t('test.testDuration')}: ${formatDuration(r.elapsedSec)}`,
    ].join('\n')
  }

  function doCopy() {
    if (!result) return
    navigator.clipboard?.writeText(summaryText(result)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  function doShare() {
    if (!result) return
    const text = summaryText(result)
    if (navigator.share) {
      navigator.share({ text }).catch(() => {})
    } else {
      doCopy()
    }
  }

  if (phase === 'config') {
    return (
      <div className="container-page py-8">
        <Seo title={`${t('test.title')} — ${t('brand.name')}`} description={t('test.subtitle')} />
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('test.title')}</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">{t('test.subtitle')}</p>

        <Card className="mt-6 space-y-6">
          <Field label={t('test.language')}>
            <SegmentedControl
              value={testLang}
              ariaLabel={t('test.language')}
              options={[
                { value: 'bn', label: t('common.bangla') },
                { value: 'en', label: t('common.english') },
              ]}
              onChange={pickTestLang}
            />
          </Field>

          <Field label={t('test.method')}>
            <SegmentedControl
              value={method}
              ariaLabel={t('test.method')}
              options={methodOptions.map((m) => ({
                value: m,
                label: m === 'avro' ? t('test.mAvro') : m === 'bijoy' ? t('test.mBijoy') : t('test.mEnglish'),
              }))}
              onChange={(v) => setMethod(v as TypingMethod)}
            />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{t('test.methodNote')}</p>
          </Field>

          <Field label={t('test.mode')}>
            <SegmentedControl
              value={mode}
              ariaLabel={t('test.mode')}
              options={MODES.map((m) => ({
                value: m,
                label: t(
                  m === 'timed' ? 'test.modeTimed'
                    : m === 'fixed' ? 'test.modeFixed'
                      : m === 'word' ? 'test.modeWord'
                        : m === 'sentence' ? 'test.modeSentence'
                          : m === 'beginner' ? 'test.modeBeginner'
                            : 'test.modeAdvanced',
                ),
              }))}
              onChange={(v) => setMode(v as TestMode)}
            />
          </Field>

          {isTimed && (
            <Field label={t('test.duration')}>
              <SegmentedControl
                value={String(durationSec)}
                ariaLabel={t('test.duration')}
                options={[
                  ...DURATIONS.map((d) => ({ value: String(d), label: formatDuration(d) })),
                  { value: '0', label: t('test.dCustom') },
                ]}
                onChange={(v) => setDurationSec(Number(v))}
              />
              {durationSec === 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <label htmlFor="custom-minutes" className="text-sm text-slate-500 dark:text-slate-400">
                    {t('test.customMin')}
                  </label>
                  <input
                    id="custom-minutes"
                    type="number"
                    min={1}
                    max={60}
                    className="input w-24"
                    value={customMin}
                    onChange={(e) => setCustomMin(e.target.value)}
                    onBlur={() => setCustomMin(String(sanitisedCustomMin))}
                    placeholder={t('test.customPlaceholder')}
                    inputMode="numeric"
                  />
                </div>
              )}
            </Field>
          )}

          <Button onClick={start} className="w-full sm:w-auto">
            {t('test.start')} <ArrowRight size={16} />
          </Button>
        </Card>

        {testLang === 'bn' && (
          <p className="mt-4 rounded-xl bg-brand-50 p-3 text-xs text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
            {t('test.banglaCpmNote')}
          </p>
        )}
      </div>
    )
  }

  if (phase === 'running') {
    const progress = isTimed ? (elapsed / effectiveDuration) * 100 : (typedCount / Math.max(1, segment(target).length)) * 100
    return (
      <div className="container-page py-6">
        <div className="sticky top-14 z-10 -mx-4 mb-4 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:mx-0">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon={<Timer size={16} />} label={isTimed ? t('test.timeLeft') : t('test.progress')} value={isTimed ? formatDuration(timeLeft) : `${Math.round(progress)}%`} />
            <Stat icon={<Gauge size={16} />} label={t('test.cpm')} value={formatNumber(live.cpm)} />
            <Stat icon={<Gauge size={16} />} label={t('test.wpm')} value={formatNumber(live.wpm)} />
            <Stat icon={<Target size={16} />} label={t('test.accuracy')} value={`${Math.round(live.accuracy)}%`} />
          </div>
        </div>

        <div
          className="cursor-text rounded-xl border border-slate-200 bg-white p-5 text-lg leading-relaxed shadow-sm dark:border-slate-800 dark:bg-slate-900"
          onClick={focusInput}
          dir="ltr"
          aria-label={t('test.target')}
        >
          {cmp.map((c, i) => (
            <span
              key={i}
              className={cn(
                c.state === 'correct' && 'text-slate-800 dark:text-slate-100',
                c.state === 'incorrect' && 'rounded bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300',
                c.state === 'extra' && 'text-red-400 line-through',
                c.state === 'pending' && 'text-slate-400 dark:text-slate-600',
              )}
            >
              {c.target === ' ' ? '\u00A0' : c.target}
              {i === typedCount && <span className="typing-cursor align-middle" />}
            </span>
          ))}
        </div>

        <textarea
          ref={inputEl}
          className="input mt-3 resize-none text-base"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPaste={(e) => e.preventDefault()}
          placeholder={t('test.typeHere')}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          aria-label={t('test.typeHere')}
        />

        <div className="mt-3 flex justify-end">
          <Button variant="outline" onClick={() => finish(readElapsed())}>
            {t('common.finish')}
          </Button>
        </div>
      </div>
    )
  }

  const r = result
  if (!r) return null
  const lvl = performanceLevel(r.cpm)
  return (
    <div className="container-page py-8">
      <Seo title={`${t('test.results')} — ${t('brand.name')}`} />
      <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <Check size={20} className="text-emerald-600" /> {t('test.finished')}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="flex flex-col items-center justify-center">
          <ProgressRing value={r.accuracy} label={`${Math.round(r.accuracy)}%`} sublabel={t('test.accuracy')} />
        </Card>
        <Card className="grid grid-cols-2 gap-3 sm:col-span-2">
          <Stat icon={<Gauge size={16} />} label={t('test.cpm')} value={formatNumber(r.cpm)} big />
          <Stat icon={<Gauge size={16} />} label={t('test.wpm')} value={formatNumber(r.wpm)} big />
          <Stat icon={<Check size={16} />} label={t('test.correctChars')} value={formatNumber(r.correct)} />
          <Stat icon={<Target size={16} />} label={t('test.incorrectChars')} value={formatNumber(r.incorrect)} />
          <Stat icon={<Timer size={16} />} label={t('test.testDuration')} value={formatDuration(r.elapsedSec)} />
          <Stat icon={<Target size={16} />} label={t('test.totalChars')} value={formatNumber(r.totalTyped)} />
        </Card>
      </div>

      <div className="mt-4 rounded-lg bg-brand-50 p-4 text-sm text-brand-900 dark:bg-brand-900/30 dark:text-brand-100">
        {t(levelKey[lvl])}
      </div>

      {testLang === 'bn' && (
        <p className="mt-3 text-xs text-slate-500">{t('test.banglaCpmNote')}</p>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button onClick={restart}><RotateCcw size={16} /> {t('test.restart')}</Button>
        <Button variant="outline" onClick={another}><Shuffle size={16} /> {t('test.another')}</Button>
        <Button variant="outline" onClick={doShare}><Share2 size={16} /> {t('test.share')}</Button>
        <Button variant="outline" onClick={doCopy}><Copy size={16} /> {copied ? t('common.copied') : t('test.copy')}</Button>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        {lang === 'bn' ? 'ভাষা' : 'Language'}: {r.lang === 'bn' ? t('common.bangla') : t('common.english')} ·{' '}
        {t('test.method')}: {r.method === 'avro' ? t('test.mAvro') : r.method === 'bijoy' ? t('test.mBijoy') : t('test.mEnglish')} ·{' '}
        {t('test.mode')}: {r.mode}
      </p>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="label">{label}</div>
      {children}
    </div>
  )
}

function Stat({
  icon,
  label,
  value,
  big,
}: {
  icon: ReactNode
  label: string
  value: string
  big?: boolean
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">{icon} {label}</div>
      <div className={cn('mt-1 font-bold tabular-nums', big ? 'text-2xl' : 'text-lg')}>{value}</div>
    </div>
  )
}
