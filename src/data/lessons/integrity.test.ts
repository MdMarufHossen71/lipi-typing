import { describe, expect, it } from 'vitest'
import { bn } from '../../i18n/bn'
import { en } from '../../i18n/en'
import { avroLessons } from './avroLessons'
import { bijoyLessons } from './bijoyLessons'
import { englishLessons } from './englishLessons'
import type { Lesson } from './types'

// The two UI languages must cover exactly the same keys, otherwise a string
// silently falls back to Bangla when the interface is set to English.
describe('i18n dictionary parity', () => {
  it('bn and en define exactly the same keys', () => {
    const bnKeys = Object.keys(bn).sort()
    const enKeys = Object.keys(en).sort()
    expect(enKeys).toEqual(bnKeys)
  })

  it('no dictionary value is empty', () => {
    for (const [dict, name] of [[bn, 'bn'], [en, 'en']] as const) {
      for (const [key, value] of Object.entries(dict)) {
        expect(value.trim().length, `${name}:${key}`).toBeGreaterThan(0)
      }
    }
  })
})

// Quiz questions are user-facing, so every question must be structurally
// answerable: at least two options and a valid answer index.
describe('lesson quiz integrity', () => {
  const all: [string, Lesson[]][] = [
    ['avro', avroLessons],
    ['bijoy', bijoyLessons],
    ['english', englishLessons],
  ]

  it('every quiz question is answerable', () => {
    for (const [track, lessons] of all) {
      for (const lesson of lessons) {
        for (const [qi, q] of (lesson.quiz ?? []).entries()) {
          expect(q.options.length, `${track}/${lesson.id}/quiz[${qi}] options`).toBeGreaterThanOrEqual(2)
          expect(q.answer, `${track}/${lesson.id}/quiz[${qi}] answer`).toBeGreaterThanOrEqual(0)
          expect(q.answer, `${track}/${lesson.id}/quiz[${qi}] answer`).toBeLessThan(q.options.length)
          for (const [oi, opt] of q.options.entries()) {
            expect(opt.bn.trim().length, `${track}/${lesson.id}/quiz[${qi}]/opt[${oi}] bn`).toBeGreaterThan(0)
            expect(opt.en.trim().length, `${track}/${lesson.id}/quiz[${qi}]/opt[${oi}] en`).toBeGreaterThan(0)
          }
        }
      }
    }
  })

  it('every lesson carries at least one quiz', () => {
    for (const [track, lessons] of all) {
      for (const lesson of lessons) {
        expect((lesson.quiz ?? []).length, `${track}/${lesson.id}`).toBeGreaterThan(0)
      }
    }
  })

  it('lesson ids are unique across all tracks', () => {
    const ids = [...avroLessons, ...bijoyLessons, ...englishLessons].map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
