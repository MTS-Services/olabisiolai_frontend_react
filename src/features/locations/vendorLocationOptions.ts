export type BoostTierView = {
  key: string;
  label: string;
  totalSlots: number;
  priceAmount: number;
};

export type BoostDurationView = {
  days: number;
  enabled: boolean;
  priceAmount: number;
};

export type ParsedLocationOption = {
  id: string;
  location: string;
  state: string;
  city: string;
  lga: string;
  label: string;
  boost: {
    enabled: boolean;
    tiers: BoostTierView[];
    durations: BoostDurationView[];
    stats: {
      totalSlots: number;
      slotsSold: number;
      slotsRemaining: number;
    };
  } | null;
};

function readNestedValue(record: Record<string, unknown>, path: string[]): unknown {
  let current: unknown = record;
  for (const key of path) {
    if (!current || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function readNestedString(record: Record<string, unknown>, path: string[]): string | undefined {
  return readString(readNestedValue(record, path));
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

export function formatNaira(amount: number): string {
  if (!Number.isFinite(amount) || amount <= 0) return "Free";
  try {
    return `₦${new Intl.NumberFormat("en-NG").format(Math.round(amount))}`;
  } catch {
    return `₦${Math.round(amount).toLocaleString()}`;
  }
}

export function parseBoostData(raw: unknown): ParsedLocationOption["boost"] {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const tiersRaw = Array.isArray(record.tiers) ? record.tiers : [];
  const durationsRaw = Array.isArray(record.durations) ? record.durations : [];
  const statsRaw =
    record.stats && typeof record.stats === "object"
      ? (record.stats as Record<string, unknown>)
      : ({} as Record<string, unknown>);

  return {
    enabled: Boolean(record.enabled),
    tiers: tiersRaw
      .map((tier, index) => {
        if (!tier || typeof tier !== "object") return null;
        const tierRecord = tier as Record<string, unknown>;
        return {
          key: readString(tierRecord.key) ?? `tier-${index + 1}`,
          label: readString(tierRecord.label) ?? readString(tierRecord.name) ?? `Tier ${index + 1}`,
          totalSlots: toNumber(tierRecord.total_slots ?? tierRecord.totalSlots),
          priceAmount: toNumber(tierRecord.price_amount ?? tierRecord.priceAmount ?? tierRecord.price),
        } satisfies BoostTierView;
      })
      .filter((tier): tier is BoostTierView => tier !== null),
    durations: durationsRaw
      .map((duration) => {
        if (!duration || typeof duration !== "object") return null;
        const durationRecord = duration as Record<string, unknown>;
        return {
          days: toNumber(durationRecord.days ?? durationRecord.duration_days),
          enabled: Boolean(durationRecord.enabled ?? durationRecord.is_active),
          priceAmount: toNumber(durationRecord.price_amount ?? durationRecord.priceAmount ?? durationRecord.price),
        } satisfies BoostDurationView;
      })
      .filter((duration): duration is BoostDurationView => duration !== null && duration.days > 0),
    stats: {
      totalSlots: toNumber(statsRaw.total_slots ?? statsRaw.totalSlots),
      slotsSold: toNumber(statsRaw.slots_sold ?? statsRaw.slotsSold),
      slotsRemaining: toNumber(statsRaw.slots_remaining ?? statsRaw.slotsRemaining),
    },
  };
}

export function parseVendorLocationOptions(raw: unknown): ParsedLocationOption[] {
  const rows = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object" && Array.isArray((raw as Record<string, unknown>).data)
      ? ((raw as Record<string, unknown>).data as unknown[])
      : [];
  if (rows.length === 0) return [];

  return rows
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const state = readNestedString(record, ["state", "name"]);
      const city = readNestedString(record, ["city", "name"]);
      const lga = readNestedString(record, ["lga", "name"]);
      const country = readNestedString(record, ["country", "name"]) ?? "Nigeria";
      const idValue = readString(record.id) ?? String(record.id ?? `${state}-${city}-${lga}-${index}`);
      if (!state || !city || !lga) return null;

      return {
        id: idValue,
        location: country,
        state,
        city,
        lga,
        label: `${state} / ${city} / ${lga}`,
        boost: parseBoostData(readNestedValue(record, ["lga", "boost"])),
      } satisfies ParsedLocationOption;
    })
    .filter((entry): entry is ParsedLocationOption => entry !== null);
}
