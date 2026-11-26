// Shared domain types for the Lipi typing platform.

export type TypingMethod = 'avro' | 'bijoy' | 'english'
export type TestLang = 'bn' | 'en'
export type TestMode = 'timed' | 'fixed' | 'word' | 'sentence' | 'beginner' | 'advanced'

export interface TestResult {
  id: string
  date: string
  lang: TestLang
  method: TypingMethod
  mode: TestMode
  durationSec: number
  elapsedSec: number
  totalTyped: number
  correct: number
  incorrect: number
  accuracy: number
  cpm: number
  wpm: number
  target: string
}

export interface LessonCompletion {
  id: string
  lang: TestLang
  completedAt: string
}

export interface DashboardStats {
  totalTests: number
  bestCpm: number
  bestWpm: number
  avgAccuracy: number
  totalPracticeSec: number
  completedLessons: number
  recent: TestResult[]
  banglaBestCpm: number
  englishBestWpm: number
  avroBestCpm: number
  bijoyBestCpm: number
}
