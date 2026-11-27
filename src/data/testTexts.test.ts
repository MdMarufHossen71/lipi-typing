import { describe, expect, it } from 'vitest'
import { pickText } from './testTexts'
import { testTexts } from './testTexts'

// pickText now starts each cycle at a random pool index — repeated identical
// openers were the most common user complaint. These tests pin the variety
// guarantee and the length scaling.

describe('pickText variety and scaling', () => {
  it('opens with different paragraphs across repeated timed picks', () => {
    const openers = new Set<string>()
    for (let i = 0; i < 20; i++) {
      const text = pickText('bn', 'timed', 60)
      openers.add(text.slice(0, 12))
    }
    // With 13 paragraphs, all-20-identical is astronomically unlikely.
    expect(openers.size).toBeGreaterThanOrEqual(5)
  })

  it('still produces enough text for the requested duration', () => {
    // 5-minute Bangla: ~220 CPM target + slack.
    const text = pickText('bn', 'timed', 300)
    expect(text.length).toBeGreaterThanOrEqual(1100)
  })

  it('scales beginner drills with the duration instead of a fixed short target', () => {
    const short = pickText('en', 'beginner', 60)
    const long = pickText('en', 'beginner', 300)
    // Old behaviour: always the same ~90-character join regardless of duration.
    expect(long.length).toBeGreaterThan(short.length)
    expect(long.length).toBeGreaterThanOrEqual(500)
  })

  it('uses every pool item across many picks (full rotation)', () => {
    const bnParagraphCount = testTexts.bn.paragraphs.length
    const seen = new Set<string>()
    for (let i = 0; i < bnParagraphCount * 8; i++) {
      const text = pickText('bn', 'fixed', 60)
      // Track which pool paragraphs appear as the opener.
      for (const p of testTexts.bn.paragraphs) {
        if (text.startsWith(p.slice(0, 20))) seen.add(p)
      }
    }
    expect(seen.size).toBe(bnParagraphCount)
  })

  it('never returns an empty target', () => {
    for (const mode of ['timed', 'fixed', 'word', 'sentence', 'beginner', 'advanced'] as const) {
      expect(pickText('bn', mode, 60).length).toBeGreaterThan(0)
      expect(pickText('en', mode, 60).length).toBeGreaterThan(0)
    }
  })
})
