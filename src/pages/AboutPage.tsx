import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { Card } from '../components/ui'
import { aboutFeatures, aboutParagraphs } from '../data/about'
import { references } from '../data/references'
import { Check } from 'lucide-react'

export default function AboutPage() {
  const { t, tr, lang } = useI18n()
  return (
    <>
      <Seo title={`${t('pages.about.title')} — ${t('brand.name')}`} description={t('pages.about.intro')} />
      <div className="container-page py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('pages.about.title')}</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t('pages.about.intro')}</p>

        <div className="mt-6 space-y-3">
          {aboutParagraphs.map((p, i) => (
            <p key={i} className="prose-bn text-slate-700 dark:text-slate-300">
              {tr(p)}
            </p>
          ))}
        </div>

        <Card className="mt-6">
          <h2 className="mb-3 text-lg font-semibold">
            {lang === 'bn' ? 'প্রযুক্তি ও বৈশিষ্ট্য' : 'Technology & features'}
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {aboutFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" /> {tr(f)}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="mt-4">
          <h2 className="mb-2 text-lg font-semibold">{t('nav.references')}</h2>
          <p className="text-sm text-slate-500">
            {t('pages.references.intro')}
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {references.slice(0, 5).map((r) => (
              <li key={r.url}>
                <a href={r.url} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline dark:text-brand-400">
                  {r.title}
                </a>
                {r.license && <span className="ml-2 text-xs text-slate-400">({r.license})</span>}
              </li>
            ))}
          </ul>
          <a href="/references" className="btn-ghost mt-3 text-sm">{t('nav.references')} →</a>
        </Card>
      </div>
    </>
  )
}
