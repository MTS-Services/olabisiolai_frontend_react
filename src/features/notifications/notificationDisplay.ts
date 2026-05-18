import type { StoredNotification } from '@/api/notifications'
import type { RealtimeNotificationTone, RealtimeNotificationType } from '@/types/realtimeNotification'

export type NotificationDisplay = {
  id: string
  type: RealtimeNotificationType | string
  title: string
  message: string
  tone: RealtimeNotificationTone | string
  href: string
  isRead: boolean
  createdAt: string | null
  raw: StoredNotification
}

const VENDOR_ROUTES: Record<string, string> = {
  new_message: '/messages',
  verification_approved: '/vendor/verification',
  verification_flagged: '/vendor/verification',
  payment_completed: '/vendor/payments',
}

export function resolveNotificationHref(
  type: string,
  actionUrl?: string | null,
): string {
  if (actionUrl && actionUrl.startsWith('/')) {
    return actionUrl
  }
  return VENDOR_ROUTES[type] ?? '/vendor/notifications'
}

export function toNotificationDisplay(item: StoredNotification): NotificationDisplay {
  const d = item.data ?? {}
  const type = String(d.type ?? 'info')
  const conversationUuid =
    typeof d.conversation_uuid === 'string' ? d.conversation_uuid : null

  let href = resolveNotificationHref(type, d.action_url)
  if (type === 'new_message' && conversationUuid) {
    href = `/messages?c=${encodeURIComponent(conversationUuid)}`
  }

  return {
    id: item.id,
    type,
    title: String(d.title ?? d.sender_name ?? 'Notification'),
    message: String(d.message ?? d.preview ?? ''),
    tone: (d.tone as RealtimeNotificationTone) ?? 'info',
    href,
    isRead: item.read_at != null,
    createdAt: item.created_at,
    raw: item,
  }
}

export function formatNotificationTime(iso: string | null): string {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''

  const now = Date.now()
  const diffMs = now - date.getTime()
  const diffMin = Math.floor(diffMs / 60_000)

  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin}m ago`

  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`

  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 7) return `${diffDay}d ago`

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

export function toneDotClass(tone: string): string {
  if (tone === 'success') return 'bg-emerald-500'
  if (tone === 'warning') return 'bg-amber-500'
  if (tone === 'error') return 'bg-red-500'
  return 'bg-[#003F87]'
}
