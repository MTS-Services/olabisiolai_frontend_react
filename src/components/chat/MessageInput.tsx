import * as React from 'react'
import { Paperclip, Send, Smile, X } from 'lucide-react'

import { EmojiPicker } from '@/components/chat/EmojiPicker'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { TYPING_DEBOUNCE_MS } from '@/constants/config'
import type { Message } from '@/types/message'
import { cn } from '@/lib/utils'

interface MessageInputProps {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  disabled?: boolean
  replyingTo: Message | null
  onCancelReply: () => void
  editingMessage: Message | null
  onCancelEdit: () => void
  onTyping: () => void
  onFiles: (files: FileList | null) => void
}

export function MessageInput({
  value,
  onChange,
  onSend,
  disabled,
  replyingTo,
  onCancelReply,
  editingMessage,
  onCancelEdit,
  onTyping,
  onFiles,
}: MessageInputProps) {
  const [emojiOpen, setEmojiOpen] = React.useState(false)
  const emojiAnchorRef = React.useRef<HTMLDivElement>(null)
  const typingTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const fileRef = React.useRef<HTMLInputElement>(null)

  const handleChange = (v: string) => {
    onChange(v)
    if (typingTimer.current) clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => {
      onTyping()
    }, TYPING_DEBOUNCE_MS)
  }

  const insertAtCursor = (emoji: string) => {
    onChange(value + emoji)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="relative">
      {replyingTo ? (
        <div className="mb-2 flex items-center justify-between rounded-xl bg-muted px-3 py-2 text-xs">
          <span className="truncate text-chat-meta">
            Replying to: {replyingTo.body?.slice(0, 80) ?? '…'}
          </span>
          <button type="button" aria-label="Cancel reply" onClick={onCancelReply}>
            <X className="size-4" />
          </button>
        </div>
      ) : null}
      {editingMessage ? (
        <div className="mb-2 flex items-center justify-between rounded-xl bg-muted px-3 py-2 text-xs">
          <span className="text-chat-meta">Editing message</span>
          <button type="button" aria-label="Cancel edit" onClick={onCancelEdit}>
            <X className="size-4" />
          </button>
        </div>
      ) : null}
      <footer className="flex items-end gap-3 border-t border-chat-border-footer bg-card px-4 py-4 backdrop-blur-sm sm:px-6">
        <input
          ref={fileRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            onFiles(e.target.files)
            e.target.value = ''
          }}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 shrink-0 rounded-xl text-ink hover:bg-muted"
          aria-label="Attach file"
          onClick={() => fileRef.current?.click()}
        >
          <Paperclip className="size-5" />
        </Button>
        <div className="relative min-w-0 flex-1">
          <Textarea
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message here..."
            rows={1}
            disabled={disabled}
            className="max-h-32 min-h-12 resize-none rounded-2xl border-0 bg-chat-input-bg py-3 pl-5 pr-12 text-sm text-ink placeholder:text-placeholder-text focus-visible:ring-2 focus-visible:ring-chat-accent-ring"
          />
          <div ref={emojiAnchorRef} className="absolute bottom-1.5 right-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 text-stat-muted hover:bg-transparent hover:text-ink"
              aria-label="Emoji"
              onClick={() => setEmojiOpen((v) => !v)}
            >
              <Smile className="size-5" />
            </Button>
            <EmojiPicker
              open={emojiOpen}
              onClose={() => setEmojiOpen(false)}
              onPick={insertAtCursor}
              anchorRef={emojiAnchorRef}
            />
          </div>
        </div>
        <Button
          type="button"
          size="icon"
          disabled={disabled}
          className={cn(
            'size-12 shrink-0 rounded-xl bg-chat-accent text-text-white shadow-md hover:opacity-90',
          )}
          aria-label="Send message"
          onClick={onSend}
        >
          <Send className="size-5" />
        </Button>
      </footer>
    </div>
  )
}
