import * as React from 'react'
import { MoreHorizontal, Pencil } from 'lucide-react'

import { AttachmentPreview } from '@/components/chat/AttachmentPreview'
import { MessageStatusIcon } from '@/components/chat/MessageStatusIcon'
import { Avatar } from '@/components/ui/Avatar'
import type { Message } from '@/types/message'
import { cn } from '@/lib/utils'
import { formatMessageTime } from '@/utils/formatters'

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
  showAvatar: boolean
  onReply: () => void
  onEdit: () => void
  onDelete: () => void
}

export const MessageBubble = React.memo(function MessageBubble({
  message,
  isOwn,
  showAvatar,
  onReply,
  onEdit,
  onDelete,
}: MessageBubbleProps) {
  const [menu, setMenu] = React.useState(false)

  return (
    <div
      className={cn('group flex gap-3', isOwn ? 'justify-end' : 'justify-start')}
      data-message-uuid={message.uuid}
    >
      {!isOwn && showAvatar ? (
        <Avatar
          src={message.sender.avatar}
          name={message.sender.name}
          className="mt-1 size-8 shrink-0"
        />
      ) : !isOwn ? (
        <div className="size-8 shrink-0" aria-hidden />
      ) : null}
      <div className={cn('min-w-0 max-w-md', isOwn && 'flex flex-col items-end')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 shadow-sm',
            isOwn
              ? 'rounded-br-md bg-chat-accent text-text-white sm:rounded-br-2xl'
              : 'rounded-bl-md bg-chat-bubble-them text-ink sm:rounded-bl-2xl',
            message._isOptimistic && 'opacity-70',
            message._failed && 'ring-2 ring-destructive',
          )}
          onContextMenu={(e) => {
            e.preventDefault()
            setMenu(true)
          }}
        >
          {message.parent_uuid ? (
            <p className="mb-2 border-l-2 border-chat-accent pl-2 text-xs opacity-80">
              Replying to a message
            </p>
          ) : null}
          {message.body ? (
            <p className="whitespace-pre-wrap text-sm leading-5">{message.body}</p>
          ) : null}
          <AttachmentPreview items={message.attachments} />
          {message.edited_at ? (
            <p
              className={cn(
                'mt-1 flex items-center gap-1 text-[10px] opacity-80',
                isOwn ? 'justify-end' : '',
              )}
            >
              <Pencil className="size-3" aria-hidden />
              edited
            </p>
          ) : null}
        </div>
        <div
          className={cn(
            'mt-1 flex items-center gap-2 text-xs text-chat-meta',
            isOwn ? 'justify-end' : '',
          )}
        >
          <span>{formatMessageTime(message.created_at)}</span>
          <MessageStatusIcon status={message.status} isOwn={isOwn} />
          <button
            type="button"
            className="rounded p-0.5 opacity-0 hover:bg-muted group-hover:opacity-100"
            aria-label="Message actions"
            onClick={() => setMenu((v) => !v)}
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>
        {menu ? (
          <div
            className={cn(
              'mt-1 flex gap-2 rounded-lg border border-chat-border bg-card p-2 text-xs shadow-md',
              isOwn ? 'justify-end' : '',
            )}
          >
            <button type="button" className="hover:underline" onClick={() => { onReply(); setMenu(false) }}>
              Reply
            </button>
            {isOwn ? (
              <button type="button" className="hover:underline" onClick={() => { onEdit(); setMenu(false) }}>
                Edit
              </button>
            ) : null}
            {isOwn ? (
              <button type="button" className="text-destructive hover:underline" onClick={() => { onDelete(); setMenu(false) }}>
                Delete
              </button>
            ) : null}
            <button type="button" className="hover:underline" onClick={() => setMenu(false)}>
              Close
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
})
