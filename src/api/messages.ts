import { api } from '@/api/client'
import type { ApiResponse } from '@/types/api'
import type { Message } from '@/types/message'
import { normalizeMessage, unwrapApi } from '@/utils/messageUtils'

export async function getMessages(
  conversationUuid: string,
  cursor?: string,
): Promise<{ messages: Message[]; meta: ApiResponse<Message[]>['meta'] }> {
  const res = await api.get<ApiResponse<Record<string, unknown>[]>>(
    `/conversations/${conversationUuid}/messages`,
    { params: cursor ? { cursor } : {} },
  )
  const { data, meta } = unwrapApi(res.data)
  const list = Array.isArray(data) ? data.map((r) => normalizeMessage(r)) : []
  return { messages: list, meta }
}

export async function sendMessage(
  conversationUuid: string,
  body: string,
  attachmentIds?: number[],
  parentUuid?: string | null,
): Promise<Message> {
  const res = await api.post<ApiResponse<Record<string, unknown>>>(
    `/conversations/${conversationUuid}/messages`,
    {
      body,
      attachment_ids: attachmentIds?.length ? attachmentIds : undefined,
      parent_uuid: parentUuid ?? undefined,
    },
  )
  const { data } = unwrapApi(res.data)
  return normalizeMessage(data)
}

export async function sendMessageWithFiles(
  conversationUuid: string,
  body: string | null,
  files: File[],
  parentUuid?: string | null,
): Promise<Message> {
  const form = new FormData()
  if (body && body.trim()) form.append('body', body)
  if (parentUuid) form.append('parent_uuid', parentUuid)
  for (const f of files) {
    form.append('attachments[]', f)
  }
  const res = await api.post<ApiResponse<Record<string, unknown>>>(
    `/conversations/${conversationUuid}/messages`,
    form,
  )
  const { data } = unwrapApi(res.data)
  return normalizeMessage(data)
}

export async function editMessage(uuid: string, body: string): Promise<Message> {
  const res = await api.patch<ApiResponse<Record<string, unknown>>>(`/messages/${uuid}`, {
    body,
  })
  const { data } = unwrapApi(res.data)
  return normalizeMessage(data)
}

export async function deleteMessage(uuid: string): Promise<void> {
  await api.delete(`/messages/${uuid}`)
}

export async function markAsRead(uuid: string): Promise<void> {
  await api.post(`/messages/${uuid}/read`)
}

export async function sendTypingIndicator(
  conversationUuid: string,
  isTyping: boolean,
): Promise<void> {
  await api.post(`/conversations/${conversationUuid}/typing`, { is_typing: isTyping })
}
