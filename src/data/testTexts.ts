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
      'টাইপিং দক্ষতা আজকের যুগে চাকরির বাজারে বিশেষ মূল্য পায়। সরকারি ও বেসরকারি অফিসে প্রতিদিন হাজারো অক্ষর টাইপ করতে হয়। যারা দ্রুত টাইপ করতে পারেন, তারা কম সময়ে বেশি কাজ শেষ করেন।',
      'ইন্টারনেট পৃথিবীকে একটি গ্রামে পরিণত করেছে। মুহূর্তের মধ্যে বার্তা পৌঁছে যায় পৃথিবীর অন্য প্রান্তে। তবু মাতৃভাষায় লেখার আনন্দ অনন্য; নিজের ভাষায় ভাবতে পারাই সবচেয়ে বড় ক্ষমতা।',
      'সকালবেলার আলো ঢুকে পড়ে ঘরের কোণে। পাখির ডাকে চারপাশ ভরে ওঠে। এমন শান্ত সময়ে মন দিয়ে কোনো কাজ করলে মনোযোগ নিজে থেকেই বাড়ে। দিনের শুরুটা ভালো হলে সারাদিন ভালো যায়।',
      'বাংলা একবচন ও বহুবচনে অনেক সময় প্রত্যয় যুক্ত হয়। বানান শুদ্ধ রাখতে মূল শব্দ ও প্রত্যয়ের মিল বুঝতে হয়। প্রতিদিন কয়েকটি শব্দের বানান অনুশীলন করলে লেখায় আত্মবিশ্বাস বাড়ে।',
      'স্বপ্ন দেখা সহজ, কিন্তু স্বপ্ন পূরণ করতে পরিশ্রম লাগে। ছোট ছোট লক্ষ্য ঠিক করে প্রতিদিন একটু একটু এগোলে একদিন বড় লক্ষ্যও সম্ভব হয়ে ওঠে। টাইপিং শেখাও ঠিক তেমনই একটি যাত্রা।',
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
      'নিয়মিত চর্চায় হাত চলতে শেখে।',
      'ভুল করা মানেই শেখা শেষ নয়।',
      'অধ্যবসায় সব প্রতিবন্ধকতা জয় করে।',
      'ঢাকা দেশের প্রাণকেন্দ্র।',
      'গ্রন্থাগার জ্ঞানের মন্দির।',
      'মিত্রতা জীবনের সম্পদ।',
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
      'ভাষার মধ্যেই একটি জাতির ইতিহাস, সাহিত্য আর মনন গাঁথা থাকে; তাই মাতৃভাষায় টাইপ করা কেবল কারিগরি দক্ষতা নয়, এটি নিজের সাংস্কৃতিক পরিচয়কে ডিজিটাল যুগে টিকিয়ে রাখার একটি প্রয়াস।',
      'শুদ্ধ বানান ও দ্রুত টাইপিং একসাথে অনুশীলন করতে হয়; প্রথমে ধীরে ধীরে নির্ভুল লেখার অভ্যাস গড়ুন, তারপর গতি বাড়ান — যে গতি নির্ভুলতার ভিতে দাঁড়িয়ে নেই, সে গতি বারবার সংশোধনের ঝামেলায় ডুবিয়ে রাখে।',
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
      'Regular breaks protect your wrists and eyes. Follow the twenty-twenty rule: every twenty minutes, look twenty feet away for twenty seconds. Your hands stay fresh, and your focus lasts much longer.',
      'A mechanical keyboard, a laptop membrane, or a compact tablet keyboard all work fine for practice. What matters is finger position and rhythm, not the price of your hardware. Any keyboard can teach discipline.',
      "Bangla has its own punctuation: the dari ends a sentence, and the double dari marks a longer pause. Learning these marks is part of writing well, just as commas and periods are in English.",
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
      'Errors are proof that you are trying.',
      'Accuracy first; speed will follow.',
      'Every expert was once a beginner.',
      'Practice with purpose, not pressure.',
      'Small steps every day add up fast.',
      'Look at the screen, trust your fingers.',
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
      'Speed without accuracy is a false economy: every mistyped character must be found and corrected, so a slower, steadier typist who rarely errs often finishes a document sooner than a hurried typist who rewrites half of it.',
      'The best practice sessions have a clear shape: a gentle warm-up on the home row, a focused drill on the letters that trip you, and a relaxed paragraph at the end; progress lives in the repetition of small, deliberate effort.',
    ],
  },
}

/**
 * Cycle through `pool` starting at a random index until the joined text
 * reaches `targetChars` characters. Random start = every run opens with a
 * different item (repeated identical openers were the single most common
 * user complaint), while every pool item still comes around in turn.
 */
function cycleTo(pool: string[], targetChars: number): string {
  if (pool.length === 0) return ''
  const start = Math.floor(Math.random() * pool.length)
  const out: string[] = []
  let length = 0
  let i = 0
  while (length < targetChars) {
    const item = pool[(start + i) % pool.length]
    out.push(item)
    length += item.length + 1 // +1 for the joining space
    i++
  }
  return out.join(' ')
}

/** Build a target text long enough for a given duration. */
export function pickText(lang: TestLang, mode: TestMode, durationSec: number): string {
  const pool = testTexts[lang]
  const minutes = Math.max(durationSec / 60, 1)
  // Rough chars-per-minute target (Bangla is slower to type than English).
  const cpmTarget = lang === 'bn' ? 220 : 300
  const targetChars = Math.round(minutes * cpmTarget) + 60

  if (mode === 'word') return cycleTo(pool.words, targetChars)
  if (mode === 'sentence') return cycleTo(pool.sentences, targetChars)
  // Beginner drills scale with the duration too — a fixed 90-character target
  // ended a 5-minute test in under a minute.
  if (mode === 'beginner') return cycleTo(pool.beginner, targetChars)
  if (mode === 'advanced') return cycleTo(pool.advanced, targetChars)
  // 'timed' and 'fixed' — paragraphs cycled to the target length.
  return cycleTo(pool.paragraphs, targetChars)
}

/** A fresh paragraph different from the current one (for "another paragraph"). */
export function anotherParagraph(lang: TestLang, current: string): string {
  const pool = testTexts[lang]
  const candidates = pool.paragraphs.filter((p) => p !== current)
  const arr = candidates.length ? candidates : pool.paragraphs
  return arr[Math.floor(Math.random() * arr.length)]
}
