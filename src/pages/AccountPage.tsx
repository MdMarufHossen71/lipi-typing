import { useState } from 'react'
import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { CheckCircle2, CloudUpload, Loader2, LogOut, Mail, UserRound } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../i18n/I18nContext'
import { migrateLocalProgress } from '../lib/cloudSync'
import type { MigrationSummary } from '../lib/cloudSync'
import { Button, Card } from '../components/ui'
import { Seo } from '../components/Seo'
import { AuthShell } from '../components/auth/AuthShell'
import { formatDate } from '../lib/utils'

/** Route guard: only signed-in users reach the wrapped page. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { status, configured } = useAuth()
  const location = useLocation()
  if (!configured) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, unconfigured: true }}
      />
    )
  }
  if (status === 'loading') {
    return (
      <div className="container-page py-24 text-center text-sm text-slate-400">
        <Loader2 size={20} className="mx-auto animate-spin" />
      </div>
    )
  }
  if (status === 'guest') {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return <>{children}</>
}

function AccountInner() {
  const { t } = useI18n()
  const { user, profile, signOut, updateDisplayName } = useAuth()
  const [name, setName] = useState(profile?.display_name ?? '')
  const [saveState, setSaveState] = useState<'idle' | 'busy' | 'done'>('idle')
  const [syncState, setSyncState] = useState<
    { kind: 'idle' } | { kind: 'busy' } | { kind: 'done'; summary: MigrationSummary } | { kind: 'nothing' } | { kind: 'error'; message: string }
  >({ kind: 'idle' })

  const displayName = profile?.display_name || user?.email?.split('@')[0] || '?'
  const initial = displayName.trim().charAt(0).toUpperCase()

  async function saveName(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || name.trim() === profile?.display_name) return
    setSaveState('busy')
    const res = await updateDisplayName(name.trim())
    setSaveState(res.ok ? 'done' : 'idle')
    if (res.ok) setTimeout(() => setSaveState('idle'), 1500)
  }

  async function runSync() {
    if (!user) return
    setSyncState({ kind: 'busy' })
    try {
      const summary = await migrateLocalProgress(user.id)
      const nothing =
        summary.resultsMigrated === 0 &&
        summary.lessonsMigrated === 0 &&
        summary.errors.length === 0
      setSyncState(nothing ? { kind: 'nothing' } : { kind: 'done', summary })
    } catch (err) {
      setSyncState({
        kind: 'error',
        message: err instanceof Error ? err.message : t('auth.errGeneric'),
      })
    }
  }

  return (
    <div className="container-page py-8">
      <Seo title={`${t('account.title')} — ${t('brand.name')}`} />
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-xl font-bold text-white shadow-pop">
            {initial}
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{t('account.title')}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
          </div>
        </div>

        <Card>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <UserRound size={15} className="text-brand-600 dark:text-brand-300" />
            {t('account.profile')}
          </h2>
          <form onSubmit={saveName} className="space-y-4">
            <div>
              <label htmlFor="display-name" className="label">
                {t('account.displayName')}
              </label>
              <div className="flex gap-2">
                <input
                  id="display-name"
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
                <Button type="submit" disabled={saveState === 'busy' || !name.trim()}>
                  {saveState === 'busy' ? t('account.saving') : t('account.save')}
                </Button>
              </div>
              {saveState === 'done' && (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={13} /> {t('account.saved')}
                </p>
              )}
            </div>
            <div>
              <div className="label">{t('account.email')}</div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
                <Mail size={14} /> {user?.email}
              </div>
            </div>
            {profile?.created_at && (
              <p className="text-xs text-slate-400">
                {t('account.memberSince')}: {formatDate(profile.created_at)}
              </p>
            )}
          </form>
        </Card>

        <Card>
          <h2 className="mb-1 flex items-center gap-2 text-sm font-semibold">
            <CloudUpload size={15} className="text-brand-600 dark:text-brand-300" />
            {t('account.syncTitle')}
          </h2>
          <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">{t('account.syncDesc')}</p>

          {syncState.kind === 'done' && (
            <p className="mb-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
              {t('account.syncDone', {
                results: syncState.summary.resultsMigrated,
                lessons: syncState.summary.lessonsMigrated,
                skipped: syncState.summary.resultsSkipped + syncState.summary.lessonsSkipped,
              })}
              {syncState.summary.errors.length > 0 &&
                ' ' + t('account.syncPartial', { errors: syncState.summary.errors.join('; ') })}
            </p>
          )}
          {syncState.kind === 'nothing' && (
            <p className="mb-3 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
              {t('account.syncNothing')}
            </p>
          )}
          {syncState.kind === 'error' && (
            <p role="alert" className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
              {syncState.message}
            </p>
          )}

          <Button onClick={runSync} disabled={syncState.kind === 'busy'}>
            {syncState.kind === 'busy' ? (
              <>
                <Loader2 size={15} className="animate-spin" /> {t('account.syncing')}
              </>
            ) : (
              <>
                <CloudUpload size={15} /> {t('account.syncNow')}
              </>
            )}
          </Button>
          <p className="mt-3 text-xs text-slate-400">{t('account.localNote')}</p>
        </Card>

        <Card className="border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('account.authNote')}</p>
          <Button variant="outline" className="mt-3" onClick={() => void signOut()}>
            <LogOut size={15} /> {t('auth.signOut')}
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default function AccountPage() {
  return (
    <RequireAuth>
      <AccountInner />
    </RequireAuth>
  )
}
