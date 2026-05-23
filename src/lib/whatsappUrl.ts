/** Build a WhatsApp chat URL from a phone number (digits only in path). */
export function buildWhatsAppUrl(phone: string | null | undefined): string | null {
  const digits = (phone ?? '').replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}`;
}
