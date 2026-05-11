import type { Message } from '@/types/message'
import type { MessagingUser } from '@/types/user'

export type ConversationType = 'direct' | 'group' | 'channel'

export interface ParticipantPresence {
  status: string
  last_seen_at: string | null
}

export interface ConversationParticipant {
  user_id: number
  role: 'member' | 'admin'
  joined_at: string
  last_read_at: string | null
  is_muted: boolean
  user: {
    id: number
    name: string
    presence: ParticipantPresence | null
  } | null
}

export interface Conversation {
  id: number
  uuid: string
  type: ConversationType
  name: string | null
  participants: ConversationParticipant[]
  last_message: Message | null
  unread_count: number
  is_archived: boolean
  tenant_id?: number | null
  created_at: string
  updated_at: string
}

export function messagingUserFromParticipant(
  p: ConversationParticipant | undefined,
): MessagingUser | null {
  if (!p?.user) return null
  const st = p.user.presence?.status
  const status =
    st === 'online' || st === 'away' || st === 'offline' ? st : 'offline'
  return {
    id: p.user.id,
    name: p.user.name,
    avatar: null,
    status,
    last_seen_at: p.user.presence?.last_seen_at ?? null,
  }
}
