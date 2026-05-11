import type { QueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/queryKeys'
import type { Conversation } from '@/types/conversation'
import type { Message } from '@/types/message'

function sortConversations(list: Conversation[]): Conversation[] {
  return [...list].sort((a, b) => {
    const ta = a.last_message?.created_at ?? a.updated_at
    const tb = b.last_message?.created_at ?? b.updated_at
    return tb.localeCompare(ta)
  })
}

export function updateConversationInCache(
  queryClient: QueryClient,
  conversationUuid: string,
  updater: (c: Conversation) => Conversation,
) {
  queryClient.setQueryData<Conversation[]>(QUERY_KEYS.conversations, (old) => {
    if (!old?.length) return old
    let changed = false
    const next = old.map((c) => {
      if (c.uuid !== conversationUuid) return c
      changed = true
      return updater(c)
    })
    return changed ? sortConversations(next) : old
  })
}

export function bumpConversationToTopInCache(
  queryClient: QueryClient,
  conversationUuid: string,
) {
  queryClient.setQueryData<Conversation[]>(QUERY_KEYS.conversations, (old) => {
    if (!old?.length) return old
    const idx = old.findIndex((c) => c.uuid === conversationUuid)
    if (idx <= 0) return old
    const next = [...old]
    const [item] = next.splice(idx, 1)
    return item ? [item, ...next] : old
  })
}

export function applyNewMessagePreview(
  queryClient: QueryClient,
  conversationUuid: string,
  message: Message,
  opts: {
    selfUserId: number
    isActiveConversation: boolean
  },
) {
  updateConversationInCache(queryClient, conversationUuid, (c) => {
    const unread =
      message.sender.id !== opts.selfUserId && !opts.isActiveConversation
        ? (c.unread_count ?? 0) + 1
        : c.unread_count

    return {
      ...c,
      last_message: message,
      unread_count: unread,
      updated_at: message.created_at ?? c.updated_at,
    }
  })
  bumpConversationToTopInCache(queryClient, conversationUuid)
}

