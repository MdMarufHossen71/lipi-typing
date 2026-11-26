import { Languages } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'

export function LanguageSwitcher() {
  const { lang, toggleLang } = useI18n()
  return (
    <button
      onClick={toggleLang}
      className="btn-ghost gap-1.5 px-2"
      aria-label="Language"
      title={lang === 'bn' ? 'English' : 'বাংলা'}
    >
      <Languages size={18} />
      <span className="text-sm font-medium">{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
    </button>
  )
}
