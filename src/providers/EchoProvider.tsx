import * as React from 'react'

import { useAuth } from '@/auth/useAuth'
import { messagingEnv } from '@/config/messagingEnv'
import { queryClient } from '@/lib/queryClient'
import { createEcho, disconnectEcho, getEcho } from '@/lib/echo'
import { QUERY_KEYS } from '@/constants/queryKeys'
import type { ReverbEcho } from '@/lib/echo'
import { EchoService } from '@/services/echoService'
import { notifyNewMessage } from '@/services/notificationService'
import { bumpConversationToTopInCache, updateConversationInCache } from '@/features/messaging/conversationCache'

export type EchoContextValue = {
  echo: ReverbEcho | null
}

const EchoContext = React.createContext<EchoContextValue | null>(null)

export function EchoProvider({ children }: { children: React.ReactNode }) {
  const { accessToken, isAuthenticated, user } = useAuth()
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
    // No cleanup disconnect: Strict Mode would close the socket mid-handshake and break
    // presence/typing. `createEcho()` reconnects when `accessToken` changes; logout
    // clears the socket in the `!isAuthenticated` branch above.
  }, [isAuthenticated, accessToken])

  React.useEffect(() => {
    if (!echo || !user?.id) return
    const svc = new EchoService(echo)
    const uid = Number(user.id)
    return svc.subscribeToUserChannel(uid, {
      onNewMessageNotification: (payload) => {
        const conversationUuid = String(payload.conversation_uuid ?? '')
        const unreadCountRaw = payload.unread_count
        const unreadCount =
          typeof unreadCountRaw === 'number'
            ? unreadCountRaw
            : Number.isFinite(Number(unreadCountRaw))
              ? Number(unreadCountRaw)
              : null

        if (conversationUuid) {
          updateConversationInCache(queryClient, conversationUuid, (c) => ({
            ...c,
            unread_count: unreadCount ?? c.unread_count,
            updated_at: new Date().toISOString(),
          }))
          bumpConversationToTopInCache(queryClient, conversationUuid)
        } else {
          void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.conversations })
        }
        const sender = String(payload.sender_name ?? 'Message')
        const preview = String(payload.preview ?? '')
        notifyNewMessage(sender, preview)
      },
      // Presence status can be very chatty; avoid invalidation loops from frequent broadcasts.
      onUserPresence: () => {},
    })
  }, [echo, user?.id])

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
