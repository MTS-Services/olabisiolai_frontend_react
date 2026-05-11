import { FileText } from 'lucide-react'

import type { Attachment } from '@/types/attachment'
import { cn } from '@/lib/utils'

function formatSize(n: number | undefined) {
  if (n == null) return ''
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

export function AttachmentPreview({ items }: { items: Attachment[] }) {
  if (items.length === 0) return null

  const images = items.filter((a) => a.type === 'image' || a.mime_type.startsWith('image/'))
  const rest = items.filter((a) => !images.includes(a))

  return (
    <div className="mt-2 space-y-2">
      {images.length > 0 ? (
        <div className="flex max-w-xs flex-wrap gap-1">
          {images.slice(0, 4).map((a) => (
            <a
              key={a.uuid}
              href={a.url}
              target="_blank"
              rel="noreferrer"
              className="block overflow-hidden rounded-lg"
            >
              <img
                src={a.thumbnail_url || a.url}
                alt={a.file_name}
                className="size-20 object-cover"
                loading="lazy"
              />
            </a>
          ))}
          {images.length > 4 ? (
            <div className="flex size-20 items-center justify-center rounded-lg bg-muted text-xs font-bold">
              +{images.length - 4}
            </div>
          ) : null}
        </div>
      ) : null}
      {rest.map((a) => (
        <a
          key={a.uuid}
          href={a.url}
          target="_blank"
          rel="noreferrer"
          className={cn(
            'flex max-w-xs items-center gap-2 rounded-xl border border-chat-border bg-card/80 px-3 py-2 text-left text-sm text-ink',
          )}
        >
          <FileText className="size-4 shrink-0 text-chat-meta" aria-hidden />
          <span className="min-w-0 flex-1 truncate">{a.file_name}</span>
          <span className="shrink-0 text-[10px] text-chat-meta">
            {formatSize(a.file_size)}
          </span>
        </a>
      ))}
    </div>
  )
}
