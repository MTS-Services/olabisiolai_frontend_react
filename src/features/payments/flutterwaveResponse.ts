export type FlutterwaveCallbackResponse = {
  status?: string;
  transaction_id?: string | number;
  id?: string | number;
  flw_ref?: string;
  tx_ref?: string;
};

export function isFlutterwavePaymentSuccessful(response: FlutterwaveCallbackResponse): boolean {
  return (response.status ?? "").toLowerCase() === "successful";
}

export function extractFlutterwaveTransactionId(
  response: FlutterwaveCallbackResponse,
): string | null {
  const candidates = [response.transaction_id, response.id, response.flw_ref];

  for (const candidate of candidates) {
    if (candidate === undefined || candidate === null) {
      continue;
    }
    const value = String(candidate).trim();
    if (value !== "") {
      return value;
    }
  }

  return null;
}
