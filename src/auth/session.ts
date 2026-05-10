import { api } from '@/api/client'
import { extractUserFromAuthPayload } from '@/api/laravelResponse'
import { env } from '@/config/env'
import { type AuthUser } from '@/auth/types'

/** GET current user — Laravel Passport Bearer or cookie session. */
export async function fetchCurrentUser(): Promise<AuthUser | null> {
  const pathCandidates = Array.from(
    new Set([env.authMePath, '/admin/me', '/auth/profile', '/me'].filter(Boolean)),
  )

  for (const path of pathCandidates) {
    try {
      const res = await api.get<unknown>(path, {
        skipAuthRedirect: true,
      })
      const user = extractUserFromAuthPayload(res.data)
      if (user) return user
    } catch {
      // try next candidate path
    }
  }
  return null
}
