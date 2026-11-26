import { ExternalLink } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { Card } from '../components/ui'
import { bijoyBayannoGuide } from '../data/bijoyBayannoGuide'

export default function BijoyBayannoPage() {
  const { t, tr } = useI18n()
  return (
    <>
      <Seo title={`${t('pages.bayanno.title')} — ${t('brand.name')}`} description={t('pages.bayanno.intro')} />
      <div className="container-page py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('pages.bayanno.title')}</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t('pages.bayanno.intro')}</p>
        <a
          href="https://www.bijoyekushe.net.bd/"
          target="_blank"
          rel="noreferrer"
          className="btn-outline mt-4 inline-flex"
        >
          <ExternalLink size={16} /> bijoyekushe.net.bd
        </a>

        <div className="mt-6 space-y-4">
          {bijoyBayannoGuide.map((sec, i) => (
            <Card key={i}>
              <h2 className="text-lg font-semibold">{tr(sec.title)}</h2>
              <div className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {sec.body.map((p, j) => (
                  <p key={j} className="prose-bn">{tr(p)}</p>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
