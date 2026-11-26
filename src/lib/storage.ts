// Lightweight localStorage wrapper with JSON serialization and a shared namespace.
// All Lipi data is prefixed with "lipi:" to avoid collisions.

const NS = 'lipi:'

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(NS + key)
    if (raw == null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value))
  } catch {
    /* ignore quota / private-mode errors */
  }
}

export function removeKey(key: string): void {
  try {
    localStorage.removeItem(NS + key)
  } catch {
    /* ignore */
  }
}
