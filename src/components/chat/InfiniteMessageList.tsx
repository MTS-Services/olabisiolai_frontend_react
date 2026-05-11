import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Loader2 } from 'lucide-react'

import { MessageBubble } from '@/components/chat/MessageBubble'
import type { MessagesPage } from '@/features/messaging/types'
import type { Message } from '@/types/message'
import { cn } from '@/lib/utils'
import { formatDaySeparator, isSameDay } from '@/utils/formatters'
import { flattenMessagesChronological } from '@/utils/flattenMessages'

type Row =
  | { kind: 'day'; key: string; label: string }
  | { kind: 'msg'; message: Message; showAvatar: boolean }

function buildRows(messages: Message[]): Row[] {
  const rows: Row[] = []
  let prevDayKey: string | null = null
  for (let idx = 0; idx < messages.length; idx++) {
    const m = messages[idx]
    const dayKey = m.created_at.slice(0, 10)
    if (dayKey !== prevDayKey) {
      rows.push({
        kind: 'day',
        key: `d-${dayKey}`,
        label: formatDaySeparator(m.created_at),
      })
      prevDayKey = dayKey
    }
    const prevMsg = idx > 0 ? messages[idx - 1] : null
    const showAvatar =
      !prevMsg ||
      prevMsg.sender.id !== m.sender.id ||
      !isSameDay(prevMsg.created_at, m.created_at)
    rows.push({ kind: 'msg', message: m, showAvatar })
  }
  return rows
}

export function InfiniteMessageList({
  pages,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  selfUserId,
  onReply,
  onEdit,
  onDelete,
}: {
  pages: MessagesPage[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  selfUserId: number
  onReply: (m: Message) => void
  onEdit: (m: Message) => void
  onDelete: (m: Message) => void
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const chronological = React.useMemo(
    () => flattenMessagesChronological(pages),
    [pages],
  )
  const rows = React.useMemo(() => buildRows(chronological), [chronological])

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (index) => (rows[index]?.kind === 'day' ? 36 : 92),
    overscan: 12,
  })

  const onScroll = React.useCallback(() => {
    const el = scrollRef.current
    if (!el || !hasNextPage || isFetchingNextPage) return
    if (el.scrollTop < 80) {
      void fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const lastLen = React.useRef(chronological.length)
  const prevPageCount = React.useRef(0)
  React.useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el || chronological.length === 0) return
    if (pages.length === 1 && prevPageCount.current === 0) {
      el.scrollTop = el.scrollHeight
    }
    prevPageCount.current = pages.length
  }, [pages.length, chronological.length])

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    if (chronological.length > lastLen.current) {
      const last = chronological[chronological.length - 1]
      if (last && last.sender.id === selfUserId) {
        el.scrollTop = el.scrollHeight
      }
    }
    lastLen.current = chronological.length
  }, [chronological, selfUserId])

  const v = virtualizer

  return (
    <div
      ref={scrollRef}
      className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-8 md:px-8"
    >
      {isFetchingNextPage ? (
        <div className="flex justify-center py-2">
          <Loader2 className="size-6 animate-spin text-chat-meta" />
        </div>
      ) : null}
      <div
        className="relative w-full"
        style={{ height: `${v.getTotalSize()}px` }}
      >
        {v.getVirtualItems().map((vi) => {
          const row = rows[vi.index]
          if (!row) return null
          if (row.kind === 'day') {
            return (
              <div
                key={row.key}
                className={cn(
                  'absolute left-0 right-0 flex items-center gap-4 py-1',
                )}
                style={{ transform: `translateY(${vi.start}px)` }}
              >
                <div className="h-px flex-1 bg-chat-border-subtle" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-chat-meta">
                  {row.label}
                </span>
                <div className="h-px flex-1 bg-chat-border-subtle" />
              </div>
            )
          }
          return (
            <div
              key={row.message.uuid}
              className="absolute left-0 right-0 py-1"
              style={{ transform: `translateY(${vi.start}px)` }}
            >
              <MessageBubble
                message={row.message}
                isOwn={row.message.sender.id === selfUserId}
                showAvatar={row.showAvatar}
                onReply={() => onReply(row.message)}
                onEdit={() => onEdit(row.message)}
                onDelete={() => onDelete(row.message)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
