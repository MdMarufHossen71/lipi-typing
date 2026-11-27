import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Check,
  CircleCheck,
  GraduationCap,
  Lightbulb,
  ListChecks,
  PenLine,
  RotateCcw,
  Target,
  Trophy,
} from 'lucide-react'
import type { Lesson, QuizQ } from '../data/lessons/types'
import { useI18n } from '../i18n/I18nContext'
import { compareChars, segment } from '../lib/typingEngine'
import { Button, Card } from './ui'
import { cn } from '../lib/utils'
import { Seo } from './Seo'

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
        {icon}
      </span>
      {children}
    </h2>
  )
}

function PracticeBox({ text }: { text: string }) {
  const { t } = useI18n()
  const [input, setInput] = useState('')
  const cmp = compareChars(text, input)
  const correct = cmp.filter((c) => c.state === 'correct').length
  const total = cmp.filter((c) => c.target).length
  // Grapheme-based: a Bangla conjunct is one user-perceived character, so a
  // plain string length would overshoot the target count.
  const typedCount = segment(input).length
  const done = typedCount >= total && total > 0
  return (
    <div>
      <div className="rounded-xl bg-slate-50 p-4 text-base leading-relaxed dark:bg-slate-800/50">
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
        className="input mt-3 font-bangla"
        rows={2}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="..."
        aria-label="Practice input"
      />
      <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          {correct}/{total} {t('test.correctChars')}
        </span>
        {done ? (
          <span className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
            <CircleCheck size={14} /> {t('lesson.practiceDone')}
          </span>
        ) : (
          <button
            type="button"
            className="inline-flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200"
            onClick={() => setInput('')}
          >
            <RotateCcw size={12} /> {t('lesson.practiceReset')}
          </button>
        )}
      </div>
    </div>
  )
}

function Quiz({ quiz }: { quiz: QuizQ[] }) {
  const { t, tr } = useI18n()
  const [answers, setAnswers] = useState<(number | undefined)[]>(quiz.map(() => undefined))
  const [submitted, setSubmitted] = useState(false)
  const score = answers.reduce<number>((s, a, i) => (a === quiz[i]?.answer ? s + 1 : s), 0)

  function retry() {
    setAnswers(quiz.map(() => undefined))
    setSubmitted(false)
  }

  return (
    <div className="space-y-5">
      {quiz.map((q, qi) => (
        <fieldset key={qi} className="border-0 p-0">
          <legend className="mb-2 font-medium">
            {qi + 1}. {tr(q.q)}
          </legend>
          <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label={tr(q.q)}>
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi
              const isCorrect = oi === q.answer
              const showState = submitted && selected
              return (
                <button
                  key={oi}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={submitted}
                  onClick={() =>
                    !submitted && setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))
                  }
                  className={cn(
                    'flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition-colors',
                    selected && !submitted &&
                      'border-brand-500 bg-brand-50 font-medium dark:bg-brand-900/30',
                    showState && isCorrect &&
                      'border-emerald-500 bg-emerald-50 font-medium dark:bg-emerald-900/30',
                    showState && !isCorrect && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                    !selected && !showState &&
                      'border-slate-200 hover:border-brand-300 hover:bg-brand-50/50 dark:border-slate-700 dark:hover:border-brand-500 dark:hover:bg-brand-900/20',
                    submitted && !selected && !isCorrect && 'border-slate-200 opacity-60 dark:border-slate-700',
                  )}
                >
                  <span>{tr(opt)}</span>
                  {submitted && isCorrect && (
                    <Check size={15} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                  )}
                </button>
              )
            })}
          </div>
        </fieldset>
      ))}

      {!submitted ? (
        <Button
          onClick={() => setSubmitted(true)}
          disabled={answers.some((a) => a === undefined)}
        >
          {t('lesson.quizSubmit')}
        </Button>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/50">
          <span className={cn('flex items-center gap-1.5 text-sm font-semibold', score === quiz.length && 'text-emerald-600 dark:text-emerald-400')}>
            {score === quiz.length && <Trophy size={15} />}
            {t('lesson.quizScore', { score, total: quiz.length })}
          </span>
          <Button variant="outline" onClick={retry}>
            <RotateCcw size={14} /> {t('lesson.quizRetry')}
          </Button>
        </div>
      )}
    </div>
  )
}

interface LessonViewProps {
  lesson: Lesson
  index: number
  total: number
  /** Route the back link leads to (e.g. "/learn-bangla"). */
  backTo: string
  onPrev?: () => void
  onNext?: () => void
  onComplete: () => void
  completed: boolean
}

export function LessonView({
  lesson,
  index,
  total,
  backTo,
  onPrev,
  onNext,
  onComplete,
  completed,
}: LessonViewProps) {
  const { t, tr } = useI18n()
  return (
    <div className="container-page py-8">
      <Seo title={`${tr(lesson.title)} — ${t('brand.name')}`} />
      <Link
        to={backTo}
        className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
      >
        <ArrowLeft size={14} /> {t('common.back')}
      </Link>

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="badge-brand">{t(`common.${lesson.level}`)}</span>
        <span className="badge-muted">
          {t('common.lesson')} {index + 1}/{total}
        </span>
        {completed && (
          <span className="badge-green">
            <CircleCheck size={12} className="mr-1" /> {t('lesson.completed')}
          </span>
        )}
      </div>

      <h1 className="max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">{tr(lesson.title)}</h1>

      <Card className="mt-5 border-brand-200/60 bg-brand-50/40 dark:border-brand-900/40 dark:bg-brand-900/10">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <GraduationCap size={16} className="text-brand-600 dark:text-brand-300" />
          {t('lesson.objectives')}
        </div>
        <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-200">
          {lesson.objectives.map((o, i) => (
            <li key={i} className="flex items-start gap-2">
              <Target size={14} className="mt-0.5 shrink-0 text-brand-500" />
              <span>{tr(o)}</span>
            </li>
          ))}
        </ul>
      </Card>

      <section className="mt-7">
        <SectionTitle icon={<BookOpenText size={15} />}>{t('lesson.explanation')}</SectionTitle>
        <p className="prose-bn max-w-none rounded-xl text-slate-700 dark:text-slate-300">
          {tr(lesson.explanation)}
        </p>
      </section>

      {lesson.examples && lesson.examples.length > 0 && (
        <Card className="mt-6">
          <SectionTitle icon={<Lightbulb size={15} />}>{t('lesson.examples')}</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            {lesson.examples.map((ex, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800/40"
              >
                <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">
                  {ex.input}
                </code>
                <span className="mx-1 text-slate-400">→</span>
                <span className="font-bangla text-base font-medium">{ex.output}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <section className="mt-7">
        <SectionTitle icon={<ListChecks size={15} />}>{t('lesson.instructions')}</SectionTitle>
        <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          {lesson.instructions.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                {i + 1}
              </span>
              <span>{tr(s)}</span>
            </li>
          ))}
        </ol>
      </section>

      <Card className="mt-6 border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-900/10">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400" />
          {t('lesson.mistakes')}
        </div>
        <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
          {lesson.mistakes.map((m, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>{tr(m)}</span>
            </li>
          ))}
        </ul>
      </Card>

      {lesson.practiceText && (
        <Card className="mt-6">
          <SectionTitle icon={<PenLine size={15} />}>{t('lesson.practiceNow')}</SectionTitle>
          <PracticeBox text={tr(lesson.practiceText)} />
        </Card>
      )}

      {lesson.quiz && lesson.quiz.length > 0 && (
        <Card className="mt-6">
          <SectionTitle icon={<ListChecks size={15} />}>{t('lesson.quiz')}</SectionTitle>
          <Quiz quiz={lesson.quiz} />
        </Card>
      )}

      <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
        <Button variant="outline" onClick={onPrev} disabled={!onPrev}>
          <ArrowLeft size={16} /> {t('lesson.prevLesson')}
        </Button>
        <Button onClick={onComplete} variant={completed ? 'outline' : 'primary'}>
          {completed ? (
            <>
              <CircleCheck size={16} /> {t('lesson.completed')}
            </>
          ) : (
            t('lesson.markComplete')
          )}
        </Button>
        <Button variant="outline" onClick={onNext} disabled={!onNext}>
          {t('lesson.nextLesson')} <ArrowRight size={16} />
        </Button>
      </div>
      <div className="mt-5 text-center text-xs text-slate-400">
        {index + 1} / {total}
      </div>
    </div>
  )
}
