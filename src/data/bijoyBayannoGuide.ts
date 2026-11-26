import type { Bilingual } from './lessons/types'

// Bijoy Bayanno / Ekushe guide — from official sources (bijoyekushe.net.bd)
// and Wikipedia. No proprietary software is distributed; only official links.
export interface GuideSection {
  title: Bilingual
  body: Bilingual[]
}

export const bijoyBayannoGuide: GuideSection[] = [
  {
    title: { bn: 'Bijoy Bayanno কী?', en: 'What is Bijoy Bayanno?' },
    body: [
      {
        bn: 'Bijoy Bayanno (বিজয় বায়ন্নো) হলো Ananda Computers (Mostafa Jabbar) এর প্রাইভেট বাংলা টাইপিং সফটওয়্যারের একটি সংস্করণ-লাইন। Bayanno লাইনের শেষ সংস্করণ ২০১৬। বর্তমান ফ্ল্যাগশিপ পণ্য হলো Bijoy Ekushe ও Bijoy Ekattor (Windows/Mac/Android/Linux)। অনেকে এখনো সফটওয়্যারটিকে "Bijoy Bayanno" বলে ডাকে।',
        en: 'Bijoy Bayanno is a version line of the proprietary Bangla typing software by Ananda Computers (Mostafa Jabbar). The last Bayanno-branded release is 2016; the current flagships are Bijoy Ekushe and Bijoy Ekattor (Windows/Mac/Android/Linux). Many people still call the software "Bijoy Bayanno".',
      },
      {
        bn: 'অফিসিয়াল সূত্র: https://www.bijoyekushe.net.bd/',
        en: 'Official source: https://www.bijoyekushe.net.bd/',
      },
    ],
  },
  {
    title: { bn: 'ইনস্টল গাইড', en: 'Installation Guide' },
    body: [
      {
        bn: '১. ইনস্টলার শুধু অফিসিয়াল সাইট থেকে ডাউনলোড করুন (bijoyekushe.net.bd)। ২. ডাউনলোড করা জিপ খুলুন। ৩. পুরোনো বাংলা টাইপিং সফটওয়্যার থাকলে তা ও তার ফন্ট মুছে ফেলুন। ৪. পেন ড্রাইভ/এক্সটার্নাল ডিস্ক খোলা থাকলে খুলে দিন, তারপর Application ফাইলে ডাবল-ক্লিক করে ইনস্টল করুন।',
        en: '1. Download the installer only from the official site (bijoyekushe.net.bd). 2. Unzip the download. 3. Remove any older Bangla typing software and its fonts. 4. Disconnect pen drives/external disks, then double-click the Application file to install.',
      },
      {
        bn: '৫. অ্যাক্টিভেশনের জন্য ইন্টারনেট দরকার। ইনস্টলের পর কম্পিউটার রিস্টার্ট করুন। ৬. রিস্টার্টে ১২-ডিজিট Machine ID দেখাবে — "Get Activation Code" চেপে আপনার Code ও Machine ID দিয়ে Activation Code নিন, প্রবেশ করিয়ে Activate করুন।',
        en: '5. Internet is required to activate. Restart after install. 6. On restart a 12-digit Machine ID appears — click "Get Activation Code", enter your Code and Machine ID to receive an Activation Code, then click Activate.',
      },
      {
        bn: 'ইন্টারনেট না থাকলে Code ও Machine ID ইমেইল/SMS/ফোনে Ananda Computers-কে পাঠান (কর্মদিবসে) — Activation Code পাবেন।',
        en: 'Without internet, send your Code and Machine ID to Ananda Computers by email/SMS/phone on a workday to receive an Activation Code.',
      },
    ],
  },
  {
    title: { bn: 'Unicode vs ANSI মোড', en: 'Unicode vs ANSI Mode' },
    body: [
      {
        bn: 'Bijoy সফটওয়্যার দুটি মোড সমর্থন করে: ANSI (legacy, ফন্ট-ভিত্তিক, যেমন SutonnyMJ) এবং Unicode (পোর্টেবল, আধুনিক)। নতুন কাজে Unicode মোড ব্যবহার করুন — তাহলে টেক্সট যেকোনো ডিভাইস/অ্যাপে সঠিকভাবে দেখাবে। ANSI মোড শুধু পুরোনো ডকুমেন্ট/ফন্টের জন্য।',
        en: 'The Bijoy software supports two modes: ANSI (legacy, font-based, e.g. SutonnyMJ) and Unicode (portable, modern). Use Unicode mode for new work — text will display correctly on any device/app. ANSI mode is only for legacy documents/fonts.',
      },
      {
        bn: 'গুরুত্বপূর্ণ পার্থক্য: Bijoy ANSI-তে ই-কার (ে) ও ই-কার (ি) ব্যঞ্জনের আগে টাইপ করতে হয়; Unicode-এ সাধারণত পরে। ANSI টেক্সট সঠিক ফন্ট ছাড়া গারবেজ দেখায়।',
        en: 'Important difference: in Bijoy ANSI, pre-base vowel signs ে and ি are typed before the consonant; in Unicode generally after. ANSI text looks like garbage without the matching font.',
      },
    ],
  },
  {
    title: { bn: 'ইনপুট/লেআউট সুইচ', en: 'Switching Input / Layout' },
    body: [
      {
        bn: 'Bijoy সিস্টেম-ট্রে আইকন বা হট-কী দিয়ে বাংলা/ইংরেজি এবং Unicode/ANSI মোডের মাঝে টগল করুন। অফিসিয়াল গাইড অনুযায়ী হট-কী কনফিগার করা যায়।',
        en: 'Toggle between Bangla/English and Unicode/ANSI modes using the Bijoy system-tray icon or a hot-key. The hot-key is configurable per the official guide.',
      },
    ],
  },
  {
    title: { bn: 'সাধারণ সমস্যা ও সমাধান', en: 'Common Troubleshooting' },
    body: [
      {
        bn: 'ফন্ট/গারবেজ: legacy ANSI টেক্সটের জন্য সঠিক Bijoy ফন্ট লাগবে, নাহলে বক্স/অগোছালো দেখায়। নতুন কাজে Unicode মোড ব্যবহার করুন।',
        en: 'Font/garbage: legacy ANSI text needs the matching Bijoy font or it shows boxes/garbage. Use Unicode mode for new work.',
      },
      {
        bn: 'Office/Photoshop: Unicode Bijoy/Avro আউটপুট আধুনিক Office ও Adobe-তে একটি Unicode বাংলা ফন্ট থাকলে কাজ করে। ANSI ফন্ট Photoshop/Illustrator-এ নাও রেন্ডার হতে পারে — সেখানে Unicode মোড + Unicode ফন্ট ব্যবহার করুন।',
        en: 'Office/Photoshop: Unicode Bijoy/Avro output works in modern Office and Adobe with a Unicode Bangla font. ANSI fonts may not render in Photoshop/Illustrator — use Unicode mode + a Unicode font there.',
      },
      {
        bn: 'অ্যাক্টিভেশন ব্যর্থ: ইন্টারনেট চালু আছে কিনা, কোনো এক্সটার্নাল ড্রাইভ যুক্ত নেই কিনা, Machine ID মেলে কিনা যাচাই করুন। অফলাইনে ফোন/ইমেইলে পুনরায় অ্যাক্টিভেট করুন।',
        en: 'Activation failure: check internet is on, no external drives attached, and Machine ID matches. Re-activate by phone/email if offline.',
      },
    ],
  },
  {
    title: { bn: 'লাইসেন্স (গুরুত্বপূর্ণ)', en: 'Licensing (Important)' },
    body: [
      {
        bn: 'Bijoy সফটওয়্যার, কীবোর্ড ও ফন্ট প্রাইভেট — "একটি নির্দিষ্ট কম্পিউটারে ব্যবহারের জন্য লাইসেন্সকৃত, অপর কম্পিউটারে স্থানান্তরযোগ্য নয়" (Bangladesh Copyright Act 2005)। এই প্ল্যাটফর্ম Bijoy ইনস্টলার, সফটওয়্যার বা প্রাইভেট ফন্ট বিতরণ করে না — শুধু অফিসিয়াল সূত্রে লিংক দেয়।',
        en: 'The Bijoy software, keyboard and fonts are proprietary — "licensed for use on one specific computer, not transferable to another computer" (Bangladesh Copyright Act 2005). This platform does NOT distribute Bijoy installers, software, or proprietary fonts — it only links to the official source.',
      },
    ],
  },
]
