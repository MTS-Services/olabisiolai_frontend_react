import { showInfo } from '@/lib/sweetAlert'

export function notifyNewMessage(senderName: string, preview: string) {
  if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
    return
  }
  void showInfo(`${senderName}: ${preview}`)
}
