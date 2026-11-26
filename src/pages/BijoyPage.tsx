import { Link } from 'react-router-dom'
import { Keyboard } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { LessonTrack } from '../components/LessonTrack'
import { bijoyLessons } from '../data/lessons/bijoyLessons'
import { Card } from '../components/ui'

export default function BijoyPage() {
  const { t, lang } = useI18n()
  return (
    <>
      <Seo title={`${t('pages.bijoy.title')} — ${t('brand.name')}`} description={t('pages.bijoy.intro')} />
      <div className="container-page py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('pages.bijoy.title')}</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t('pages.bijoy.intro')}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/keyboard" className="btn-outline inline-flex">
            <Keyboard size={16} /> {t('nav.keyboard')}
          </Link>
          <Link to="/bijoy-bayanno" className="btn-outline inline-flex">
            {t('nav.bijoyBayanno')}
          </Link>
        </div>
      </div>

      <LessonTrack lessons={bijoyLessons} trackId="bijoy" trackLang="bn" />

      <div className="container-page py-8">
        <Card>
          <h2 className="text-lg font-semibold">
            {lang === 'bn' ? 'Unicode vs ANSI সতর্কতা' : 'Unicode vs ANSI caveat'}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {lang === 'bn'
              ? 'এখানে Unicode Bijoy ম্যাপিং (m17n bn-bijoyUnicode.mim) শেখানো হয়েছে। Legacy "Bijoy Classic" ANSI/ফন্ট-ভিত্তিক — সঠিক ফন্ট ছাড়া গারবেজ দেখায়। বিস্তারিত Bijoy Bayanno গাইডে।'
              : 'This course teaches the Unicode Bijoy mapping (m17n bn-bijoyUnicode.mim). Legacy "Bijoy Classic" is ANSI/font-based and shows garbage without the matching font. See the Bijoy Bayanno Guide for details.'}
          </p>
        </Card>
      </div>
    </>
  )
}
