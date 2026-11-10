// @vitest-environment jsdom
import { act, cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { BreachCheckResult } from '../src/services/breachChecker'
import App from '../src/App'
import { checkPasswordBreaches } from '../src/services/breachChecker'

vi.mock('../src/services/breachChecker', () => ({
  checkPasswordBreaches: vi.fn(),
}))

const mockedCheck = vi.mocked(checkPasswordBreaches)

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('PassGuard breach-check interface', () => {
  it('waits for an explicit click, announces loading, and shows the result', async () => {
    let resolveRequest: ((result: BreachCheckResult) => void) | undefined
    mockedCheck.mockReturnValue(new Promise((resolve) => { resolveRequest = resolve }))
    render(<App />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText('Contraseña de prueba'), 'entrada sintética de prueba')
    expect(mockedCheck).not.toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Comprobar con Pwned Passwords' }))

    expect(mockedCheck).toHaveBeenCalledOnce()
    expect(await screen.findByText('Consultando el rango de hashes…')).toBeTruthy()
    expect((screen.getByRole('button', { name: 'Consultando…' }) as HTMLButtonElement).disabled).toBe(true)

    await act(async () => resolveRequest?.({ found: true, count: 12 }))
    expect(await screen.findByText(/Encontrada 12 veces/)).toBeTruthy()
    expect(screen.getByText('Que no aparezca no garantiza que sea segura.')).toBeTruthy()
  })

  it('announces service errors accessibly', async () => {
    mockedCheck.mockRejectedValue(new Error('No fue posible conectar con Pwned Passwords.'))
    render(<App />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText('Contraseña de prueba'), 'entrada sintética de prueba')
    await user.click(screen.getByRole('button', { name: 'Comprobar con Pwned Passwords' }))

    expect((await screen.findByRole('alert')).textContent).toContain('No fue posible conectar con Pwned Passwords.')
  })

  it('shows a no-match result without claiming the password is safe', async () => {
    mockedCheck.mockResolvedValue({ found: false, count: 0 })
    render(<App />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText('Contraseña de prueba'), 'entrada sintetica sin coincidencia')
    await user.click(screen.getByRole('button', { name: 'Comprobar con Pwned Passwords' }))

    expect(await screen.findByText('No aparece en los hashes consultados.')).toBeTruthy()
    expect(screen.getByText('Que no aparezca no garantiza que sea segura.')).toBeTruthy()
  })

  it('toggles password visibility with an accessible button name', async () => {
    render(<App />)
    const user = userEvent.setup()
    const input = screen.getByLabelText('Contraseña de prueba') as HTMLInputElement

    expect(input.type).toBe('password')
    await user.click(screen.getByRole('button', { name: 'Mostrar contraseña' }))
    expect(input.type).toBe('text')
    await user.click(screen.getByRole('button', { name: 'Ocultar contraseña' }))
    expect(input.type).toBe('password')
  })

  it('starts keyboard navigation at the skip link', async () => {
    render(<App />)
    const user = userEvent.setup()

    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('link', { name: 'Saltar al contenido' }))
  })

  it('generates a password and copies it only after an explicit action', async () => {
    render(<App />)
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()

    await user.click(screen.getByRole('button', { name: 'Generar contraseña' }))
    const output = document.querySelector('.generated-value')?.textContent ?? ''
    expect(output).toHaveLength(16)
    expect((screen.getByRole('button', { name: 'Copiar' }) as HTMLButtonElement).disabled).toBe(false)
    expect(writeText).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: 'Copiar' }))
    expect(writeText).toHaveBeenCalledWith(output)
    const notice = await screen.findByText(/Copiada al portapapeles/)
    expect(notice.closest('[role="status"]')).toBeTruthy()
  })

  it('shows a comprehensible message when clipboard access is denied', async () => {
    render(<App />)
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('permission denied'))

    await user.click(screen.getByRole('button', { name: 'Generar contraseña' }))
    await user.click(screen.getByRole('button', { name: 'Copiar' }))

    expect(await screen.findByText('No se pudo copiar. Comprueba los permisos del navegador.')).toBeTruthy()
  })

  it('does not persist the entered value in browser storage', async () => {
    const localStorageWrite = vi.spyOn(window.localStorage, 'setItem')
    const sessionStorageWrite = vi.spyOn(window.sessionStorage, 'setItem')
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Contraseña de prueba'), 'entrada sintetica para revision')
    await waitFor(() => {
      expect((screen.getByRole('button', { name: /Crear alternativa segura/ }) as HTMLButtonElement).disabled).toBe(false)
    })

    expect(localStorageWrite).not.toHaveBeenCalled()
    expect(sessionStorageWrite).not.toHaveBeenCalled()
  })
})
