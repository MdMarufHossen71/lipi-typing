import { describe, expect, it } from 'vitest'
import { avroConvert } from './avroLayout'
import { avroLessons } from './lessons/avroLessons'

// The simplified converter must reproduce the real Avro engine's output for
// common words (verified in the research report). Complex words like
// 'proyukti' use features the simplified converter does not model, so they are
// intentionally NOT asserted here — see the honesty note in avroLayout.ts.
describe('avroConvert (simplified learning converter)', () => {
  it('converts single consonants', () => {
    expect(avroConvert('k')).toBe('ক')
    expect(avroConvert('g')).toBe('গ')
    expect(avroConvert('T')).toBe('ট')
    expect(avroConvert('N')).toBe('ণ')
  })

  it('uses independent vowels at word start, kar after a consonant', () => {
    expect(avroConvert('a')).toBe('আ')
    expect(avroConvert('ka')).toBe('কা')
    expect(avroConvert('ki')).toBe('কি')
    expect(avroConvert('ku')).toBe('কু')
    expect(avroConvert('ke')).toBe('কে')
  })

  it('matches diphthongs before the single-letter o rule', () => {
    expect(avroConvert('oi')).toBe('ঐ')
    expect(avroConvert('ou')).toBe('ঔ')
    expect(avroConvert('koi')).toBe('কৈ')
    expect(avroConvert('kou')).toBe('কৌ')
    // A plain o after a consonant is still the o-kar.
    expect(avroConvert('kO')).toBe('কো')
    expect(avroConvert('ko')).toBe('কো')
  })

  it('converts verified example words correctly', () => {
    expect(avroConvert('bangla')).toBe('বাংলা')
    expect(avroConvert('amar')).toBe('আমার')
    expect(avroConvert('ami')).toBe('আমি')
    expect(avroConvert('bangladesh')).toBe('বাংলাদেশ')
    expect(avroConvert('shikkha')).toBe('শিক্ষা')
    expect(avroConvert('biggan')).toBe('বিজ্ঞান')
    expect(avroConvert('cinta')).toBe('চিন্তা')
  })

  it('converts the additional verified example words exactly', () => {
    // Each of these is listed in avroExampleWords; the simplified converter
    // must reproduce real Avro output for all of them (verified word by word).
    expect(avroConvert('amader')).toBe('আমাদের')
    expect(avroConvert('amake')).toBe('আমাকে')
    expect(avroConvert('tomake')).toBe('তোমাকে')
    expect(avroConvert('akash')).toBe('আকাশ')
    expect(avroConvert('bidya')).toBe('বিদ্যা')
    expect(avroConvert('Dhaka')).toBe('ঢাকা')
    expect(avroConvert('bangladesher')).toBe('বাংলাদেশের')
    expect(avroConvert('pakhir')).toBe('পাখির')
    expect(avroConvert('hater')).toBe('হাতের')
    expect(avroConvert('bikel')).toBe('বিকেল')
    expect(avroConvert('dupur')).toBe('দুপুর')
    expect(avroConvert('bhalo')).toBe('ভালো')
  })

  it('converts digits to Bangla numerals', () => {
    expect(avroConvert('2024')).toBe('২০২৪')
  })

  it('converts a dot to a dari', () => {
    expect(avroConvert('b.')).toBe('ব।')
  })

  it('forms conjuncts with virama between adjacent consonants', () => {
    expect(avroConvert('nt')).toBe('ন্ত')
    expect(avroConvert('kt')).toBe('ক্ত')
    expect(avroConvert('st')).toBe('স্ত')
  })

  it('passes through spaces and keeps words separate', () => {
    expect(avroConvert('amar sonar bangla')).toBe('আমার সোনার বাংলা')
  })

  it('reproduces every roman example shown in the Avro lessons', () => {
    // Honesty guarantee: the lesson Examples tables imply the on-page practice
    // converter produces these outputs. If this test fails, the lesson would
    // be teaching something the converter does not do.
    for (const lesson of avroLessons) {
      for (const ex of lesson.examples ?? []) {
        if (!/^[a-zA-Z0-9$^:. ]+$/.test(ex.input)) continue // non-roman target rows
        expect(avroConvert(ex.input), `${lesson.id}:${ex.input}`).toBe(ex.output)
      }
    }
  })
})
