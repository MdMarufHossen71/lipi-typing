import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CircleCheck, Link2Off } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../i18n/I18nContext'
import { Button } from '../components/ui'
import { AuthShell, FormError, PasswordField } from '../components/auth/AuthShell'

export default function UpdatePasswordPage() {
  const { t } = useI18n()
  const { updatePassword, status } = useAuth()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [errorCode, setErrorCode] = useState<Parameters<typeof FormError>[0]['code'] | undefined>(undefined)
  const [fieldError, setFieldError] = useState<string | null>(null)

  // A recovery link opens a session; without one the link is expired/invalid.
  const hasRecoverySession = status === 'authed'

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErrorCode(undefined)
    setFieldError(null)
    if (password.length < 8) {
      setFieldError(t('auth.errPasswordShort'))
      return
    }
    if (confirm !== password) {
      setFieldError(t('auth.errPasswordMismatch'))
      return
    }
    setBusy(true)
    const res = await updatePassword(password)
    setBusy(false)
    if (!res.ok) {
      setErrorCode(res.errorCode)
      return
    }
    setDone(true)
  }

  if (!hasRecoverySession && status !== 'loading') {
    return (
      <AuthShell title={t('auth.updateTitle')}>
        <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
          <Link2Off size={18} className="mr-1.5 inline align-text-bottom" />
          {t('auth.expiredLink')}
        </div>
        <Link to="/forgot-password" className="btn-primary mt-5 w-full">
          {t('auth.tryAgain')}
        </Link>
      </AuthShell>
    )
  }

  return (
    <AuthShell title={t('auth.updateTitle')}>
      {done ? (
        <div className="space-y-5">
          <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
            <CircleCheck size={18} className="mr-1.5 inline align-text-bottom" />
            {t('auth.updated')}
          </div>
          <Link to="/account" className="btn-primary w-full">
            {t('account.title')}
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <PasswordField
            id="new-password"
            label={t('auth.newPassword')}
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            required
          />
          <PasswordField
            id="confirm-password"
            label={t('auth.confirmPassword')}
            value={confirm}
            onChange={setConfirm}
            autoComplete="new-password"
            required
          />
          {fieldError && (
            <p role="alert" className="text-xs text-red-600 dark:text-red-400">
              {fieldError}
            </p>
          )}
          <FormError code={errorCode} />
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? t('auth.updating') : t('auth.updateButton')}
          </Button>
        </form>
      )}
    </AuthShell>
  )
}
