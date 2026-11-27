import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Keyboard, Menu, X } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { learnNav, mobileNavSections, moreNav, topNav } from '../data/nav'
import type { NavItem } from '../data/nav'
import { cn } from '../lib/utils'

function Dropdown({ label, items, active }: { label: string; items: NavItem[]; active: boolean }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc.pathname])
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm transition-colors',
          open
            ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200'
            : active
              ? 'bg-brand-50/70 text-brand-700 dark:bg-brand-900/20 dark:text-brand-200'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
        )}
        aria-expanded={open}
      >
        {label}
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <>
          <button className="fixed inset-0 z-30 cursor-default" onClick={() => setOpen(false)} aria-hidden tabIndex={-1} />
          <div className="absolute left-0 z-40 mt-1 w-52 animate-fadeIn rounded-xl border border-slate-200 bg-white p-1 shadow-card dark:border-slate-800 dark:bg-slate-900">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cn(
                    'block rounded-lg px-3 py-1.5 text-sm',
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800',
                  )
                }
              >
                {t(it.key)}
              </NavLink>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function Navbar() {
  const { t } = useI18n()
  const [mobileOpen, setMobileOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => setMobileOpen(false), [loc.pathname])

  // Slide-in drawer: Escape closes, background scrolling is locked while open.
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  const learnActive = learnNav.some((i) => i.to === loc.pathname)
  const moreActive = moreNav.some((i) => i.to === loc.pathname)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'rounded-lg px-2.5 py-1.5 text-sm transition-colors',
      isActive
        ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-200'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
    )

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <div className="container-page flex h-14 items-center gap-2">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-pop">
            <Keyboard size={18} />
          </span>
          <span className="text-base">{t('brand.name')}</span>
        </Link>

        <nav className="ml-3 hidden items-center gap-0.5 lg:flex" aria-label={t('nav.menu')}>
          {topNav.map((it) => (
            <NavLink key={it.to} to={it.to} className={linkClass}>
              {t(it.key)}
            </NavLink>
          ))}
          <Dropdown label={t('nav.learnBangla')} items={learnNav} active={learnActive} />
          <Dropdown label={t('nav.about')} items={moreNav} active={moreActive} />
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="btn-ghost p-2 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={t('nav.menu')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t('nav.menu')}>
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm animate-fadeIn"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] animate-slideIn overflow-y-auto border-l border-slate-200 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2 font-semibold">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 text-white">
                  <Keyboard size={15} />
                </span>
                {t('brand.name')}
              </span>
              <button className="btn-ghost p-2" onClick={() => setMobileOpen(false)} aria-label={t('nav.close')}>
                <X size={18} />
              </button>
            </div>
            {mobileNavSections.map((sec) => (
              <div key={sec.titleKey} className="mb-3">
                <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {t(sec.titleKey)}
                </div>
                {sec.items.map((it) => (
                  <NavLink key={it.to} to={it.to} className={linkClass}>
                    <span className="block px-3 py-2">{t(it.key)}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
