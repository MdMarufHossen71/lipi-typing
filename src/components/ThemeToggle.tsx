import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/ThemeContext'
import { useI18n } from '../i18n/I18nContext'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useI18n()
  return (
    <button
      onClick={toggle}
      className="btn-ghost p-2"
      aria-label={t('theme.toggle')}
      title={t('theme.toggle')}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
