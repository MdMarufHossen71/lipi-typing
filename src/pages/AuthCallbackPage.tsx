import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { supabase } from '../lib/supabase'
import { AuthShell } from '../components/auth/AuthShell'

/**
 * OAuth / email-link callback (PKCE). Redirect targets:
 *  - ?type=recovery  → /update-password
 *  - ?type=signup    → /login (after email confirmation)
 *  - otherwise       → /account (OAuth sign-in)
 * Error params are surfaced instead of looping.
 */
export default function AuthCallbackPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const type = params.get('type')
    const oauthError = params.get('error_description') ?? params.get('error')
    const code = params.get('code')

    async function run() {
      if (oauthError) {
        if (!cancelled) setError(oauthError)
        return
      }
      if (!code) {
        // No code and no error — likely a stray visit; go home.
        navigate('/', { replace: true })
        return
      }
      if (!supabase) {
        if (!cancelled) setError('Supabase is not configured')
        return
      }
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      if (exchangeError) {
        if (!cancelled) setError(exchangeError.message)
        return
      }
      if (!cancelled) {
        navigate(type === 'recovery' ? '/update-password' : type === 'signup' ? '/login' : '/account', {
          replace: true,
        })
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [navigate, params])

  if (error) {
    return (
      <AuthShell title={t('auth.callbackError')}>
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
          <AlertTriangle size={18} className="mr-1.5 inline align-text-bottom" />
          {error}
        </div>
        <div className="mt-5 flex gap-2">
          <Link to="/login" className="btn-primary flex-1">
            {t('auth.tryAgain')}
          </Link>
          <Link to="/" className="btn-outline flex-1">
            {t('auth.backToHome')}
          </Link>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell title={t('brand.name')}>
      <p className="flex items-center justify-center gap-2 py-6 text-sm text-slate-500 dark:text-slate-400">
        <Loader2 size={16} className="animate-spin" /> {t('auth.callbackWorking')}
      </p>
    </AuthShell>
  )
}
