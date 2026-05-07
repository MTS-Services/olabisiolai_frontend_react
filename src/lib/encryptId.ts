const PFX = 'g_'

export function encryptId(id: number): string {
  const raw = btoa(`${PFX}${id}`)
  return raw.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export function decryptId(slug: string): number | null {
  try {
    const b64 = slug.replace(/-/g, '+').replace(/_/g, '/')
    const padded = b64.padEnd(b64.length + (4 - (b64.length % 4)) % 4, '=')
    const decoded = atob(padded)
    if (!decoded.startsWith(PFX)) return null
    const n = parseInt(decoded.slice(PFX.length), 10)
    return Number.isFinite(n) ? n : null
  } catch {
    return null
  }
}
