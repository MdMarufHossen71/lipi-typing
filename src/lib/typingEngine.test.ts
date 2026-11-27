import { describe, expect, it } from 'vitest'
import { compareChars, computeStats, performanceLevel, segment } from './typingEngine'

describe('segment', () => {
  it('splits Latin text into single code units', () => {
    expect(segment('hello')).toEqual(['h', 'e', 'l', 'l', 'o'])
  })

  it('treats a Bangla conjunct + vowel sign as one grapheme each', () => {
    // Intl.Segmenter groups ব + া + ং into one grapheme (বাং), then লা -> 2
    expect(segment('বাংলা')).toEqual(['বাং', 'লা'])
  })

  it('handles শিক্ষা (ক্ষ conjunct) correctly', () => {
    // শি (শ+ি) and ক্ষা (ক্ষ+া) -> 2 graphemes
    expect(segment('শিক্ষা')).toEqual(['শি', 'ক্ষা'])
  })

  it('normalises decomposed and precomposed nukta forms to the same grapheme', () => {
    // য় can be encoded precomposed (U+09DF) or decomposed (য U+09AF + nukta U+09BC).
    const decomposed = 'য\u09BC'
    const precomposed = '\u09DF'
    expect(decomposed).not.toBe(precomposed) // different encodings in…
    expect(segment(decomposed)).toEqual(segment(precomposed)) // …same grapheme
  })

  it('scores decomposed target vs precomposed input as correct', () => {
    // য় exists as a precomposed code point (U+09DF) and as a decomposed
    // sequence (য U+09AF + nukta U+09BC). Some IMEs emit the precomposed
    // form while the pools store the decomposed one; both must score equal.
    const target = '\u09AF\u09BC' // decomposed য়
    const input = '\u09DF' // precomposed য়
    const cmp = compareChars(target, input)
    expect(cmp.filter((c) => c.state === 'incorrect')).toHaveLength(0)
    expect(cmp.filter((c) => c.state === 'correct')).toHaveLength(1)
  })
})

describe('compareChars', () => {
  it('marks all correct when input equals target', () => {
    const cmp = compareChars('hello', 'hello')
    expect(cmp.every((c) => c.state === 'correct')).toBe(true)
  })

  it('marks a single mistyped character as incorrect', () => {
    const cmp = compareChars('hello', 'hallo')
    expect(cmp[1].state).toBe('incorrect')
    expect(cmp.filter((c) => c.state === 'correct').length).toBe(4)
  })

  it('marks extra characters beyond target as extra', () => {
    const cmp = compareChars('cat', 'cats')
    expect(cmp[3].state).toBe('extra')
  })

  it('leaves un-typed target characters as pending', () => {
    const cmp = compareChars('hello', 'he')
    expect(cmp[2].state).toBe('pending')
    expect(cmp[4].state).toBe('pending')
  })
})

describe('computeStats', () => {
  it('returns 100% accuracy and 0 speed when nothing is typed', () => {
    const s = computeStats('hello', '', 60)
    expect(s.totalTyped).toBe(0)
    expect(s.accuracy).toBe(100)
    expect(s.cpm).toBe(0)
    expect(s.wpm).toBe(0)
  })

  it('computes full-correct stats', () => {
    const s = computeStats('hello world', 'hello world', 60)
    expect(s.correct).toBe(11)
    expect(s.incorrect).toBe(0)
    expect(s.accuracy).toBe(100)
    expect(s.cpm).toBe(11)
    expect(s.wpm).toBe(2)
  })

  it('counts a mistyped character against accuracy', () => {
    const s = computeStats('hello', 'hallo', 60)
    expect(s.correct).toBe(4)
    expect(s.incorrect).toBe(1)
    expect(s.accuracy).toBe(80)
  })

  it('scales CPM correctly for a 30-second test', () => {
    const target = 'a'.repeat(150)
    const s = computeStats(target, target, 30)
    expect(s.cpm).toBe(300)
    expect(s.wpm).toBe(60)
  })

  it('scales CPM correctly for a 60-second test', () => {
    const target = 'a'.repeat(300)
    const s = computeStats(target, target, 60)
    expect(s.cpm).toBe(300)
    expect(s.wpm).toBe(60)
  })

  it('counts extra characters as incorrect', () => {
    const s = computeStats('cat', 'cats', 60)
    expect(s.correct).toBe(3)
    expect(s.incorrect).toBe(1)
    expect(s.accuracy).toBe(75)
  })

  it('counts Bangla graphemes (not code units) for accuracy', () => {
    const s = computeStats('বাংলা', 'বাংলা', 60)
    expect(s.correct).toBe(2)
    expect(s.incorrect).toBe(0)
    expect(s.accuracy).toBe(100)
    expect(s.cpm).toBe(2)
  })

  it('handles a zero-second edge case without NaN', () => {
    const s = computeStats('hello', 'hello', 0)
    expect(Number.isNaN(s.cpm)).toBe(false)
    expect(s.cpm).toBe(0)
  })
})

describe('performanceLevel', () => {
  it('returns needsWork below 150 cpm', () => {
    expect(performanceLevel(100)).toBe('needsWork')
  })
  it('returns average at 150-249 cpm', () => {
    expect(performanceLevel(200)).toBe('average')
  })
  it('returns good at 250-349 cpm', () => {
    expect(performanceLevel(300)).toBe('good')
  })
  it('returns excellent at 350+ cpm', () => {
    expect(performanceLevel(400)).toBe('excellent')
  })
})
