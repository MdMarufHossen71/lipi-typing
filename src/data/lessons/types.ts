// Shared lesson structure for all typing tracks.
export type Level = 'beginner' | 'intermediate' | 'advanced' | 'professional'

export interface Bilingual {
  bn: string
  en: string
}

export interface ExamplePair {
  /** Keystroke / roman input */
  input: string
  /** Resulting output */
  output: string
  note?: Bilingual
}

export interface QuizQ {
  q: Bilingual
  options: Bilingual[]
  /** Index of the correct option */
  answer: number
}

export interface Lesson {
  id: string
  level: Level
  title: Bilingual
  objectives: Bilingual[]
  explanation: Bilingual
  examples?: ExamplePair[]
  instructions: Bilingual[]
  mistakes: Bilingual[]
  /** Optional text the learner can practise in the typing box */
  practiceText?: Bilingual
  quiz?: QuizQ[]
}
