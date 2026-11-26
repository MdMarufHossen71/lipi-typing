import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { Card } from '../components/ui'
import { faqItems } from '../data/faq'

export default function FAQPage() {
  const { t, tr } = useI18n()
  return (
    <>
      <Seo title={`${t('pages.faq.title')} — ${t('brand.name')}`} description={t('pages.faq.intro')} />
      <div className="container-page py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('pages.faq.title')}</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t('pages.faq.intro')}</p>

        <div className="mt-6 space-y-3">
          {faqItems.map((item, i) => (
            <Card key={i}>
              <h2 className="font-semibold">{tr(item.q)}</h2>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{tr(item.a)}</p>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
