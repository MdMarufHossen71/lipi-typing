import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MailCheck } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../i18n/I18nContext'
import { Button } from '../components/ui'
import { AuthShell, FormError } from '../components/auth/AuthShell'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPasswordPage() {
  const { t } = useI18n()
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [errorCode, setErrorCode] = useState<Parameters<typeof FormError>[0]['code'] | undefined>(undefined)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setErrorCode('generic')
      return
    }
    setBusy(true)
    // Always show the sent notice on success; error codes otherwise.
    const res = await resetPassword(email.trim())
    setBusy(false)
    if (!res.ok) {
      setErrorCode(res.errorCode)
      return
    }
    setSent(true)
  }

  return (
    <AuthShell title={t('auth.resetTitle')} subtitle={t('auth.resetSubtitle')}>
      {sent ? (
        <div className="space-y-5">
          <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
            <MailCheck size={18} className="mr-1.5 inline align-text-bottom" />
            {t('auth.resetSent')}
          </div>
          <Link to="/login" className="btn-primary w-full">
            {t('auth.signIn')}
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="reset-email" className="label">
              {t('auth.email')}
            </label>
            <input
              id="reset-email"
              type="email"
              className="input"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <FormError code={errorCode} />
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? t('auth.sending') : t('auth.resetTitle')}
          </Button>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            {t('auth.haveAccount')}{' '}
            <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
              {t('auth.signIn')}
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  )
}
