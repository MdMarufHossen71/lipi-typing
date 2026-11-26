import { ExternalLink } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { Card } from '../components/ui'
import { references } from '../data/references'

export default function ReferencesPage() {
  const { t } = useI18n()
  return (
    <>
      <Seo title={`${t('pages.references.title')} — ${t('brand.name')}`} description={t('pages.references.intro')} />
      <div className="container-page py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('pages.references.title')}</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t('pages.references.intro')}</p>

        <div className="mt-6 space-y-2">
          {references.map((r) => (
            <Card key={r.url} className="flex items-start justify-between gap-3">
              <div>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-brand-600 hover:underline dark:text-brand-400"
                >
                  {r.title}
                </a>
                {r.note && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{r.note}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {r.license && <span className="badge-muted">{r.license}</span>}
                <ExternalLink size={16} className="text-slate-400" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
