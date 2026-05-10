import type { MessagesPage } from '@/features/messaging/types'
import type { Message } from '@/types/message'

/** Oldest → newest for top-to-bottom chat layout. */
export function flattenMessagesChronological(pages: MessagesPage[]): Message[] {
  const out: Message[] = []
  for (let i = pages.length - 1; i >= 0; i--) {
    const p = pages[i]
    out.push(...[...p.messages].reverse())
  }
  return out
}
