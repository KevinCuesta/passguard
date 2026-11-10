import { beforeEach, describe, expect, it, vi } from 'vitest'
import { checkPasswordBreaches } from '../src/services/breachChecker'

const testOnlyInput = 'sintetica-prueba-passguard-2026'

async function sha1Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('').toUpperCase()
}

describe('checkPasswordBreaches', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('sends only the five-character SHA-1 prefix and matches the suffix locally', async () => {
    const hash = await sha1Hex(testOnlyInput)
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(`${hash.slice(5)}:37\r\n`))

    const result = await checkPasswordBreaches(testOnlyInput, fetcher)

    expect(result).toEqual({ found: true, count: 37 })
    expect(fetcher).toHaveBeenCalledOnce()
    const [url, init] = fetcher.mock.calls[0]
    expect(url).toBe(`https://api.pwnedpasswords.com/range/${hash.slice(0, 5)}`)
    expect(String(url)).not.toContain(testOnlyInput)
    expect(String(url)).not.toContain(hash)
    expect(init?.headers).toMatchObject({ 'Add-Padding': 'true' })
    expect(init?.cache).toBe('no-store')
    expect(init?.referrerPolicy).toBe('no-referrer')
  })

  it('returns not found when the requested suffix is absent', async () => {
    const hash = await sha1Hex(testOnlyInput)
    const firstCharacter = hash[5] === '0' ? '1' : '0'
    const differentSuffix = `${firstCharacter}${hash.slice(6)}`
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(`${differentSuffix}:5\r\n`))

    await expect(checkPasswordBreaches(testOnlyInput, fetcher)).resolves.toEqual({ found: false, count: 0 })
  })

  it('rejects empty input without making a request', async () => {
    const fetcher = vi.fn<typeof fetch>()

    await expect(checkPasswordBreaches('', fetcher)).rejects.toThrow(/Escribe una contraseña/)
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('handles an HTTP error response', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('', { status: 503 }))

    await expect(checkPasswordBreaches(testOnlyInput, fetcher)).rejects.toThrow(/no pudo completar/)
  })

  it('converts connection errors into a safe, user-facing error', async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('offline'))

    await expect(checkPasswordBreaches(testOnlyInput, fetcher)).rejects.toThrow(/Revisa la conexión/)
  })
})
