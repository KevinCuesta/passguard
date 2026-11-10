import { ZxcvbnFactory } from '@zxcvbn-ts/core'
import * as common from '@zxcvbn-ts/language-common'
import * as spanish from '@zxcvbn-ts/language-es-es'
import { createEmptyPasswordEvaluation } from './passwordTypes'
import type { PasswordEvaluation, PasswordStrength } from './passwordTypes'

export { createEmptyPasswordEvaluation } from './passwordTypes'
export type { PasswordEvaluation, PasswordStrength } from './passwordTypes'

const evaluator = new ZxcvbnFactory({
  dictionary: {
    ...common.dictionary,
    ...spanish.dictionary,
  },
  graphs: common.adjacencyGraphs,
  translations: spanish.translations,
})

const labels = ['Muy débil', 'Débil', 'Aceptable', 'Fuerte', 'Muy fuerte']
const details = [
  'Se puede adivinar con facilidad.',
  'Tiene patrones que conviene corregir.',
  'Ofrece una protección moderada; aún puede mejorar.',
  'Resiste mejor los intentos comunes de adivinación.',
  'El análisis no detecta patrones fáciles de adivinar.',
]

export function evaluatePassword(password: string): PasswordEvaluation {
  if (!password) {
    return createEmptyPasswordEvaluation()
  }

  const result = evaluator.check(password)
  const feedback = result.feedback
  const weaknesses = [feedback.warning, ...feedback.suggestions]
    .filter((item): item is string => Boolean(item))
  const patterns = [...new Set(result.sequence.map((match) => match.pattern))]
  const recommendations = weaknesses.length
    ? weaknesses
    : ['Evita reutilizar esta contraseña en otros servicios.', 'Activa MFA cuando esté disponible.']

  return {
    score: result.score as PasswordStrength,
    length: [...password].length,
    label: labels[result.score],
    details: details[result.score],
    weaknesses,
    recommendations,
    patterns,
  }
}
