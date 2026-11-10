export interface BreachCheckResult {
  found: boolean
  count: number
}

const RANGE_API = 'https://api.pwnedpasswords.com/range/'

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('').toUpperCase()
}

export async function checkPasswordBreaches(
  password: string,
  fetcher: typeof fetch = globalThis.fetch,
): Promise<BreachCheckResult> {
  if (password.length === 0) {
    throw new Error('Escribe una contraseña de prueba antes de consultar filtraciones.')
  }
  if (!globalThis.crypto?.subtle) {
    throw new Error('Este navegador no ofrece Web Crypto en el contexto actual.')
  }

  // SHA-1 is used only to query the HIBP range API, never to protect or store passwords.
  let digest: ArrayBuffer
  try {
    digest = await globalThis.crypto.subtle.digest('SHA-1', new TextEncoder().encode(password))
  } catch {
    throw new Error('No fue posible calcular el resumen necesario para la consulta en este navegador.')
  }
  const hash = toHex(new Uint8Array(digest))
  const prefix = hash.slice(0, 5)
  const suffix = hash.slice(5)

  let response: Response
  try {
    response = await fetcher(`${RANGE_API}${prefix}`, {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        'Add-Padding': 'true',
      },
      cache: 'no-store',
      referrerPolicy: 'no-referrer',
    })
  } catch {
    throw new Error('No fue posible conectar con Pwned Passwords. Revisa la conexión e inténtalo de nuevo.')
  }

  if (!response.ok) {
    throw new Error('Pwned Passwords no pudo completar la consulta. Inténtalo de nuevo más tarde.')
  }

  let body: string
  try {
    body = await response.text()
  } catch {
    throw new Error('No fue posible leer la respuesta de Pwned Passwords. Inténtalo de nuevo más tarde.')
  }
  for (const line of body.split(/\r?\n/)) {
    const [candidateSuffix, countText] = line.trim().split(':', 2)
    if (candidateSuffix?.toUpperCase() !== suffix || !countText || !/^\d+$/.test(countText)) continue

    const count = Number(countText)
    if (Number.isSafeInteger(count) && count > 0) return { found: true, count }
  }

  return { found: false, count: 0 }
}
