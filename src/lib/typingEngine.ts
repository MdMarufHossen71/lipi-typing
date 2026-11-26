// Typing test engine — grapheme-aware so Bangla conjuncts (যুক্তাক্ষর) and
// vowel signs (কার/মাত্রা) are counted as single user-perceived characters.
//
// Scoring model (transparent & consistent):
//  - Characters are compared per grapheme cluster using Intl.Segmenter when
//    available, with a code-point fallback for older browsers.
//  - correct  = typed graphemes that match the target grapheme at the same index.
//  - incorrect = typed graphemes that don't match (mistyped) OR exceed the target
//    length (extra characters).
//  - accuracy = correct / (correct + incorrect) * 100  (100 when nothing typed).
//  - CPM (net) = correct / minutes.        WPM = correct / 5 / minutes.
//  - For Bangla, CPM is the primary speed metric (see "Bangla CPM note" in UI).

export type CharState = 'pending' | 'correct' | 'incorrect' | 'extra'

export interface CharResult {
  target: string
  typed: string
  state: CharState
}

export interface TypingStats {
  totalTyped: number
  correct: number
  incorrect: number
  accuracy: number
  cpm: number
  wpm: number
  elapsedSec: number
}

let segmenter: Intl.Segmenter | null | undefined = undefined

function getSegmenter(): Intl.Segmenter | null {
  if (segmenter !== undefined) return segmenter
  if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
    segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
  } else {
    segmenter = null
  }
  return segmenter
}

/** Split a string into user-perceived characters (grapheme clusters). */
export function segment(str: string): string[] {
  const seg = getSegmenter()
  if (seg) {
    const out: string[] = []
    for (const { segment } of seg.segment(str)) out.push(segment)
    return out
  }
  return Array.from(str)
}

/** Compare target and input grapheme-by-grapheme for live highlighting. */
export function compareChars(target: string, input: string): CharResult[] {
  const tg = segment(target)
  const ig = segment(input)
  const len = Math.max(tg.length, ig.length)
  const res: CharResult[] = []
  for (let i = 0; i < len; i++) {
    const t = tg[i] ?? ''
    const typed = ig[i] ?? ''
    let state: CharState = 'pending'
    if (i < ig.length) {
      if (i >= tg.length) state = 'extra'
      else state = typed === t ? 'correct' : 'incorrect'
    }
    res.push({ target: t, typed, state })
  }
  return res
}

/** Compute final stats from target, input and elapsed seconds. */
export function computeStats(target: string, input: string, elapsedSec: number): TypingStats {
  const cmp = compareChars(target, input)
  let correct = 0
  let wrong = 0
  for (const c of cmp) {
    if (c.state === 'correct') correct++
    else if (c.state === 'incorrect' || c.state === 'extra') wrong++
  }
  const totalTyped = correct + wrong
  const accuracy = totalTyped === 0 ? 100 : (correct / totalTyped) * 100
  const mins = elapsedSec > 0 ? elapsedSec / 60 : 0
  const cpm = mins > 0 ? Math.round(correct / mins) : 0
  const wpm = mins > 0 ? Math.round(correct / 5 / mins) : 0
  return {
    totalTyped,
    correct,
    incorrect: wrong,
    accuracy: Math.round(accuracy * 100) / 100,
    cpm,
    wpm,
    elapsedSec,
  }
}

/** A short human performance label based on net CPM. */
export function performanceLevel(cpm: number): 'excellent' | 'good' | 'average' | 'needsWork' {
  if (cpm >= 350) return 'excellent'
  if (cpm >= 250) return 'good'
  if (cpm >= 150) return 'average'
  return 'needsWork'
}
