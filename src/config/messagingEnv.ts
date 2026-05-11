import { env } from '@/config/env'

export function getApiOrigin(): string {
  return env.apiBaseUrl.replace(/\/?api\/v1\/?$/i, '')
}

function viteString(name: string): string | undefined {
  const v = (import.meta.env as Record<string, string | undefined>)[name]?.trim()
  return v || undefined
}

function reverbPortFromEnv(): number {
  const raw = viteString('VITE_REVERB_PORT')
  const n = raw != null && raw !== '' ? Number(raw) : 8080
  return Number.isFinite(n) && n > 0 ? n : 8080
}

export const messagingEnv = {
  broadcastingAuthUrl: `${getApiOrigin()}/broadcasting/auth`,
  reverbKey: viteString('VITE_REVERB_APP_KEY'),
  reverbHost: viteString('VITE_REVERB_HOST'),
  reverbPort: reverbPortFromEnv(),
  reverbScheme: viteString('VITE_REVERB_SCHEME') ?? 'http',
  isReverbConfigured(): boolean {
    return Boolean(this.reverbKey && this.reverbHost)
  },
}
