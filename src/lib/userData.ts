import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useCompletedLessons, useTestHistory } from './completionStore'
import { COMPLETIONS_EVENT, HISTORY_EVENT } from './progress'
import { fetchCloudHistory, fetchCloudLessonCompletions, mergeById } from './cloudSync'
import type { LessonCompletion, TestResult } from '../types'

export interface UserData {
  history: TestResult[]
  completions: LessonCompletion[]
  loading: boolean
  error: string | null
  /** True when data includes the signed-in user's cloud records. */
  isCloud: boolean
  retry: () => void
}

/**
 * Unified progress data for dashboard/history:
 *  - guests: the reactive localStorage stores
 *  - signed-in users: cloud records merged over the local cache
 *    (cloud wins by id; local-only records — e.g. offline saves — stay visible)
 */
export function useUserData(): UserData {
  const { status, user } = useAuth()
  const userId = user?.id ?? null
  const localHistory = useTestHistory()
  const localCompletions = useCompletedLessons()
  const [cloud, setCloud] = useState<{ history: TestResult[]; completions: LessonCompletion[] } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (status !== 'authed' || !userId) {
      setCloud(null)
      setError(null)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    Promise.all([fetchCloudHistory(userId), fetchCloudLessonCompletions(userId)])
      .then(([history, completions]) => {
        if (!cancelled) setCloud({ history, completions })
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [status, userId, attempt])

  // Local writes (and the fire-and-forget cloud saves that follow them)
  // trigger a debounced cloud refresh so the dashboard stays current.
  useEffect(() => {
    if (status !== 'authed') return
    let timer: number | undefined
    const handler = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setAttempt((a) => a + 1), 800)
    }
    window.addEventListener(HISTORY_EVENT, handler)
    window.addEventListener(COMPLETIONS_EVENT, handler)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener(HISTORY_EVENT, handler)
      window.removeEventListener(COMPLETIONS_EVENT, handler)
    }
  }, [status])

  const isCloud = status === 'authed'
  const history = useMemo(
    () => (isCloud && cloud ? mergeById(cloud.history, localHistory) : localHistory),
    [isCloud, cloud, localHistory],
  )
  const completions = useMemo(
    () => (isCloud && cloud ? mergeById(cloud.completions, localCompletions) : localCompletions),
    [isCloud, cloud, localCompletions],
  )

  return {
    history,
    completions,
    loading,
    error,
    isCloud,
    retry: () => setAttempt((a) => a + 1),
  }
}
