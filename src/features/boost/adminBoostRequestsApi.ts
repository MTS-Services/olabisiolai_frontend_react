import { request } from "@/api/request";

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type AdminBoostRequestRow = {
  id: number;
  tier_key: string;
  tier_label: string;
  duration_days: number;
  amount: number;
  currency: string;
  status: string;
  status_label: string;
  created_at: string | null;
  business: { id: number; business_name: string; vendor_name?: string | null } | null;
  location: { id: number; label: string; lga: string } | null;
};

export async function fetchAdminBoostRequests(status = "pending_admin"): Promise<AdminBoostRequestRow[]> {
  const res = await request.post<
    ApiEnvelope<{ requests: AdminBoostRequestRow[] }>
  >("/admin/boost-requests", { status });

  return res.data.data.requests ?? [];
}

export async function approveAdminBoostRequest(id: number, note?: string): Promise<void> {
  await request.post("/admin/boost-requests/approve", { id, note });
}

export async function rejectAdminBoostRequest(id: number, note?: string): Promise<void> {
  await request.post("/admin/boost-requests/reject", { id, note });
}
