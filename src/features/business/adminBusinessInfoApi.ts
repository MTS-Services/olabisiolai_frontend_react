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

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function asBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["1", "true", "yes", "verified", "active", "approved"].includes(normalized)) return true;
    if (["0", "false", "no", "rejected", "inactive", "pending"].includes(normalized)) return false;
  }
  return null;
}

function toSafeId(raw: unknown, fallbackSeed: string): number {
  const numeric = asNumber(raw);
  if (numeric !== null) return numeric;

  const text = asString(raw, fallbackSeed).trim() || fallbackSeed;
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) || Math.abs(fallbackSeed.length * 101);
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

function pickRecord(source: RawRecord, keys: string[]): RawRecord | null {
  for (const key of keys) {
    const value = asRecord(source[key]);
    if (value) return value;
  }
  return null;
}

function toStatus(raw: string): AdminBusinessInfo["status"] {
  if (raw === "active" || raw === "suspended" || raw === "pending") return raw;
  if (raw === "inactive") return "suspended";
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

function parseBusiness(raw: unknown, index: number): AdminBusinessInfo | null {
  const item = asRecord(raw);
  if (!item) return null;

  const categoryObj = pickRecord(item, ["category"]);
  const locationObj = pickRecord(item, ["location"]);
  const verificationObj = pickRecord(item, ["verification"]);
  const planObj = pickRecord(item, ["plan"]);
  const boostObj = pickRecord(item, ["boost"]);
  const fallbackSeed = `${pickString(item, ["business_name", "name"], "business")}-${index + 1}`;

  const id = toSafeId(item.id ?? item.business_id ?? item.uuid ?? item.slug, fallbackSeed);

  const name = pickString(item, ["business_name", "name"], `Business ${id}`);
  const category =
    pickString(item, ["category_name"], "") ||
    pickString(categoryObj ?? {}, ["name", "title"], "") ||
    pickString(item, ["category"], "Uncategorized");
  const type = pickString(item, ["business_type", "type"], "service");
  const cityFromObj = pickString(locationObj ?? {}, ["city", "name"], "");
  const stateFromObj = pickString(locationObj ?? {}, ["state", "region"], "");
  const locationFromObj = [cityFromObj, stateFromObj].filter(Boolean).join(", ");
  const location =
    locationFromObj ||
    pickString(item, ["location", "address"], "") ||
    [pickString(item, ["city"], ""), pickString(item, ["state"], "")].filter(Boolean).join(", ") ||
    "N/A";
  const joinDate = pickString(item, ["join_date", "created_at"], "");

  const status = toStatus(
    pickString(item, ["business_status", "status"], pickString(verificationObj ?? {}, ["status"], "pending")).toLowerCase(),
  );

  const verificationBool = asBoolean(item.is_verified ?? item.verified ?? verificationObj?.is_verified);
  const verification = toVerification(
    (
      pickString(item, ["verification_status"], "") ||
      pickString(verificationObj ?? {}, ["status"], "") ||
      (verificationBool === null ? "" : verificationBool ? "verified" : "pending") ||
      pickString(item, ["verification"], "pending")
    ).toLowerCase(),
  );
  const boost = toBoost(
    (
      pickString(item, ["boost_status"], "") ||
      pickString(boostObj ?? {}, ["status"], "") ||
      pickString(item, ["boost"], "none")
    ).toLowerCase(),
  );
  const plan = toPlan(
    (
      pickString(item, ["subscription_plan"], "") ||
      pickString(planObj ?? {}, ["name", "tier"], "") ||
      pickString(item, ["plan"], "free")
    ).toLowerCase(),
  );

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

function toUnknownArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function pickFirstArray(candidates: unknown[]): unknown[] {
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }
  return [];
}

function extractBusinessList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  const root = asRecord(payload);
  if (!root) return [];

  const rootDirect = pickFirstArray([
    root.businesses,
    root.business_profiles,
    root.items,
    root.results,
    root.rows,
    root.list,
  ]);
  if (rootDirect.length > 0) return rootDirect;

  const data = root.data;
  if (Array.isArray(data)) return data;
  const inner = asRecord(data);
  if (!inner) return [];

  const innerDirect = pickFirstArray([
    inner.data, // Laravel paginator/resource collection often nests here
    inner.business_profiles,
    inner.businesses,
    inner.items,
    inner.results,
    inner.rows,
    inner.list,
  ]);
  if (innerDirect.length > 0) return innerDirect;

  // Support shapes like { data: { businesses: { data: [...] } } }
  const nestedSources = [inner.business_profiles, inner.businesses, inner.items, inner.results, inner.rows];
  for (const source of nestedSources) {
    const node = asRecord(source);
    if (!node) continue;
    const nested = pickFirstArray([node.data, node.items, node.rows]);
    if (nested.length > 0) return nested;
  }

  return toUnknownArray(inner.data);
}

export async function fetchAdminBusinessInfo(): Promise<AdminBusinessInfo[]> {
  // Backend style in this project commonly uses POST for admin listing endpoints.
  const attempts: Array<() => Promise<unknown>> = [
    () => request.post("/admin/business-info", {}).then((res) => res.data),
    () => request.post("/admin/businesses", {}).then((res) => res.data),
    () => request.post("/admin/businesses/list", {}).then((res) => res.data),
    () => request.get("/admin/business-info").then((res) => res.data),
  ];

  let lastError: unknown = null;

  for (const attempt of attempts) {
    try {
      const data = await attempt();
      const rows = extractBusinessList(data);
      const parsed = rows
        .map((row, index) => parseBusiness(row, index))
        .filter((item): item is AdminBusinessInfo => item !== null);
      if (parsed.length > 0) return parsed;

      const root = asRecord(data);
      if (root && root.success === true) {
        // Valid API success with no rows.
        return [];
      }
      const message =
        pickString(root ?? {}, ["message", "error"], "") ||
        pickString(asRecord(root?.data) ?? {}, ["message", "error"], "");
      if (message) {
        throw new Error(message);
      }
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError instanceof Error) {
    throw lastError;
  }
  throw new Error("Failed to load businesses from admin endpoints.");
}
