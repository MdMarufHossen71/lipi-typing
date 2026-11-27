import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Session, SupabaseClient, User } from '@supabase/supabase-js'
import { isSupabaseConfigured, loadSupabase, requireClient } from '../lib/supabase'
import type { Database, ProfileRow } from '../lib/supabase'

export type AuthStatus = 'loading' | 'guest' | 'authed'

/** Stable error codes the UI maps to bilingual messages. */
export type AuthErrorCode =
  | 'invalid_credentials'
  | 'email_not_confirmed'
  | 'email_taken'
  | 'rate_limited'
  | 'weak_password'
  | 'network'
  | 'generic'

export interface AuthResult {
  ok: boolean
  /** Present when !ok. */
  errorCode?: AuthErrorCode
  /** Email confirmation is enabled and the user must verify before sign-in. */
  needsConfirmation?: boolean
}

interface AuthCtx {
  status: AuthStatus
  /** False when env vars are missing — the app then stays guest-only. */
  configured: boolean
  user: User | null
  profile: ProfileRow | null
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (email: string, password: string, fullName: string) => Promise<AuthResult>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<AuthResult>
  resetPassword: (email: string) => Promise<AuthResult>
  updatePassword: (password: string) => Promise<AuthResult>
  updateDisplayName: (name: string) => Promise<AuthResult>
}

const Ctx = createContext<AuthCtx | null>(null)

export function mapAuthError(err: { message?: string; status?: number } | null | undefined): AuthErrorCode {
  const msg = (err?.message ?? '').toLowerCase()
  const status = err?.status
  if (msg.includes('invalid login credentials')) return 'invalid_credentials'
  if (msg.includes('email not confirmed')) return 'email_not_confirmed'
  if (msg.includes('already registered') || msg.includes('already been registered')) return 'email_taken'
  if (status === 429 || msg.includes('too many requests') || msg.includes('rate limit')) return 'rate_limited'
  if (msg.includes('password should be at least') || msg.includes('password must be')) return 'weak_password'
  if (msg.includes('fetch') || msg.includes('network') || status === 0) return 'network'
  return 'generic'
}

const NOT_CONFIGURED: AuthResult = { ok: false, errorCode: 'generic' }

/** Load (or lazily create) the profile row for a user. */
async function loadProfile(client: SupabaseClient<Database> | null, user: User): Promise<ProfileRow | null> {
  const c = requireClient(client)
  const { data } = await c.from('profiles').select('*').eq('id', user.id).maybeSingle()
  if (data) return data
  // The handle_new_user trigger normally creates this; cover users created
  // before the migration or trigger failures.
  const fallbackName =
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split('@')[0] ||
    'User'
  const avatar = (user.user_metadata?.avatar_url as string | undefined) ?? null
  const { data: created, error } = await c
    .from('profiles')
    .upsert({ id: user.id, display_name: fallbackName, avatar_url: avatar })
    .select()
    .maybeSingle()
  if (error) return null
  return created ?? null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<ProfileRow | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setStatus('guest')
      return
    }
    let mounted = true
    let unsubscribe: (() => void) | undefined

    async function adoptSession(client: NonNullable<Awaited<ReturnType<typeof loadSupabase>>>, session: Session | null) {
      const u = session?.user ?? null
      setUser(u)
      if (!u) {
        setProfile(null)
        setStatus('guest')
        return
      }
      setStatus('authed')
      try {
        const p = await loadProfile(client, u)
        if (mounted) setProfile(p)
      } catch {
        /* profile stays null; UI falls back to email-derived name */
      }
    }

    // The Supabase chunk is fetched on first use only (guests never load it).
    loadSupabase().then((client) => {
      if (!client) {
        if (mounted) setStatus('guest')
        return
      }
      client.auth
        .getSession()
        .then(({ data }) => {
          if (mounted) void adoptSession(client, data.session)
        })
        .catch(() => {
          if (mounted) setStatus('guest')
        })

      const { data: sub } = client.auth.onAuthStateChange((_event, session) => {
        if (mounted) void adoptSession(client, session)
      })
      unsubscribe = () => sub.subscription.unsubscribe()
    })

    return () => {
      mounted = false
      unsubscribe?.()
    }
  }, [])

  async function signIn(email: string, password: string): Promise<AuthResult> {
    const client = await loadSupabase()
    if (!client) return NOT_CONFIGURED
    const { error } = await client.auth.signInWithPassword({ email, password })
    if (error) return { ok: false, errorCode: mapAuthError(error) }
    return { ok: true }
  }

  async function signUp(email: string, password: string, fullName: string): Promise<AuthResult> {
    const client = await loadSupabase()
    if (!client) return NOT_CONFIGURED
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback?type=signup`,
      },
    })
    if (error) return { ok: false, errorCode: mapAuthError(error) }
    // No session => email confirmation is enabled.
    return { ok: true, needsConfirmation: !data.session }
  }

  async function signOut(): Promise<void> {
    const client = await loadSupabase()
    if (!client) return
    await client.auth.signOut()
  }

  async function signInWithGoogle(): Promise<AuthResult> {
    const client = await loadSupabase()
    if (!client) return NOT_CONFIGURED
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) return { ok: false, errorCode: mapAuthError(error) }
    return { ok: true }
  }

  async function resetPassword(email: string): Promise<AuthResult> {
    const client = await loadSupabase()
    if (!client) return NOT_CONFIGURED
    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    })
    if (error) return { ok: false, errorCode: mapAuthError(error) }
    return { ok: true }
  }

  async function updatePassword(password: string): Promise<AuthResult> {
    const client = await loadSupabase()
    if (!client) return NOT_CONFIGURED
    const { error } = await client.auth.updateUser({ password })
    if (error) return { ok: false, errorCode: mapAuthError(error) }
    return { ok: true }
  }

  async function updateDisplayName(name: string): Promise<AuthResult> {
    const loaded = await loadSupabase()
    if (!loaded) return NOT_CONFIGURED
    const client = requireClient(loaded)
    const { error: authErr } = await client.auth.updateUser({ data: { full_name: name } })
    if (authErr) return { ok: false, errorCode: mapAuthError(authErr) }
    if (user) {
      const { error } = await client
        .from('profiles')
        .update({ display_name: name, updated_at: new Date().toISOString() })
        .eq('id', user.id)
      if (error) return { ok: false, errorCode: mapAuthError(error) }
      setProfile((p) => (p ? { ...p, display_name: name } : p))
    }
    return { ok: true }
  }

  const value = useMemo<AuthCtx>(
    () => ({
      status,
      configured: isSupabaseConfigured,
      user,
      profile,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      resetPassword,
      updatePassword,
      updateDisplayName,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status, user, profile],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth(): AuthCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

// Keep the Database type referenced for consumers of this module's profile type.
export type { Database }
