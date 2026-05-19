import { request } from '@/api/request'
import type { AuthUser } from '@/auth/types'
import { unwrapApi } from '@/utils/messageUtils'

export async function fetchAdminMessagingIdentity(): Promise<AuthUser> {
  const res = await request.get('/admin/messaging/identity')
  const { data } = unwrapApi(res.data as { success?: boolean; data?: Record<string, unknown> })
  const user = data?.user as Record<string, unknown> | undefined
  const id = Number(user?.id ?? 0)
  if (!id) {
    throw new Error('Invalid messaging identity.')
  }
  return {
    id,
    uuid: String(user?.uuid ?? ''),
    name: String(user?.name ?? 'Admin'),
    email: String(user?.email ?? ''),
    role: 'user',
  }
}
