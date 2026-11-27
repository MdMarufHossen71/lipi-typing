import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { PracticeSession } from '../components/PracticeSession'

export default function PracticePage() {
  const { t } = useI18n()
  return (
    <>
      <Seo title={`${t('pages.practice.title')} — ${t('brand.name')}`} description={t('pages.practice.intro')} />
      <div className="container-page py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('pages.practice.title')}</h1>
        <p className="mt-2 max-w-3xl text-slate-500 dark:text-slate-400">{t('pages.practice.intro')}</p>
        <div className="mt-6">
          <PracticeSession />
        </div>
        <p className="mt-4 rounded-xl bg-brand-50 p-3 text-xs text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
          {t('test.methodNote')}
        </p>
        <p className="mt-4 text-center text-xs text-slate-400">
          {t('practice.measureNote')}{' '}
          <Link to="/test" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
            {t('nav.test')}
          </Link>
        </p>
      </div>
    </>
  )
}
