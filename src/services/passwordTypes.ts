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

export function createEmptyPasswordEvaluation(): PasswordEvaluation {
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
