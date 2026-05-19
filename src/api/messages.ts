import { uploadAttachment } from '@/api/attachments'
import { api } from '@/api/client'
import { messagingPath } from '@/api/messagingPaths'
import type { ApiResponse } from '@/types/api'
import type { Message } from '@/types/message'
import { normalizeMessage, unwrapApi } from '@/utils/messageUtils'

export async function getMessages(
  conversationUuid: string,
  cursor?: string,
): Promise<{ messages: Message[]; meta: ApiResponse<Message[]>['meta'] }> {
  const res = await api.get<ApiResponse<Record<string, unknown>[]>>(
    messagingPath(`/conversations/${conversationUuid}/messages`),
    { params: cursor ? { cursor } : {} },
  )
  const { data, meta } = unwrapApi(res.data)
  const list = Array.isArray(data) ? data.map((r) => normalizeMessage(r)) : []
  return { messages: list, meta }
}

export async function sendMessage(
  conversationUuid: string,
  body: string | null,
  attachmentIds?: number[],
  parentUuid?: string | null,
): Promise<Message> {
  const trimmed = body?.trim() ?? ''
  const res = await api.post<ApiResponse<Record<string, unknown>>>(
    messagingPath(`/conversations/${conversationUuid}/messages`),
    {
      body: trimmed || undefined,
      attachment_ids: attachmentIds?.length ? attachmentIds : undefined,
      parent_uuid: parentUuid ?? undefined,
    },
  )
  const { data } = unwrapApi(res.data)
  return normalizeMessage(data)
}

/** Upload files first, then send JSON message with attachment_ids (matches Postman flow). */
export async function sendMessageWithAttachments(
  conversationUuid: string,
  body: string | null,
  files: File[],
  parentUuid?: string | null,
  onUploadProgress?: (fileIndex: number, percent: number) => void,
): Promise<Message> {
  const attachmentIds: number[] = []
  for (let i = 0; i < files.length; i += 1) {
    const att = await uploadAttachment(files[i], (pct) => onUploadProgress?.(i, pct))
    if (att.id == null) {
      throw new Error('Attachment upload did not return an id')
    }
    attachmentIds.push(att.id)
  }
  return sendMessage(conversationUuid, body, attachmentIds, parentUuid)
}

/** Multipart send — kept for compatibility; prefer sendMessageWithAttachments. */
export async function sendMessageWithFiles(
  conversationUuid: string,
  body: string | null,
  files: File[],
  parentUuid?: string | null,
): Promise<Message> {
  const form = new FormData()
  if (body?.trim()) form.append('body', body.trim())
  if (parentUuid) form.append('parent_uuid', parentUuid)
  files.forEach((f, index) => {
    form.append(`attachments[${index}]`, f)
  })
  const res = await api.post<ApiResponse<Record<string, unknown>>>(
    messagingPath(`/conversations/${conversationUuid}/messages`),
    form,
  )
  const { data } = unwrapApi(res.data)
  return normalizeMessage(data)
}

export async function editMessage(uuid: string, body: string): Promise<Message> {
  const res = await api.patch<ApiResponse<Record<string, unknown>>>(messagingPath(`/messages/${uuid}`), {
    body,
  })
  const { data } = unwrapApi(res.data)
  return normalizeMessage(data)
}

export async function deleteMessage(uuid: string): Promise<void> {
  await api.delete(messagingPath(`/messages/${uuid}`))
}

export async function markAsRead(uuid: string): Promise<void> {
  await api.post(messagingPath(`/messages/${uuid}/read`))
}

export async function sendTypingIndicator(
  conversationUuid: string,
  isTyping: boolean,
): Promise<void> {
  await api.post(messagingPath(`/conversations/${conversationUuid}/typing`), { is_typing: isTyping })
}
