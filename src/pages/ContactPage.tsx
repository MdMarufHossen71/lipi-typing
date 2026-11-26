import { useState } from 'react'
import { Send } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { Seo } from '../components/Seo'
import { Button, Card } from '../components/ui'

export default function ContactPage() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  return (
    <>
      <Seo title={`${t('pages.contact.title')} — ${t('brand.name')}`} description={t('pages.contact.intro')} />
      <div className="container-page py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('pages.contact.title')}</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{t('pages.contact.intro')}</p>

        <Card className="mt-6 max-w-xl">
          {sent ? (
            <p className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
              {t('pages.contact.sent')}
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="space-y-3"
            >
              <div>
                <label className="mb-1 block text-sm font-medium">{t('pages.contact.name')}</label>
                <input
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">{t('pages.contact.email')}</label>
                <input
                  type="email"
                  className="input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">{t('pages.contact.message')}</label>
                <textarea
                  className="input"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit">
                <Send size={16} /> {t('pages.contact.send')}
              </Button>
              <p className="text-xs text-slate-400">{t('pages.contact.note')}</p>
            </form>
          )}
        </Card>
      </div>
    </>
  )
}
