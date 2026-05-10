import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

import { env } from '@/config/env'
import { messagingEnv } from '@/config/messagingEnv'

export type ReverbEcho = Echo<'reverb'>

declare global {
  interface Window {
    Pusher: typeof Pusher
  }
}

window.Pusher = Pusher

let echoInstance: ReverbEcho | null = null

export function createEcho(accessToken: string | null): ReverbEcho | null {
  if (!messagingEnv.isReverbConfigured()) {
    return null
  }

  disconnectEcho()

  const headers: Record<string, string> = {
    Accept: 'application/json',
  }
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  echoInstance = new Echo<'reverb'>({
    broadcaster: 'reverb',
    key: messagingEnv.reverbKey!,
    wsHost: messagingEnv.reverbHost!,
    wsPort: messagingEnv.reverbPort,
    wssPort: messagingEnv.reverbPort,
    forceTLS: messagingEnv.reverbScheme === 'https',
    enabledTransports: ['ws', 'wss'],
    authEndpoint: messagingEnv.broadcastingAuthUrl,
    auth: { headers },
    ...(env.authStrategy === 'http_only_cookie'
      ? { withCredentials: true }
      : {}),
  })

  return echoInstance
}

export function getEcho(): ReverbEcho | null {
  return echoInstance
}

export function disconnectEcho(): void {
  echoInstance?.disconnect()
  echoInstance = null
}
