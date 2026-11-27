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
  // Config options render as a radiogroup; action buttons stay plain buttons.
  return screen.getByRole('radio', { name: bn[key] })
}

function btn(key: string) {
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
    expect(pill('test.mAvro').getAttribute('aria-checked')).toBe('true')
    expect(pill('test.mBijoy').getAttribute('aria-checked')).toBe('false')
    expect(screen.queryByRole('button', { name: bn['test.mEnglish'] })).toBeNull()
  })

  it('offers only English QWERTY for an English test', () => {
    renderTest()
    fireEvent.click(pill('common.english'))

    expect(pill('test.mEnglish').getAttribute('aria-checked')).toBe('true')
    expect(screen.queryByRole('button', { name: bn['test.mAvro'] })).toBeNull()
    expect(screen.queryByRole('button', { name: bn['test.mBijoy'] })).toBeNull()
  })

  it('keeps a chosen Bangla method while the language stays Bangla', () => {
    renderTest()
    fireEvent.click(pill('test.mBijoy'))

    expect(pill('test.mBijoy').getAttribute('aria-checked')).toBe('true')
    expect(pill('test.mAvro').getAttribute('aria-checked')).toBe('false')
  })

  it('falls back to Avro when switching back from English to Bangla', () => {
    renderTest()
    fireEvent.click(pill('common.english'))
    fireEvent.click(pill('common.bangla'))

    expect(pill('test.mAvro').getAttribute('aria-checked')).toBe('true')
    expect(pill('test.mBijoy').getAttribute('aria-checked')).toBe('false')
  })

  it('records a consistent language and method for an English test', () => {
    renderTest()
    fireEvent.click(pill('common.english'))
    fireEvent.click(btn('test.start'))
    fireEvent.click(btn('common.finish'))

    const [saved] = readHistory()
    expect(saved.lang).toBe('en')
    expect(saved.method).toBe('english')
  })

  it('records the chosen Bangla method', () => {
    renderTest()
    fireEvent.click(pill('test.mBijoy'))
    fireEvent.click(btn('test.start'))
    fireEvent.click(btn('common.finish'))

    const [saved] = readHistory()
    expect(saved.lang).toBe('bn')
    expect(saved.method).toBe('bijoy')
  })

  it('runs a custom-duration test for the chosen number of minutes', () => {
    vi.useFakeTimers()
    try {
      renderTest()
      fireEvent.click(pill('test.dCustom'))
      fireEvent.click(btn('test.start'))

      // The custom length defaults to 5 minutes, so an early tick must not end it.
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(btn('common.finish')).toBeTruthy()
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

describe('TypingTest timing and saving', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('derives elapsed time from the wall clock, surviving skipped interval ticks', () => {
    // Fake Date too, so a suspended/throttled tab can be simulated by jumping
    // the clock without firing interval callbacks.
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'Date'] })
    renderTest()
    fireEvent.click(btn('test.start'))

    // One second passes normally (ticks fire).
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    // The tab is then throttled: the wall clock moves ~59s but no ticks fire.
    act(() => {
      vi.setSystemTime(new Date(Date.now() + 59_000))
    })
    // A single tick fires on wake-up and must see the real elapsed time.
    act(() => {
      vi.advanceTimersByTime(200)
    })

    // The 60 s test must have finished with ~60 s elapsed — not ~1.2 s of
    // accumulated 0.2 s ticks.
    expect(screen.getByText(bn['test.finished'])).toBeTruthy()
    const [saved] = readHistory()
    expect(saved.elapsedSec).toBe(60)
    expect(saved.durationSec).toBe(60)
  })

  it('never saves a result twice when the timer expires around a manual finish', () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'Date'] })
    renderTest()
    fireEvent.click(btn('test.start'))

    // Nearly the whole duration passes, then the user clicks Finish manually
    // right as a timer tick would also expire the test.
    act(() => {
      vi.advanceTimersByTime(59_900)
    })
    fireEvent.click(btn('common.finish'))
    // A late interval tick lands after the manual finish.
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(readHistory().length).toBe(1)
    expect(screen.getByText(bn['test.finished'])).toBeTruthy()
  })

  it('builds duration-scaled text for a timed "Another" test', () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'Date'] })
    renderTest()
    fireEvent.click(btn('test.start'))
    // "Another" lives on the finished screen.
    fireEvent.click(btn('common.finish'))
    expect(screen.getByText(bn['test.finished'])).toBeTruthy()
    fireEvent.click(btn('test.another'))

    // 1-minute timed Bangla: pickText targets ~220 CPM + slack (>= 280 chars).
    // One paragraph alone is ~150 chars, so the old single-paragraph behaviour
    // would end this test in seconds.
    const targetText = screen.getByLabelText(bn['test.target'])
    expect((targetText.textContent ?? '').length).toBeGreaterThanOrEqual(280)

    // And the fresh run must be active again, not instantly finished.
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(screen.queryByText(bn['test.finished'])).toBeNull()
    expect(btn('common.finish')).toBeTruthy()
  })
})
