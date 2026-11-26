import { Link } from 'react-router-dom'
import { Keyboard } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { learnNav, topNav } from '../data/nav'

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 text-white">
              <Keyboard size={16} />
            </span>
            {t('brand.name')}
          </div>
          <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
            {t('footer.tagline')}
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold">{t('footer.product')}</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-500 dark:text-slate-400">
            {topNav.slice(0, 4).map((it) => (
              <li key={it.to}>
                <Link to={it.to} className="hover:text-brand-600 dark:hover:text-brand-400">
                  {t(it.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">{t('footer.resources')}</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-500 dark:text-slate-400">
            {learnNav.slice(0, 4).map((it) => (
              <li key={it.to}>
                <Link to={it.to} className="hover:text-brand-600 dark:hover:text-brand-400">
                  {t(it.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/references" className="hover:text-brand-600 dark:hover:text-brand-400">
                {t('nav.references')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-page py-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="mb-1">{t('footer.disclaimer')}</p>
          <p>
            © {year} {t('brand.name')} · {t('footer.madeIn')} · MIT License
          </p>
        </div>
      </div>
    </footer>
  )
}
