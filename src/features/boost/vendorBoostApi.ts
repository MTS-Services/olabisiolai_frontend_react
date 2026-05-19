import { request } from "@/api/request";
import type { ParsedLocationOption } from "@/features/locations/vendorLocationOptions";
import { locationFromCatalogResponse } from "@/features/boost/locationBoostPlans";

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type VendorBoostPendingRequest = {
  id: number;
  tier_key: string;
  tier_label: string;
  duration_days: number;
  amount: number;
  status: string;
  status_label: string;
};

export type VendorBoostCatalog = {
  location: ParsedLocationOption | null;
  pendingRequest: VendorBoostPendingRequest | null;
  isPremiumActive: boolean;
};

export async function fetchVendorBoostCatalog(): Promise<VendorBoostCatalog> {
  const res = await request.get<
    ApiEnvelope<{
      location: unknown;
      pending_request: VendorBoostPendingRequest | null;
      is_premium_active: boolean;
    }>
  >("/vendor/boost/catalog");

  const data = res.data.data;

  return {
    location: locationFromCatalogResponse(data.location),
    pendingRequest: data.pending_request,
    isPremiumActive: Boolean(data.is_premium_active),
  };
}

export async function submitVendorBoostRequest(params: {
  tierKey: string;
  durationDays: number;
}): Promise<{ message: string }> {
  const res = await request.post<ApiEnvelope<{ request: unknown }>>("/vendor/boost/request", {
    tier_key: params.tierKey,
    duration_days: params.durationDays,
  });

  return { message: res.data.message };
}
