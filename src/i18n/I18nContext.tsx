import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { bn } from './bn'
import { en } from './en'

export type Lang = 'bn' | 'en'

const dicts: Record<Lang, Record<string, string>> = { bn, en }
const STORAGE_KEY = 'lipi-lang'

interface I18nCtx {
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
  t: (key: string, vars?: Record<string, string | number>) => string
  tr: (value: { bn: string; en: string }) => string
}

const Ctx = createContext<I18nCtx | null>(null)

function detectInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'bn') return saved
  } catch {
    /* ignore */
  }
  return 'bn'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<I18nCtx>(
    () => ({
      lang,
      setLang: setLangState,
      toggleLang: () => setLangState((p) => (p === 'bn' ? 'en' : 'bn')),
      t: (key, vars) => {
        let s = dicts[lang][key] ?? dicts.bn[key] ?? key
        if (vars) {
          for (const k of Object.keys(vars)) {
            s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(vars[k]))
          }
        }
        return s
      },
      tr: (value) => value[lang] ?? value.bn,
    }),
    [lang],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n(): I18nCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
