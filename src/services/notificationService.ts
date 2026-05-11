import toast from 'react-hot-toast'

export function notifyNewMessage(senderName: string, preview: string) {
  if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
    return
  }
  toast(`${senderName}: ${preview}`, { duration: 4000 })
}
