import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../i18n/I18nContext'
import { bn } from '../i18n/bn'
import type { Lesson } from '../data/lessons/types'
import { LessonView } from './LessonView'
const fixture: Lesson = {
  id: 'test-1',
  level: 'beginner',
  title: { bn: 'পরীক্ষা লেসন', en: 'Test lesson' },
  objectives: [{ bn: 'গ্রাফিম গণনা যাচাই', en: 'Verify grapheme counting' }],
  explanation: { bn: 'যুক্তাক্ষর একটি গ্রাফিম।', en: 'A conjunct is one grapheme.' },
  instructions: [{ bn: 'নিচের টেক্সট টাইপ করুন।', en: 'Type the text below.' }],
  mistakes: [],
  practiceText: { bn: 'ক্ষত', en: 'ক্ষত' },
}

function renderView() {
  return render(
    <MemoryRouter>
      <I18nProvider>
        <LessonView
          lesson={fixture}
          index={0}
          total={1}
          backTo="/learn-bangla"
          onComplete={() => {}}
          completed={false}
        />
      </I18nProvider>
    </MemoryRouter>,
  )
}

describe('LessonView practice box', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => localStorage.clear())

  it('counts Bangla graphemes, not UTF-16 units, for the done check', () => {
    renderView()
    const input = screen.getByLabelText('Practice input')
    const doneLabel = bn['lesson.practiceDone']

    // "ক্ষ" is one grapheme but 3 UTF-16 units; the target "ক্ষত" is 2 graphemes.
    // The old input.length check declared done here prematurely.
    fireEvent.change(input, { target: { value: 'ক্ষ' } })
    expect(screen.queryByText(doneLabel)).toBeNull()

    // Completing both graphemes marks the practice done.
    fireEvent.change(input, { target: { value: 'ক্ষত' } })
    expect(screen.getByText(doneLabel)).toBeTruthy()
  })

  it('links back to the configured track route, not the homepage', () => {
    renderView()
    const back = screen.getByRole('link', { name: new RegExp(bn['common.back']) })
    expect(back.getAttribute('href')).toBe('/learn-bangla')
  })
})
