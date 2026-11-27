import { useState } from 'react'
import { Download } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { Card, SectionHeading } from '../components/ui'
import { LessonTrack } from '../components/LessonTrack'
import { avroLessons } from '../data/lessons/avroLessons'
import {
  avroConsonants,
  avroConvert,
  avroExampleWords,
  avroSpecials,
  avroVowels,
} from '../data/avroLayout'

function AvroPractice() {
  const { lang } = useI18n()
  const [roman, setRoman] = useState('bangla')
  const out = avroConvert(roman)
  return (
    <Card>
      <h2 className="text-lg font-semibold">
        {lang === 'bn' ? 'Avro সরল কনভার্টার (অনুশীলন)' : 'Avro simplified converter (practice)'}
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {lang === 'bn'
          ? 'ইংরেজি বর্ণে টাইপ করুন — নিচে বাংলা আউটপুট দেখুন।'
          : 'Type in English letters — see the Bangla output below.'}
      </p>
      <input
        className="input mt-3 font-mono"
        value={roman}
        onChange={(e) => setRoman(e.target.value)}
        placeholder="bangla"
        spellCheck={false}
      />
      <div className="mt-3 rounded-lg bg-slate-50 p-4 font-bangla text-2xl dark:bg-slate-800/50">
        {out || '…'}
      </div>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        {lang === 'bn'
          ? 'দ্রষ্টব্য: এটি একটি সরল লার্নিং কনভার্টার। জটিল শব্দে (যেমন proyukti) পূর্ণ Avro ইঞ্জিনের সাথে তফাৎ হতে পারে। পূর্ণ ফনেটিক টাইপিংয়ের জন্য Avro Keyboard ইনস্টল করুন।'
          : 'Note: this is a simplified learning converter. Complex words (e.g. proyukti) may differ from the full Avro engine. Install Avro Keyboard for full phonetic typing.'}
      </p>
    </Card>
  )
}

function AvroReference() {
  const { tr } = useI18n()
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Consonants (ব্যঞ্জন)</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {avroConsonants.map((c) => (
            <div key={c.roman} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
              <code className="text-xs">{c.roman}</code>
              <span className="font-bangla text-lg font-medium">{c.bangla}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Vowels (স্বর) — independent / kar</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-1">Roman</th>
                <th className="py-1">Independent</th>
                <th className="py-1">Kar (মাত্রা)</th>
              </tr>
            </thead>
            <tbody>
              {avroVowels.map((v) => (
                <tr key={v.roman} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-1.5"><code className="text-xs">{v.roman}</code></td>
                  <td className="py-1.5 font-bangla text-base">{v.independent}</td>
                  <td className="py-1.5 font-bangla text-base">{v.kar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Specials & Punctuation</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {avroSpecials.map((s) => (
            <div key={s.roman} className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
              <code className="text-xs">{s.roman}</code> →{' '}
              <span className="font-bangla text-base">{s.bangla}</span>
              {s.note && <div className="text-xs text-slate-400">{tr(s.note)}</div>}
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Verified example words</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {avroExampleWords.map((w) => (
            <div key={w.roman} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
              <div>
                <code className="text-xs">{w.roman}</code>
                {w.note && <div className="text-xs text-slate-400">{tr(w.note)}</div>}
              </div>
              <span className="font-bangla text-lg font-medium">{w.bangla}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default function AvroPage() {
  const { t, lang } = useI18n()
  return (
    <>
      <Seo title={`${t('pages.avro.title')} — ${t('brand.name')}`} description={t('pages.avro.intro')} />
      <div className="container-page py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('pages.avro.title')}</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t('pages.avro.intro')}</p>
        <a
          href="https://omicronlab.com/avro-keyboard.html"
          target="_blank"
          rel="noreferrer"
          className="btn-outline mt-4 inline-flex"
        >
          <Download size={16} /> Avro Keyboard (omicronlab.com)
        </a>
      </div>

      <div className="container-page pb-4">
        <SectionHeading title={lang === 'bn' ? 'অনুশীলন ও রেফারেন্স' : 'Practice & Reference'} />
        <AvroPractice />
      </div>

      <LessonTrack lessons={avroLessons} trackId="avro" trackLang="bn" />

      <div className="container-page py-8">
        <AvroReference />
      </div>
    </>
  )
}
