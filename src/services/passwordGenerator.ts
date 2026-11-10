export interface GeneratorOptions {
  length: number
  lowercase: boolean
  uppercase: boolean
  numbers: boolean
  symbols: boolean
}

const characterSets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}:,.?',
} as const

const MAX_RANDOM_BYTE = 256

export function getAlphabetSize(options: GeneratorOptions): number {
  return (options.lowercase ? characterSets.lowercase.length : 0)
    + (options.uppercase ? characterSets.uppercase.length : 0)
    + (options.numbers ? characterSets.numbers.length : 0)
    + (options.symbols ? characterSets.symbols.length : 0)
}

function secureIndex(max: number): number {
  if (!Number.isInteger(max) || max < 1 || max > MAX_RANDOM_BYTE) {
    throw new Error('El tamaño del conjunto de caracteres no es válido.')
  }

  const limit = MAX_RANDOM_BYTE - (MAX_RANDOM_BYTE % max)
  const bytes = new Uint8Array(1)
  let value = MAX_RANDOM_BYTE
  while (value >= limit) {
    crypto.getRandomValues(bytes)
    value = bytes[0]
  }
  return value % max
}

export function generatePassword(options: GeneratorOptions): string {
  const { length, lowercase, uppercase, numbers, symbols } = options
  const alphabet = [
    lowercase ? characterSets.lowercase : '',
    uppercase ? characterSets.uppercase : '',
    numbers ? characterSets.numbers : '',
    symbols ? characterSets.symbols : '',
  ].join('')

  if (!Number.isInteger(length) || length < 8 || length > 64) {
    throw new Error('La longitud debe estar entre 8 y 64 caracteres.')
  }
  if (!alphabet) {
    throw new Error('Selecciona al menos un conjunto de caracteres.')
  }

  const characters = new Array<string>(length)
  for (let i = 0; i < length; i += 1) {
    characters[i] = alphabet[secureIndex(alphabet.length)]
  }
  return characters.join('')
}

export function calculateCombinations(length: number, alphabetSize: number): bigint {
  if (!Number.isInteger(length) || length < 1 || !Number.isInteger(alphabetSize) || alphabetSize < 1) {
    throw new Error('La longitud y el tamaño del alfabeto deben ser positivos.')
  }
  return BigInt(alphabetSize) ** BigInt(length)
}

export function formatCombinations(combinations: bigint): string {
  return new Intl.NumberFormat('es-CO').format(combinations)
}
