import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { Button, Card } from '../components/ui'
import { clearTestHistory, getTestHistory } from '../lib/progress'
import { formatDate, formatDuration } from '../lib/utils'

export default function HistoryPage() {
  const { t } = useI18n()
  const [tick, setTick] = useState(0)
  const history = getTestHistory()

  return (
    <>
      <Seo title={`${t('pages.history.title')} — ${t('brand.name')}`} />
      <div className="container-page py-8" key={tick}>
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
                  setTick((x) => x + 1)
                }
              }}
            >
              <Trash2 size={16} /> {t('pages.history.clear')}
            </Button>
          )}
        </div>

        <Card className="mt-6 overflow-x-auto p-0">
          {history.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-slate-500">{t('pages.history.empty')}</p>
              <p className="mt-1 text-sm text-slate-400">{t('pages.history.emptyDesc')}</p>
              <Link to="/test" className="btn-primary mt-4">
                {t('nav.test')}
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800/50">
                <tr>
                  <th className="px-3 py-2">{t('pages.history.date')}</th>
                  <th className="px-3 py-2">{t('pages.history.method')}</th>
                  <th className="px-3 py-2">{t('pages.history.mode')}</th>
                  <th className="px-3 py-2">{t('pages.history.duration')}</th>
                  <th className="px-3 py-2">{t('pages.history.accuracyCol')}</th>
                  <th className="px-3 py-2">{t('pages.history.cpmCol')}</th>
                  <th className="px-3 py-2">{t('pages.history.wpmCol')}</th>
                </tr>
              </thead>
              <tbody>
                {history.map((r) => (
                  <tr key={r.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-3 py-2 text-xs text-slate-500">{formatDate(r.date)}</td>
                    <td className="px-3 py-2">
                      {r.lang === 'bn' ? t('common.bangla') : t('common.english')} ·{' '}
                      {r.method === 'avro' ? 'Avro' : r.method === 'bijoy' ? 'Bijoy' : 'EN'}
                    </td>
                    <td className="px-3 py-2 text-slate-500">{r.mode}</td>
                    <td className="px-3 py-2">{formatDuration(r.elapsedSec)}</td>
                    <td className="px-3 py-2">{Math.round(r.accuracy)}%</td>
                    <td className="px-3 py-2 font-semibold">{r.cpm}</td>
                    <td className="px-3 py-2">{r.wpm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  )
}
