import { act, cleanup, render, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthProvider, useAuth } from './AuthContext'
import { markLessonComplete, saveTestResult, resetAllProgress } from '../lib/progress'

// Stateful fake of the supabase module so AuthProvider works without network.
const fake = vi.hoisted(() => {
  const state = {
    session: null as { user: { id: string; email?: string; user_metadata: Record<string, unknown> } } | null,
    listeners: new Set<(event: string, session: unknown) => void>(),
    profiles: new Map<string, Record<string, unknown>>(),
    profileFetchFail: false,
  }
  const auth = {
    getSession: async () => ({ data: { session: state.session }, error: null }),
    onAuthStateChange(cb: (event: string, session: unknown) => void) {
      state.listeners.add(cb)
      return { data: { subscription: { unsubscribe: () => state.listeners.delete(cb) } } }
    },
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      if (email === 'known@test.com' && password === 'good-password') {
        state.session = { user: { id: 'u1', email, user_metadata: { full_name: 'Known' } } }
        for (const cb of state.listeners) cb('SIGNED_IN', state.session)
        return { data: { session: state.session, user: state.session.user }, error: null }
      }
      return { data: { session: null }, error: { message: 'Invalid login credentials', status: 400 } }
    },
    signUp: async () => ({
      data: { session: null, user: null },
      error: { message: 'overridden in test', status: 500 },
    }),
    signOut: async () => {
      state.session = null
      for (const cb of state.listeners) cb('SIGNED_OUT', null)
      return { error: null }
    },
    updateUser: async ({ data }: { data: Record<string, unknown> }) => {
      if (state.session) state.session.user.user_metadata = { ...state.session.user.user_metadata, ...data }
      return { error: null }
    },
  }
  const client = {
    auth,
    from(table: string) {
      if (table !== 'profiles') throw new Error('unexpected table: ' + table)
      return {
        select() {
          return {
            eq() {
              return {
                maybeSingle: async () => ({
                  data: state.profileFetchFail ? null : (state.profiles.get('u1') ?? null),
                  error: null,
                }),
              }
            },
          }
        },
        upsert(row: Record<string, unknown>) {
          return {
            select() {
              return {
                maybeSingle: async () => {
                  state.profiles.set(row.id as string, {
                    ...row,
                    created_at: '2026-01-01T00:00:00Z',
                    updated_at: '2026-01-01T00:00:00Z',
                  })
                  return { data: state.profiles.get(row.id as string), error: null }
                },
              }
            },
          }
        },
        update(row: Record<string, unknown>) {
          return {
            eq: async () => {
              const existing = state.profiles.get('u1') ?? {}
              state.profiles.set('u1', { ...existing, ...row })
              return { data: null, error: null }
            },
          }
        },
      }
    },
  }
  return { state, client }
})

vi.mock('../lib/supabase', () => ({
  isSupabaseConfigured: true,
  requireClient: (c: unknown) => {
    if (!c) throw new Error('Supabase is not configured')
    return c
  },
  loadSupabase: async () => fake.client,
}))

interface ProbeState {
  status: string
  userId: string | null
  profileName: string | null
  signIn: ReturnType<typeof useAuth>['signIn']
  signUp: ReturnType<typeof useAuth>['signUp']
  signOut: ReturnType<typeof useAuth>['signOut']
  updateDisplayName: ReturnType<typeof useAuth>['updateDisplayName']
}

function Host({ probe }: { probe: ProbeState }) {
  const ctx = useAuth()
  probe.status = ctx.status
  probe.userId = ctx.user?.id ?? null
  probe.profileName = ctx.profile?.display_name ?? null
  probe.signIn = ctx.signIn
  probe.signUp = ctx.signUp
  probe.signOut = ctx.signOut
  probe.updateDisplayName = ctx.updateDisplayName
  return null
}

describe('AuthContext (mocked Supabase)', () => {
  beforeEach(() => {
    localStorage.clear()
    fake.state.session = null
    fake.state.listeners.clear()
    fake.state.profiles.clear()
    fake.state.profileFetchFail = false
  })
  afterEach(() => {
    cleanup()
    resetAllProgress()
  })

  it('starts in guest mode without a session', async () => {
    const probe: ProbeState = {
      status: 'loading',
      userId: null,
      profileName: null,
      signIn: async () => ({ ok: false }),
      signUp: async () => ({ ok: false }),
      signOut: async () => undefined,
      updateDisplayName: async () => ({ ok: false }),
    }
    render(
      <AuthProvider>
        <Host probe={probe} />
      </AuthProvider>,
    )
    await waitFor(() => expect(probe.status).toBe('guest'))
    expect(probe.userId).toBeNull()
  })

  it('restores a session on mount and loads the profile', async () => {
    fake.state.session = { user: { id: 'u1', email: 'known@test.com', user_metadata: { full_name: 'Known' } } }
    fake.state.profiles.set('u1', {
      id: 'u1',
      display_name: 'Known',
      avatar_url: null,
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    })
    const probe: ProbeState = {
      status: 'loading',
      userId: null,
      profileName: null,
      signIn: async () => ({ ok: false }),
      signUp: async () => ({ ok: false }),
      signOut: async () => undefined,
      updateDisplayName: async () => ({ ok: false }),
    }
    render(
      <AuthProvider>
        <Host probe={probe} />
      </AuthProvider>,
    )
    await waitFor(() => expect(probe.status).toBe('authed'))
    expect(probe.userId).toBe('u1')
    expect(probe.profileName).toBe('Known')
  })

  it('creates the profile lazily when the trigger row is missing', async () => {
    fake.state.session = { user: { id: 'u1', email: 'known@test.com', user_metadata: { full_name: 'Known' } } }
    const probe: ProbeState = {
      status: 'loading',
      userId: null,
      profileName: null,
      signIn: async () => ({ ok: false }),
      signUp: async () => ({ ok: false }),
      signOut: async () => undefined,
      updateDisplayName: async () => ({ ok: false }),
    }
    render(
      <AuthProvider>
        <Host probe={probe} />
      </AuthProvider>,
    )
    await waitFor(() => expect(probe.profileName).toBe('Known'))
    expect(fake.state.profiles.has('u1')).toBe(true)
  })

  it('signs in with valid credentials and reports invalid ones', async () => {
    const probe: ProbeState = {
      status: 'loading',
      userId: null,
      profileName: null,
      signIn: async () => ({ ok: false }),
      signUp: async () => ({ ok: false }),
      signOut: async () => undefined,
      updateDisplayName: async () => ({ ok: false }),
    }
    render(
      <AuthProvider>
        <Host probe={probe} />
      </AuthProvider>,
    )
    await waitFor(() => expect(probe.status).toBe('guest'))

    const bad = await probe.signIn('known@test.com', 'wrong')
    expect(bad).toEqual({ ok: false, errorCode: 'invalid_credentials' })
    expect(probe.status).toBe('guest')

    const good = await probe.signIn('known@test.com', 'good-password')
    expect(good.ok).toBe(true)
    await waitFor(() => expect(probe.status).toBe('authed'))
    expect(probe.userId).toBe('u1')
  })

  it('maps weak-password sign-up errors to a stable code', async () => {
    const probe: ProbeState = {
      status: 'loading',
      userId: null,
      profileName: null,
      signIn: async () => ({ ok: false }),
      signUp: async () => ({ ok: false }),
      signOut: async () => undefined,
      updateDisplayName: async () => ({ ok: false }),
    }
    render(
      <AuthProvider>
        <Host probe={probe} />
      </AuthProvider>,
    )
    await waitFor(() => expect(probe.status).toBe('guest'))
    fake.client.auth.signUp = (async () => ({
      data: { session: null, user: null },
      error: { message: 'Password should be at least 8 characters', status: 400 },
    })) as unknown as typeof fake.client.auth.signUp
    const res = await probe.signUp('new@test.com', 'short', 'New')
    expect(res.errorCode).toBe('weak_password')
    expect(probe.status).toBe('guest')
  })

  it('signs out and returns to guest mode', async () => {
    const probe: ProbeState = {
      status: 'loading',
      userId: null,
      profileName: null,
      signIn: async () => ({ ok: false }),
      signUp: async () => ({ ok: false }),
      signOut: async () => undefined,
      updateDisplayName: async () => ({ ok: false }),
    }
    render(
      <AuthProvider>
        <Host probe={probe} />
      </AuthProvider>,
    )
    await waitFor(() => expect(probe.status).toBe('guest'))
    await act(async () => {
      await probe.signIn('known@test.com', 'good-password')
    })
    await waitFor(() => expect(probe.status).toBe('authed'))

    await act(async () => {
      await probe.signOut()
    })
    await waitFor(() => expect(probe.status).toBe('guest'))
    expect(probe.userId).toBeNull()
    expect(probe.profileName).toBeNull()
  })

  it('updates the display name through auth metadata and the profile row', async () => {
    fake.state.session = { user: { id: 'u1', email: 'known@test.com', user_metadata: { full_name: 'Known' } } }
    const probe: ProbeState = {
      status: 'loading',
      userId: null,
      profileName: null,
      signIn: async () => ({ ok: false }),
      signUp: async () => ({ ok: false }),
      signOut: async () => undefined,
      updateDisplayName: async () => ({ ok: false }),
    }
    render(
      <AuthProvider>
        <Host probe={probe} />
      </AuthProvider>,
    )
    await waitFor(() => expect(probe.status).toBe('authed'))
    await act(async () => {
      const res = await probe.updateDisplayName('Renamed')
      expect(res.ok).toBe(true)
    })
    await waitFor(() => expect(probe.profileName).toBe('Renamed'))
  })

  it('keeps local progress untouched by authentication transitions', async () => {
    const probe: ProbeState = {
      status: 'loading',
      userId: null,
      profileName: null,
      signIn: async () => ({ ok: false }),
      signUp: async () => ({ ok: false }),
      signOut: async () => undefined,
      updateDisplayName: async () => ({ ok: false }),
    }
    act(() => {
      markLessonComplete('avro:avro-1', 'bn')
      saveTestResult({
        lang: 'bn', method: 'avro', mode: 'timed', durationSec: 60, elapsedSec: 60,
        totalTyped: 100, correct: 95, incorrect: 5, accuracy: 95, cpm: 95, wpm: 19, target: 'x',
      })
    })
    render(
      <AuthProvider>
        <Host probe={probe} />
      </AuthProvider>,
    )
    await waitFor(() => expect(probe.status).toBe('guest'))
    await act(async () => {
      await probe.signIn('known@test.com', 'good-password')
    })
    await waitFor(() => expect(probe.status).toBe('authed'))
    await act(async () => {
      await probe.signOut()
    })
    // Local data survives sign-in and sign-out.
    expect(JSON.parse(localStorage.getItem('lipi:lesson-completions') ?? '[]')).toHaveLength(1)
    expect(JSON.parse(localStorage.getItem('lipi:test-history') ?? '[]')).toHaveLength(1)
  })
})
