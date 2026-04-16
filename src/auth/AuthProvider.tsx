import * as React from 'react'

import { api } from '@/api/client'
import { AuthContext, type AuthContextValue } from '@/auth/context'
import { fetchCurrentUser } from '@/auth/session'
import {
  clearAccessToken,
  getAccessToken,
  getStoredAuthUser,
  setAccessToken,
  setStoredAuthUser,
} from '@/auth/token'
import { type AuthUser } from '@/auth/types'
import { getRoleLogoutPath } from '@/auth/rolePolicy'
import { getUserRoles } from '@/auth/roles'
import { env } from '@/config/env'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialToken = React.useMemo(() => getAccessToken(), [])
  const initialUser = React.useMemo(() => {
    if (env.authStrategy !== 'bearer_memory' || !initialToken) return null
    return getStoredAuthUser()
  }, [initialToken])
  const [accessTokenState, setAccessTokenState] = React.useState<string | null>(
    () => initialToken,
  )
  const [user, setUserState] = React.useState<AuthUser | null>(() => initialUser)
  const [isSessionLoading, setIsSessionLoading] = React.useState(
    () => env.authStrategy === 'http_only_cookie',
  )
  const [isUserLoading, setIsUserLoading] = React.useState(() => {
    return env.authStrategy === 'bearer_memory' && Boolean(initialToken) && !Boolean(initialUser)
  })

  const setUser = React.useCallback((nextUser: AuthUser | null) => {
    setStoredAuthUser(nextUser)
    setUserState(nextUser)
  }, [])

  const refreshSession = React.useCallback(async (): Promise<AuthUser | null> => {
    const shouldBlock = env.authStrategy === 'http_only_cookie' || !user
    if (shouldBlock) {
      setIsUserLoading(true)
    }
    try {
      const u = await fetchCurrentUser()
      // Never overwrite a known user with null due to a transient /me failure.
      if (u) setUser(u)
      return u
    } finally {
      if (shouldBlock) {
        setIsUserLoading(false)
      }
    }
  }, [user, setUser])

  React.useEffect(() => {
    if (env.authStrategy !== 'http_only_cookie') {
      setIsSessionLoading(false)
      return
    }

    let cancelled = false
    void (async () => {
      const u = await fetchCurrentUser()
      if (!cancelled) {
        setUser(u)
        setIsSessionLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  // After reload, re-fetch profile when Bearer token was restored from session/local storage.
  // Skip when on the register-OTP page: the token belongs to an unverified user
  // whose /me endpoint returns 404. The token is used for the verify-otp call instead.
  React.useEffect(() => {
    if (env.authStrategy !== 'bearer_memory') return
    if (!getAccessToken()) return

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (
        url.pathname === '/otp-verification' &&
        url.searchParams.get('purpose') === 'register'
      ) {
        setIsUserLoading(false)
        return
      }
    }

    void refreshSession()
  }, [refreshSession])

  const setToken = React.useCallback((token: string) => {
    setAccessToken(token)
    setAccessTokenState(token)
  }, [])

  const resetAuthState = React.useCallback(() => {
    clearAccessToken()
    setAccessTokenState(null)
    setUser(null)
    setIsUserLoading(false)
  }, [])

  const logout = React.useCallback(async () => {
    resetAuthState()
    try {
      if (env.logoutMode === 'multi') {
        const roles = getUserRoles(user)
        const roleLogout = roles.map((r) => getRoleLogoutPath(r)).find(Boolean)
        await api.post(roleLogout ?? env.authLogoutPath)
      } else {
        await api.post(env.authLogoutPath)
      }
    } catch {
      // Session may already be invalid; still clear client state
    } finally {
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.location.assign('/')
      }
    }
  }, [user])

  const value = React.useMemo<AuthContextValue>(
    () => ({
      authStrategy: env.authStrategy,
      accessToken: accessTokenState,
      isAuthenticated:
        env.authStrategy === 'http_only_cookie'
          ? Boolean(user)
          : Boolean(accessTokenState) && Boolean(user),
      isSessionLoading,
      isUserLoading,
      user,
      setToken,
      resetAuthState,
      logout,
      setUser,
      refreshSession,
    }),
    [
      accessTokenState,
      isSessionLoading,
      isUserLoading,
      logout,
      refreshSession,
      setToken,
      resetAuthState,
      user,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
