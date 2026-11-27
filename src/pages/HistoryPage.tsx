import { Link } from 'react-router-dom'
import { History, Loader2, Trash2 } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { Button, Card, EmptyState } from '../components/ui'
import { clearTestHistory } from '../lib/progress'
import { useUserData } from '../lib/userData'
import { formatDate, formatDuration } from '../lib/utils'

function methodLabel(r: { lang: string; method: string }, t: (k: string) => string): string {
  const langLabel = r.lang === 'bn' ? t('common.bangla') : t('common.english')
  const m = r.method === 'avro' ? t('test.mAvro') : r.method === 'bijoy' ? t('test.mBijoy') : t('test.mEnglish')
  return `${langLabel} · ${m}`
}

export default function HistoryPage() {
  const { t } = useI18n()
  const { history, loading, error, retry } = useUserData()

  return (
    <>
      <Seo title={`${t('pages.history.title')} — ${t('brand.name')}`} />
      <div className="container-page py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('pages.history.title')}</h1>
            <p className="mt-1 text-sm text-slate-500">{t('pages.history.intro')}</p>
          </div>
          {history.length > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                if (confirm(t('pages.history.clearConfirm'))) {
                  clearTestHistory()
                }
              }}
            >
              <Trash2 size={16} /> {t('pages.history.clear')}
            </Button>
          )}
        </div>

        {error && (
          <Card className="mt-6 flex flex-wrap items-center justify-between gap-3 border-red-200 bg-red-50/60 dark:border-red-900/50 dark:bg-red-900/10">
            <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
            <Button variant="outline" onClick={retry}>
              {t('auth.tryAgain')}
            </Button>
          </Card>
        )}

        <div className="mt-6">
          {loading && history.length === 0 ? (
            <Card className="flex items-center gap-2 text-sm text-slate-400">
              <Loader2 size={14} className="animate-spin" /> {t('common.loading')}
            </Card>
          ) : history.length === 0 && !error ? (
            <EmptyState
              icon={<History size={22} />}
              title={t('pages.history.empty')}
              description={t('pages.history.emptyDesc')}
              action={
                <Link to="/test" className="btn-primary">
                  {t('nav.test')}
                </Link>
              }
            />
          ) : history.length > 0 ? (
            <>
              {/* Mobile cards */}
              <div className="grid gap-3 sm:hidden">
                {history.map((r) => (
                  <Card key={r.id} className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-brand-600 dark:text-brand-400">
                        {methodLabel(r, t)}
                      </span>
                      <span className="text-xs text-slate-400">{formatDate(r.date)}</span>
                    </div>
                    <div className="mt-2 flex items-end justify-between">
                      <div className="text-2xl font-bold tabular-nums">
                        {r.cpm} <span className="text-sm font-medium text-slate-400">CPM</span>
                      </div>
                      <div className="text-right text-xs text-slate-500 dark:text-slate-400">
                        <div>
                          {t('pages.history.accuracyCol')}: <strong>{Math.round(r.accuracy)}%</strong>
                        </div>
                        <div>
                          WPM: <strong>{r.wpm}</strong> · {formatDuration(r.elapsedSec)} · {r.mode}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Desktop table */}
              <Card className="hidden overflow-x-auto p-0 sm:block">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-3 py-2.5">{t('pages.history.date')}</th>
                      <th className="px-3 py-2.5">{t('pages.history.method')}</th>
                      <th className="px-3 py-2.5">{t('pages.history.mode')}</th>
                      <th className="px-3 py-2.5">{t('pages.history.duration')}</th>
                      <th className="px-3 py-2.5">{t('pages.history.accuracyCol')}</th>
                      <th className="px-3 py-2.5">{t('pages.history.cpmCol')}</th>
                      <th className="px-3 py-2.5">{t('pages.history.wpmCol')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((r) => (
                      <tr key={r.id} className="border-t border-slate-100 transition-colors hover:bg-slate-50/60 dark:border-slate-800 dark:hover:bg-slate-800/40">
                        <td className="px-3 py-2.5 text-xs text-slate-500">{formatDate(r.date)}</td>
                        <td className="px-3 py-2.5">{methodLabel(r, t)}</td>
                        <td className="px-3 py-2.5 text-slate-500">{r.mode}</td>
                        <td className="px-3 py-2.5 tabular-nums">{formatDuration(r.elapsedSec)}</td>
                        <td className="px-3 py-2.5 tabular-nums">{Math.round(r.accuracy)}%</td>
                        <td className="px-3 py-2.5 font-semibold tabular-nums">{r.cpm}</td>
                        <td className="px-3 py-2.5 tabular-nums">{r.wpm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
