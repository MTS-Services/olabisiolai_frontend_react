import { request } from '@/api/request'
import type { AuthUser } from '@/auth/types'

type IdentityEnvelope = {
  success: boolean
  message: string
  data?: {
    user?: {
      id: number
      uuid: string
      name: string
      email: string
      role: string
    }
  }
}

export async function fetchAdminMessagingIdentity(): Promise<AuthUser> {
  const res = await request.get<IdentityEnvelope>('/admin/messaging/identity')
  const body = res.data
  if (!body?.success || !body.data?.user) {
    throw new Error(body?.message || 'Could not load messaging identity')
  }
  const u = body.data.user
  return {
    id: u.id,
    uuid: u.uuid,
    name: u.name,
    email: u.email,
    role: 'user',
    roles: ['user'],
  }
}
