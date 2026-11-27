import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../i18n/I18nContext'
import { Button } from '../components/ui'
import { AuthShell, FormError, GoogleButton, PasswordField } from '../components/auth/AuthShell'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function RegisterPage() {
  const { t } = useI18n()
  const { signUp, signInWithGoogle, configured } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [errorCode, setErrorCode] = useState<Parameters<typeof FormError>[0]['code'] | undefined>(undefined)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [confirmationSent, setConfirmationSent] = useState(false)

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!fullName.trim()) errs.name = t('auth.errNameRequired')
    if (!email.trim()) errs.email = t('auth.errEmailRequired')
    else if (!EMAIL_RE.test(email)) errs.email = t('auth.errEmailInvalid')
    if (!password) errs.password = t('auth.errPasswordRequired')
    else if (password.length < 8) errs.password = t('auth.errPasswordShort')
    if (confirm !== password) errs.confirm = t('auth.errPasswordMismatch')
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErrorCode(undefined)
    if (!validate()) return
    setBusy(true)
    const res = await signUp(email.trim(), password, fullName.trim())
    setBusy(false)
    if (!res.ok) {
      setErrorCode(res.errorCode)
      return
    }
    if (res.needsConfirmation) {
      setConfirmationSent(true)
      return
    }
    navigate('/account', { replace: true })
  }

  if (confirmationSent) {
    return (
      <AuthShell title={t('auth.signUpTitle')}>
        <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
          <CheckCircle2 size={18} className="mr-1.5 inline align-text-bottom" />
          {t('auth.confirmationSent')}
        </div>
        <Link to="/login" className="btn-primary mt-5 w-full">
          {t('auth.signIn')}
        </Link>
      </AuthShell>
    )
  }

  return (
    <AuthShell title={t('auth.signUpTitle')} subtitle={t('auth.signUpSubtitle')}>
      {configured && (
        <GoogleButton
          onClick={async () => {
            const res = await signInWithGoogle()
            if (!res.ok) setErrorCode(res.errorCode)
          }}
        />
      )}

      <form onSubmit={submit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="reg-name" className="label">
            {t('auth.fullName')}
          </label>
          <input
            id="reg-name"
            type="text"
            className="input"
            value={fullName}
            autoComplete="name"
            onChange={(e) => setFullName(e.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
          />
          {fieldErrors.name && (
            <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="reg-email" className="label">
            {t('auth.email')}
          </label>
          <input
            id="reg-email"
            type="email"
            className="input"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
          />
          {fieldErrors.email && (
            <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
              {fieldErrors.email}
            </p>
          )}
        </div>
        <PasswordField
          id="reg-password"
          label={t('auth.password')}
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          required
        />
        {fieldErrors.password && (
          <p role="alert" className="text-xs text-red-600 dark:text-red-400">
            {fieldErrors.password}
          </p>
        )}
        <PasswordField
          id="reg-confirm"
          label={t('auth.confirmPassword')}
          value={confirm}
          onChange={setConfirm}
          autoComplete="new-password"
          required
        />
        {fieldErrors.confirm && (
          <p role="alert" className="text-xs text-red-600 dark:text-red-400">
            {fieldErrors.confirm}
          </p>
        )}
        <FormError code={errorCode} />
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? t('auth.creating') : t('auth.signUp')}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
        {t('auth.haveAccount')}{' '}
        <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
          {t('auth.signIn')}
        </Link>
      </p>
    </AuthShell>
  )
}
