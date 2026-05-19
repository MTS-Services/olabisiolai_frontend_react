import type { Plan } from "@/components/sections/vendor/boost/boostPlan/boostPlanData";
import {
  formatNaira,
  parseBoostData,
  resolveBoostSelectionPrice,
  tierDurationPrice,
  type ParsedLocationOption,
} from "@/features/locations/vendorLocationOptions";

export { resolveBoostSelectionPrice };

const TIER_THEME: Record<string, Plan["colorScheme"]> = {
  top_5: "orange",
  top_3: "gray",
  top_1: "yellow",
};

const TIER_MEDAL: Record<string, number> = {
  top_5: 3,
  top_3: 2,
  top_1: 1,
};

const TIER_FEATURES: Record<string, Plan["features"]> = {
  top_5: [
    { text: "Appear in Top 5 in your LGA", checked: true },
    { text: "Boost badge on listing", checked: true },
    { text: "Increased visibility & enquiries", checked: true },
    { text: "No exclusivity", checked: false },
  ],
  top_3: [
    { text: "Guaranteed Top 3 placement", checked: true },
    { text: "Higher ranking than Bronze", checked: true },
    { text: "Boost badge & strong visibility", checked: true },
    { text: "No exclusivity", checked: false },
  ],
  top_1: [
    { text: "Guaranteed #1 position", checked: true },
    { text: "Exclusive — one per LGA", checked: true },
    { text: "Spotlight badge & 10X more reach", checked: true },
    { text: "Premium vendors get first access", checked: true },
  ],
};

export function buildPlansFromLocationBoost(location: ParsedLocationOption): Plan[] {
  const boost = location.boost;
  if (!boost?.enabled || boost.tiers.length === 0) {
    return [];
  }

  return boost.tiers.map((tier, index) => {
    const pricingOptions = [7, 14, 30]
      .map((days) => {
        const amount = tierDurationPrice(tier, days, boost.durations);
        if (amount === null) return null;
        return {
          duration: `${days} Days`,
          price: formatNaira(amount),
          days,
          amount,
        };
      })
      .filter((entry): entry is { duration: string; price: string; days: number; amount: number } => entry !== null);

    const slotsRemaining = boost.stats.slotsRemaining;
    const isTop1 = tier.key === "top_1";
    const occupied = isTop1 && slotsRemaining <= 0;

    return {
      id: tier.key,
      title: tier.label,
      subtitle:
        tier.key === "top_1"
          ? "The #1 spot — only one business per LGA"
          : tier.key === "top_3"
            ? "Higher visibility for competitive LGAs"
            : "Affordable visibility for growing businesses",
      pricingOptions: pricingOptions.map(({ duration, price }) => ({ duration, price })),
      slotStatus: occupied ? "occupied" : "available",
      features: TIER_FEATURES[tier.key] ?? TIER_FEATURES.top_5,
      cta: occupied ? "Join Waiting List" : `Boost with ${tier.label}`,
      colorScheme: TIER_THEME[tier.key] ?? "orange",
      medal: TIER_MEDAL[tier.key] ?? 3 - index,
      badge: tier.key === "top_3" ? "Most Popular" : undefined,
      highlighted: tier.key === "top_3",
    } satisfies Plan;
  });
}

export function locationFromCatalogResponse(raw: unknown): ParsedLocationOption | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const state = typeof record.state === "object" && record.state
    ? String((record.state as Record<string, unknown>).name ?? "")
    : "";
  const city =
    typeof record.city === "object" && record.city
      ? String((record.city as Record<string, unknown>).name ?? "")
      : "";
  const lga =
    typeof record.lga === "object" && record.lga
      ? String((record.lga as Record<string, unknown>).name ?? "")
      : "";
  const country =
    typeof record.country === "object" && record.country
      ? String((record.country as Record<string, unknown>).name ?? "Nigeria")
      : "Nigeria";

  if (!state || !lga) return null;

  return {
    id: String(record.id ?? ""),
    location: country,
    state,
    city,
    lga,
    label: `${state} / ${city} / ${lga}`,
    boost: parseBoostData(
      typeof record.lga === "object" && record.lga
        ? (record.lga as Record<string, unknown>).boost
        : null,
    ),
  };
}
