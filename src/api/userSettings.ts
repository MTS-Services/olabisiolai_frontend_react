import { request } from '@/api/request'

/** `profile` lives on `users`; `settings` is the JSON column (arbitrary keys, merged on PATCH). */
export type UserSettingsProfile = {
  first_name: string
  last_name: string
  name: string
  email: string
  phone: string | null
  wants_marketing_emails: boolean
}

export type UserSettingsPayload = {
  profile: UserSettingsProfile
  /** Dynamic preferences — stored in `users.settings` (JSON). */
  settings: Record<string, unknown>
}

type UserSettingsApiEnvelope = {
  success: boolean
  message: string
  data: UserSettingsPayload
}

/** `GET /user/settings` — authenticated customer (`role: user`). */
export async function fetchUserSettings(): Promise<UserSettingsPayload> {
  const response = await request.get<UserSettingsApiEnvelope>('/user/settings')
  const body = response.data
  if (!body?.success || !body.data) {
    throw new Error(body?.message || 'Could not load settings')
  }
  return body.data
}

export type PatchUserSettingsBody = {
  first_name?: string
  last_name?: string
  phone?: string | null
  wants_marketing_emails?: boolean
  /** Shallow-deep merge via `array_replace_recursive` on the server. */
  settings?: Record<string, unknown>
}

/** `PATCH /user/settings` — partial profile + partial `settings` merge. */
export async function patchUserSettings(body: PatchUserSettingsBody): Promise<UserSettingsPayload> {
  const response = await request.patch<UserSettingsApiEnvelope>('/user/settings', body)
  const resBody = response.data
  if (!resBody?.success || !resBody.data) {
    throw new Error(resBody?.message || 'Could not save settings')
  }
  return resBody.data
}
