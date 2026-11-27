import { useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { Eye, EyeOff, Keyboard } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext'
import type { AuthErrorCode } from '../../contexts/AuthContext'
import { cn } from '../../lib/utils'

/** Centered card shell shared by all auth pages. */
export function AuthShell({
  title,
  subtitle,
  children,
  wide,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  wide?: boolean
}) {
  return (
    <div className="container-page flex justify-center py-10 sm:py-14">
      <div className={cn('card w-full p-6 sm:p-8', wide ? 'max-w-lg' : 'max-w-md')}>
        <div className="mb-6 text-center">
          <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-pop">
            <Keyboard size={20} />
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

/** Password input with a show/hide toggle. */
export function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  required,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  autoComplete?: string
  required?: boolean
}) {
  const { t } = useI18n()
  const [show, setShow] = useState(false)
  function toggle(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setShow((s) => !s)
    }
  }
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          className="input pr-10"
          value={value}
          required={required}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          onKeyDown={toggle}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          aria-label={show ? t('auth.hidePassword') : t('auth.showPassword')}
          aria-pressed={show}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  )
}

const ERROR_KEYS: Record<AuthErrorCode, string> = {
  invalid_credentials: 'auth.errInvalidCredentials',
  email_not_confirmed: 'auth.errEmailNotConfirmed',
  email_taken: 'auth.errEmailTaken',
  rate_limited: 'auth.errRateLimited',
  weak_password: 'auth.errWeakPassword',
  network: 'auth.errNetwork',
  generic: 'auth.errGeneric',
}

export function errKey(code: AuthErrorCode | undefined): string {
  return ERROR_KEYS[code ?? 'generic']
}

export function FormError({ code }: { code?: AuthErrorCode }) {
  const { t } = useI18n()
  if (!code) return null
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
      {t(errKey(code))}
    </p>
  )
}

export function GoogleButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  const { t } = useI18n()
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="btn-outline w-full"
      >
        <svg aria-hidden width="16" height="16" viewBox="0 0 48 48" className="shrink-0">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
        {t('auth.googleButton')}
      </button>
      <div className="my-4 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        {t('auth.orEmail')}
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>
    </>
  )
}
