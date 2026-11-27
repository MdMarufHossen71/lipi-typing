import type { Lesson } from './types'

// English QWERTY touch-typing curriculum.
export const englishLessons: Lesson[] = [
  {
    id: 'en-1', level: 'beginner',
    title: { bn: 'QWERTY পরিচিতি ও সঠিক আসন', en: 'QWERTY Intro & Correct Posture' },
    objectives: [
      { bn: 'QWERTY লেআউট ও হোম রো-এর ধারণা পাওয়া', en: 'Understand the QWERTY layout and home row concept' },
      { bn: 'সঠিক আসন ও হাতের অবস্থান শেখা', en: 'Learn correct posture and hand placement' },
    ],
    explanation: {
      bn: 'QWERTY সবচেয়ে প্রচলিত কীবোর্ড লেআউট — উপরের সারির প্রথম ছয় বর্ণ Q-W-E-R-T-Y থেকে নাম। টাচ টাইপিংয়ের ভিত্তি হলো "হোম রো": বাম হাতের আঙুল A S D F-তে এবং ডান হাতের আঙুল J K L ;-এ। F ও J কী-তে একটি ছোট উঁচু দাগ থাকে — চোখ না ফেরাতেই আঙুল সেখানে ঠিক হয়।',
      en: 'QWERTY is the most common keyboard layout — named from the first six letters of the top row. The foundation of touch typing is the "home row": left fingers on A S D F and right fingers on J K L ;. The F and J keys have small bumps so your fingers find them without looking.',
    },
    examples: [
      { input: 'F', output: 'f', note: { bn: 'বাম তর্জনী, দাগ আছে', en: 'Left index, has a bump' } },
      { input: 'J', output: 'j', note: { bn: 'ডান তর্জনী, দাগ আছে', en: 'Right index, has a bump' } },
    ],
    instructions: [
      { bn: 'সোজা হয়ে বসুন, পা মাটিতে, কব্জি ভাসমান।', en: 'Sit upright, feet flat, wrists floating.' },
      { bn: 'বাম হাত: কনিকা A, অনামিকা S, মধ্যমা D, তর্জনী F।', en: 'Left hand: pinky A, ring S, middle D, index F.' },
      { bn: 'ডান হাত: তর্জনী J, মধ্যমা K, অনামিকা L, কনিকা ;।', en: 'Right hand: index J, middle K, ring L, pinky ;.' },
      { bn: 'কীবোর্ড না দেখে আঙুল হোম রো-তে রাখার অভ্যাস করুন।', en: 'Practice returning fingers to home row without looking.' },
    ],
    mistakes: [
      { bn: 'কব্জি কীবোর্ডে হেলান দেওয়া।', en: 'Resting wrists on the keyboard.' },
      { bn: 'চোখ দিয়ে কী খোঁজা।', en: 'Looking at the keys.' },
    ],
    practiceText: { bn: 'f f j j d d k k', en: 'f f j j d d k k' },
    quiz: [
      {
        q: { bn: 'টাচ টাইপিংয়ে বাম হাতের আঙুলগুলো কোন কী-তে থাকে?', en: 'Which keys do the left-hand fingers rest on in touch typing?' },
        options: [{ bn: 'A S D F', en: 'A S D F' }, { bn: 'Q W E R', en: 'Q W E R' }, { bn: 'Z X C V', en: 'Z X C V' }],
        answer: 0,
      },
    ],
  },
  {
    id: 'en-2', level: 'beginner',
    title: { bn: 'হোম রো চর্চা', en: 'Home Row Practice' },
    objectives: [
      { bn: 'হোম রো-র সব কী আঙুল দিয়ে চেপে টাইপ করা', en: 'Type all home-row keys with correct fingers' },
    ],
    explanation: {
      bn: 'হোম রো: A S D F G H J K L ;। প্রতিটি আঙুল তার নির্দিষ্ট কী-তে থাকে। কোনো কী চাপার পর আঙুল আবার হোম পজিশনে ফিরে আসে। G ও H-তে তর্জনী প্রসারিত করে চাপতে হয়।',
      en: 'Home row: A S D F G H J K L ;. Each finger stays on its key. After pressing a key, the finger returns to home position. G and H are reached by extending the index finger.',
    },
    examples: [
      { input: 'a', output: 'a', note: { bn: 'বাম কনিকা', en: 'Left pinky' } },
      { input: 's', output: 's', note: { bn: 'বাম অনামিকা', en: 'Left ring' } },
      { input: 'g', output: 'g', note: { bn: 'বাম তর্জনী (প্রসারিত)', en: 'Left index (extended)' } },
      { input: 'h', output: 'h', note: { bn: 'ডান তর্জনী (প্রসারিত)', en: 'Right index (extended)' } },
    ],
    instructions: [
      { bn: 'নিচের শব্দ বারবার টাইপ করুন।', en: 'Type the words below repeatedly.' },
      { bn: 'প্রতিবার আঙুল হোমে ফেরান।', en: 'Return fingers to home each time.' },
    ],
    mistakes: [
      { bn: 'একই আঙুল দিয়ে একাধিক কী চাপা।', en: 'Using one finger for multiple keys.' },
    ],
    practiceText: { bn: 'sad fad dad lad jak fad glass glad', en: 'sad fad dad lad jak fad glass glad' },
    quiz: [
      {
        q: { bn: '"G" কী কোন আঙুল দিয়ে চাপতে হয়?', en: 'Which finger presses the G key?' },
        options: [{ bn: 'বাম তর্জনী (প্রসারিত)', en: 'Left index (extended)' }, { bn: 'ডান তর্জনী (প্রসারিত)', en: 'Right index (extended)' }, { bn: 'বাম মধ্যমা', en: 'Left middle' }],
        answer: 0,
      },
    ],
  },
  {
    id: 'en-3', level: 'intermediate',
    title: { bn: 'টপ রো (QWERTY)', en: 'Top Row (QWERTY)' },
    objectives: [
      { bn: 'টপ রো-র কী সঠিক আঙুল দিয়ে চাপা', en: 'Press top-row keys with the correct fingers' },
    ],
    explanation: {
      bn: 'টপ রো: Q W E R T Y U I O P। প্রতিটি আঙুল হোম রো থেকে উপরে উঠে চাপে। Q (বাম কনিকা), W (অনামিকা), E (মধ্যমা), R/T (তর্জনী)। ডান দিকে Y/U (তর্জনী), I (মধ্যমা), O (অনামিকা), P (কনিকা)।',
      en: 'Top row: Q W E R T Y U I O P. Each finger reaches up from the home row. Q (left pinky), W (ring), E (middle), R/T (index). Right: Y/U (index), I (middle), O (ring), P (pinky).',
    },
    examples: [
      { input: 'q', output: 'q', note: { bn: 'বাম কনিকা উপরে', en: 'Left pinky up' } },
      { input: 'p', output: 'p', note: { bn: 'ডান কনিকা উপরে', en: 'Right pinky up' } },
    ],
    instructions: [
      { bn: 'হোম রো থেকে উপরে গিয়ে চাপুন, তারপর ফিরে আসুন।', en: 'Reach up from home, press, then return.' },
    ],
    mistakes: [
      { bn: 'আঙুল হোম ছেড়ে অন্য জায়গায় স্থায়ী হয়ে যাওয়া।', en: 'Fingers drifting from home position.' },
    ],
    practiceText: { bn: 'the quick brown fox type write quote', en: 'the quick brown fox type write quote' },
    quiz: [
      {
        q: { bn: '"Q" কী কোন আঙুল দিয়ে চাপা হয়?', en: 'Which finger presses the Q key?' },
        options: [{ bn: 'বাম কনিকা', en: 'Left pinky' }, { bn: 'বাম অনামিকা', en: 'Left ring' }, { bn: 'ডান কনিকা', en: 'Right pinky' }],
        answer: 0,
      },
    ],
  },
  {
    id: 'en-4', level: 'intermediate',
    title: { bn: 'বটম রো ও সংখ্যা', en: 'Bottom Row & Numbers' },
    objectives: [
      { bn: 'বটম রো (ZXCV) ও নম্বর রো চর্চা করা', en: 'Practice the bottom row (ZXCV) and number row' },
    ],
    explanation: {
      bn: 'বটম রো: Z X C V B N M , . /। হোম রো থেকে নিচে নেমে চাপতে হয়। নম্বর রো: হোম বা টপ রো থেকে উপরে প্রসারিত করে। শিফট ধরে চাপলে সংখ্যা ও সিম্বল আসে (! @ # $ %)।',
      en: 'Bottom row: Z X C V B N M , . /. Reach down from home. Number row: reach up from top/home. Hold Shift for numbers and symbols (! @ # $ %).',
    },
    examples: [
      { input: 'z', output: 'z', note: { bn: 'বাম কনিকা নিচে', en: 'Left pinky down' } },
      { input: '1', output: '1', note: { bn: 'বাম কনিকা উপরে', en: 'Left pinky up' } },
      { input: '!', output: '!', note: { bn: 'Shift+1', en: 'Shift+1' } },
    ],
    instructions: [
      { bn: 'নিচের অনুশীলন টেক্সট টাইপ করুন।', en: 'Type the practice text below.' },
    ],
    mistakes: [
      { bn: 'নম্বর রো-তে চোখ দিয়ে খোঁজা।', en: 'Hunting the number row by sight.' },
    ],
    practiceText: { bn: 'zebra exit copy very monday 1 2 3 4 5', en: 'zebra exit copy very monday 1 2 3 4 5' },
    quiz: [
      {
        q: { bn: '"B" কী কোন আঙুল দিয়ে চাপা হয়?', en: 'Which finger presses the B key?' },
        options: [{ bn: 'বাম তর্জনী', en: 'Left index' }, { bn: 'ডান তর্জনী', en: 'Right index' }, { bn: 'বাম কনিকা', en: 'Left pinky' }],
        answer: 0,
      },
    ],
  },
  {
    id: 'en-5', level: 'advanced',
    title: { bn: 'শিফট, ক্যাপস ও সিম্বল', en: 'Shift, Caps & Symbols' },
    objectives: [
      { bn: 'শিফট ও ক্যাপস লক সঠিকভাবে ব্যবহার করা', en: 'Use Shift and Caps Lock correctly' },
      { bn: 'সিম্বল ও যতিচিহ্ন টাইপ করা', en: 'Type symbols and punctuation' },
    ],
    explanation: {
      bn: 'বড় হাতের অক্ষরের জন্য বিপরীত হাতের কনিকা দিয়ে Shift ধরে চাপুন (যেমন ডান হাতের অক্ষরে বাম Shift)। দীর্ঘ বড়-হাতের লেখায় Caps Lock। সিম্বল: Shift+1=! Shift+2=@ Shift+3=# Shift+4=$ Shift+5=% Shift+7=&। যতিচিহ্ন: , . ? ! : ; " \'।',
      en: 'For capitals, hold Shift with the opposite hand’s pinky (e.g. left Shift for right-hand letters). Use Caps Lock for long uppercase text. Symbols: Shift+1=! Shift+2=@ Shift+3=# Shift+4=$ Shift+5=% Shift+7=&. Punctuation: , . ? ! : ; " \'.',
    },
    examples: [
      { input: 'Shift+a', output: 'A' },
      { input: 'Shift+1', output: '!' },
      { input: '?', output: '?', note: { bn: 'Shift+/', en: 'Shift+/' } },
    ],
    instructions: [
      { bn: 'বড় হাতের অক্ষর শিফট দিয়ে অনুশীলন করুন।', en: 'Practice capitals with Shift.' },
      { bn: 'সিম্বল ও যতিচিহ্ন টাইপ করুন।', en: 'Type symbols and punctuation.' },
    ],
    mistakes: [
      { bn: 'একই হাতে শিফট ও অক্ষর চাপা।', en: 'Pressing Shift and the letter with the same hand.' },
      { bn: 'Caps Lock ভুলে অন রেখে যাওয়া।', en: 'Leaving Caps Lock on by mistake.' },
    ],
    practiceText: { bn: 'Hello, World! Apple? Banana #100 $50', en: 'Hello, World! Apple? Banana #100 $50' },
    quiz: [
      {
        q: { bn: '"!" চিহ্নটি কীভাবে টাইপ করা হয়?', en: 'How do you type the "!" symbol?' },
        options: [{ bn: 'Shift+1', en: 'Shift+1' }, { bn: 'শুধু 1 কী', en: 'Just the 1 key' }, { bn: 'Shift+`', en: 'Shift+`' }],
        answer: 0,
      },
      {
        q: { bn: 'ডান হাতের অক্ষরের জন্য কোন Shift ধরতে হয়?', en: 'Which Shift do you hold for a right-hand letter?' },
        options: [{ bn: 'বাম Shift', en: 'The left Shift' }, { bn: 'ডান Shift', en: 'The right Shift' }, { bn: 'দুটো Shift একসাথে', en: 'Both Shifts together' }],
        answer: 0,
      },
    ],
  },
  {
    id: 'en-6', level: 'professional',
    title: { bn: 'টাচ টাইপিং ও সাধারণ ভুল', en: 'Touch Typing & Common Mistakes' },
    objectives: [
      { bn: 'চোখ না ফেরাতেই টাইপ করা (টাচ টাইপিং)', en: 'Type without looking (touch typing)' },
      { bn: 'গতি ও নির্ভুলতা একসাথে বাড়ানো', en: 'Build speed and accuracy together' },
    ],
    explanation: {
      bn: 'টাচ টাইপিংয়ের লক্ষ্য — কীবোর্ড না দেখে চালানো। শুরুতে গতির চেয়ে নির্ভুলতা গুরুত্বপূর্ণ; নির্ভুলতা এলে গতি আপনাআপনি বাড়ে। প্রতিদিন ১০-১৫ মিনিট নিয়মিত অনুশীলন দীর্ঘ সেশনের চেয়ে কার্যকর।',
      en: 'Touch typing aims to type without looking at the keyboard. Early on, accuracy matters more than speed; once accuracy is solid, speed follows naturally. 10–15 minutes of daily practice beats long irregular sessions.',
    },
    examples: [
      { input: 'the quick brown fox jumps over the lazy dog', output: 'the quick brown fox jumps over the lazy dog', note: { bn: 'সব অক্ষর ধারণ করে', en: 'contains every letter' } },
    ],
    instructions: [
      { bn: 'কীবোর্ড ঢেকে বা চোখ স্ক্রিনে রেখে টাইপ করুন।', en: 'Cover the keyboard or keep eyes on screen.' },
      { bn: 'টাইপিং টেস্ট নিয়মিত দিন।', en: 'Take typing tests regularly.' },
    ],
    mistakes: [
      { bn: 'নির্ভুলতা বাদ দিয়ে কেবল গতি তাড়া করা।', en: 'Chasing speed at the cost of accuracy.' },
      { bn: 'অনিয়মিত অনুশীলন।', en: 'Irregular practice.' },
    ],
    practiceText: {
      bn: 'the quick brown fox jumps over the lazy dog. practice makes perfect.',
      en: 'the quick brown fox jumps over the lazy dog. practice makes perfect.',
    },
    quiz: [
      {
        q: { bn: 'F ও J কী-তে ছোট উঁচু দাগ কেন থাকে?', en: 'Why do the F and J keys have small bumps?' },
        options: [
          { bn: 'চোখ না ফেরাতে আঙুল হোম রো খুঁজে পায়', en: 'Fingers find the home row without looking' },
          { bn: 'কী চাপতে সহজ হয়', en: 'They make the keys easier to press' },
          { bn: 'শুধু ডিজাইনের অংশ, কাজ নেই', en: 'Just decoration — no function' },
        ],
        answer: 0,
      },
    ],
  },
]
