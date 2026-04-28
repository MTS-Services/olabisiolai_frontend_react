import { request } from "@/api/request";

type RawRecord = Record<string, unknown>;

export type AdminBusinessInfo = {
  id: number;
  name: string;
  category: string;
  type: string;
  location: string;
  status: "pending" | "active" | "suspended";
  verification: "pending" | "verified" | "rejected";
  boost: "none" | "active";
  plan: "free" | "premium";
  joinDate: string;
};

function asRecord(value: unknown): RawRecord | null {
  if (!value || typeof value !== "object") return null;
  return value as RawRecord;
}

function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

function pickString(
  source: RawRecord,
  keys: string[],
  fallback = "",
): string {
  for (const key of keys) {
    const value = source[key];
    const text = asString(value).trim();
    if (text) return text;
  }
  return fallback;
}

function toStatus(raw: string): AdminBusinessInfo["status"] {
  if (raw === "active" || raw === "suspended" || raw === "pending") return raw;
  return "pending";
}

function toVerification(raw: string): AdminBusinessInfo["verification"] {
  if (raw === "verified" || raw === "rejected" || raw === "pending") return raw;
  return "pending";
}

function toBoost(raw: string): AdminBusinessInfo["boost"] {
  if (raw === "active") return "active";
  return "none";
}

function toPlan(raw: string): AdminBusinessInfo["plan"] {
  if (raw === "premium") return "premium";
  return "free";
}

function parseBusiness(raw: unknown): AdminBusinessInfo | null {
  const item = asRecord(raw);
  if (!item) return null;

  const idValue = item.id ?? item.business_id;
  const id = typeof idValue === "number" ? idValue : Number(idValue);
  if (!Number.isFinite(id)) return null;

  const name = pickString(item, ["business_name", "name"], `Business ${id}`);
  const category = pickString(item, ["category_name", "category"], "Uncategorized");
  const type = pickString(item, ["business_type", "type"], "service");
  const location = pickString(item, ["location", "city", "state"], "N/A");
  const joinDate = pickString(item, ["join_date", "created_at"], "");

  const status = toStatus(pickString(item, ["status"], "pending").toLowerCase());
  const verification = toVerification(
    pickString(item, ["verification_status", "verification"], "pending").toLowerCase(),
  );
  const boost = toBoost(pickString(item, ["boost_status", "boost"], "none").toLowerCase());
  const plan = toPlan(pickString(item, ["plan", "subscription_plan"], "free").toLowerCase());

  return {
    id,
    name,
    category,
    type,
    location,
    status,
    verification,
    boost,
    plan,
    joinDate,
  };
}

function extractBusinessList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  const root = asRecord(payload);
  if (!root) return [];

  const data = root.data;
  if (Array.isArray(data)) return data;

  const inner = asRecord(data);
  if (!inner) return [];

  if (Array.isArray(inner.businesses)) return inner.businesses;
  if (Array.isArray(inner.items)) return inner.items;
  return [];
}

export async function fetchAdminBusinessInfo(): Promise<AdminBusinessInfo[]> {
  const res = await request.get("/admin/business-info");
  return extractBusinessList(res.data)
    .map(parseBusiness)
    .filter((item): item is AdminBusinessInfo => item !== null);
}
