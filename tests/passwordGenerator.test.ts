import { describe, expect, it } from 'vitest'
import { calculateCombinations, generatePassword } from '../src/services/passwordGenerator'

describe('generatePassword', () => {
  it('returns the requested length', () => {
    const result = generatePassword({ length: 19, lowercase: true, uppercase: true, numbers: true, symbols: true })

    expect(result).toHaveLength(19)
  })

  it('uses only the selected character set', () => {
    const result = generatePassword({ length: 24, lowercase: false, uppercase: false, numbers: true, symbols: false })

    expect(result).toMatch(/^\d{24}$/)
  })

  it('rejects an invalid length and an empty alphabet', () => {
    expect(() => generatePassword({ length: 7, lowercase: true, uppercase: false, numbers: false, symbols: false })).toThrow(/entre 8 y 64/)
    expect(() => generatePassword({ length: 16, lowercase: false, uppercase: false, numbers: false, symbols: false })).toThrow(/al menos un conjunto/)
  })

  it('calculates the theoretical combination count with integer arithmetic', () => {
    expect(calculateCombinations(4, 10)).toBe(10_000n)
  })
})
