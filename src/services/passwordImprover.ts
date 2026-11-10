import { evaluatePassword, type PasswordEvaluation } from './passwordEvaluator'
import { generatePassword } from './passwordGenerator'

export interface PasswordImprovement {
  before: PasswordEvaluation
  replacement: string
  after: PasswordEvaluation
}

const replacementOptions = {
  length: 24,
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: true,
}

const MAX_ATTEMPTS = 8

export function improvePassword(password: string): PasswordImprovement {
  if (!password.trim()) {
    throw new Error('Escribe una contraseña de prueba antes de crear una alternativa.')
  }

  const before = evaluatePassword(password)
  const targetScore = Math.max(3, before.score)

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const replacement = generatePassword(replacementOptions)
    if (replacement === password) continue

    const after = evaluatePassword(replacement)
    if (after.score >= targetScore) {
      return { before, replacement, after }
    }
  }

  throw new Error('No fue posible obtener una alternativa con una evaluación suficientemente alta. Inténtalo de nuevo.')
}
