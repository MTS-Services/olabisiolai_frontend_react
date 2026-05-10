import type { InfiniteData, QueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/queryKeys'
import type { Message } from '@/types/message'

import type { MessagesPage } from '@/features/messaging/types'

export function appendOrMergeMessageInCache(
  queryClient: QueryClient,
  conversationUuid: string,
  message: Message,
) {
  queryClient.setQueryData<InfiniteData<MessagesPage>>(
    QUERY_KEYS.messages(conversationUuid),
    (old) => {
      if (!old?.pages.length) return old
      const pages = [...old.pages]
      const first = pages[0]
      if (!first) return old
      if (first.messages.some((m) => m.uuid === message.uuid)) {
        pages[0] = {
          ...first,
          messages: first.messages.map((m) =>
            m.uuid === message.uuid ? { ...m, ...message } : m,
          ),
        }
        return { ...old, pages }
      }
      pages[0] = {
        ...first,
        messages: [message, ...first.messages],
      }
      return { ...old, pages }
    },
  )
}

export function removeMessageFromCache(
  queryClient: QueryClient,
  conversationUuid: string,
  messageUuid: string,
) {
  queryClient.setQueryData<InfiniteData<MessagesPage>>(
    QUERY_KEYS.messages(conversationUuid),
    (old) => {
      if (!old) return old
      const pages = old.pages.map((p) => ({
        ...p,
        messages: p.messages.filter((m) => m.uuid !== messageUuid),
      }))
      return { ...old, pages }
    },
  )
}

export function replaceTempMessageInCache(
  queryClient: QueryClient,
  conversationUuid: string,
  tempId: string,
  real: Message,
) {
  queryClient.setQueryData<InfiniteData<MessagesPage>>(
    QUERY_KEYS.messages(conversationUuid),
    (old) => {
      if (!old) return old
      const pages = old.pages.map((p) => ({
        ...p,
        messages: p.messages.map((m) =>
          m.uuid === tempId || m._tempId === tempId ? real : m,
        ),
      }))
      return { ...old, pages }
    },
  )
}
