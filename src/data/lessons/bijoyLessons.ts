import type { Lesson } from './types'

// Bijoy (Unicode) keyboard curriculum — mapping per m17n `bn-bijoyUnicode.mim`
// (BijoyLinux package). See References page for sources.
export const bijoyLessons: Lesson[] = [
  {
    id: 'bijoy-1', level: 'beginner',
    title: { bn: 'Bijoy কীবোর্ড পরিচিতি', en: 'Introduction to the Bijoy Keyboard' },
    objectives: [
      { bn: 'Bijoy লেআউট কী তা বুঝতে পারা', en: 'Understand what the Bijoy layout is' },
      { bn: 'Unicode Bijoy ও legacy ANSI Bijoy-এর পার্থক্য জানা', en: 'Know the difference between Unicode and legacy ANSI Bijoy' },
    ],
    explanation: {
      bn: 'Bijoy বাংলাদেশের জাতীয় কীবোর্ড লেআউট (BDS 1738:2018), যা Mustafa Jabbar / Ananda Computers তৈরি করেছে। এটি একটি নির্দিষ্ট লেআউট — প্রতিটি কী-তে একটি নির্দিষ্ট বাংলা অক্ষর বসানো। Avro (ফনেটিক) এর বিপরীতে Bijoy-তে কোন কী কোন অক্ষর দেয় তা মুখস্থ করতে হয়। এখানে আমরা Unicode Bijoy শেখাই; legacy "Bijoy Classic" ANSI/ফন্ট-ভিত্তিক, যা আধুনিক ডিভাইসে সরাসরি কাজ করে না।',
      en: 'Bijoy is Bangladesh’s national keyboard layout (BDS 1738:2018), created by Mustafa Jabbar / Ananda Computers. It is a fixed layout — each key has a fixed Bangla character. Unlike Avro (phonetic), you must memorize which key gives which character. Here we teach Unicode Bijoy; legacy "Bijoy Classic" is ANSI/font-based and does not work directly on modern devices.',
    },
    examples: [
      { input: 'H', output: 'ব', note: { bn: 'H কী → ব', en: 'H key → ব' } },
      { input: 'J', output: 'ক', note: { bn: 'J কী → ক', en: 'J key → ক' } },
      { input: 'K', output: 'ত', note: { bn: 'K কী → ত', en: 'K key → ত' } },
      { input: 'L', output: 'দ', note: { bn: 'L কী → দ', en: 'L key → দ' } },
    ],
    instructions: [
      { bn: 'ইন্টারঅ্যাকটিভ কীবোর্ড পেজে গিয়ে Bijoy লেআউট দেখুন।', en: 'Open the Interactive Keyboard page to see the Bijoy layout.' },
      { bn: 'প্রতিটি কী চেপে কোন অক্ষর আসে দেখুন।', en: 'Press each key and observe the character.' },
      { bn: 'নিচের হোম রো অনুশীলন করুন।', en: 'Practise the home row below.' },
    ],
    mistakes: [
      { bn: 'Avro-এর অভ্যাস নিয়ে এসে ফনেটিক টাইপ করা — Bijoy-তে কী ম্যাপিং আলাদা।', en: 'Typing phonetically out of Avro habit — Bijoy key mapping is different.' },
      { bn: 'ANSI Bijoy ফন্টে লেখা টেক্সট ইউনিকোড মনে করা।', en: 'Assuming ANSI Bijoy-font text is Unicode.' },
    ],
    practiceText: { bn: 'ব ক ত দ', en: 'ব ক ত দ (type with H J K L)' },
  },
  {
    id: 'bijoy-2', level: 'beginner',
    title: { bn: 'হোম রো (ASDF)', en: 'Home Row (ASDF)' },
    objectives: [
      { bn: 'হোম রো-র Bijoy ম্যাপিং শেখা', en: 'Learn the Bijoy mapping of the home row' },
      { bn: 'কার/মাত্রা কী (া ি ু ৃ) চেনা', en: 'Recognize the kar keys (া ি ু ৃ)' },
    ],
    explanation: {
      bn: 'Bijoy হোম রো: A→ৃ (ঋ-কার), S→ু (উ-কার), D→ি (ই-কার), F→া (আ-কার), G→্ (হসন্ত), H→ব, J→ক, K→ত, L→দ। শিফটে: A→র্, S→ূ, D→ী, F→অ, G→। (দাঁড়ি), H→ভ, J→খ, K→থ, L→ধ। গুরুত্বপূর্ণ: Bijoy-তে ই-কার (ে) ও ই-কার (ি) ব্যঞ্জনের আগে টাইপ করতে হয়।',
      en: 'Bijoy home row: A→ৃ, S→ু, D→ি, F→া, G→্ (hasant), H→ব, J→ক, K→ত, L→দ. Shift: A→র্, S→ূ, D→ী, F→অ, G→।, H→ভ, J→খ, K→থ, L→ধ. Note: in Bijoy, pre-base kars ে and ি are typed before the consonant.',
    },
    examples: [
      { input: 'D+J', output: 'কি', note: { bn: 'আগে ি(D), পরে ক(J)', en: 'ি(D) first, then ক(J)' } },
      { input: 'J+F', output: 'কা', note: { bn: 'ক(J), তারপর া(F)', en: 'ক(J), then া(F)' } },
      { input: 'J+C', output: 'কে', note: { bn: 'ে(C) আগে, ক(J) পরে', en: 'ে(C) first, ক(J) after' } },
    ],
    instructions: [
      { bn: 'হোম রো-র প্রতিটি কী চেপে অক্ষর দেখুন।', en: 'Press each home-row key and see the character.' },
      { bn: 'শিফট ধরে চাপলে অন্য অক্ষর আসে খেয়াল করুন।', en: 'Hold Shift and notice different characters.' },
      { bn: 'প্রি-বেস কার আগে দেওয়ার নিয়ম মনে রাখুন।', en: 'Remember: pre-base kars go before the consonant.' },
    ],
    mistakes: [
      { bn: 'ি ও ে ব্যঞ্জনের পরে দেওয়া — Bijoy-তে আগে দিতে হয়।', en: 'Typing ি and ে after the consonant — in Bijoy they go before.' },
      { bn: 'G (হসন্ত) সাধারণ অক্ষর মনে করা।', en: 'Thinking G (hasant) is a regular letter.' },
    ],
    practiceText: { bn: 'ব ক ত দ ভ খ থ ধ', en: 'ব ক ত দ ভ খ থ ধ (H J K L, Shift+H J K L)' },
  },
  {
    id: 'bijoy-3', level: 'intermediate',
    title: { bn: 'টপ রো (QWERTY)', en: 'Top Row (QWERTY)' },
    objectives: [
      { bn: 'টপ রো-র Bijoy ম্যাপিং শেখা', en: 'Learn the Bijoy mapping of the top row' },
      { bn: 'বড় মাত্রাযুক্ত ব্যঞ্জন (ঢ, ঘ, ঝ) চেনা', en: 'Recognize aspirated consonants (ঢ, ঘ, ঝ)' },
    ],
    explanation: {
      bn: 'টপ রো: Q→ঙ, W→য, E→ড, R→প, T→ট, Y→চ, U→জ, I→হ, O→গ, P→ড়, \\→ৎ। শিফটে: Q→ং, W→য়, E→ঢ, R→ফ, T→ঠ, Y→ছ, U→ঝ, I→ঞ, O→ঘ, P→ঢ়।',
      en: 'Top row: Q→ঙ, W→য, E→ড, R→প, T→ট, Y→চ, U→জ, I→হ, O→গ, P→ড়, \\→ৎ. Shift: Q→ং, W→য়, E→ঢ, R→ফ, T→ঠ, Y→ছ, U→ঝ, I→ঞ, O→ঘ, P→ঢ়.',
    },
    examples: [
      { input: 'R', output: 'প' }, { input: 'Shift+R', output: 'ফ' },
      { input: 'Y', output: 'চ' }, { input: 'Shift+Y', output: 'ছ' },
      { input: 'U', output: 'জ' }, { input: 'Shift+U', output: 'ঝ' },
    ],
    instructions: [
      { bn: 'টপ রো-র প্রতিটি কী ও তার শিফট রূপ চেপে দেখুন।', en: 'Press each top-row key and its shifted form.' },
      { bn: 'বেস/শিফট জোড়া (প/ফ, চ/ছ, জ/ঝ) মনে রাখুন।', en: 'Remember base/shift pairs (প/ফ, চ/ছ, জ/ঝ).' },
    ],
    mistakes: [
      { bn: 'য (W) ও য় (Shift+W) গুলিয়ে ফেলা।', en: 'Mixing য (W) and য় (Shift+W).' },
    ],
    practiceText: { bn: 'প ট চ জ হ গ ফ ঠ ছ ঝ ঘ', en: 'প ট চ জ হ গ ফ ঠ ছ ঝ ঘ' },
  },
  {
    id: 'bijoy-4', level: 'intermediate',
    title: { bn: 'বটম রো ও নম্বর রো', en: 'Bottom Row & Number Row' },
    objectives: [
      { bn: 'বটম রো (ZXCV) ম্যাপিং শেখা', en: 'Learn the bottom row (ZXCV) mapping' },
      { bn: 'বাংলা সংখ্যা ও বিশেষ চিহ্ন টাইপ করা', en: 'Type Bangla digits and special signs' },
    ],
    explanation: {
      bn: 'বটম রো: Z→্র (র-ফলা), X→ও, C→ে (এ-কার), V→র, B→ন, N→স, M→ম। শিফটে: Z→্য (য-ফলা), X→ৌ, C→ৈ, V→ল, B→ণ, N→ষ, M→শ। নম্বর রো: 1→১ … 0→০; Shift+4→৳, Shift+6→÷, Shift+7→ঁ, Shift+8→×, Shift+\\→ঃ, \\→ৎ।',
      en: 'Bottom row: Z→্র, X→ও, C→ে, V→র, B→ন, N→স, M→ম. Shift: Z→্য, X→ৌ, C→ৈ, V→ল, B→ণ, N→ষ, M→শ. Number row: 1→১ … 0→০; Shift+4→৳, Shift+6→÷, Shift+7→ঁ, Shift+8→×, Shift+\\→ঃ, \\→ৎ.',
    },
    examples: [
      { input: 'V', output: 'র' }, { input: 'Shift+V', output: 'ল' },
      { input: 'B', output: 'ন' }, { input: 'Shift+B', output: 'ণ' },
      { input: '1', output: '১' }, { input: 'Shift+4', output: '৳' },
    ],
    instructions: [
      { bn: 'বটম রো ও নম্বর রো চেপে অক্ষর দেখুন।', en: 'Press bottom and number row keys.' },
      { bn: 'ন (B) ও ণ (Shift+B) পার্থক্য মনে রাখুন।', en: 'Remember ন (B) vs ণ (Shift+B).' },
    ],
    mistakes: [
      { bn: 'ন ও ণ গুলিয়ে ফেলা।', en: 'Mixing up ন and ণ.' },
      { bn: 'স (N), ষ (Shift+N), শ (Shift+M) গুলিয়ে ফেলা।', en: 'Mixing স, ষ, শ.' },
    ],
    practiceText: { bn: 'র ন স ম ল ণ ষ শ ১২৩ ৳', en: 'র ন স ম ল ণ ষ শ ১২৩ ৳' },
  },
  {
    id: 'bijoy-5', level: 'advanced',
    title: { bn: 'যুক্তাক্ষর গঠন (হসন্ত)', en: 'Forming Conjuncts (Hasant)' },
    objectives: [
      { bn: 'হসন্ত (G) দিয়ে যুক্তাক্ষর গঠন শেখা', en: 'Learn to form conjuncts using hasant (G)' },
      { bn: 'র-ফলা (Z) ও য-ফলা (Shift+Z) ব্যবহার শেখা', en: 'Learn r-phala (Z) and ya-phala (Shift+Z)' },
    ],
    explanation: {
      bn: 'Bijoy-তে যুক্তাক্ষর গঠনে হসন্ত (্, G কী) ব্যঞ্জন দুটির মাঝে দিতে হয়। যেমন ক+্+ত = ক্ত → J G K। র-ফলা (্র) পেতে Z কী (যেমন প্র = R Z)। য-ফলা (্য) পেতে Shift+Z। র‍্য জাতীয় জটিল রূপে র ও য-ফলা একসাথে লাগে।',
      en: 'In Bijoy, conjuncts are formed by putting hasant (্, key G) between two consonants. E.g. ক+্+ত = ক্ত via J G K. Use Z for r-phala (্র) (e.g. প্র = R Z), Shift+Z for ya-phala (্য).',
    },
    examples: [
      { input: 'J G K', output: 'ক্ত', note: { bn: 'ক + ্ + ত', en: 'ক + ্ + ত' } },
      { input: 'R Z', output: 'প্র', note: { bn: 'প + ্র', en: 'প + ্র' } },
      { input: 'J G Shift+N', output: 'ক্ষ', note: { bn: 'ক + ্ + ষ', en: 'ক + ্ + ষ' } },
    ],
    instructions: [
      { bn: 'হসন্ত (G) দুই ব্যঞ্জনের মাঝে দিন।', en: 'Place hasant (G) between two consonants.' },
      { bn: 'র-ফলা Z, য-ফলা Shift+Z মুখস্থ করুন।', en: 'Memorize r-phala Z and ya-phala Shift+Z.' },
    ],
    mistakes: [
      { bn: 'হসন্ত না দিয়ে দুই ব্যঞ্জন চাপা — যুক্তাক্ষর গঠে না।', en: 'Pressing two consonants without hasant — no conjunct forms.' },
      { bn: 'র-ফলা ও য-ফলা গুলিয়ে ফেলা।', en: 'Mixing r-phala and ya-phala.' },
    ],
    practiceText: { bn: 'ক্ত প্র ক্ষ জ্ঞ ন্ত স্ত', en: 'ক্ত প্র ক্ষ জ্ঞ ন্ত স্ত' },
  },
  {
    id: 'bijoy-6', level: 'professional',
    title: { bn: 'বাক্য ও অনুচ্ছেদ অনুশীলন', en: 'Sentence & Paragraph Practice' },
    objectives: [
      { bn: 'পূর্ণ বাক্য Bijoy Unicode-এ টাইপ করা', en: 'Type full sentences in Bijoy Unicode' },
      { bn: 'গতি ও নির্ভুলতা বাড়ানো', en: 'Improve speed and accuracy' },
    ],
    explanation: {
      bn: 'এখন পূর্ণ বাক্যে অনুশীলন করুন। কার ক্রম (প্রি-বেস কার আগে) ও যুক্তাক্ষরে হসন্ত মনে রাখুন। নিয়মিত অনুশীলনে Bijoy ম্যাপিং আঙুলে স্থায়ী হয়।',
      en: 'Now practise full sentences. Remember kar ordering (pre-base kars first) and hasant for conjuncts. Regular practice makes the Bijoy mapping automatic in your fingers.',
    },
    examples: [
      { input: 'আমার সোনার বাংলা', output: 'আমার সোনার বাংলা', note: { bn: 'Bijoy Unicode', en: 'Bijoy Unicode' } },
    ],
    instructions: [
      { bn: 'নিচের বাক্য Bijoy (ইনস্টল থাকলে) দিয়ে টাইপ করুন।', en: 'Type the sentence below with Bijoy (if installed).' },
      { bn: 'টাইপিং টেস্ট পেজে Bijoy মোডে গতি মাপুন।', en: 'Measure your speed on the Typing Test page in Bijoy mode.' },
    ],
    mistakes: [
      { bn: 'কার ক্রম ভুল করা।', en: 'Getting kar order wrong.' },
      { bn: 'যুক্তাক্ষরে হসন্ত ভুলতে যাওয়া।', en: 'Forgetting hasant in conjuncts.' },
    ],
    practiceText: {
      bn: 'আমার সোনার বাংলা, আমি তোমায় ভালোবাসি। শিক্ষা ও প্রযুক্তি জাতির মেরুদণ্ড।',
      en: 'আমার সোনার বাংলা, আমি তোমায় ভালোবাসি। শিক্ষা ও প্রযুক্তি জাতির মেরুদণ্ড।',
    },
  },
]
