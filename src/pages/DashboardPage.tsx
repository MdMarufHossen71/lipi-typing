import { Link } from 'react-router-dom'
import { BookOpen, Gauge, Target, Timer, TrendingUp } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { Button, Card } from '../components/ui'
import { ProgressRing } from '../components/ProgressRing'
import {
  computeDashboardStats,
  getCompletedLessons,
  resetAllProgress,
} from '../lib/progress'
import { useCompletedLessonIds, useTestHistory } from '../lib/completionStore'
import { avroLessons } from '../data/lessons/avroLessons'
import { bijoyLessons } from '../data/lessons/bijoyLessons'
import { englishLessons } from '../data/lessons/englishLessons'
import { formatDate, formatDuration, formatNumber } from '../lib/utils'

export default function DashboardPage() {
  const { t, lang } = useI18n()
  const history = useTestHistory()
  const completedIds = useCompletedLessonIds()
  const stats = computeDashboardStats(history, getCompletedLessons())

  const tracks = [
    { id: 'avro', lessons: avroLessons, to: '/avro' },
    { id: 'bijoy', lessons: bijoyLessons, to: '/bijoy' },
    { id: 'english', lessons: englishLessons, to: '/english' },
  ]
  const recommended = tracks
    .flatMap((tr) => tr.lessons.map((l) => ({ tr, l })))
    .find(({ tr, l }) => !completedIds.has(`${tr.id}:${l.id}`))

  if (stats.totalTests === 0 && stats.completedLessons === 0) {
    return (
      <>
        <Seo title={`${t('dashboard.title')} — ${t('brand.name')}`} />
        <div className="container-page py-16 text-center">
          <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
          <p className="mt-2 text-slate-500">{t('dashboard.noData')}</p>
          <p className="mt-1 text-sm text-slate-400">{t('dashboard.noDataDesc')}</p>
          <Link to="/test" className="btn-primary mt-6">
            {t('dashboard.takeTest')}
          </Link>
        </div>
      </>
    )
  }

  const cards = [
    { icon: <Gauge size={18} />, label: t('dashboard.bestCpm'), value: formatNumber(stats.bestCpm) },
    { icon: <Target size={18} />, label: t('dashboard.avgAccuracy'), value: `${stats.avgAccuracy}%` },
    { icon: <BookOpen size={18} />, label: t('dashboard.completedLessons'), value: formatNumber(stats.completedLessons) },
    { icon: <Timer size={18} />, label: t('dashboard.practiceTime'), value: formatDuration(stats.totalPracticeSec) },
    { icon: <TrendingUp size={18} />, label: t('dashboard.totalTests'), value: formatNumber(stats.totalTests) },
  ]

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
          <Card className="flex flex-col items-center justify-center">
            <ProgressRing value={stats.avgAccuracy} label={`${stats.avgAccuracy}%`} sublabel={t('dashboard.avgAccuracy')} />
          </Card>
          <div className="grid grid-cols-2 gap-4 sm:col-span-2 lg:grid-cols-3">
            {cards.map((c) => (
              <Card key={c.label} className="flex flex-col">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  {c.icon} {c.label}
                </div>
                <div className="mt-1 text-2xl font-bold">{c.value}</div>
              </Card>
            ))}
            <Card className="sm:col-span-2 lg:col-span-1">
              <div className="text-xs text-slate-500">{t('dashboard.banglaProgress')} / {t('dashboard.englishProgress')}</div>
              <div className="mt-1 text-sm">
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
            <h2 className="mb-3 text-sm font-semibold">{t('dashboard.recentActivity')}</h2>
            {stats.recent.length === 0 ? (
              <p className="text-sm text-slate-400">{t('dashboard.noData')}</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {stats.recent.map((r) => (
                  <li key={r.id} className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                    <span>
                      {r.lang === 'bn' ? t('common.bangla') : t('common.english')} ·{' '}
                      {r.method === 'avro' ? t('test.mAvro') : r.method === 'bijoy' ? t('test.mBijoy') : t('test.mEnglish')}
                    </span>
                    <span className="text-slate-500">
                      {r.cpm} CPM · {Math.round(r.accuracy)}%
                    </span>
                    <span className="text-xs text-slate-400">{formatDate(r.date)}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card>
            <h2 className="mb-3 text-sm font-semibold">{t('dashboard.recommendedNext')}</h2>
            {recommended ? (
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {lang === 'bn' ? recommended.l.title.bn : recommended.l.title.en}
                </p>
                <Link to={recommended.tr.to} className="btn-primary mt-3">
                  {t('lesson.practiceNow')}
                </Link>
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                {lang === 'bn' ? 'সব লেসন সম্পন্ন! টাইপিং টেস্ট দিয়ে গতি মাপুন।' : 'All lessons complete! Take a test to measure speed.'}
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  )
}
