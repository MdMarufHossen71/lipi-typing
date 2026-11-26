import { Link } from 'react-router-dom'
import { ArrowRight, Keyboard } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { Card } from '../components/ui'

export default function LearnBanglaPage() {
  const { t, lang } = useI18n()
  return (
    <>
      <Seo title={`${t('pages.learnBangla.title')} — ${t('brand.name')}`} description={t('pages.learnBangla.intro')} />
      <div className="container-page py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('pages.learnBangla.title')}</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t('pages.learnBangla.intro')}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="flex flex-col">
            <h2 className="text-lg font-semibold">{t('home.pathAvroTitle')}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t('home.pathAvroDesc')}</p>
            <div className="mt-3 text-xs text-slate-400">
              {lang === 'bn' ? 'স্তর: প্রাথমিক → উন্নত • ৬টি পাঠ' : 'Level: Beginner → Advanced • 6 lessons'}
            </div>
            <Link to="/avro" className="btn-primary mt-4 self-start">
              {t('common.start')} <ArrowRight size={16} />
            </Link>
          </Card>
          <Card className="flex flex-col">
            <h2 className="text-lg font-semibold">{t('home.pathBijoyTitle')}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t('home.pathBijoyDesc')}</p>
            <div className="mt-3 text-xs text-slate-400">
              {lang === 'bn' ? 'স্তর: প্রাথমিক → পেশাদার • ৬টি পাঠ' : 'Level: Beginner → Professional • 6 lessons'}
            </div>
            <div className="mt-4 flex gap-2">
              <Link to="/bijoy" className="btn-primary">
                {t('common.start')} <ArrowRight size={16} />
              </Link>
              <Link to="/keyboard" className="btn-outline">
                <Keyboard size={16} /> {t('nav.keyboard')}
              </Link>
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Link to="/bijoy-bayanno" className="btn-outline">
            {t('nav.bijoyBayanno')} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  )
}
