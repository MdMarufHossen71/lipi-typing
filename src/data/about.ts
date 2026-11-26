import type { Bilingual } from './lessons/types'

export const aboutParagraphs: Bilingual[] = [
  {
    bn: 'লিপি (Lipi) একটি ফ্রি, ওপেন সোর্স ও lightweight বাংলা ও ইংরেজি টাইপিং শেখার প্ল্যাটফর্ম। এর লক্ষ্য — শূন্য থেকে শুরু করে যে কাউকে নিয়মিত অনুশীলনের মাধ্যমে দ্রুত ও নির্ভুল টাইপিং শেখানো। নামটি এসেছে বাংলা "লিপি" (লেখার ধরন) থেকে — যা ভাষা-নিরপেক্ষ, তাই ভবিষ্যতে আরও ভাষা যোগ করা যাবে।',
    en: 'Lipi is a free, open-source and lightweight Bangla and English typing learning platform. Its goal is to take anyone from zero to fast, accurate typing through regular practice. The name comes from the Bangla word "লিপি" (script) — language-neutral, so more languages can be added in future.',
  },
  {
    bn: 'প্ল্যাটফর্মটি চারটি শেখার ট্র্যাক দেয়: Avro Phonetic, Bijoy কীবোর্ড, Bijoy Bayanno গাইড ও ইংরেজি টাইপিং। সঙ্গে ইন্টারঅ্যাকটিভ ভিজ্যুয়াল কীবোর্ড, নির্ভুল টাইপিং টেস্ট (গ্রাফিম-ভিত্তিক গণনা) ও লোকাল প্রগ্রেস ড্যাশবোর্ড।',
    en: 'The platform offers four learning tracks: Avro Phonetic, Bijoy keyboard, Bijoy Bayanno guide and English typing — plus an interactive visual keyboard, accurate grapheme-based typing tests and a local progress dashboard.',
  },
  {
    bn: 'সব কীবোর্ড ম্যাপিং যাচাইকৃত সূত্র থেকে: Avro Phonetic স্কিম OmicronLab (MPL-1.1), Unicode Bijoy ম্যাপিং m17n bn-bijoyUnicode.mim, Bijoy Bayanno তথ্য অফিসিয়াল সাইট ও Wikipedia থেকে। Bijoy প্রাইভেট সফটওয়্যার — এখানে বিতরণ করা হয় না, শুধু অফিসিয়াল লিংক দেওয়া হয়। পূর্ণ সূত্রের তালিকা References পেজে।',
    en: 'Every keyboard mapping is from verified sources: the Avro Phonetic scheme is by OmicronLab (MPL-1.1), the Unicode Bijoy mapping from m17n bn-bijoyUnicode.mim, and Bijoy Bayanno info from the official site and Wikipedia. The Bijoy software is proprietary — not distributed here, only linked to the official source. The full source list is on the References page.',
  },
  {
    bn: 'লিপি কোনো অ্যাকাউন্ট বা সার্ভার ছাড়াই কাজ করে — প্রগ্রেস আপনার ব্রাউজারে স্থানীয়ভাবে থাকে। আর্কিটেকচার এমনভাবে তৈরি যাতে ভবিষ্যতে আরও ভাষা, অ্যাকাউন্ট, ক্লাউড সিঙ্ক, লিডারবোর্ড ও PWA যোগ করা যায়।',
    en: 'Lipi works with no account or server — progress stays local in your browser. The architecture is designed so future languages, accounts, cloud sync, leaderboards and PWA support can be added.',
  },
]

export const aboutFeatures: Bilingual[] = [
  { bn: 'React + TypeScript + Vite + Tailwind — lightweight ও দ্রুত', en: 'React + TypeScript + Vite + Tailwind — lightweight & fast' },
  { bn: 'বাইলিঙ্গুয়াল UI (বাংলা/ইংরেজি), সহজে ভাষা যোগযোগ্য', en: 'Bilingual UI (Bangla/English), easily extensible to more languages' },
  { bn: 'গ্রাফিম-ভিত্তিক নির্ভুল টাইপিং গণনা', en: 'Accurate grapheme-based typing measurement' },
  { bn: 'লাইট/ডার্ক মোড, রেসপন্সিভ ও কীবোর্ড-অ্যাক্সেসিবল', en: 'Light/dark mode, responsive and keyboard-accessible' },
  { bn: 'Vitest দিয়ে কোর লজিক টেস্টেড', en: 'Core logic tested with Vitest' },
]
