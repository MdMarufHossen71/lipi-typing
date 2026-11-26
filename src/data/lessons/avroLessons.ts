import type { Lesson } from './types'

// Avro Phonetic curriculum — based on the OmicronLab phonetic scheme (MPL-1.1).
// See References page for sources.
export const avroLessons: Lesson[] = [
  {
    id: 'avro-1',
    level: 'beginner',
    title: { bn: 'Avro Phonetic পরিচিতি', en: 'Introduction to Avro Phonetic' },
    objectives: [
      { bn: 'ফনেটিক টাইপিং কী তা বুঝতে পারা', en: 'Understand what phonetic typing is' },
      { bn: 'কীভাবে ইংরেজি বর্ণে বাংলা লেখা যায় শেখা', en: 'Learn how English letters produce Bangla' },
      { bn: 'Avro Keyboard ইনস্টল ও ব্যবহারের ধারণা পাওয়া', en: 'Know how to install and use Avro Keyboard' },
    ],
    explanation: {
      bn: 'Avro Phonetic হলো একটি ফনেটিক (ধ্বনিভিত্তিক) টাইপিং পদ্ধতি, যা OmicronLab তৈরি করেছে (MPL-1.1 লাইসেন্স)। এতে আপনি বাংলা শব্দের উচ্চারণ ইংরেজি বর্ণ দিয়ে লিখলে স্বয়ংক্রিয়ভাবে বাংলা ইউনিকোড হয়ে যায়। যেমন "bangla" লিখলে পাবেন "বাংলা", "amar" লিখলে পাবেন "আমার"। বড় ও ছোট হাতের পার্থক্য গুরুত্বপূর্ণ — যেমন T মানে ট, কিন্তু t মানে ত।',
      en: 'Avro Phonetic is a phonetic typing method made by OmicronLab (MPL-1.1). You write the Bangla pronunciation in English letters and it auto-converts to Bangla Unicode. For example, "bangla" becomes "বাংলা" and "amar" becomes "আমার". Letter case matters — T means ট while t means ত.',
    },
    examples: [
      { input: 'bangla', output: 'বাংলা', note: { bn: 'ng → ং', en: 'ng → ং' } },
      { input: 'amar', output: 'আমার' },
      { input: 'ami', output: 'আমি' },
      { input: 'bangladesh', output: 'বাংলাদেশ' },
    ],
    instructions: [
      { bn: 'Avro Keyboard ইনস্টল করুন: omicronlab.com/avro-keyboard.html', en: 'Install Avro Keyboard from omicronlab.com/avro-keyboard.html' },
      { bn: 'টাস্কবার বা ভাষা বার থেকে Avro Phonetic মোড নির্বাচন করুন।', en: 'Select Avro Phonetic mode from the language bar.' },
      { bn: 'যেকোনো অ্যাপে (Notepad, Word, ব্রাউজার) ইংরেজি বর্ণে বাংলা লিখুন।', en: 'Type Bangla in English letters in any app.' },
      { bn: 'নিচের অনুশীলন বক্সে রোমান লিখে আউটপুট যাচাই করুন।', en: 'Verify the output in the practice box below.' },
    ],
    mistakes: [
      { bn: 'c ও ch গুলিয়ে ফেলা — c = চ, ch = ছ।', en: 'Mixing up c and ch — c = চ, ch = ছ.' },
      { bn: 'T ও t গুলিয়ে ফেলা — T = ট, t = ত।', en: 'Mixing up T and t — T = ট, t = ত.' },
      { bn: 'ng ও Ng গুলিয়ে ফেলা — ng = ং, Ng = ঙ।', en: 'Mixing up ng and Ng — ng = ং, Ng = ঙ.' },
    ],
    practiceText: { bn: 'bangla amar ami bangladesh', en: 'bangla amar ami bangladesh' },
    quiz: [
      {
        q: { bn: '"c" দিয়ে কোন বাংলা অক্ষর হয়?', en: 'Which Bangla letter does "c" produce?' },
        options: [{ bn: 'চ', en: 'চ' }, { bn: 'ছ', en: 'ছ' }, { bn: 'জ', en: 'জ' }],
        answer: 0,
      },
    ],
  },
  {
    id: 'avro-2',
    level: 'beginner',
    title: { bn: 'মৌলিক ব্যঞ্জন বর্ণ', en: 'Basic Consonants' },
    objectives: [
      { bn: 'সাধারণ ব্যঞ্জন বর্ণের রোমান ম্যাপিং শেখা', en: 'Learn the roman mapping of common consonants' },
      { bn: 'k, g, c, j, t, d, n, p, b, m, r, l, s, h চিনা', en: 'Recognize k, g, c, j, t, d, n, p, b, m, r, l, s, h' },
    ],
    explanation: {
      bn: 'প্রতিটি বাংলা ব্যঞ্জন এক বা একাধিক ইংরেজি বর্ণ দিয়ে লেখা হয়। এক বর্ণের ম্যাপিং: k=ক, g=গ, c=চ, j=জ, t=ত, d=দ, n=ন, p=প, b=ব, m=ম, r=র, l=ল, s=স, h=হ। দুই বর্ণের ম্যাপিং: kh=খ, gh=ঘ, ch=ছ, jh=ঝ, th=থ, dh=ধ, ph=ফ, bh=ভ।',
      en: 'Each Bangla consonant maps to one or more English letters. Single: k=ক, g=গ, c=চ, j=জ, t=ত, d=দ, n=ন, p=প, b=ব, m=ম, r=র, l=ল, s=স, h=হ. Two-letter: kh=খ, gh=ঘ, ch=ছ, jh=ঝ, th=থ, dh=ধ, ph=ফ, bh=ভ.',
    },
    examples: [
      { input: 'k', output: 'ক' }, { input: 'kh', output: 'খ' }, { input: 'g', output: 'গ' },
      { input: 'gh', output: 'ঘ' }, { input: 'c', output: 'চ' }, { input: 'ch', output: 'ছ' },
      { input: 'j', output: 'জ' }, { input: 't', output: 'ত' }, { input: 'd', output: 'দ' },
      { input: 'n', output: 'ন' }, { input: 'p', output: 'প' }, { input: 'b', output: 'ব' },
      { input: 'm', output: 'ম' }, { input: 'r', output: 'র' }, { input: 'l', output: 'ল' },
      { input: 's', output: 'স' }, { input: 'h', output: 'হ' },
    ],
    instructions: [
      { bn: 'প্রতিটি বর্ণ আলাদাভাবে টাইপ করে আউটপুট দেখুন।', en: 'Type each letter separately and observe the output.' },
      { bn: 'এক বর্ণের ও দুই বর্ণের পার্থক্য মনে রাখুন।', en: 'Note the difference between single and two-letter forms.' },
      { bn: 'নিচের অনুশীলন টেক্সট টাইপ করুন।', en: 'Type the practice text below.' },
    ],
    mistakes: [
      { bn: 'ch দিয়ে চ মনে করা — আসলে ch = ছ, c = চ।', en: 'Thinking ch gives চ — actually ch = ছ, c = চ.' },
      { bn: 'ph আর f গুলিয়ে ফেলা — দুটোই ফ দেয়।', en: 'Mixing ph and f — both give ফ.' },
    ],
    practiceText: { bn: 'k kh g gh c ch j jh t th d dh n p b m r l s h', en: 'k kh g gh c ch j jh t th d dh n p b m r l s h' },
  },
  {
    id: 'avro-3',
    level: 'beginner',
    title: { bn: 'স্বর বর্ণ ও কার (মাত্রা)', en: 'Vowels & Kar (Vowel Signs)' },
    objectives: [
      { bn: 'স্বর বর্ণের মৌলিক ও কার রূপ বুঝতে পারা', en: 'Understand independent vs kar forms of vowels' },
      { bn: 'শব্দের শুরুতে ও ব্যঞ্জনের পরে স্বরের পার্থক্য শেখা', en: 'Learn vowel behaviour at word start vs after a consonant' },
    ],
    explanation: {
      bn: 'Avro-তে স্বর বর্ণের দুটি রূপ আছে: মৌলিক (শব্দের শুরুতে) ও কার/মাত্রা (ব্যঞ্জনের পরে)। যেমন "a" শব্দের শুরুতে দিলে "আ", কিন্তু ব্যঞ্জনের পরে দিলে "া" (কা-কার)। তেমনি i→ই/ি, u→উ/ু, e→এ/ে, O→ও/ো, oi→ঐ/ৈ, ou→ঔ/ৌ।',
      en: 'Avro vowels have two forms: independent (at word start) and kar (after a consonant). For example, "a" at start gives "আ", but after a consonant gives "া" (aa-kar). Similarly i→ই/ি, u→উ/ু, e→এ/ে, O→ও/ো, oi→ঐ/ৈ, ou→ঔ/ৌ.',
    },
    examples: [
      { input: 'a', output: 'আ' }, { input: 'ka', output: 'কা' }, { input: 'i', output: 'ই' },
      { input: 'ki', output: 'কি' }, { input: 'u', output: 'উ' }, { input: 'ku', output: 'কু' },
      { input: 'e', output: 'এ' }, { input: 'ke', output: 'কে' }, { input: 'O', output: 'ও' },
      { input: 'kO', output: 'কো' }, { input: 'koi', output: 'কৈ' }, { input: 'kou', output: 'কৌ' },
    ],
    instructions: [
      { bn: 'প্রথমে একটি স্বর একা টাইপ করুন (মৌলিক রূপ)।', en: 'First type a vowel alone (independent form).' },
      { bn: 'তারপর একটি ব্যঞ্জন + স্বর টাইপ করুন (কার রূপ)।', en: 'Then type a consonant + vowel (kar form).' },
      { bn: 'পার্থক্য খেয়াল করুন।', en: 'Notice the difference.' },
    ],
    mistakes: [
      { bn: 'O (বড়) আর o (ছোট) গুলিয়ে ফেলা।', en: 'Mixing capital O and small o.' },
      { bn: 'শব্দের মাঝে মৌলিক স্বর চেয়ে ফেলা — ব্যঞ্জনের পরে কার হয়।', en: 'Expecting an independent vowel mid-word — it becomes a kar after a consonant.' },
    ],
    practiceText: { bn: 'a ka i ki u ku e ke O kO koi kou', en: 'a ka i ki u ku e ke O kO koi kou' },
    quiz: [
      {
        q: { bn: '"ki" টাইপ করলে কী হবে?', en: 'What does typing "ki" produce?' },
        options: [{ bn: 'কী', en: 'কী' }, { bn: 'কি', en: 'কি' }, { bn: 'কৈ', en: 'কৈ' }],
        answer: 1,
      },
    ],
  },
  {
    id: 'avro-4',
    level: 'intermediate',
    title: { bn: 'যুক্তাক্ষর (Conjuncts)', en: 'Conjuncts (যুক্তাক্ষর)' },
    objectives: [
      { bn: 'যুক্তাক্ষর কী ও কীভাবে গঠিত হয় শেখা', en: 'Learn what conjuncts are and how they form' },
      { bn: 'বিশেষ যুক্তাক্ষর gg, kkh মনে রাখা', en: 'Remember special conjuncts gg, kkh' },
    ],
    explanation: {
      bn: 'যুক্তাক্ষর তৈরি হয় যখন দুটি ব্যঞ্জন পাশাপাশি থাকে — Avro স্বয়ংক্রিয়ভাবে হসন্ত (্) বসিয়ে দেয়। যেমন "kt"→ক্ত, "nt"→ন্ত, "st"→স্ত, "kT"→ক্ট। কিছু বিশেষ যুক্তাক্ষর আলাদা ম্যাপিংয়ে: "gg"→জ্ঞ (বিজ্ঞান), "kkh"/"kx"→ক্ষ (শিক্ষা)।',
      en: 'Conjuncts form when two consonants are adjacent — Avro auto-inserts a virama (্). For example, "kt"→ক্ত, "nt"→ন্ত, "st"→স্ত, "kT"→ক্ট. Some have special mappings: "gg"→জ্ঞ (বিজ্ঞান), "kkh"/"kx"→ক্ষ (শিক্ষা).',
    },
    examples: [
      { input: 'kt', output: 'ক্ত' }, { input: 'nt', output: 'ন্ত' }, { input: 'st', output: 'স্ত' },
      { input: 'kT', output: 'ক্ট' },
      { input: 'gg', output: 'জ্ঞ', note: { bn: 'বিজ্ঞান', en: 'as in বিজ্ঞান' } },
      { input: 'kkh', output: 'ক্ষ', note: { bn: 'শিক্ষা', en: 'as in শিক্ষা' } },
      { input: 'shikkha', output: 'শিক্ষা' },
      { input: 'biggan', output: 'বিজ্ঞান' },
      { input: 'cinta', output: 'চিন্তা' },
    ],
    instructions: [
      { bn: 'দুটি ব্যঞ্জন পাশাপাশি টাইপ করে যুক্তাক্ষর দেখুন।', en: 'Type two consonants together to see a conjunct.' },
      { bn: 'gg ও kkh বিশেষ কেস মনে রাখুন।', en: 'Remember the special cases gg and kkh.' },
    ],
    mistakes: [
      { bn: 'সাধারণ যুক্তাক্ষরে হসন্ত নিজে দেওয়ার দরকার নেই — Avro বসায়।', en: 'No need to type the virama yourself for normal conjuncts — Avro adds it.' },
      { bn: 'chinta লিখলে ছিন্তা হয় (ch→ছ) — চিন্তা চাইলে cinta লিখুন।', en: 'chinta gives ছিন্তা (ch→ছ) — use cinta for চিন্তা.' },
    ],
    practiceText: { bn: 'kt nt st gg kkh shikkha biggan cinta', en: 'kt nt st gg kkh shikkha biggan cinta' },
  },
  {
    id: 'avro-5',
    level: 'intermediate',
    title: { bn: 'সংখ্যা, যতিচিহ্ন ও বিশেষ চিহ্ন', en: 'Numbers, Punctuation & Specials' },
    objectives: [
      { bn: 'বাংলা সংখ্যা টাইপ করা শেখা', en: 'Learn to type Bangla digits' },
      { bn: 'দাঁড়ি, টাকা, চন্দ্রবিন্দু ইত্যাদি চেনা', en: 'Recognize dari, taka, chandrabindu etc.' },
    ],
    explanation: {
      bn: 'Avro-তে ০-৯ টাইপ করলে স্বয়ংক্রিয়ভাবে ০-৯ বাংলা সংখ্যা হয়। পূর্ণ বিরতি (।) পেতে একটি ডট (.) দিন; দুটি ডট (..) দিলে দাঁড়ি-দাঁড়ি (।।)। টাকা চিহ্ন ৳ পেতে $, চন্দ্রবিন্দু ঁ পেতে ^, বিসর্গ ঃ পেতে :।',
      en: 'In Avro, typing 0-9 auto-produces Bangla digits ০-৯. A single dot (.) gives a dari (।); two dots (..) give ।।. Use $ for ৳ (taka), ^ for ঁ (chandrabindu), : for ঃ (visarga).',
    },
    examples: [
      { input: '0123456789', output: '০১২৩৪৫৬৭৮৯' },
      { input: 'b.', output: 'ব।' }, { input: '$', output: '৳' },
      { input: '^', output: 'ঁ' }, { input: ':', output: 'ঃ' },
    ],
    instructions: [
      { bn: 'সংখ্যা টাইপ করে বাংলা রূপ দেখুন।', en: 'Type digits and see the Bangla form.' },
      { bn: 'বাক্যের শেষে ডট দিয়ে দাঁড়ি পান।', en: 'End a sentence with a dot for a dari.' },
    ],
    mistakes: [
      { bn: 'বিরতি চেয়ে সরাসরি । চাপা — ডট দিন।', en: 'Trying to type । directly — use a dot instead.' },
    ],
    practiceText: { bn: 'amar 2024 takar biki b.', en: 'amar 2024 takar biki b.' },
  },
  {
    id: 'avro-6',
    level: 'advanced',
    title: { bn: 'সাধারণ ভুল ও বাক্য অনুশীলন', en: 'Common Mistakes & Sentence Practice' },
    objectives: [
      { bn: 'প্রচলিত ভুলগুলো চেনা', en: 'Recognize common mistakes' },
      { bn: 'পূর্ণ বাক্য ও অনুচ্ছেদ টাইপ করা', en: 'Type full sentences and paragraphs' },
    ],
    explanation: {
      bn: 'Avro-তে সবচেয়ে সাধারণ ভুল হলো বড়/ছোট হাতের বর্ণ গুলিয়ে ফেলা (T/t, D/d, N/n, S/Sh) এবং c/ch মিশ্রিত করা। জটিল শব্দে অ্য (অ্যা) গঠন বা য়-এর ব্যবহারে পূর্ণ ইঞ্জিন প্রয়োজন — সেক্ষেত্রে Avro Keyboard ইনস্টল করা থাকা জরুরি।',
      en: 'The most common Avro mistakes are case confusion (T/t, D/d, N/n, S/Sh) and mixing c/ch. Complex words involving অ্য or য় need the full engine — install Avro Keyboard for those.',
    },
    examples: [
      { input: 'amar sonar bangla', output: 'আমার সোনার বাংলা' },
      { input: 'shikkha o projukti', output: 'শিক্ষা ও প্রযুক্তি' },
    ],
    instructions: [
      { bn: 'নিচের অনুচ্ছেদ Avro (বা এই প্ল্যাটফর্মের সরল কনভার্টার) দিয়ে টাইপ করুন।', en: 'Type the paragraph below using Avro (or this platform’s simplified converter).' },
      { bn: 'ভুল হলে কোন বর্ণটি গোলমাল করেছে তা খুঁজুন।', en: 'On a mistake, find which letter caused it.' },
    ],
    mistakes: [
      { bn: 'T/t, D/d, N/n বড়-ছোট গুলিয়ে ফেলা।', en: 'Confusing T/t, D/d, N/n case.' },
      { bn: 'Sh (ষ) আর S/sh (শ) গুলিয়ে ফেলা।', en: 'Mixing Sh (ষ) and S/sh (শ).' },
      { bn: 'chinta লিখে চিন্তা চাওয়া — cinta লিখুন।', en: 'Wanting চিন্তা but typing chinta — use cinta.' },
    ],
    practiceText: {
      bn: 'amar sonar bangla ami tomay bhalobashi shikkha o projukti banglar mukti',
      en: 'amar sonar bangla ami tomay bhalobashi shikkha o projukti banglar mukti',
    },
  },
]
