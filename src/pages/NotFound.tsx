import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <>
      <Seo title={`${t('notfound.title')} — ${t('brand.name')}`} />
      <div className="container-page py-24 text-center">
        <div className="text-6xl font-extrabold text-brand-600">404</div>
        <h1 className="mt-4 text-2xl font-bold">{t('notfound.title')}</h1>
        <p className="mt-2 text-slate-500">{t('notfound.message')}</p>
        <Link to="/" className="btn-primary mt-6">
          {t('notfound.home')}
        </Link>
      </div>
    </>
  )
}
