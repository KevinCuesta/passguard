import { afterEach, describe, expect, it, vi } from 'vitest'
import { calculateCombinations, formatCombinations, generatePassword, getAlphabetSize } from '../src/services/passwordGenerator'

describe('generatePassword', () => {
  afterEach(() => vi.restoreAllMocks())

  it('generates the default application length', () => {
    const result = generatePassword({ length: 16, lowercase: true, uppercase: true, numbers: true, symbols: true })

    expect(result).toHaveLength(16)
  })

  it('returns the requested length', () => {
    const result = generatePassword({ length: 19, lowercase: true, uppercase: true, numbers: true, symbols: true })

    expect(result).toHaveLength(19)
  })

  it('uses only the selected character set', () => {
    const result = generatePassword({ length: 24, lowercase: false, uppercase: false, numbers: true, symbols: false })

    expect(result).toMatch(/^\d{24}$/)
  })

  it('uses cryptographic randomness without calling Math.random', () => {
    const weakRandom = vi.spyOn(Math, 'random')

    generatePassword({ length: 24, lowercase: true, uppercase: true, numbers: true, symbols: true })

    expect(weakRandom).not.toHaveBeenCalled()
  })

  it('rejects an invalid length and an empty alphabet', () => {
    expect(() => generatePassword({ length: 7, lowercase: true, uppercase: false, numbers: false, symbols: false })).toThrow(/entre 8 y 64/)
    expect(() => generatePassword({ length: 16, lowercase: false, uppercase: false, numbers: false, symbols: false })).toThrow(/al menos un conjunto/)
  })

  it('calculates the theoretical combination count with integer arithmetic', () => {
    expect(calculateCombinations(4, 10)).toBe(10_000n)
    expect(formatCombinations(10_000n)).toMatch(/10/)
    expect(getAlphabetSize({ length: 16, lowercase: false, uppercase: false, numbers: false, symbols: false })).toBe(0)
    expect(() => calculateCombinations(0, 10)).toThrow(/deben ser positivos/)
  })

  it('rejects the incomplete tail of a byte range to avoid modulo bias', () => {
    const samples = [253, 0, 1, 2, 3, 4, 5, 6, 7]
    let sampleIndex = 0
    const randomBytes = vi.spyOn(globalThis.crypto, 'getRandomValues').mockImplementation((array) => {
      ;(array as Uint8Array)[0] = samples[sampleIndex++]
      return array
    })

    const result = generatePassword({ length: 8, lowercase: false, uppercase: false, numbers: false, symbols: true })

    expect(result[0]).toBe('!')
    expect(randomBytes).toHaveBeenCalledTimes(9)
  })
})
