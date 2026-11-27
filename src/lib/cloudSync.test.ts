import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  fetchCloudHistory,
  mergeById,
  migrateLocalProgress,
  saveTypingResultToCloud,
} from './cloudSync'
import { resetAllProgress } from './progress'
import type { TestResult } from '../types'

// The unconfigured fallback must stay deterministic in tests (no env leakage).
vi.mock('./supabase', () => ({
  isSupabaseConfigured: false,
  loadSupabase: async () => null,
  requireClient: (c: unknown) => {
    if (!c) throw new Error('Supabase is not configured')
    return c
  },
}))

// Minimal stateful fake of the Supabase query builder for the tables cloudSync touches.
function makeFakeClient() {
  const state = {
    results: [] as { user_id: string; legacy_id: string | null; cpm: number; created_at: string }[],
    lessons: [] as { user_id: string; lesson_id: string; language: string; completed_at: string }[],
    failNextInsert: false,
    insertCalls: 0,
    upsertCalls: 0,
  }
  const client = {
    from(table: string) {
      if (table === 'typing_results') {
        return {
          select() {
            return {
              eq() {
                return {
                  limit: async () => ({
                    data: state.results.map((r) => ({ legacy_id: r.legacy_id })),
                    error: null,
                  }),
                  order() {
                    return {
                      range: async () => ({
                        data: state.results.filter((r) => r.user_id === USER),
                        error: null,
                      }),
                    }
                  },
                }
              },
            }
          },
          insert(rows: Array<{ user_id: string; legacy_id: string; created_at: string; cpm: number }>) {
            state.insertCalls++
            const error = state.failNextInsert ? { message: 'boom' } : null
            if (!state.failNextInsert) state.results.push(...rows)
            state.failNextInsert = false
            return Promise.resolve({ data: null, error })
          },
        }
      }
      // lesson_progress
      return {
        select() {
          return {
            eq() {
              return {
                limit: async () => ({
                  data: state.lessons.map((l) => ({ lesson_id: l.lesson_id })),
                  error: null,
                }),
              }
            },
          }
        },
        upsert(rows: Array<{ user_id: string; lesson_id: string; language: string; completed_at: string }>) {
          state.upsertCalls++
          for (const row of rows) {
            if (!state.lessons.some((l) => l.user_id === row.user_id && l.lesson_id === row.lesson_id)) {
              state.lessons.push(row)
            }
          }
          return Promise.resolve({ data: null, error: null })
        },
      }
    },
  }
  return { client, state }
}

const USER = 'u1'

function makeResult(id: string, cpm: number): TestResult {
  return {
    id,
    date: '2026-11-27T10:00:00Z',
    lang: 'bn',
    method: 'avro',
    mode: 'timed',
    durationSec: 60,
    elapsedSec: 60,
    totalTyped: 100,
    correct: 95,
    incorrect: 5,
    accuracy: 95,
    cpm,
    wpm: 19,
    target: 'x',
  }
}

describe('cloudSync migration dedup', () => {
  beforeEach(() => resetAllProgress())

  it('uploads only records missing server-side and leaves localStorage intact', async () => {
    // Write known ids directly: saveTestResult always regenerates ids.
    localStorage.setItem('lipi:test-history', JSON.stringify([makeResult('r2', 120), makeResult('r1', 100)]))
    localStorage.setItem(
      'lipi:lesson-completions',
      JSON.stringify([
        { id: 'avro:avro-1', lang: 'bn', completedAt: '2026-11-27T10:00:00Z' },
        { id: 'avro:avro-2', lang: 'bn', completedAt: '2026-11-27T10:05:00Z' },
      ]),
    )

    const { client, state } = makeFakeClient()
    // r1 + avro:avro-1 already exist server-side.
    state.results.push({ user_id: USER, legacy_id: 'r1', cpm: 100, created_at: '2026-11-27T09:00:00Z' })
    state.lessons.push({ user_id: USER, lesson_id: 'avro:avro-1', language: 'bn', completed_at: 'x' })

    const summary = await migrateLocalProgress(USER, client as never)
    expect(summary.resultsMigrated).toBe(1)
    expect(summary.resultsSkipped).toBe(1)
    expect(summary.lessonsMigrated).toBe(1)
    expect(summary.lessonsSkipped).toBe(1)
    expect(summary.errors).toEqual([])
    expect(state.results.map((r) => r.legacy_id)).toEqual(['r1', 'r2'])
    expect(state.lessons.map((l) => l.lesson_id)).toEqual(['avro:avro-1', 'avro:avro-2'])

    // Local data preserved.
    expect(JSON.parse(localStorage.getItem('lipi:test-history') ?? '[]')).toHaveLength(2)
    expect(JSON.parse(localStorage.getItem('lipi:lesson-completions') ?? '[]')).toHaveLength(2)
  })

  it('is idempotent: a second migration moves nothing new', async () => {
    localStorage.setItem('lipi:test-history', JSON.stringify([makeResult('r1', 100)]))
    localStorage.setItem(
      'lipi:lesson-completions',
      JSON.stringify([{ id: 'bijoy:bijoy-1', lang: 'bn', completedAt: '2026-11-27T10:00:00Z' }]),
    )
    const { client } = makeFakeClient()

    const first = await migrateLocalProgress(USER, client as never)
    expect(first.resultsMigrated).toBe(1)
    expect(first.lessonsMigrated).toBe(1)

    const second = await migrateLocalProgress(USER, client as never)
    expect(second.resultsMigrated).toBe(0)
    expect(second.lessonsMigrated).toBe(0)
    expect(second.resultsSkipped).toBe(1)
    expect(second.lessonsSkipped).toBe(1)
  })

  it('reports insert errors but never deletes or throws away local data', async () => {
    localStorage.setItem('lipi:test-history', JSON.stringify([makeResult('r1', 100)]))
    localStorage.setItem(
      'lipi:lesson-completions',
      JSON.stringify([{ id: 'avro:avro-1', lang: 'bn', completedAt: '2026-11-27T10:00:00Z' }]),
    )
    const { client, state } = makeFakeClient()
    state.failNextInsert = true

    const summary = await migrateLocalProgress(USER, client as never)
    expect(summary.resultsMigrated).toBe(0)
    expect(summary.errors).toEqual(['boom'])
    expect(JSON.parse(localStorage.getItem('lipi:test-history') ?? '[]')).toHaveLength(1)
    expect(state.lessons.map((l) => l.lesson_id)).toContain('avro:avro-1')
  })

  it('throws a clear error when unconfigured (guest invariance guard)', async () => {
    await expect(migrateLocalProgress(USER, null)).rejects.toThrow('Supabase is not configured')
    await expect(saveTypingResultToCloud(USER, makeResult('r1', 100), null)).rejects.toThrow(
      'Supabase is not configured',
    )
    // Nothing was written locally by the failed calls.
    expect(localStorage.getItem('lipi:test-history')).toBeNull()
  })

  it('fetchCloudHistory maps rows back to the local TestResult shape', async () => {
    const { client, state } = makeFakeClient()
    state.results.push({
      user_id: USER,
      legacy_id: 'legacy-9',
      cpm: 210,
      created_at: '2026-11-27T11:00:00Z',
    })
    // Add a full row shape for the remaining fields via cast (fake is minimal).
    ;(state.results[0] as unknown as Record<string, unknown>) = {
      user_id: USER,
      legacy_id: 'legacy-9',
      language: 'bn',
      typing_method: 'avro',
      typing_mode: 'timed',
      duration_seconds: 60,
      elapsed_seconds: 60,
      total_typed: 100,
      correct: 95,
      incorrect: 5,
      accuracy: 95,
      cpm: 210,
      wpm: 42,
      target: 'target text',
      created_at: '2026-11-27T11:00:00Z',
    }

    const history = await fetchCloudHistory(USER, client as never)
    expect(history).toHaveLength(1)
    expect(history[0]).toMatchObject({
      id: 'legacy-9',
      lang: 'bn',
      method: 'avro',
      mode: 'timed',
      cpm: 210,
      wpm: 42,
      accuracy: 95,
    })
  })
})

describe('mergeById', () => {
  it('prefers cloud records and keeps local-only ones, newest first', () => {
    const cloud = [
      { id: 'a', date: '2026-11-26T00:00:00Z' },
      { id: 'c', date: '2026-11-25T00:00:00Z' },
    ]
    const local = [
      { id: 'a', date: '2026-11-20T00:00:00Z' },
      { id: 'b', date: '2026-11-27T00:00:00Z' },
    ]
    const merged = mergeById(cloud, local)
    expect(merged.map((m) => m.id)).toEqual(['b', 'a', 'c'])
    expect(merged.find((m) => m.id === 'a')?.date).toBe('2026-11-26T00:00:00Z')
  })
})
