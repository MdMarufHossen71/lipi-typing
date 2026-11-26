import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, ArrowRight, Check, CircleCheck, Target } from 'lucide-react'
import type { Lesson, QuizQ } from '../data/lessons/types'
import { useI18n } from '../i18n/I18nContext'
import { compareChars } from '../lib/typingEngine'
import { Button, Card } from './ui'
import { cn } from '../lib/utils'
import { Seo } from './Seo'

function PracticeBox({ text }: { text: string }) {
  const [input, setInput] = useState('')
  const cmp = compareChars(text, input)
  const correct = cmp.filter((c) => c.state === 'correct').length
  const total = cmp.filter((c) => c.target).length
  const done = input.length >= cmp.filter((c) => c.target).length && total > 0
  return (
    <div>
      <div className="rounded-lg bg-slate-50 p-4 text-base leading-relaxed dark:bg-slate-800/50">
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
            {c.target === '' ? '' : c.target === ' ' ? '\u00A0' : c.target}
          </span>
        ))}
      </div>
      <textarea
        className="input mt-2 font-bangla"
        rows={2}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="..."
        aria-label="Practice input"
      />
      <div className="mt-1 text-xs text-slate-500">
        {correct}/{total} · {done ? '✓' : ''}
      </div>
    </div>
  )
}

function Quiz({ quiz }: { quiz: QuizQ[] }) {
  const { tr } = useI18n()
  const [answers, setAnswers] = useState<(number | undefined)[]>(quiz.map(() => undefined))
  const [submitted, setSubmitted] = useState(false)
  const score = answers.reduce<number>((s, a, i) => (a === quiz[i]?.answer ? s + 1 : s), 0)

  return (
    <div className="space-y-4">
      {quiz.map((q, qi) => (
        <div key={qi}>
          <div className="mb-2 font-medium">
            {qi + 1}. {tr(q.q)}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi
              const isCorrect = oi === q.answer
              const showState = submitted && selected
              return (
                <button
                  key={oi}
                  onClick={() =>
                    !submitted && setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))
                  }
                  className={cn(
                    'rounded-lg border px-3 py-2 text-left text-sm transition-colors',
                    selected && !submitted && 'border-brand-500 bg-brand-50 dark:bg-brand-900/30',
                    showState && isCorrect && 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30',
                    showState && !isCorrect && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                    !selected && 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800',
                  )}
                >
                  {tr(opt)}
                  {submitted && isCorrect && <Check size={14} className="ml-1 inline text-emerald-600" />}
                </button>
              )
            })}
          </div>
        </div>
      ))}
      {!submitted ? (
        <Button
          onClick={() => setSubmitted(true)}
          disabled={answers.some((a) => a === undefined)}
        >
          {tr({ bn: 'উত্তর জমা দিন', en: 'Submit answers' })}
        </Button>
      ) : (
        <div className="text-sm font-medium">
          {tr({ bn: `স্কোর: ${score}/${quiz.length}`, en: `Score: ${score}/${quiz.length}` })}
        </div>
      )}
    </div>
  )
}

interface LessonViewProps {
  lesson: Lesson
  index: number
  total: number
  onPrev?: () => void
  onNext?: () => void
  onComplete: () => void
  completed: boolean
}

export function LessonView({
  lesson,
  index,
  total,
  onPrev,
  onNext,
  onComplete,
  completed,
}: LessonViewProps) {
  const { t, tr } = useI18n()
  return (
    <div className="container-page py-8">
      <Seo title={`${tr(lesson.title)} — ${t('brand.name')}`} />
      <Link to=".." className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600">
        <ArrowLeft size={14} /> {t('common.back')}
      </Link>

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="badge-muted">{t(`common.${lesson.level}`)}</span>
        <span className="badge-muted">{t('common.lesson')} {index + 1}/{total}</span>
        {completed && (
          <span className="badge-green">
            <CircleCheck size={12} className="mr-1" /> {t('lesson.completed')}
          </span>
        )}
      </div>

      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{tr(lesson.title)}</h1>

      <Card className="mt-4">
        <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
          <Target size={16} className="text-brand-600" /> {t('lesson.objectives')}
        </div>
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
          {lesson.objectives.map((o, i) => (
            <li key={i}>{tr(o)}</li>
          ))}
        </ul>
      </Card>

      <section className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">{t('lesson.explanation')}</h2>
        <p className="prose-bn max-w-none text-slate-700 dark:text-slate-300">{tr(lesson.explanation)}</p>
      </section>

      {lesson.examples && lesson.examples.length > 0 && (
        <Card className="mt-6">
          <h2 className="mb-3 text-lg font-semibold">{t('lesson.examples')}</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {lesson.examples.map((ex, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
              >
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">{ex.input}</code>
                <span className="mx-2 text-slate-400">→</span>
                <span className="font-bangla text-base font-medium">{ex.output}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <section className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">{t('lesson.instructions')}</h2>
        <ol className="list-inside list-decimal space-y-1 text-sm text-slate-700 dark:text-slate-300">
          {lesson.instructions.map((s, i) => (
            <li key={i}>{tr(s)}</li>
          ))}
        </ol>
      </section>

      <Card className="mt-6 border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-900/10">
        <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
          <AlertTriangle size={16} className="text-amber-600" /> {t('lesson.mistakes')}
        </div>
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-700 dark:text-slate-300">
          {lesson.mistakes.map((m, i) => (
            <li key={i}>{tr(m)}</li>
          ))}
        </ul>
      </Card>

      {lesson.practiceText && (
        <Card className="mt-6">
          <h2 className="mb-3 text-lg font-semibold">{t('lesson.practiceNow')}</h2>
          <PracticeBox text={tr(lesson.practiceText)} />
        </Card>
      )}

      {lesson.quiz && lesson.quiz.length > 0 && (
        <Card className="mt-6">
          <h2 className="mb-3 text-lg font-semibold">{t('lesson.quiz')}</h2>
          <Quiz quiz={lesson.quiz} />
        </Card>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" onClick={onPrev} disabled={!onPrev}>
          <ArrowLeft size={16} /> {t('lesson.prevLesson')}
        </Button>
        <Button onClick={onComplete} variant={completed ? 'outline' : 'primary'}>
          {completed ? t('lesson.completed') : t('lesson.markComplete')}
        </Button>
        <Button variant="outline" onClick={onNext} disabled={!onNext}>
          {t('lesson.nextLesson')} <ArrowRight size={16} />
        </Button>
      </div>
      <div className="mt-6 text-xs text-slate-400">{index + 1} / {total}</div>
    </div>
  )
}
