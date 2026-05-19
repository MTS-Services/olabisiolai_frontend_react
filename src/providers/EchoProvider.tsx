import * as React from 'react'

import { useAuth } from '@/auth/useAuth'
import { messagingEnv } from '@/config/messagingEnv'
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications'
import { createEcho, disconnectEcho, getEcho } from '@/lib/echo'
import type { ReverbEcho } from '@/lib/echo'

export type EchoContextValue = {
  echo: ReverbEcho | null
}

const EchoContext = React.createContext<EchoContextValue | null>(null)

export function EchoProvider({ children }: { children: React.ReactNode }) {
  const { accessToken, isAuthenticated } = useAuth()
  const [echo, setEcho] = React.useState<ReverbEcho | null>(() => getEcho())

  React.useEffect(() => {
    if (!messagingEnv.isReverbConfigured()) {
      disconnectEcho()
      setEcho(null)
      return
    }
    if (!isAuthenticated) {
      disconnectEcho()
      setEcho(null)
      return
    }
    const instance = createEcho(accessToken)
    setEcho(instance)
  }, [isAuthenticated, accessToken])

  useRealtimeNotifications(echo)

  const value = React.useMemo(() => ({ echo }), [echo])

  return <EchoContext.Provider value={value}>{children}</EchoContext.Provider>
}

export function useEchoContext(): EchoContextValue {
  const ctx = React.useContext(EchoContext)
  if (!ctx) {
    throw new Error('useEchoContext must be used within EchoProvider')
  }
  return ctx
}
