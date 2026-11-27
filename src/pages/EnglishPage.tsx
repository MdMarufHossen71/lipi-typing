import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { LessonTrack } from '../components/LessonTrack'
import { englishLessons } from '../data/lessons/englishLessons'

export default function EnglishPage() {
  const { t } = useI18n()
  return (
    <>
      <Seo title={`${t('pages.english.title')} — ${t('brand.name')}`} description={t('pages.english.intro')} />
      <div className="container-page py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('pages.english.title')}</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t('pages.english.intro')}</p>
      </div>
      <LessonTrack lessons={englishLessons} trackId="english" trackLang="en" backTo="/learn-bangla" />
    </>
  )
}
