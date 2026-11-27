import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Gauge,
  Keyboard,
  LayoutDashboard,
  MousePointerClick,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { Badge, Card } from '../components/ui'
import { useCompletedLessonIds } from '../lib/completionStore'
import { avroLessons } from '../data/lessons/avroLessons'
import { bijoyLessons } from '../data/lessons/bijoyLessons'
import { englishLessons } from '../data/lessons/englishLessons'
import { allQwertyKeys, fingerColors } from '../data/qwertyLayout'
import { cn } from '../lib/utils'

/** Decorative hero keyboard preview — purely visual, hidden from a11y tree. */
function HeroKeyboardPreview() {
  const fingerByLetter = new Map(allQwertyKeys.map((k) => [k.base, k.finger]))
  const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
  return (
    <div aria-hidden className="card relative overflow-hidden p-5 animate-riseIn">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 font-bangla text-sm text-slate-400">lipi-typing — practice</span>
      </div>
      <div className="space-y-1.5 rounded-xl bg-slate-100 p-3 dark:bg-slate-800/70">
        {rows.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-1.5">
            {[...row].map((ch, i) => (
              <span
                key={ch}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-semibold',
                  ri === 1 && i === 3
                    ? 'border-brand-500 bg-white ring-2 ring-brand-400 dark:bg-brand-900/60'
                    : fingerColors[fingerByLetter.get(ch) ?? 'TH'],
                )}
              >
                {ch}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
        <span className="font-bangla text-lg text-slate-800 dark:text-slate-100">
          আমার সোনার বাংলা
        </span>
        <span className="typing-cursor ml-0.5 h-5 align-middle" />
      </div>
    </div>
  )
}

export default function Home() {
  const { t } = useI18n()
  const completedIds = useCompletedLessonIds()

  const features = [
    { icon: <Keyboard size={20} />, title: t('home.f1Title'), desc: t('home.f1Desc') },
    { icon: <BookOpen size={20} />, title: t('home.f2Title'), desc: t('home.f2Desc') },
    { icon: <Sparkles size={20} />, title: t('home.f3Title'), desc: t('home.f3Desc') },
    { icon: <Target size={20} />, title: t('home.f4Title'), desc: t('home.f4Desc') },
    { icon: <Gauge size={20} />, title: t('home.f5Title'), desc: t('home.f5Desc') },
    { icon: <LayoutDashboard size={20} />, title: t('home.f6Title'), desc: t('home.f6Desc') },
  ]

  const tracks = [
    {
      to: '/avro',
      trackId: 'avro' as const,
      title: t('home.pathAvroTitle'),
      desc: t('home.pathAvroDesc'),
      lessons: avroLessons,
      badge: <Badge className="badge-brand">{t('common.beginner')}</Badge>,
    },
    {
      to: '/bijoy',
      trackId: 'bijoy' as const,
      title: t('home.pathBijoyTitle'),
      desc: t('home.pathBijoyDesc'),
      lessons: bijoyLessons,
      badge: <Badge className="badge-brand">{t('common.beginner')}</Badge>,
    },
    {
      to: '/english',
      trackId: 'english' as const,
      title: t('home.pathEnglishTitle'),
      desc: t('home.pathEnglishDesc'),
      lessons: englishLessons,
      badge: <Badge className="badge-brand">{t('common.beginner')}</Badge>,
    },
    {
      to: '/bijoy-bayanno',
      trackId: null,
      title: t('home.pathBayannoTitle'),
      desc: t('home.pathBayannoDesc'),
      lessons: [],
      badge: <Badge className="badge-teal">{t('home.guideBadge')}</Badge>,
    },
  ]

  const steps = [
    { icon: <MousePointerClick size={18} />, title: t('home.step1Title'), desc: t('home.step1Desc') },
    { icon: <BookOpen size={18} />, title: t('home.step2Title'), desc: t('home.step2Desc') },
    { icon: <TrendingUp size={18} />, title: t('home.step3Title'), desc: t('home.step3Desc') },
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

      {/* Hero */}
      <section className="surface-hero relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl"
        />
        <div className="container-page grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="badge-brand">{t('home.heroBadge')}</span>
            <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {t('home.heroTitle')}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              {t('home.heroSubtitle')}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/learn-bangla" className="btn-primary">
                {t('home.heroCta')} <ArrowRight size={16} />
              </Link>
              <Link to="/test" className="btn-outline">
                <Gauge size={16} /> {t('home.heroCta2')}
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
                >
                  <dt className="sr-only">{s.l}</dt>
                  <dd>
                    <div className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">{s.v}</div>
                    <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{s.l}</div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroKeyboardPreview />
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('home.stepsTitle')}</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">{t('home.stepsSubtitle')}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Card key={s.title} className="relative">
              <span className="absolute -top-3 right-4 grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-pop">
                {i + 1}
              </span>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-900/30 dark:text-accent-300">
                {s.icon}
              </div>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Learning paths with real progress */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
        <div className="container-page py-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('home.pathsTitle')}</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{t('home.pathsSubtitle')}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tracks.map((p) => {
              const done = p.trackId
                ? p.lessons.filter((l) => completedIds.has(`${p.trackId}:${l.id}`)).length
                : 0
              const pct = p.lessons.length > 0 ? Math.round((done / p.lessons.length) * 100) : null
              return (
                <Link
                  key={p.to}
                  to={p.to}
                  className="card group flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
                >
                  <div className="flex items-center justify-between gap-2">
                    {p.badge}
                    <span className="text-xs text-slate-400">
                      {p.lessons.length > 0 ? t('home.lessonsCount', { n: p.lessons.length }) : ''}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold">{p.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-slate-600 dark:text-slate-300">{p.desc}</p>
                  {pct !== null && (
                    <div className="mt-3">
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-[width] duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {t('home.progressLabel', { n: pct })}
                      </div>
                    </div>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                    {t('common.start')} <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-page py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('home.featuresTitle')}</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">{t('home.featuresSubtitle')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="flex flex-col transition-all hover:shadow-card">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                {f.icon}
              </div>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-page pb-14">
        <div className="surface-cta relative overflow-hidden p-8 text-center sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(60%_60%_at_50%_0%,white,transparent)]"
          />
          <Trophy className="relative mx-auto" size={32} />
          <h2 className="relative mt-3 text-2xl font-bold sm:text-3xl">{t('home.ctaTitle')}</h2>
          <p className="relative mx-auto mt-2 max-w-xl text-brand-100">{t('home.ctaSubtitle')}</p>
          <Link
            to="/learn-bangla"
            className="btn relative mt-6 bg-white text-brand-700 shadow-card hover:bg-brand-50"
          >
            {t('home.ctaButton')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
