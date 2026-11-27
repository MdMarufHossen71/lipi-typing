import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../i18n/I18nContext'
import { AuthProvider } from '../contexts/AuthContext'
import { bn } from '../i18n/bn'
import RegisterPage from '../pages/RegisterPage'

function renderRegister() {
  return render(
    <MemoryRouter>
      <I18nProvider>
        <AuthProvider>
          <RegisterPage />
        </AuthProvider>
      </I18nProvider>
    </MemoryRouter>,
  )
}

describe('RegisterPage validation', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => localStorage.clear())

  it('blocks submission with per-field errors when everything is empty', () => {
    renderRegister()
    fireEvent.click(screen.getByRole('button', { name: bn['auth.signUp'] }))
    expect(screen.getByText(bn['auth.errNameRequired'])).toBeTruthy()
    expect(screen.getByText(bn['auth.errEmailRequired'])).toBeTruthy()
    expect(screen.getByText(bn['auth.errPasswordRequired'])).toBeTruthy()
  })

  it('rejects an invalid email and a short password', () => {
    renderRegister()
    fireEvent.change(screen.getByLabelText(bn['auth.fullName']), { target: { value: 'Maruf' } })
    fireEvent.change(screen.getByLabelText(bn['auth.email']), { target: { value: 'not-an-email' } })
    fireEvent.change(screen.getByLabelText(bn['auth.password']), { target: { value: 'abc' } })
    fireEvent.change(screen.getByLabelText(bn['auth.confirmPassword']), { target: { value: 'abc' } })
    fireEvent.click(screen.getByRole('button', { name: bn['auth.signUp'] }))
    expect(screen.getByText(bn['auth.errEmailInvalid'])).toBeTruthy()
    expect(screen.getByText(bn['auth.errPasswordShort'])).toBeTruthy()
  })

  it('rejects mismatched confirmation passwords', () => {
    renderRegister()
    fireEvent.change(screen.getByLabelText(bn['auth.fullName']), { target: { value: 'Maruf' } })
    fireEvent.change(screen.getByLabelText(bn['auth.email']), { target: { value: 'a@b.com' } })
    fireEvent.change(screen.getByLabelText(bn['auth.password']), { target: { value: 'longenough1' } })
    fireEvent.change(screen.getByLabelText(bn['auth.confirmPassword']), { target: { value: 'different1' } })
    fireEvent.click(screen.getByRole('button', { name: bn['auth.signUp'] }))
    expect(screen.getByText(bn['auth.errPasswordMismatch'])).toBeTruthy()
    expect(screen.queryByText(bn['auth.errPasswordShort'])).toBeNull()
  })
})
