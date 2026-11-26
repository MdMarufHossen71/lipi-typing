import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Gauge,
  Keyboard,
  LayoutDashboard,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { Card } from '../components/ui'

export default function Home() {
  const { t } = useI18n()
  const features = [
    { icon: <Keyboard size={20} />, title: t('home.f1Title'), desc: t('home.f1Desc') },
    { icon: <BookOpen size={20} />, title: t('home.f2Title'), desc: t('home.f2Desc') },
    { icon: <Sparkles size={20} />, title: t('home.f3Title'), desc: t('home.f3Desc') },
    { icon: <Target size={20} />, title: t('home.f4Title'), desc: t('home.f4Desc') },
    { icon: <Gauge size={20} />, title: t('home.f5Title'), desc: t('home.f5Desc') },
    { icon: <LayoutDashboard size={20} />, title: t('home.f6Title'), desc: t('home.f6Desc') },
  ]
  const paths = [
    { to: '/avro', title: t('home.pathAvroTitle'), desc: t('home.pathAvroDesc') },
    { to: '/bijoy', title: t('home.pathBijoyTitle'), desc: t('home.pathBijoyDesc') },
    { to: '/english', title: t('home.pathEnglishTitle'), desc: t('home.pathEnglishDesc') },
    { to: '/bijoy-bayanno', title: t('home.pathBayannoTitle'), desc: t('home.pathBayannoDesc') },
  ]
  const stats = [
    { v: t('home.statsLessons'), l: t('home.statsLessonsLabel') },
    { v: t('home.statsLanguages'), l: t('home.statsLanguagesLabel') },
    { v: t('home.statsMethods'), l: t('home.statsMethodsLabel') },
    { v: t('home.statsFree'), l: t('home.statsFreeLabel') },
  ]

  return (
    <>
      <Seo title={`${t('brand.name')} — ${t('brand.tagline')}`} description={t('home.heroSubtitle')} />
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div className="container-page py-14 sm:py-20">
          <span className="badge-brand">{t('home.heroBadge')}</span>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {t('home.heroTitle')}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            {t('home.heroSubtitle')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/learn-bangla" className="btn-primary">
              {t('home.heroCta')} <ArrowRight size={16} />
            </Link>
            <Link to="/test" className="btn-outline">
              <Gauge size={16} /> {t('home.heroCta2')}
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">{s.v}</div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('home.featuresTitle')}</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">{t('home.featuresSubtitle')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="flex flex-col">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                {f.icon}
              </div>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className="container-page py-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('home.pathsTitle')}</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{t('home.pathsSubtitle')}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((p) => (
              <Link key={p.to} to={p.to} className="card group flex flex-col p-5 transition-shadow hover:shadow-md">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1 flex-1 text-sm text-slate-600 dark:text-slate-300">{p.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                  {t('common.start')} <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="rounded-2xl bg-brand-600 p-8 text-center text-white sm:p-12">
          <Trophy className="mx-auto" size={32} />
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{t('home.ctaTitle')}</h2>
          <p className="mx-auto mt-2 max-w-xl text-brand-100">{t('home.ctaSubtitle')}</p>
          <Link to="/learn-bangla" className="btn mt-6 bg-white text-brand-700 hover:bg-brand-50">
            {t('home.ctaButton')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
