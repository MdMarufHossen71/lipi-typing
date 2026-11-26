import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { TypingTest } from '../components/TypingTest'

export default function PracticePage() {
  const { t } = useI18n()
  return (
    <>
      <Seo title={`${t('pages.practice.title')} — ${t('brand.name')}`} description={t('pages.practice.intro')} />
      <TypingTest />
    </>
  )
}
