import { ZxcvbnFactory } from '@zxcvbn-ts/core'
import * as common from '@zxcvbn-ts/language-common'
import * as spanish from '@zxcvbn-ts/language-es-es'

const evaluator = new ZxcvbnFactory({
  dictionary: {
    ...common.dictionary,
    ...spanish.dictionary,
  },
  graphs: common.adjacencyGraphs,
  translations: spanish.translations,
})

export type PasswordStrength = 0 | 1 | 2 | 3 | 4

export interface PasswordEvaluation {
  score: PasswordStrength
  length: number
  label: string
  details: string
  weaknesses: string[]
  recommendations: string[]
  patterns: string[]
}

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
    return {
      score: 0,
      length: 0,
      label: 'Sin evaluar',
      details: 'Escribe una contraseña de prueba para analizarla localmente.',
      weaknesses: [],
      recommendations: ['Usa una contraseña larga y única para cada cuenta.'],
      patterns: [],
    }
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
