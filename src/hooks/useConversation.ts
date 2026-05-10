import { useQuery } from '@tanstack/react-query'

import { getConversation } from '@/api/conversations'
import { QUERY_KEYS } from '@/constants/queryKeys'

export function useConversation(uuid: string | null) {
  return useQuery({
    queryKey: QUERY_KEYS.conversation(uuid ?? ''),
    queryFn: () => getConversation(uuid!),
    enabled: Boolean(uuid),
  })
}
