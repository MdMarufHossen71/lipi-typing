import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { I18nProvider } from '../i18n/I18nContext'
import { bn } from '../i18n/bn'
import { PracticeSession } from './PracticeSession'

function renderPractice() {
  return render(
    <I18nProvider>
      <PracticeSession />
    </I18nProvider>,
  )
}

describe('PracticeSession (casual mode)', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => localStorage.clear())

  it('never writes to the test history', () => {
    renderPractice()
    const input = screen.getByLabelText(bn['test.typeHere'])
    fireEvent.change(input, { target: { value: 'আমি বাংলা টাইপ করি।' } })
    fireEvent.change(input, { target: { value: '' } })
    expect(localStorage.getItem('lipi:test-history')).toBeNull()
  })

  it('loads a new drill without keeping the old input', () => {
    renderPractice()
    const input = screen.getByLabelText(bn['test.typeHere'])
    fireEvent.change(input, { target: { value: 'some text' } })
    fireEvent.click(screen.getByRole('button', { name: bn['practice.newDrill'] }))
    expect((input as HTMLTextAreaElement).value).toBe('')
  })

  it('offers a free-typing box that also saves nothing', () => {
    renderPractice()
    fireEvent.click(screen.getByRole('radio', { name: bn['practice.free'] }))
    const free = screen.getByLabelText(bn['practice.free'])
    fireEvent.change(free, { target: { value: 'the quick brown fox' } })
    expect(localStorage.getItem('lipi:test-history')).toBeNull()
    expect(screen.getByLabelText(bn['practice.free'])).toBeTruthy()
  })
})
