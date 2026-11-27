// Target text pools for typing tests and practice.
// Real, meaningful sentences (not lorem ipsum). Bilingual: Bangla + English.
import type { TestLang, TestMode } from '../types'

interface TextPool {
  paragraphs: string[]
  sentences: string[]
  words: string[]
  beginner: string[]
  advanced: string[]
}

export const testTexts: Record<TestLang, TextPool> = {
  bn: {
    paragraphs: [
      'বাংলা ভাষা বাংলাদেশের রাষ্ট্রভাষা। এটি ব্রহ্মদেশ ও ভারতের পশ্চিমবঙ্গেও প্রচলিত। বাংলা লিপি ব্রাহ্মী লিপি থেকে উদ্ভূত। নিয়মিত অনুশীলনে টাইপিং দ্রুত ও নির্ভুল হয়।',
      'শিক্ষা ও প্রযুক্তির উন্নয়নে বাংলা ভাষা গুরুত্বপূর্ণ ভূমিকা পালন করছে। কম্পিউটারে বাংলা লেখার জন্য অভ্র ফনেটিক ও বিজয় কীবোর্ড জনপ্রিয়। সঠিক পদ্ধতি শিখলে টাইপিং সহজ হয়।',
      'প্রতিদিন অল্প সময় অনুশীলন করলেও টাইপিংয়ে দক্ষতা বাড়ে। সঠিক আঙুল বিন্যাস ও আসন ভঙ্গি মেনে চললে দ্রুত গতি অর্জন সম্ভব। ধৈর্য ধরে অনুশীলনই সফলতার চাবিকাঠি।',
      'বাংলাদেশের জাতীয় কীবোর্ড লেআউট হিসেবে বিজয় স্বীকৃত। বাংলাদেশ কম্পিউটার কাউন্সিল কর্তৃক এটি জাতীয় লেআউট হিসেবে ঘোষিত। ইউনিকোড মোডে টাইপ করলে সব ডিভাইসে সঠিকভাবে দেখা যায়।',
      'ভাষা কেবল যোগাযোগের মাধ্যম নয়, এটি একটি জাতির সংস্কৃতি ও চিন্তার বাহক। মাতৃভাষায় চিন্তা করা ও লেখা মানুষের সৃজনশীলতা বাড়ায়। তাই মাতৃভাষার চর্চা অপরিহার্য।',
      'বই পড়া জ্ঞানের সবচেয়ে সহজ পথ। একটি ভালো বই পাঠককে অচেনা জগতের দরজা খুলে দেয়। প্রতিদিন অল্প করে হলেও বই পড়ার অভ্যাস গড়ে তুলুন, জ্ঞানের ভাণ্ডার ক্রমাগত বাড়বে।',
      'বর্ষা এলে প্রকৃতি যেন নতুন জীবন পায়। আকাশ থেকে ঝরে পড়ে বৃষ্টির ফোঁটা, নদীতে বাড়ে পানি, গ্রামের পথঘর ভিজে যায়। বর্ষার সৌন্দর্য উপভোগ করতে চাইলে জানালার পাশে বসে গরম চা খান।',
      'কম্পিউটার আজ আমাদের দৈনন্দিন জীবনের অবিচ্ছেদ্য অংশ। অফিস, শিক্ষা, চিকিৎসা কিংবা বিনোদন — সব ক্ষেত্রেই কম্পিউটার ব্যবহার হচ্ছে। দ্রুত ও নির্ভুল টাইপিং শিখলে কাজের গতি ও মান দুটোই বাড়ে।',
    ],
    sentences: [
      'আমি বাংলা ভাষায় কথা বলি।',
      'বাংলাদেশের রাজধানী ঢাকা।',
      'শিক্ষা জাতির মেরুদণ্ড।',
      'প্রযুক্তি জীবনকে সহজ করে।',
      'বই পড়া একটি ভালো অভ্যাস।',
      'নিয়মিত অনুশীলনই দক্ষতার চাবি।',
      'সততা সর্বোত্তম নীতি।',
      'সময়ের এক ফোঁড় সেই রাখে দশ।',
      'বর্ষা মানেই প্রকৃতির নতুন জীবন।',
      'কম্পিউটার শিক্ষা আজ অপরিহার্য।',
    ],
    words: [
      'বাংলা', 'দেশ', 'শিক্ষা', 'প্রযুক্তি', 'কম্পিউটার', 'কীবোর্ড', 'অনুশীলন',
      'দক্ষতা', 'ভাষা', 'লিপি', 'গতি', 'নির্ভুল', 'আঙুল', 'আসন', 'প্রাথমিক',
      'উন্নত', 'অভ্র', 'বিজয়', 'ইউনিকোড', 'অক্ষর', 'শব্দ', 'বাক্য',
    ],
    beginner: ['বাবা বলেন কথা।', 'মা ভাত রাঁধেন।', 'আমি বই পড়ি।', 'তুমি কেমন আছো?'],
    advanced: [
      'রাষ্ট্রভাষা আন্দোলনের মধ্য দিয়ে বাংলা ভাষা তার নিজস্ব মর্যাদা পুনরুদ্ধার করে; এটি কেবল একটি ভাষিক অধিকারের সংগ্রাম ছিল না, বরং একটি জাতির আত্মপরিচয়ের সংগ্রাম ছিল।',
      'প্রযুক্তির দ্রুত উন্নয়নের এই যুগে মাতৃভাষায় ডিজিটাল উপস্থিতি নিশ্চিত করা অত্যন্ত জরুরি; ইউনিকোড ও মুক্ত সফটওয়্যার এই লক্ষ্যে গুরুত্বপূর্ণ ভূমিকা পালন করে।',
    ],
  },
  en: {
    paragraphs: [
      'The quick brown fox jumps over the lazy dog. Touch typing is a valuable skill that improves with regular practice. Keep your fingers on the home row and look at the screen, not the keyboard.',
      'Typing speed is measured in words per minute, but accuracy matters just as much. A good typist balances both speed and precision. Practice a little every day and you will see steady improvement over time.',
      'Learning to type properly begins with correct finger placement. The home row keys are the foundation. Once your fingers know where to go without looking, your speed will increase naturally.',
      'Bangla and English are the two main languages taught on this platform. Start with short sessions, focus on accuracy first, then build speed. Consistency is far more important than long, tiring sessions.',
      'Keyboard shortcuts can save you hours every week. Learn a few at a time: copy, paste, undo and switching between windows. When shortcuts become muscle memory, your hands barely leave the keys.',
      'Reading a good book opens the door to an unfamiliar world. Even twenty minutes a day builds vocabulary, focus and imagination. Choose something you genuinely enjoy, and the habit will sustain itself.',
      'Unicode makes it possible for Bangla text to appear correctly on every device and operating system. Always prefer Unicode over legacy font encodings, because legacy files break when fonts are missing.',
    ],
    sentences: [
      'Practice makes perfect.',
      'Knowledge is power.',
      'Time and tide wait for none.',
      'A journey of a thousand miles begins with a single step.',
      'Reading improves your vocabulary.',
      'Consistency beats intensity.',
      'Slow is smooth, and smooth is fast.',
      'Stay calm and keep typing.',
      'Short daily sessions beat long rare ones.',
      'Unicode text works everywhere, on every device.',
    ],
    words: [
      'type', 'keyboard', 'practice', 'accuracy', 'speed', 'language', 'finger',
      'home', 'row', 'screen', 'letter', 'word', 'sentence', 'paragraph',
      'skill', 'focus', 'learn', 'develop', 'improve', 'steady',
    ],
    beginner: ['The cat sat on the mat.', 'I can read a book.', 'She has a red pen.', 'We play in the park.'],
    advanced: [
      'Although typing quickly is impressive, the hallmark of a truly skilled typist is the ability to maintain high accuracy under pressure; this balance only emerges after hundreds of hours of deliberate, focused practice.',
      'The evolution of keyboard layouts—from early typewriters designed to prevent mechanical jams, to modern ergonomic designs—reflects a constant tension between historical inertia and the pursuit of efficiency.',
    ],
  },
}

/** Build a target text long enough for a given duration. */
export function pickText(lang: TestLang, mode: TestMode, durationSec: number): string {
  const pool = testTexts[lang]
  const minutes = Math.max(durationSec / 60, 1)
  // Rough chars-per-minute target (Bangla is slower to type than English).
  const cpmTarget = lang === 'bn' ? 220 : 300
  const targetChars = Math.round(minutes * cpmTarget) + 60

  if (mode === 'word') {
    const out: string[] = []
    let i = 0
    while (out.join(' ').length < targetChars) {
      out.push(pool.words[i % pool.words.length])
      i++
    }
    return out.join(' ')
  }

  if (mode === 'sentence') {
    const out: string[] = []
    let i = 0
    while (out.join(' ').length < targetChars) {
      out.push(pool.sentences[i % pool.sentences.length])
      i++
    }
    return out.join(' ')
  }

  if (mode === 'beginner') {
    return pool.beginner.join(' ')
  }

  if (mode === 'advanced') {
    const src = pool.advanced
    const out: string[] = []
    let i = 0
    while (out.join(' ').length < targetChars) {
      out.push(src[i % src.length])
      i++
    }
    return out.join(' ')
  }

  // 'timed' and 'fixed' — use paragraphs, repeated to reach target length.
  const out: string[] = []
  let i = 0
  while (out.join(' ').length < targetChars) {
    out.push(pool.paragraphs[i % pool.paragraphs.length])
    i++
  }
  return out.join(' ')
}

/** A fresh paragraph different from the current one (for "another paragraph"). */
export function anotherParagraph(lang: TestLang, current: string): string {
  const pool = testTexts[lang]
  const candidates = pool.paragraphs.filter((p) => p !== current)
  const arr = candidates.length ? candidates : pool.paragraphs
  return arr[Math.floor(Math.random() * arr.length)]
}
