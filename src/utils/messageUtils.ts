import type { Conversation } from '@/types/conversation'
import type { Attachment } from '@/types/attachment'
import type { Message, MessageType } from '@/types/message'
import type { MessagingUser } from '@/types/user'
import type { ApiResponse } from '@/types/api'

type ApiSender = { id: number; name: string }

export function mapApiSender(sender: ApiSender | null | undefined): MessagingUser {
  if (!sender) {
    return {
      id: 0,
      name: 'Unknown',
      avatar: null,
      status: 'offline',
      last_seen_at: null,
    }
  }
  return {
    id: sender.id,
    name: sender.name,
    avatar: null,
    status: 'offline',
    last_seen_at: null,
  }
}

export function getMessagePreviewText(message: {
  body: string | null
  type?: MessageType
  attachments?: Attachment[]
}): string {
  if (message.body?.trim()) return message.body.trim()
  const attachments = message.attachments ?? []
  if (attachments.length > 0) {
    const first = attachments[0]
    if (first.type === 'image') return 'Photo'
    if (first.type === 'video') return 'Video'
    if (first.type === 'audio') return 'Audio'
    return first.file_name || 'Attachment'
  }
  if (message.type === 'attachment') return 'Attachment'
  return 'Message'
}

/** Parent snippet from API (no nested parent). */
export function normalizeMessageParent(
  raw: Record<string, unknown>,
): Message | null {
  if (!raw?.uuid) return null
  const sender = mapApiSender(raw.sender as ApiSender | undefined)
  const attachmentsRaw = raw.attachments
  const attachments: Attachment[] = Array.isArray(attachmentsRaw)
    ? attachmentsRaw.map((a) => normalizeAttachment(a as Record<string, unknown>))
    : []

  return {
    uuid: String(raw.uuid),
    conversation_id: Number(raw.conversation_id ?? 0),
    sender,
    parent: null,
    parent_uuid: null,
    body: (raw.body as string | null | undefined) ?? null,
    type: (raw.type as MessageType) ?? 'text',
    status: 'sent',
    attachments,
    reads: [],
    edited_at: null,
    created_at: String(raw.created_at ?? new Date().toISOString()),
  }
}

export function normalizeAttachment(raw: Record<string, unknown>): Attachment {
  const type = (raw.type as Attachment['type']) ?? 'document'
  const thumb =
    (raw.thumbnail_url as string | null | undefined) ??
    ((raw.thumbnail_path as string | undefined)
      ? String(raw.thumbnail_path)
      : null)
  return {
    id: raw.id != null ? Number(raw.id) : undefined,
    uuid: String(raw.uuid ?? ''),
    file_name: String(raw.file_name ?? ''),
    mime_type: String(raw.mime_type ?? ''),
    type,
    url: String(raw.url ?? ''),
    thumbnail_url: thumb,
    thumbnail_path: (raw.thumbnail_path as string | null | undefined) ?? null,
    file_size: raw.file_size as number | undefined,
  }
}

export function normalizeMessage(raw: Record<string, unknown>): Message {
  const sender = mapApiSender(raw.sender as ApiSender | undefined)
  const attachmentsRaw = raw.attachments
  const attachments: Attachment[] = Array.isArray(attachmentsRaw)
    ? attachmentsRaw.map((a) => normalizeAttachment(a as Record<string, unknown>))
    : []

  const readBy = raw.read_by as number[] | undefined
  const reads: Message['reads'] =
    readBy?.map((user_id) => ({
      user_id,
      user: { id: user_id, name: '', avatar: null },
      read_at: '',
    })) ?? []

  return {
    uuid: String(raw.uuid ?? ''),
    conversation_id: Number(raw.conversation_id ?? 0),
    sender,
    parent: raw.parent
      ? normalizeMessageParent(raw.parent as Record<string, unknown>)
      : null,
    parent_uuid:
      (raw.parent_uuid as string | null | undefined) ??
      (raw.parent && typeof raw.parent === 'object' && 'uuid' in raw.parent
        ? String((raw.parent as Record<string, unknown>).uuid)
        : null),
    body: (raw.body as string | null | undefined) ?? null,
    type: (raw.type as MessageType) ?? 'text',
    status: (raw.status as Message['status']) ?? 'sent',
    attachments,
    reads,
    read_by: readBy,
    edited_at: (raw.edited_at as string | null | undefined) ?? null,
    created_at: String(raw.created_at ?? new Date().toISOString()),
    updated_at: raw.updated_at as string | undefined,
  }
}

export function normalizeConversation(raw: Record<string, unknown>): Conversation {
  const parts = raw.participants
  const lastRaw = raw.last_message

  let last_message: Message | null = null
  if (lastRaw && typeof lastRaw === 'object' && lastRaw !== null && 'uuid' in lastRaw) {
    last_message = normalizeMessage(lastRaw as Record<string, unknown>)
  }

  return {
    id: Number(raw.id ?? 0),
    uuid: String(raw.uuid ?? ''),
    type: raw.type as Conversation['type'],
    name: (raw.name as string | null | undefined) ?? null,
    participants: Array.isArray(parts)
      ? (parts as Conversation['participants'])
      : [],
    last_message,
    unread_count: Number(raw.unread_count ?? 0),
    is_archived: Boolean(raw.is_archived),
    tenant_id: raw.tenant_id as number | null | undefined,
    created_at: String(raw.created_at ?? ''),
    updated_at: String(raw.updated_at ?? ''),
  }
}

export function getConversationTitle(
  conv: Conversation,
  selfUserId: number,
): string {
  if (conv.name?.trim()) return conv.name
  if (conv.type === 'direct') {
    const other = conv.participants.find((p) => p.user_id !== selfUserId)?.user
    return other?.name ?? 'Direct message'
  }
  return 'Conversation'
}

export function unwrapApi<T>(
  body: ApiResponse<T>,
): { data: T; meta: ApiResponse<T>['meta'] } {
  return { data: body.data, meta: body.meta }
}
