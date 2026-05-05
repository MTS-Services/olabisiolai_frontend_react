/** Per-tier boost slot configuration (e.g. Top-1, Top-5). */
export type LgaBoostTierForm = {
  key: string
  label: string
  totalSlots: number
  priceAmount: number
}

/** Configurable boost durations (7 / 14 / 30 days, etc.). */
export type LgaBoostDurationForm = {
  days: 7 | 14 | 30
  enabled: boolean
  priceAmount: number
}

/** Admin UI + API payload for LGA boost settings at create/update time. */
export type LgaBoostFormState = {
  enabled: boolean
  tiers: LgaBoostTierForm[]
  durations: LgaBoostDurationForm[]
}

export function defaultLgaBoostFormState(): LgaBoostFormState {
  return {
    enabled: true,
    tiers: [
      { key: 'top_1', label: 'Top-1', totalSlots: 1, priceAmount: 0 },
      { key: 'top_5', label: 'Top-5', totalSlots: 5, priceAmount: 0 },
      { key: 'top_10', label: 'Top-10', totalSlots: 10, priceAmount: 0 },
    ],
    durations: [
      { days: 7, enabled: true, priceAmount: 0 },
      { days: 14, enabled: true, priceAmount: 0 },
      { days: 30, enabled: true, priceAmount: 0 },
    ],
  }
}

export type LgaBoostStats = {
  totalSlots: number
  slotsSold: number
  slotsRemaining: number
  activeBoosts: number
  expiredBoosts: number
}
