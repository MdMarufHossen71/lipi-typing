import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Keyboard, Menu, X } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { learnNav, mobileNavSections, moreNav, topNav } from '../data/nav'
import type { NavItem } from '../data/nav'
import { cn } from '../lib/utils'

function Dropdown({ label, items }: { label: string; items: NavItem[] }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc.pathname])
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        aria-expanded={open}
      >
        {label}
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <>
          <button className="fixed inset-0 z-30 cursor-default" onClick={() => setOpen(false)} aria-hidden tabIndex={-1} />
          <div className="absolute left-0 z-40 mt-1 w-52 animate-fadeIn rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-800 dark:bg-slate-900">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cn(
                    'block rounded-md px-3 py-1.5 text-sm',
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

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'rounded-md px-2.5 py-1.5 text-sm',
      isActive
        ? 'text-brand-700 dark:text-brand-300'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
    )

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <div className="container-page flex h-14 items-center gap-2">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
            <Keyboard size={18} />
          </span>
          <span className="text-base">{t('brand.name')}</span>
        </Link>

        <nav className="ml-3 hidden items-center gap-0.5 lg:flex">
          {topNav.map((it) => (
            <NavLink key={it.to} to={it.to} className={linkClass}>
              {t(it.key)}
            </NavLink>
          ))}
          <Dropdown label={t('nav.learnBangla')} items={learnNav} />
          <Dropdown label={t('nav.about')} items={moreNav} />
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

      {mobileOpen && (
        <div className="lg:hidden">
          <div className="container-page max-h-[78vh] overflow-y-auto py-3">
            {mobileNavSections.map((sec) => (
              <div key={sec.titleKey} className="mb-2">
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
