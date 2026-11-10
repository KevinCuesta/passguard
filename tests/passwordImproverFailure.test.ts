import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/services/passwordGenerator', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/services/passwordGenerator')>()
  return { ...actual, generatePassword: vi.fn() }
})

import { improvePassword } from '../src/services/passwordImprover'
import { generatePassword } from '../src/services/passwordGenerator'

const mockedGenerate = vi.mocked(generatePassword)

describe('improvePassword retry limits', () => {
  beforeEach(() => mockedGenerate.mockReset())

  it('stops after the bounded retries when generated candidates stay weak', () => {
    mockedGenerate.mockReturnValue('r'.repeat(24))

    expect(() => improvePassword('entrada sintetica')).toThrow(/No fue posible obtener una alternativa/)
    expect(mockedGenerate).toHaveBeenCalledTimes(8)
  })

  it('does not evaluate or return the unchanged input as a replacement', () => {
    const original = 'entrada sintetica para evaluar'
    mockedGenerate.mockReturnValue(original)

    expect(() => improvePassword(original)).toThrow(/No fue posible obtener una alternativa/)
    expect(mockedGenerate).toHaveBeenCalledTimes(8)
  })
})
