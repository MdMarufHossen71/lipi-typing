// Cloud synchronization between localStorage (offline cache / guest store)
// and the Supabase tables. Design rules:
//  - Local data is NEVER deleted; it is the offline cache and the guest store.
//  - Migration is dedup-safe: existing server records (by legacy_id /
//    (user_id, lesson_id)) are skipped, so running it repeatedly is harmless.
//  - Every function takes an optional client so tests can inject a fake.
//  - Callers must pass the authenticated user's id — server-side RLS also
//    verifies ownership; the user_id column can only ever be the caller's.
import type { SupabaseClient } from '@supabase/supabase-js'
import {
  getCompletedLessons,
  getTestHistory,
} from './progress'
import { supabase } from './supabase'
import type { Database, LessonProgressRow, TypingResultRow } from './supabase'
import type { LessonCompletion, TestResult } from '../types'

export interface MigrationSummary {
  resultsMigrated: number
  lessonsMigrated: number
  resultsSkipped: number
  lessonsSkipped: number
  errors: string[]
}

function resultToRow(userId: string, r: TestResult): Database['public']['Tables']['typing_results']['Insert'] {
  return {
    user_id: userId,
    legacy_id: r.id,
    language: r.lang,
    typing_method: r.method,
    typing_mode: r.mode,
    duration_seconds: r.durationSec,
    elapsed_seconds: r.elapsedSec,
    total_typed: r.totalTyped,
    correct: r.correct,
    incorrect: r.incorrect,
    accuracy: r.accuracy,
    cpm: r.cpm,
    wpm: r.wpm,
    target: r.target || null,
    created_at: r.date,
  }
}

function rowToResult(row: TypingResultRow): TestResult {
  return {
    id: row.legacy_id ?? row.id,
    date: row.created_at,
    lang: row.language,
    method: row.typing_method,
    mode: row.typing_mode,
    durationSec: row.duration_seconds,
    elapsedSec: row.elapsed_seconds,
    totalTyped: row.total_typed,
    correct: row.correct,
    incorrect: row.incorrect,
    accuracy: Number(row.accuracy),
    cpm: row.cpm,
    wpm: row.wpm,
    target: row.target ?? '',
  }
}

function rowToCompletion(row: LessonProgressRow): LessonCompletion {
  return {
    id: row.lesson_id,
    lang: row.language,
    completedAt: row.completed_at,
  }
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

/** Upload local-only typing results + lesson completions to the cloud. */
export async function migrateLocalProgress(
  userId: string,
  client: SupabaseClient<Database> | null = supabase,
): Promise<MigrationSummary> {
  const summary: MigrationSummary = {
    resultsMigrated: 0,
    lessonsMigrated: 0,
    resultsSkipped: 0,
    lessonsSkipped: 0,
    errors: [],
  }
  if (!client) throw new Error('Supabase is not configured')

  const localResults = getTestHistory()
  const localLessons = getCompletedLessons()
  if (localResults.length === 0 && localLessons.length === 0) return summary

  // Fetch the ids that already exist server-side (dedup key).
  const { data: existingResults, error: errResults } = await client
    .from('typing_results')
    .select('legacy_id')
    .eq('user_id', userId)
    .limit(1000)
  if (errResults) throw errResults
  const existingLegacy = new Set((existingResults ?? []).map((r) => r.legacy_id))

  const { data: existingLessons, error: errLessons } = await client
    .from('lesson_progress')
    .select('lesson_id')
    .eq('user_id', userId)
    .limit(1000)
  if (errLessons) throw errLessons
  const existingLessonIds = new Set((existingLessons ?? []).map((r) => r.lesson_id))

  const newResults = localResults.filter((r) => !existingLegacy.has(r.id))
  summary.resultsSkipped = localResults.length - newResults.length
  for (const batch of chunk(newResults, 100)) {
    const { error } = await client
      .from('typing_results')
      .insert(batch.map((r) => resultToRow(userId, r)))
    if (error) {
      summary.errors.push(error.message)
    } else {
      summary.resultsMigrated += batch.length
    }
  }

  const newLessons = localLessons.filter((l) => !existingLessonIds.has(l.id))
  summary.lessonsSkipped = localLessons.length - newLessons.length
  if (newLessons.length > 0) {
    // Upsert keeps migration idempotent even under concurrent runs.
    const { error } = await client
      .from('lesson_progress')
      .upsert(
        newLessons.map((l) => ({
          user_id: userId,
          lesson_id: l.id,
          language: l.lang,
          completed_at: l.completedAt,
        })),
        { onConflict: 'user_id,lesson_id', ignoreDuplicates: true },
      )
    if (error) {
      summary.errors.push(error.message)
    } else {
      summary.lessonsMigrated += newLessons.length
    }
  }

  return summary
}

/** Save one typing result for the signed-in user. Local cache untouched. */
export async function saveTypingResultToCloud(
  userId: string,
  result: TestResult,
  client: SupabaseClient<Database> | null = supabase,
): Promise<void> {
  if (!client) throw new Error('Supabase is not configured')
  const { error } = await client.from('typing_results').insert(resultToRow(userId, result))
  if (error) throw error
}

/** Upsert one lesson completion for the signed-in user. */
export async function saveLessonCompletionToCloud(
  userId: string,
  completion: LessonCompletion,
  client: SupabaseClient<Database> | null = supabase,
): Promise<void> {
  if (!client) throw new Error('Supabase is not configured')
  const { error } = await client
    .from('lesson_progress')
    .upsert(
      {
        user_id: userId,
        lesson_id: completion.id,
        language: completion.lang,
        completed_at: completion.completedAt,
      },
      { onConflict: 'user_id,lesson_id', ignoreDuplicates: true },
    )
  if (error) throw error
}

/** Fetch the user's cloud typing history (newest first), paginated. */
export async function fetchCloudHistory(
  userId: string,
  client: SupabaseClient<Database> | null = supabase,
  limit = 200,
  offset = 0,
): Promise<TestResult[]> {
  if (!client) throw new Error('Supabase is not configured')
  const { data, error } = await client
    .from('typing_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  if (error) throw error
  return (data ?? []).map(rowToResult)
}

/** Fetch the user's cloud lesson completions. */
export async function fetchCloudLessonCompletions(
  userId: string,
  client: SupabaseClient<Database> | null = supabase,
): Promise<LessonCompletion[]> {
  if (!client) throw new Error('Supabase is not configured')
  const { data, error } = await client
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
    .limit(1000)
  if (error) throw error
  return (data ?? []).map(rowToCompletion)
}

/** Merge cloud + local lists by id (cloud wins; local-only extras kept). */
export function mergeById<T extends { id: string }>(cloud: T[], local: T[]): T[] {
  const map = new Map<string, T>()
  for (const item of local) map.set(item.id, item)
  for (const item of cloud) map.set(item.id, item)
  const out = [...map.values()]
  if (out.length > 0 && 'date' in out[0]) {
    out.sort((a, b) => ((b as unknown as { date: string }).date).localeCompare((a as unknown as { date: string }).date))
  } else {
    out.sort((a, b) => {
      const ca = (a as unknown as { completedAt?: string }).completedAt ?? ''
      const cb = (b as unknown as { completedAt?: string }).completedAt ?? ''
      return cb.localeCompare(ca)
    })
  }
  return out
}
