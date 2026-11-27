import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { TestResult } from '../types'
import { I18nProvider } from '../i18n/I18nContext'
import { bn } from '../i18n/bn'
import { TypingTest } from './TypingTest'

// The default interface language is Bangla, so labels come from the bn dictionary.
function renderTest() {
  return render(
    <I18nProvider>
      <TypingTest />
    </I18nProvider>,
  )
}

function readHistory(): TestResult[] {
  const raw = localStorage.getItem('lipi:test-history')
  return raw ? (JSON.parse(raw) as TestResult[]) : []
}

function pill(key: string) {
  return screen.getByRole('button', { name: bn[key] })
}

describe('TypingTest configuration', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('offers only Bangla methods for a Bangla test', () => {
    renderTest()
    expect(pill('test.mAvro').getAttribute('aria-pressed')).toBe('true')
    expect(pill('test.mBijoy').getAttribute('aria-pressed')).toBe('false')
    expect(screen.queryByRole('button', { name: bn['test.mEnglish'] })).toBeNull()
  })

  it('offers only English QWERTY for an English test', () => {
    renderTest()
    fireEvent.click(pill('common.english'))

    expect(pill('test.mEnglish').getAttribute('aria-pressed')).toBe('true')
    expect(screen.queryByRole('button', { name: bn['test.mAvro'] })).toBeNull()
    expect(screen.queryByRole('button', { name: bn['test.mBijoy'] })).toBeNull()
  })

  it('keeps a chosen Bangla method while the language stays Bangla', () => {
    renderTest()
    fireEvent.click(pill('test.mBijoy'))

    expect(pill('test.mBijoy').getAttribute('aria-pressed')).toBe('true')
    expect(pill('test.mAvro').getAttribute('aria-pressed')).toBe('false')
  })

  it('falls back to Avro when switching back from English to Bangla', () => {
    renderTest()
    fireEvent.click(pill('common.english'))
    fireEvent.click(pill('common.bangla'))

    expect(pill('test.mAvro').getAttribute('aria-pressed')).toBe('true')
    expect(pill('test.mBijoy').getAttribute('aria-pressed')).toBe('false')
  })

  it('records a consistent language and method for an English test', () => {
    renderTest()
    fireEvent.click(pill('common.english'))
    fireEvent.click(pill('test.start'))
    fireEvent.click(pill('common.finish'))

    const [saved] = readHistory()
    expect(saved.lang).toBe('en')
    expect(saved.method).toBe('english')
  })

  it('records the chosen Bangla method', () => {
    renderTest()
    fireEvent.click(pill('test.mBijoy'))
    fireEvent.click(pill('test.start'))
    fireEvent.click(pill('common.finish'))

    const [saved] = readHistory()
    expect(saved.lang).toBe('bn')
    expect(saved.method).toBe('bijoy')
  })

  it('runs a custom-duration test for the chosen number of minutes', () => {
    vi.useFakeTimers()
    try {
      renderTest()
      fireEvent.click(pill('test.dCustom'))
      fireEvent.click(pill('test.start'))

      // The custom length defaults to 5 minutes, so an early tick must not end it.
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(pill('common.finish')).toBeTruthy()
      expect(screen.queryByText(bn['test.finished'])).toBeNull()

      // A little over 5 minutes, so float rounding of the 0.2 s ticks cannot matter.
      act(() => {
        vi.advanceTimersByTime(5 * 60 * 1000 + 1000)
      })
      expect(screen.getByText(bn['test.finished'])).toBeTruthy()

      const [saved] = readHistory()
      expect(saved.durationSec).toBe(300)
      expect(saved.elapsedSec).toBe(300)
    } finally {
      vi.useRealTimers()
    }
  })
})
