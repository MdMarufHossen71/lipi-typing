// Supabase client — typed, browser-only (publishable key is safe to
// expose; Row Level Security enforces per-user data access server-side).
//
// The @supabase/supabase-js import is dynamic (see loadSupabase below) —
// only a type import appears at the top of this module.
import type { SupabaseClient } from '@supabase/supabase-js'

// Row shapes are `type` aliases (not interfaces): supabase-js's generic
// constraints use Record<string, unknown>, and interfaces — which lack
// implicit index signatures — silently resolve to never in query builders.
export type ProfileRow = {
  id: string
  display_name: string
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export type TypingResultRow = {
  id: string
  user_id: string
  legacy_id: string | null
  language: 'bn' | 'en'
  typing_method: 'avro' | 'bijoy' | 'english'
  typing_mode: 'timed' | 'fixed' | 'word' | 'sentence' | 'beginner' | 'advanced'
  duration_seconds: number
  elapsed_seconds: number
  total_typed: number
  correct: number
  incorrect: number
  accuracy: number
  cpm: number
  wpm: number
  target: string | null
  created_at: string
}

export type LessonProgressRow = {
  id: string
  user_id: string
  lesson_id: string
  language: 'bn' | 'en'
  completed_at: string
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow
        Insert: {
          id: string
          display_name?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          display_name?: string
          avatar_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      typing_results: {
        Row: TypingResultRow
        Insert: {
          id?: string
          user_id: string
          legacy_id?: string | null
          language: 'bn' | 'en'
          typing_method: 'avro' | 'bijoy' | 'english'
          typing_mode: 'timed' | 'fixed' | 'word' | 'sentence' | 'beginner' | 'advanced'
          duration_seconds?: number
          elapsed_seconds: number
          total_typed: number
          correct: number
          incorrect: number
          accuracy: number
          cpm: number
          wpm: number
          target?: string | null
          created_at?: string
        }
        Update: {
          user_id?: string
          legacy_id?: string | null
          language?: 'bn' | 'en'
          typing_method?: 'avro' | 'bijoy' | 'english'
          typing_mode?: 'timed' | 'fixed' | 'word' | 'sentence' | 'beginner' | 'advanced'
          duration_seconds?: number
          elapsed_seconds?: number
          total_typed?: number
          correct?: number
          incorrect?: number
          accuracy?: number
          cpm?: number
          wpm?: number
          target?: string | null
          created_at?: string
        }
        Relationships: []
      }
      lesson_progress: {
        Row: LessonProgressRow
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          language: 'bn' | 'en'
          completed_at: string
          created_at?: string
        }
        Update: {
          user_id?: string
          lesson_id?: string
          language?: 'bn' | 'en'
          completed_at?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Supabase client — LAZY-LOADED. @supabase/supabase-js is ~240 KB minified;
// importing it statically pulled it into the main chunk for every visitor.
// It now lives in its own async chunk, fetched only when the env vars exist
// AND auth/cloud features are actually used (guests never download it).

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && publishableKey)

let clientPromise: Promise<SupabaseClient<Database> | null> | null = null

/** Load (and memoise) the Supabase client. Resolves to null when unconfigured
 * — callers must treat that as "guest mode, no cloud". */
export function loadSupabase(): Promise<SupabaseClient<Database> | null> {
  if (!isSupabaseConfigured) return Promise.resolve(null)
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient<Database>(url as string, publishableKey as string),
    )
  }
  return clientPromise
}

export function requireClient(client: SupabaseClient<Database> | null): SupabaseClient<Database> {
  if (!client) throw new Error('Supabase is not configured')
  return client
}
