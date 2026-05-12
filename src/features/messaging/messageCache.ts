import type { InfiniteData, QueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/queryKeys'
import type { Message } from '@/types/message'

import type { MessagesPage } from '@/features/messaging/types'

function removeMessageEverywhere(
  pages: MessagesPage[],
  predicate: (m: Message) => boolean,
): MessagesPage[] {
  return pages.map((p) => ({
    ...p,
    messages: p.messages.filter((m) => !predicate(m)),
  }))
}

export function appendOrMergeMessageInCache(
  queryClient: QueryClient,
  conversationUuid: string,
  message: Message,
) {
  queryClient.setQueryData<InfiniteData<MessagesPage>>(
    QUERY_KEYS.messages(conversationUuid),
    (old) => {
      if (!old?.pages.length) return old
      const pages = removeMessageEverywhere(old.pages, (m) => m.uuid === message.uuid)
      const first = pages[0]
      if (!first) return old
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
  /** Tie the server row to the optimistic slot so dedupe does not delete the only copy. */
  const merged: Message = { ...real, _tempId: tempId }
  queryClient.setQueryData<InfiniteData<MessagesPage>>(
    QUERY_KEYS.messages(conversationUuid),
    (old) => {
      if (!old) return old
      const pages = removeMessageEverywhere(
        old.pages.map((p) => ({
          ...p,
          messages: p.messages.map((m) =>
            m.uuid === tempId || m._tempId === tempId ? merged : m,
          ),
        })),
        (m) => m.uuid === real.uuid && m._tempId !== tempId,
      ).map((p) => ({
        ...p,
        messages: p.messages.map((m) =>
          m.uuid === real.uuid && m._tempId === tempId
            ? { ...m, _tempId: undefined, _isOptimistic: undefined }
            : m,
        ),
      }))
      return { ...old, pages }
    },
  )
}
