import { useSyncExternalStore } from 'react'
import {
  COMPLETIONS_EVENT,
  HISTORY_EVENT,
  getCompletedLessons,
  getTestHistory,
} from './progress'
import type { LessonCompletion, TestResult } from '../types'

// Reactive views over localStorage-backed progress. The lib functions in
// progress.ts dispatch a window event after every write; these hooks listen
// via useSyncExternalStore so components re-render the moment progress
// changes (fixes the stale "mark complete" UI). Cloud sync in Phase B writes
// through the same functions, so UI stays reactive there too.

// Snapshot memoization: useSyncExternalStore requires getSnapshot to return a
// stable reference until the data actually changes, so snapshots are cached
// at module level and invalidated before listeners are notified.
let historySnapshot: TestResult[] | null = null
let completionsSnapshot: LessonCompletion[] | null = null

function getHistorySnapshot(): TestResult[] {
  if (historySnapshot === null) historySnapshot = getTestHistory()
  return historySnapshot
}

function getCompletionsSnapshot(): LessonCompletion[] {
  if (completionsSnapshot === null) completionsSnapshot = getCompletedLessons()
  return completionsSnapshot
}

function makeSubscription(events: string[], invalidate: () => void) {
  return (notify: () => void) => {
    const handler = () => {
      invalidate()
      notify()
    }
    for (const e of events) window.addEventListener(e, handler)
    return () => {
      for (const e of events) window.removeEventListener(e, handler)
    }
  }
}

const subscribeHistory = makeSubscription([HISTORY_EVENT, 'storage'], () => {
  historySnapshot = null
})
const subscribeCompletions = makeSubscription([COMPLETIONS_EVENT, 'storage'], () => {
  completionsSnapshot = null
})

export function useTestHistory(): TestResult[] {
  return useSyncExternalStore(subscribeHistory, getHistorySnapshot, getHistorySnapshot)
}

export function useCompletedLessons(): LessonCompletion[] {
  return useSyncExternalStore(subscribeCompletions, getCompletionsSnapshot, getCompletionsSnapshot)
}

export function useCompletedLessonIds(): Set<string> {
  return useCompletedLessons().reduce(
    (ids, c) => ids.add(c.id),
    new Set<string>(),
  )
}
