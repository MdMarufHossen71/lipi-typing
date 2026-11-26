// Avro Phonetic reference data + a SIMPLIFIED learning converter.
//
// Sources (see References page):
//  - OmicronLab Avro Keyboard (MPL-1.1): https://github.com/OmicronLab/Avro-Keyboard
//  - jsAvroPhonetic / npm avro-phonetic v1.1.5 (MPL-1.1): the phonetic engine rules.
//  - Mapping below extracted/verified from the OmicronLab-derived phonetic scheme.
//
// IMPORTANT / HONESTY NOTE:
//  `avroConvert()` is a *simplified, longest-match, context-aware* approximation
//  built for LEARNING. It correctly handles common words (verified against the
//  real engine's output) but does NOT implement the full 289-rule Avro engine.
//  For complex words (silent letters, অ্য diphthong, য় vs য disambiguation) it
//  may differ. For production phonetic typing, install Avro Keyboard:
//  https://omicronlab.com/avro-keyboard.html

export interface Bilingual {
  bn: string
  en: string
}

export interface AvroConsonant {
  roman: string
  bangla: string
  note?: Bilingual
}

export interface AvroVowel {
  roman: string
  independent: string
  kar: string
}

export interface AvroExampleWord {
  roman: string
  bangla: string
  note?: Bilingual
}

// --- Reference tables (verified from the OmicronLab phonetic scheme) ---

export const avroConsonants: AvroConsonant[] = [
  { roman: 'k', bangla: 'ক' },
  { roman: 'kh', bangla: 'খ' },
  { roman: 'g', bangla: 'গ' },
  { roman: 'gh', bangla: 'ঘ' },
  { roman: 'Ng', bangla: 'ঙ', note: { bn: 'ঞ্জ-এর ঞ এর মতো (ঙ)', en: 'like ঙ (velar nasal)' } },
  { roman: 'ng', bangla: 'ং', note: { bn: 'anusvara (ং)', en: 'anusvara (ং)' } },
  { roman: 'c', bangla: 'চ', note: { bn: 'c = চ (ch নয়)', en: 'c = চ (not ch)' } },
  { roman: 'ch', bangla: 'ছ', note: { bn: 'ch = ছ', en: 'ch = ছ' } },
  { roman: 'j', bangla: 'জ' },
  { roman: 'z', bangla: 'য' },
  { roman: 'jh', bangla: 'ঝ' },
  { roman: 'T', bangla: 'ট', note: { bn: 'বড় T = ট (ত নয়)', en: 'capital T = ট (not ত)' } },
  { roman: 'Th', bangla: 'ঠ' },
  { roman: 'D', bangla: 'ড', note: { bn: 'বড় D = ড (দ নয়)', en: 'capital D = ড (not দ)' } },
  { roman: 'Dh', bangla: 'ঢ' },
  { roman: 'N', bangla: 'ণ', note: { bn: 'বড় N = ণ (ন নয়)', en: 'capital N = ণ (not ন)' } },
  { roman: 't', bangla: 'ত' },
  { roman: 'th', bangla: 'থ' },
  { roman: 'd', bangla: 'দ' },
  { roman: 'dh', bangla: 'ধ' },
  { roman: 'n', bangla: 'ন' },
  { roman: 'p', bangla: 'প' },
  { roman: 'ph', bangla: 'ফ', note: { bn: 'f-ও ফ দেয়', en: 'f also gives ফ' } },
  { roman: 'b', bangla: 'ব' },
  { roman: 'bh', bangla: 'ভ' },
  { roman: 'm', bangla: 'ম' },
  { roman: 'r', bangla: 'র' },
  { roman: 'R', bangla: 'ড়', note: { bn: 'বড় R = ড়', en: 'capital R = ড়' } },
  { roman: 'Rh', bangla: 'ঢ়' },
  { roman: 'l', bangla: 'ল' },
  { roman: 'sh', bangla: 'শ' },
  { roman: 'S', bangla: 'শ', note: { bn: 'বড় S-ও শ', en: 'capital S also শ' } },
  { roman: 'Sh', bangla: 'ষ', note: { bn: 'Sh = ষ (শ নয়)', en: 'Sh = ষ (not শ)' } },
  { roman: 's', bangla: 'স' },
  { roman: 'h', bangla: 'হ' },
  { roman: 'y', bangla: 'য়', note: { bn: 'ব্যঞ্জনের পরে ্য (য-ফলা)', en: 'after a consonant: ্য (ya-phala)' } },
  { roman: 'w', bangla: 'ও' },
  { roman: 'q', bangla: 'ক' },
  { roman: 'x', bangla: 'ক্স' },
  { roman: 'gg', bangla: 'জ্ঞ', note: { bn: 'gg = জ্ঞ (বিজ্ঞান)', en: 'gg = জ্ঞ (as in বিজ্ঞান)' } },
  { roman: 'kkh', bangla: 'ক্ষ', note: { bn: 'kkh/kx = ক্ষ (শিক্ষা)', en: 'kkh/kx = ক্ষ (as in শিক্ষা)' } },
]

export const avroVowels: AvroVowel[] = [
  { roman: 'a', independent: 'আ', kar: 'া' },
  { roman: 'i', independent: 'ই', kar: 'ি' },
  { roman: 'I', independent: 'ঈ', kar: 'ী' },
  { roman: 'ee', independent: 'ঈ', kar: 'ী' },
  { roman: 'u', independent: 'উ', kar: 'ু' },
  { roman: 'oo', independent: 'উ', kar: 'ু' },
  { roman: 'U', independent: 'ঊ', kar: 'ূ' },
  { roman: 'e', independent: 'এ', kar: 'ে' },
  { roman: 'oi', independent: 'ঐ', kar: 'ৈ' },
  { roman: 'ou', independent: 'ঔ', kar: 'ৌ' },
  { roman: 'O', independent: 'ও', kar: 'ো' },
  { roman: 'rri', independent: 'ঋ', kar: 'ৃ' },
]

export const avroSpecials: { roman: string; bangla: string; note?: Bilingual }[] = [
  { roman: '0-9', bangla: '০-৯', note: { bn: 'সংখ্যা', en: 'digits' } },
  { roman: '.', bangla: '।', note: { bn: 'দাঁড়ি (ডট → দাঁড়ি)', en: 'dari (dot → dari)' } },
  { roman: '..', bangla: '।।', note: { bn: 'দুটি দাঁড়ি', en: 'double dari' } },
  { roman: '$', bangla: '৳', note: { bn: 'টাকা চিহ্ন', en: 'taka sign' } },
  { roman: ':', bangla: 'ঃ', note: { bn: 'বিসর্গ', en: 'visarga' } },
  { roman: '^', bangla: 'ঁ', note: { bn: 'চন্দ্রবিন্দু', en: 'chandrabindu' } },
  { roman: 'oZ / aZ', bangla: 'অ্য / অ্যা', note: { bn: 'diphthong (অ্য)', en: 'diphthong (অ্য)' } },
]

export const avroExampleWords: AvroExampleWord[] = [
  { roman: 'bangla', bangla: 'বাংলা', note: { bn: 'ng → ং', en: 'ng → ং' } },
  { roman: 'amar', bangla: 'আমার' },
  { roman: 'ami', bangla: 'আমি' },
  { roman: 'bangladesh', bangla: 'বাংলাদেশ' },
  { roman: 'shikkha', bangla: 'শিক্ষা', note: { bn: 'kkh → ক্ষ', en: 'kkh → ক্ষ' } },
  { roman: 'biggan', bangla: 'বিজ্ঞান', note: { bn: 'gg → জ্ঞ', en: 'gg → জ্ঞ' } },
  { roman: 'cinta', bangla: 'চিন্তা', note: { bn: 'c → চ (chinta দিলে ছিন্তা)', en: 'c → চ (chinta gives ছিন্তা)' } },
  {
    roman: 'proyukti',
    bangla: 'প্রয়ুক্তি',
    note: {
      bn: 'পূর্ণ Avro ইঞ্জিনে য়-যুক্ত; সরল কনভার্টারে ভিন্ন হতে পারে।',
      en: 'Full Avro engine uses য়; the simplified converter may differ.',
    },
  },
]

// --- Simplified learning converter (see honesty note at top of file) ---

const consMap: { p: string; out: string }[] = avroConsonants
  .map((c) => ({ p: c.roman, out: c.bangla }))
  .sort((a, b) => b.p.length - a.p.length)

const vowelMap: { p: string; indep: string; kar: string }[] = avroVowels
  .map((v) => ({ p: v.roman, indep: v.independent, kar: v.kar }))
  .sort((a, b) => b.p.length - a.p.length)

const digitMap: Record<string, string> = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
}

const specialMap: { p: string; out: string }[] = [
  { p: '..', out: '।।' },
  { p: '.', out: '।' },
  { p: '$', out: '৳' },
  { p: ':', out: 'ঃ' },
  { p: '^', out: 'ঁ' },
]

const SPACE_RE = /[\s!?;,"'()]/

/** Simplified Avro Phonetic converter for learning/practice. */
export function avroConvert(input: string): string {
  let out = ''
  let lastCons = false
  let i = 0
  const s = input
  while (i < s.length) {
    const ch = s[i]

    if (ch >= '0' && ch <= '9') {
      out += digitMap[ch]
      lastCons = false
      i++
      continue
    }

    const sp = specialMap.find((x) => s.startsWith(x.p, i))
    if (sp) {
      out += sp.out
      lastCons = false
      i += sp.p.length
      continue
    }

    // 'y' / 'Y' special (ya-phala vs য়)
    if (ch === 'y' || ch === 'Y') {
      out += lastCons ? '্য' : 'য়'
      lastCons = true
      i++
      continue
    }

    // 'o' lowercase (not in vowel table to control its dual behaviour)
    if (ch === 'o') {
      out += lastCons ? 'ো' : 'ও'
      lastCons = false
      i++
      continue
    }

    // anusvara / velar nasal — handled specially because ং is NOT a
    // conjunct-forming base (it must not trigger a virama before the next consonant).
    if (s.startsWith('ng', i)) {
      out += 'ং'
      lastCons = false
      i += 2
      continue
    }
    if (s.startsWith('Ng', i)) {
      out += 'ঙ'
      lastCons = true
      i += 2
      continue
    }

    const v = vowelMap.find((x) => s.startsWith(x.p, i))
    if (v) {
      out += lastCons ? v.kar : v.indep
      lastCons = false
      i += v.p.length
      continue
    }

    const c = consMap.find((x) => s.startsWith(x.p, i))
    if (c) {
      if (lastCons) out += '্' // virama between adjacent consonants -> conjunct
      out += c.out
      lastCons = true
      i += c.p.length
      continue
    }

    // passthrough (space, punctuation, other letters)
    out += ch
    if (SPACE_RE.test(ch)) lastCons = false
    i++
  }
  return out
}
