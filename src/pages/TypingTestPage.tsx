import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { TypingTest } from '../components/TypingTest'

export default function TypingTestPage() {
  const { t } = useI18n()
  return (
    <>
      <Seo title={`${t('test.title')} — ${t('brand.name')}`} description={t('test.subtitle')} />
      <TypingTest />
    </>
  )
}
