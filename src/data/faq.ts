import type { Bilingual } from './lessons/types'

export interface FaqItem {
  q: Bilingual
  a: Bilingual
}

export const faqItems: FaqItem[] = [
  {
    q: { bn: 'Avro Phonetic আর Bijoy-এর মধ্যে পার্থক্য কী?', en: 'What is the difference between Avro Phonetic and Bijoy?' },
    a: {
      bn: 'Avro Phonetic ফনেটিক — ইংরেজি বর্ণ দিয়ে বাংলা উচ্চারণ লিখলে বাংলা হয় (bangla → বাংলা)। Bijoy একটি নির্দিষ্ট কীবোর্ড লেআউট — প্রতিটি কী-তে নির্দিষ্ট বাংলা অক্ষর বসানো, মুখস্থ করতে হয়। Avro শিখতে সহজ, Bijoy পেশাদার পরিবেশে প্রচলিত।',
      en: 'Avro Phonetic is phonetic — write Bangla pronunciation in English letters (bangla → বাংলা). Bijoy is a fixed keyboard layout — each key has a fixed Bangla character and must be memorized. Avro is easier to learn; Bijoy is common in professional settings.',
    },
  },
  {
    q: { bn: 'এই ওয়েবসাইট কি Avro ইঞ্জিন দিয়ে বাংলা টাইপ করতে পারে?', en: 'Can this website type Bangla using an Avro engine?' },
    a: {
      bn: 'না। Avro কোর্স পেজে একটি সরল লার্নিং কনভার্টার আছে — শেখার জন্য সাধারণ শব্দে কাজ করে, কিন্তু এটি পূর্ণ Avro ইঞ্জিন নয় (জটিল শব্দে ভিন্ন ফল দিতে পারে)। বাস্তব টাইপিংয়ের জন্য আপনার অপারেটিং সিস্টেমে Avro Keyboard বা Bijoy IME ইনস্টল থাকা দরকার — ওয়েবসাইট আপনার OS কীবোর্ড নিয়ন্ত্রণ করে না।',
      en: 'No. The Avro course page has a simplified learning converter — good for practising common words, but it is NOT the full Avro engine (complex words may differ). For real typing, install Avro Keyboard or a Bijoy IME on your operating system — the website does not control your OS keyboard.',
    },
  },
  {
    q: { bn: 'টাইপিং টেস্টে বাংলা কীভাবে টাইপ করব?', en: 'How do I type Bangla in the typing test?' },
    a: {
      bn: 'বাংলা টেস্টের জন্য আপনার ইনস্টল করা Avro বা Bijoy IME দিয়ে টাইপ করুন। ভাষা বার থেকে বাংলা ইনপুট চালু করে ইনপুট বক্সে টাইপ করুন — ওয়েবসাইট আপনার টাইপ করা বাংলা ইউনিকোড টেক্সট গ্রহণ করে।',
      en: 'For Bangla tests, type using your installed Avro or Bijoy IME. Enable Bangla input from the language bar and type in the input box — the website accepts the Bangla Unicode text you type.',
    },
  },
  {
    q: { bn: 'বাংলায় WPM না CPM কেন প্রধান?', en: 'Why is CPM primary for Bangla, not WPM?' },
    a: {
      bn: 'বাংলা "শব্দ"-এর সংজ্ঞা অস্পষ্ট (এক অক্ষরও শব্দ, একাধিক অক্ষরও)। তাই নির্ভরযোগ্য মাপকাঠি হলো CPM — প্রতি মিনিটে অক্ষর (গ্রাফিম)। WPM রফতারি করা হলেও তুলনার জন্য CPM ব্যবহার করুন।',
      en: 'The definition of a Bangla "word" is ambiguous, so the reliable metric is CPM — characters (graphemes) per minute. WPM is shown but use CPM for comparison.',
    },
  },
  {
    q: { bn: 'আমার প্রগ্রেস কোথায় সংরক্ষিত হয়?', en: 'Where is my progress saved?' },
    a: {
      bn: 'অ্যাকাউন্ট ছাড়া ব্যবহার করলে সব প্রগ্রেস ও টেস্ট ইতিহাস আপনার ব্রাউজারের localStorage-এ থাকে — ব্রাউজার ডেটা মুছলে প্রগ্রেসও মুছে যাবে। অ্যাকাউন্ট খুললে প্রগ্রেস Supabase-এ ক্লাউড সিঙ্ক হয়, তাই অন্য ডিভাইস থেকেও একই ইতিহাস দেখা যায়; লোকাল কপি তখনও অফলাইন ক্যাশ হিসেবে থাকে।',
      en: 'Without an account, all progress and test history stay in your browser’s localStorage — clearing browser data erases them. With an account, progress syncs to Supabase so the same history shows on any device; the local copy remains as an offline cache.',
    },
  },
  {
    q: { bn: 'অ্যাকাউন্ট খুললে কী হয়? বাধ্যতামূলক কি?', en: 'What happens when I create an account? Is it required?' },
    a: {
      bn: 'একেবারেই বাধ্যতামূলক নয় — অ্যাকাউন্ট ছাড়াই পুরো প্ল্যাটফর্ম চলে। অ্যাকাউন্ট (ইমেইল বা Google) শুধু ডিভাইস-জুড়ে সিঙ্ক যোগ করে: সাইন-ইনের সময় ব্রাউজারের লোকাল প্রগ্রেস একবার ক্লাউডে তোলা হয় (ডুপ্লিকেট বাদ), পরের টেস্ট ও লেসন সরাসরি সিঙ্ক হয়। কোনো ট্র্যাকিং নেই; লোকাল ডেটা কখনো মুছে ফেলা হয় না।',
      en: 'Not at all — the whole platform works without one. An account (email or Google) only adds cross-device sync: at sign-in your local progress is uploaded once (duplicates skipped), and later tests/lessons sync directly. No tracking; your local data is never deleted.',
    },
  },
  {
    q: { bn: 'Bijoy Classic (ANSI) টেক্সট কেন গারবেজ দেখায়?', en: 'Why does Bijoy Classic (ANSI) text look like garbage?' },
    a: {
      bn: 'Legacy Bijoy ANSI একটি ফন্ট-ভিত্তিক এনকোডিং — সঠিক Bijoy ফন্ট (যেমন SutonnyMJ) ছাড়া টেক্সট অগোছালো দেখায়। আধুনিক ব্যবহারের জন্য Unicode মোড ব্যবহার করুন।',
      en: 'Legacy Bijoy ANSI is a font-based encoding — without the matching Bijoy font (e.g. SutonnyMJ) the text looks garbled. Use Unicode mode for modern use.',
    },
  },
  {
    q: { bn: 'এই প্ল্যাটফর্ম কি ফ্রি?', en: 'Is this platform free?' },
    a: {
      bn: 'হ্যাঁ, লিপি সম্পূর্ণ ফ্রি ও ওপেন সোর্স (MIT লাইসেন্স)। Avro Phonetic স্কিম OmicronLab-এর (MPL-1.1)। Bijoy সফটওয়্যার প্রাইভেট — বিতরণ করা হয় না, শুধু অফিসিয়াল লিংক দেওয়া হয়।',
      en: 'Yes, Lipi is completely free and open source (MIT license). The Avro Phonetic scheme is by OmicronLab (MPL-1.1). The Bijoy software is proprietary — not distributed, only linked to the official source.',
    },
  },
]
