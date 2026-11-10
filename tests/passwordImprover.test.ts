import { describe, expect, it } from 'vitest'
import { evaluatePassword } from '../src/services/passwordEvaluator'
import { improvePassword } from '../src/services/passwordImprover'

describe('improvePassword', () => {
  it('rejects empty or whitespace-only input', () => {
    expect(() => improvePassword('')).toThrow(/Escribe una contraseña/)
    expect(() => improvePassword('   ')).toThrow(/Escribe una contraseña/)
  })

  it('returns a fresh generated alternative and compares both evaluations', () => {
    const original = 'solo-para-prueba-de-universidad'
    const result = improvePassword(original)

    expect(result.replacement).not.toBe(original)
    expect(result.replacement).toHaveLength(24)
    expect(result.before).toEqual(evaluatePassword(original))
    expect(result.after).toEqual(evaluatePassword(result.replacement))
    expect(result.after.score).toBeGreaterThanOrEqual(Math.max(3, result.before.score))
  })

  it('does not preserve the original as a complete password', () => {
    const original = 'muestra-sintetica-para-el-proyecto'
    const { replacement } = improvePassword(original)

    expect(replacement).not.toBe(original)
  })
})
