import { Link } from 'react-router-dom'
import { BookOpen, CloudUpload, Gauge, Loader2, Target, Timer, TrendingUp } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { useAuth } from '../contexts/AuthContext'
import { Seo } from '../components/Seo'
import { Button, Card, EmptyState, StatCard } from '../components/ui'
import { ProgressRing } from '../components/ProgressRing'
import { ActivityStrip, BarsRow, Sparkline } from '../components/charts'
import { computeDashboardStats, resetAllProgress } from '../lib/progress'
import { useUserData } from '../lib/userData'
import { avroLessons } from '../data/lessons/avroLessons'
import { bijoyLessons } from '../data/lessons/bijoyLessons'
import { englishLessons } from '../data/lessons/englishLessons'
import { formatDate, formatDuration, formatNumber } from '../lib/utils'

export default function DashboardPage() {
  const { t, lang } = useI18n()
  const { status, configured } = useAuth()
  const { history, completions, loading, error, retry } = useUserData()
  const stats = computeDashboardStats(history, completions)

  const tracks = [
    { id: 'avro', lessons: avroLessons, to: '/avro' },
    { id: 'bijoy', lessons: bijoyLessons, to: '/bijoy' },
    { id: 'english', lessons: englishLessons, to: '/english' },
  ]
  const completedIds = new Set(completions.map((c) => c.id))
  const recommended = tracks
    .flatMap((tr) => tr.lessons.map((l) => ({ tr, l })))
    .find(({ tr, l }) => !completedIds.has(`${tr.id}:${l.id}`))

  if (stats.totalTests === 0 && stats.completedLessons === 0 && !loading && !error) {
    return (
      <>
        <Seo title={`${t('dashboard.title')} — ${t('brand.name')}`} />
        <div className="container-page py-12">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('dashboard.title')}</h1>
          <p className="mt-1 text-sm text-slate-500">{t('dashboard.subtitle')}</p>
          <div className="mt-8">
            <EmptyState
              icon={<Gauge size={22} />}
              title={t('dashboard.noData')}
              description={t('dashboard.noDataDesc')}
              action={
                <Link to="/test" className="btn-primary">
                  {t('dashboard.takeTest')}
                </Link>
              }
            />
          </div>
        </div>
      </>
    )
  }

  const methodMax = Math.max(stats.avroBestCpm, stats.bijoyBestCpm, stats.banglaBestCpm, 1)
  const cpmSeries = [...history].reverse().slice(-20).map((r) => r.cpm)

  return (
    <>
      <Seo title={`${t('dashboard.title')} — ${t('brand.name')}`} />
      <div className="container-page py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('dashboard.title')}</h1>
            <p className="mt-1 text-sm text-slate-500">{t('dashboard.subtitle')}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              if (confirm(t('dashboard.resetConfirm'))) {
                resetAllProgress()
              }
            }}
          >
            {t('dashboard.reset')}
          </Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {error && (
            <Card className="col-span-full flex flex-wrap items-center justify-between gap-3 border-red-200 bg-red-50/60 dark:border-red-900/50 dark:bg-red-900/10">
              <span className="text-sm text-red-700 dark:text-red-300">
                {t('auth.errNetwork')} <span className="text-xs opacity-70">({error})</span>
              </span>
              <Button variant="outline" onClick={retry}>
                {t('auth.tryAgain')}
              </Button>
            </Card>
          )}
          {configured && status === 'guest' && (
            <Card className="col-span-full border-brand-200 bg-brand-50/50 dark:border-brand-900/40 dark:bg-brand-900/10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-1.5 text-sm font-semibold">
                    <CloudUpload size={15} className="text-brand-600 dark:text-brand-300" />
                    {t('dashboard.guestTitle')}
                  </h2>
                  <p className="mt-1 max-w-xl text-xs text-slate-500 dark:text-slate-400">
                    {t('dashboard.guestDesc')}
                  </p>
                </div>
                <Link to="/register" className="btn-primary">
                  {t('dashboard.guestCta')}
                </Link>
              </div>
            </Card>
          )}
          {loading && (
            <Card className="col-span-full flex items-center gap-2 text-sm text-slate-400">
              <Loader2 size={14} className="animate-spin" /> {t('common.loading')}
            </Card>
          )}
          <Card className="flex flex-col items-center justify-center">
            <ProgressRing value={stats.avgAccuracy} label={`${stats.avgAccuracy}%`} sublabel={t('dashboard.avgAccuracy')} />
          </Card>
          <div className="grid grid-cols-2 gap-4 sm:col-span-2 lg:grid-cols-3">
            <StatCard icon={<Gauge size={15} />} label={t('dashboard.bestCpm')} value={formatNumber(stats.bestCpm)} />
            <StatCard icon={<Target size={15} />} label={t('dashboard.avgAccuracy')} value={`${stats.avgAccuracy}%`} />
            <StatCard icon={<BookOpen size={15} />} label={t('dashboard.completedLessons')} value={formatNumber(stats.completedLessons)} />
            <StatCard icon={<Timer size={15} />} label={t('dashboard.practiceTime')} value={formatDuration(stats.totalPracticeSec)} />
            <StatCard icon={<TrendingUp size={15} />} label={t('dashboard.totalTests')} value={formatNumber(stats.totalTests)} />
            <Card>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {t('dashboard.banglaProgress')} / {t('dashboard.englishProgress')}
              </div>
              <div className="mt-1.5 text-sm font-semibold">
                {t('common.bangla')}: {formatNumber(stats.banglaBestCpm)} CPM · {t('common.english')}: {formatNumber(stats.englishBestWpm)} WPM
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Avro: {formatNumber(stats.avroBestCpm)} · Bijoy: {formatNumber(stats.bijoyBestCpm)}
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card>
            <h2 className="mb-3 text-sm font-semibold">{t('dashboard.speedTrend')}</h2>
            {cpmSeries.length >= 2 ? (
              <Sparkline values={cpmSeries} label={t('dashboard.speedTrend')} height={64} />
            ) : (
              <p className="text-sm text-slate-400">{t('dashboard.noData')}</p>
            )}
            <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">
              <h3 className="mb-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('dashboard.perMethod')}
              </h3>
              <BarsRow
                label={t('dashboard.perMethod')}
                items={[
                  { label: 'Avro', value: stats.avroBestCpm, max: methodMax },
                  { label: 'Bijoy', value: stats.bijoyBestCpm, max: methodMax },
                  { label: t('common.english'), value: stats.englishBestWpm, max: methodMax },
                ]}
              />
            </div>
          </Card>
          <Card>
            <h2 className="mb-3 text-sm font-semibold">{t('dashboard.activity')}</h2>
            <ActivityStrip dates={history.map((r) => r.date)} label={t('dashboard.activity')} />
            <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
              <h3 className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('dashboard.recentActivity')}
              </h3>
              {stats.recent.length === 0 ? (
                <p className="text-sm text-slate-400">{t('dashboard.noData')}</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {stats.recent.map((r) => (
                    <li
                      key={r.id}
                      className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 last:border-0 dark:border-slate-800"
                    >
                      <span className="shrink-0">
                        {r.lang === 'bn' ? t('common.bangla') : t('common.english')} ·{' '}
                        {r.method === 'avro' ? t('test.mAvro') : r.method === 'bijoy' ? t('test.mBijoy') : t('test.mEnglish')}
                      </span>
                      <span className="font-semibold tabular-nums text-slate-600 dark:text-slate-300">
                        {r.cpm} CPM · {Math.round(r.accuracy)}%
                      </span>
                      <span className="shrink-0 text-xs text-slate-400">{formatDate(r.date)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>
        </div>

        <Card className="mt-6">
          <h2 className="mb-3 text-sm font-semibold">{t('dashboard.recommendedNext')}</h2>
          {recommended ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {lang === 'bn' ? recommended.l.title.bn : recommended.l.title.en}
              </p>
              <Link to={recommended.tr.to} className="btn-primary">
                {t('lesson.practiceNow')}
              </Link>
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              {lang === 'bn'
                ? 'সব লেসন সম্পন্ন! টাইপিং টেস্ট দিয়ে গতি মাপুন।'
                : 'All lessons complete! Take a test to measure speed.'}
            </p>
          )}
        </Card>
      </div>
    </>
  )
}
