// Vitest global setup.
// jsdom provides a DOM environment for component tests.
//
// Security/isolation: the developer's real .env.local (if present) is loaded
// by Vitest's env handling. Stubbing the Supabase vars to empty keeps every
// test in guest/mocked paths — no test may ever touch the real project.
// (vi.stubEnv restores automatically after each test.)
import { beforeEach, vi } from 'vitest'

beforeEach(() => {
  vi.stubEnv('VITE_SUPABASE_URL', '')
  vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', '')
})
