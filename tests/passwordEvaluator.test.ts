import { describe, expect, it } from 'vitest'
import { evaluatePassword } from '../src/services/passwordEvaluator'
import { generatePassword } from '../src/services/passwordGenerator'

describe('evaluatePassword', () => {
  it('handles an empty entry without claiming it was evaluated', () => {
    const result = evaluatePassword('')

    expect(result.length).toBe(0)
    expect(result.label).toBe('Sin evaluar')
  })

  it('rates a very short entry as weak', () => {
    expect(evaluatePassword('x').score).toBeLessThanOrEqual(1)
  })

  it('recognizes a common dictionary entry', () => {
    const dictionaryProbe = ['pass', 'word'].join('')

    expect(evaluatePassword(dictionaryProbe).score).toBeLessThanOrEqual(1)
  })

  it('identifies long repeated-character patterns', () => {
    const result = evaluatePassword('r'.repeat(16))

    expect(result.score).toBeLessThanOrEqual(1)
    expect(result.patterns).toContain('repeat')
  })

  it('identifies sequences and handles special characters', () => {
    const sequence = evaluatePassword('abcdef123456')
    const specialCharacters = evaluatePassword('ñ[]{}&%$#¡!?')

    expect(sequence.patterns).toContain('sequence')
    expect(specialCharacters.length).toBe(12)
    expect(specialCharacters.score).toBeGreaterThanOrEqual(0)
    expect(specialCharacters.score).toBeLessThanOrEqual(4)
  })

  it('rates a freshly generated random password as strong', () => {
    const password = generatePassword({ length: 24, lowercase: true, uppercase: true, numbers: true, symbols: true })

    expect(evaluatePassword(password).score).toBeGreaterThanOrEqual(3)
  })

  it('returns the same result for the same input', () => {
    const probe = 'secuencia-sintetica-para-consistencia'

    expect(evaluatePassword(probe)).toEqual(evaluatePassword(probe))
  })
})
