// Supabase client — typed, nullable, browser-only (publishable key is safe to
// expose; Row Level Security enforces per-user data access server-side).
//
// When VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY are missing (local
// dev without credentials, or a deployment without the vars), the app degrades
// gracefully: auth UI is hidden and everything keeps working from localStorage.
import { createClient } from '@supabase/supabase-js'
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

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && publishableKey)

export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured
  ? createClient<Database>(url as string, publishableKey as string)
  : null

export function requireClient(): SupabaseClient<Database> {
  if (!supabase) throw new Error('Supabase is not configured')
  return supabase
}
