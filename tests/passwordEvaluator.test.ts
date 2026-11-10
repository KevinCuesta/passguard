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

  it('rates a freshly generated random password as strong', () => {
    const password = generatePassword({ length: 24, lowercase: true, uppercase: true, numbers: true, symbols: true })

    expect(evaluatePassword(password).score).toBeGreaterThanOrEqual(3)
  })
})
