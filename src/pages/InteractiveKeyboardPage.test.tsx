import { render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { I18nProvider } from '../i18n/I18nContext'
import InteractiveKeyboardPage from './InteractiveKeyboardPage'

function renderPage() {
  return render(
    <I18nProvider>
      <InteractiveKeyboardPage />
    </I18nProvider>,
  )
}

describe('InteractiveKeyboardPage keyboard accessibility', () => {
  afterEach(() => renderPage().unmount())

  it('does not block Tab key behaviour', () => {
    renderPage()
    const event = new KeyboardEvent('keydown', { code: 'Tab', bubbles: true, cancelable: true })
    document.body.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
  })

  it('does not block Space key behaviour', () => {
    renderPage()
    const event = new KeyboardEvent('keydown', { code: 'Space', bubbles: true, cancelable: true })
    document.body.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
  })

  it('ignores key events originating from text fields', () => {
    const { container } = renderPage()
    const field = document.createElement('textarea')
    container.appendChild(field)
    const event = new KeyboardEvent('keydown', { code: 'KeyA', bubbles: true, cancelable: true })
    field.dispatchEvent(event)
    // No crash and no default prevention — the highlight state simply skips it.
    expect(event.defaultPrevented).toBe(false)
  })
})
