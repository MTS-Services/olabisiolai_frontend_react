import * as React from 'react'

import { sendTypingIndicator } from '@/api/messages'
import { TYPING_SEND_MIN_INTERVAL_MS, TYPING_IDLE_STOP_MS } from '@/constants/config'
import { EMPTY_TYPING_USERS } from '@/constants/messagingUi'
import { useMessagingStore } from '@/store/messagingStore'

export function useTypingIndicator(conversationUuid: string | null) {
  const typingUsers = useMessagingStore((s) => {
    if (!conversationUuid) return EMPTY_TYPING_USERS
    return s.typingUsers[conversationUuid] ?? EMPTY_TYPING_USERS
  })
  const lastSent = React.useRef(0)
  const idleTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const sendTyping = React.useCallback(
    (isTyping: boolean) => {
      if (!conversationUuid) return
      const now = Date.now()
      if (isTyping && now - lastSent.current < TYPING_SEND_MIN_INTERVAL_MS) return
      lastSent.current = now
      void sendTypingIndicator(conversationUuid, isTyping)
    },
    [conversationUuid],
  )

  const signalTyping = React.useCallback(() => {
    sendTyping(true)
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      sendTyping(false)
    }, TYPING_IDLE_STOP_MS)
  }, [sendTyping])

  React.useEffect(() => {
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [])

  return { typingUsers, signalTyping, sendTyping }
}
