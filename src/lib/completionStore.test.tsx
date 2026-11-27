import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { markLessonComplete, resetAllProgress, saveTestResult } from './progress'
import { useCompletedLessonIds, useTestHistory } from './completionStore'
import type { TestResult } from '../types'

function Host({ onState }: { onState: (completed: Set<string>, history: TestResult[]) => void }) {
  const completed = useCompletedLessonIds()
  const history = useTestHistory()
  onState(completed, history)
  return (
    <ul>
      {[...completed].map((id) => (
        <li key={id}>{id}</li>
      ))}
    </ul>
  )
}

describe('reactive completion/history store', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => resetAllProgress())

  it('re-renders when a lesson is marked complete without remount', () => {
    let seen: Set<string> = new Set()
    render(<Host onState={(c) => { seen = c }} />)

    expect(seen.size).toBe(0)
    act(() => {
      markLessonComplete('avro:avro-1', 'bn')
    })
    expect(seen.has('avro:avro-1')).toBe(true)
    expect(screen.getByText('avro:avro-1')).toBeTruthy()
  })

  it('does not duplicate ids when marking the same lesson twice', () => {
    let seen: Set<string> = new Set()
    render(<Host onState={(c) => { seen = c }} />)
    act(() => {
      markLessonComplete('avro:avro-1', 'bn')
      markLessonComplete('avro:avro-1', 'bn')
    })
    expect(seen.size).toBe(1)
  })

  it('re-renders the history hook when a test result is saved', () => {
    let historyLength = -1
    render(<Host onState={(_c, h) => { historyLength = h.length }} />)

    expect(historyLength).toBe(0)
    act(() => {
      saveTestResult({
        lang: 'bn',
        method: 'avro',
        mode: 'timed',
        durationSec: 60,
        elapsedSec: 60,
        totalTyped: 100,
        correct: 95,
        incorrect: 5,
        accuracy: 95,
        cpm: 95,
        wpm: 19,
        target: 'x',
      })
    })
    expect(historyLength).toBe(1)
  })

  it('resets reactively when all progress is cleared', () => {
    let seen: Set<string> = new Set()
    render(<Host onState={(c) => { seen = c }} />)
    act(() => {
      markLessonComplete('bijoy:bijoy-1', 'bn')
    })
    expect(seen.size).toBe(1)
    act(() => {
      resetAllProgress()
    })
    expect(seen.size).toBe(0)
  })
})
