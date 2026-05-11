export const QUERY_KEYS = {
  conversations: ['conversations'] as const,
  conversation: (uuid: string) => ['conversations', uuid] as const,
  messages: (uuid: string) => ['messages', uuid] as const,
} as const
