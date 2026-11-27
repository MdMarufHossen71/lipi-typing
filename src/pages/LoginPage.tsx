import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../i18n/I18nContext'
import { Button } from '../components/ui'
import { AuthShell, FormError, GoogleButton, PasswordField } from '../components/auth/AuthShell'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginPage() {
  const { t } = useI18n()
  const { signIn, signInWithGoogle, configured, status } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/account'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [errorCode, setErrorCode] = useState<Parameters<typeof FormError>[0]['code'] | undefined>(undefined)
  const [emailError, setEmailError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErrorCode(undefined)
    if (!EMAIL_RE.test(email)) {
      setErrorCode('generic')
      setEmailError(t('auth.errEmailInvalid'))
      return
    }
    setEmailError(null)
    setBusy(true)
    const res = await signIn(email.trim(), password)
    setBusy(false)
    if (!res.ok) {
      setErrorCode(res.errorCode)
      return
    }
    navigate(from, { replace: true })
  }

  const working = busy || status === 'loading'

  return (
    <AuthShell title={t('auth.signInTitle')} subtitle={t('auth.signInSubtitle')}>
      {configured && (
        <GoogleButton
          onClick={async () => {
            const res = await signInWithGoogle()
            if (!res.ok) setErrorCode(res.errorCode)
            // Success navigates externally via OAuth redirect.
          }}
        />
      )}

      <form onSubmit={submit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="login-email" className="label">
            {t('auth.email')}
          </label>
          <input
            id="login-email"
            type="email"
            className="input"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(emailError)}
          />
          {emailError && (
            <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
              {emailError}
            </p>
          )}
        </div>
        <PasswordField
          id="login-password"
          label={t('auth.password')}
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          required
        />
        <FormError code={errorCode} />
        <Button type="submit" className="w-full" disabled={working}>
          {busy ? t('auth.signingIn') : t('auth.signIn')}
        </Button>
      </form>

      <div className="mt-4 flex items-center justify-between text-sm">
        <Link to="/forgot-password" className="text-slate-500 hover:text-brand-600 dark:hover:text-brand-400">
          {t('auth.forgotPassword')}
        </Link>
        <span className="text-slate-500 dark:text-slate-400">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
            {t('auth.signUp')}
          </Link>
        </span>
      </div>
    </AuthShell>
  )
}
