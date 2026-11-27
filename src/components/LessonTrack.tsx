import { useState } from 'react'
import { CircleCheck } from 'lucide-react'
import type { Lesson } from '../data/lessons/types'
import type { TestLang } from '../types'
import { useI18n } from '../i18n/I18nContext'
import { useAuth } from '../contexts/AuthContext'
import { markLessonComplete } from '../lib/progress'
import { saveLessonCompletionToCloud } from '../lib/cloudSync'
import { useCompletedLessonIds } from '../lib/completionStore'
import { LessonView } from './LessonView'
import { cn } from '../lib/utils'

interface LessonTrackProps {
  lessons: Lesson[]
  /** Prefix used for completion ids, e.g. "avro" -> "avro:avro-1" */
  trackId: string
  trackLang: TestLang
  /** Where the sidebar "back" link should lead, e.g. "/learn-bangla". */
  backTo: string
}

export function LessonTrack({ lessons, trackId, trackLang, backTo }: LessonTrackProps) {
  const { tr } = useI18n()
  const { user } = useAuth()
  const [idx, setIdx] = useState(0)
  const lesson = lessons[idx]
  const fullId = `${trackId}:${lesson.id}`
  const completedIds = useCompletedLessonIds()
  const completed = completedIds.has(fullId)

  function complete() {
    const list = markLessonComplete(fullId, trackLang)
    // Signed-in users also get a cloud copy (fire-and-forget); the local
    // record stays and Account > Sync can retry gaps.
    const rec = list.find((l) => l.id === fullId)
    if (rec && user) {
      void saveLessonCompletionToCloud(user.id, rec).catch(() => {})
    }
  }

  return (
    <div className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="space-y-1">
            {lessons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setIdx(i)}
                aria-current={i === idx ? 'step' : undefined}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors',
                  i === idx
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800',
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{i + 1}</span>
                  <span className="line-clamp-2">{tr(l.title)}</span>
                </span>
                {completedIds.has(`${trackId}:${l.id}`) && (
                  <CircleCheck size={14} className="ml-1 shrink-0 text-emerald-500" />
                )}
              </button>
            ))}
          </div>
        </aside>
        <div>
          <LessonView
            lesson={lesson}
            index={idx}
            total={lessons.length}
            backTo={backTo}
            onPrev={idx > 0 ? () => setIdx(idx - 1) : undefined}
            onNext={idx < lessons.length - 1 ? () => setIdx(idx + 1) : undefined}
            onComplete={complete}
            completed={completed}
          />
        </div>
      </div>
    </div>
  )
}
