import type { DashboardStats, LessonCompletion, TestLang, TestResult } from '../types'
import { readJSON, removeKey, writeJSON } from './storage'
import { uid } from './utils'

const HISTORY_KEY = 'test-history'
const LESSONS_KEY = 'lesson-completions'

export function getTestHistory(): TestResult[] {
  return readJSON<TestResult[]>(HISTORY_KEY, [])
}

export function saveTestResult(result: Omit<TestResult, 'id' | 'date'>): TestResult {
  const full: TestResult = { ...result, id: uid(), date: new Date().toISOString() }
  const history = getTestHistory()
  history.unshift(full)
  // Cap stored history to keep localStorage small on low-end devices.
  const capped = history.slice(0, 200)
  writeJSON(HISTORY_KEY, capped)
  return full
}

export function clearTestHistory(): void {
  removeKey(HISTORY_KEY)
}

export function getCompletedLessons(): LessonCompletion[] {
  return readJSON<LessonCompletion[]>(LESSONS_KEY, [])
}

export function isLessonComplete(id: string): boolean {
  return getCompletedLessons().some((l) => l.id === id)
}

export function markLessonComplete(id: string, lang: TestLang): LessonCompletion[] {
  const list = getCompletedLessons()
  if (!list.some((l) => l.id === id)) {
    list.push({ id, lang, completedAt: new Date().toISOString() })
    writeJSON(LESSONS_KEY, list)
  }
  return list
}

export function getDashboardStats(): DashboardStats {
  const history = getTestHistory()
  const completed = getCompletedLessons()

  const totalTests = history.length
  const bestCpm = history.reduce((m, r) => Math.max(m, r.cpm), 0)
  const bestWpm = history.reduce((m, r) => Math.max(m, r.wpm), 0)
  const avgAccuracy =
    totalTests === 0 ? 0 : Math.round(history.reduce((s, r) => s + r.accuracy, 0) / totalTests)
  const totalPracticeSec = history.reduce((s, r) => s + r.elapsedSec, 0)

  const by = (lang: TestResult['lang']) => history.filter((r) => r.lang === lang)
  const byMethod = (m: TestResult['method']) => history.filter((r) => r.method === m)

  return {
    totalTests,
    bestCpm,
    bestWpm,
    avgAccuracy,
    totalPracticeSec,
    completedLessons: completed.length,
    recent: history.slice(0, 5),
    banglaBestCpm: by('bn').reduce((mx, r) => Math.max(mx, r.cpm), 0),
    englishBestWpm: by('en').reduce((mx, r) => Math.max(mx, r.wpm), 0),
    avroBestCpm: byMethod('avro').reduce((mx, r) => Math.max(mx, r.cpm), 0),
    bijoyBestCpm: byMethod('bijoy').reduce((mx, r) => Math.max(mx, r.cpm), 0),
  }
}

export function resetAllProgress(): void {
  removeKey(HISTORY_KEY)
  removeKey(LESSONS_KEY)
}
