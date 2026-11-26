import { describe, expect, it } from 'vitest'
import { avroConvert } from './avroLayout'

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

  it('converts verified example words correctly', () => {
    expect(avroConvert('bangla')).toBe('বাংলা')
    expect(avroConvert('amar')).toBe('আমার')
    expect(avroConvert('ami')).toBe('আমি')
    expect(avroConvert('bangladesh')).toBe('বাংলাদেশ')
    expect(avroConvert('shikkha')).toBe('শিক্ষা')
    expect(avroConvert('biggan')).toBe('বিজ্ঞান')
    expect(avroConvert('cinta')).toBe('চিন্তা')
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
})
