import { request } from '@/api/request'

import {
  defaultLgaBoostFormState,
  type LgaBoostFormState,
  type LgaBoostStats,
  type LgaBoostTierForm,
} from '@/features/maps/lgaBoostTypes'
import type { LgaMapPickResult } from '@/features/maps/lgaMapPickTypes'

type AnyRecord = Record<string, unknown>

export type AdminSavedLgaBoost = {
  enabled: boolean
  tiers: LgaBoostTierForm[]
  /** Duration pricing — amounts are major currency units (e.g. Naira). */
  durations: { days: number; enabled: boolean; priceAmount: number }[]
  stats: LgaBoostStats
}

export type AdminSavedLocation = {
  country: {
    id: number | null
    name: string
    isoCode: string
  }
  state: {
    id: number | null
    name: string
    slug: string | null
  }
  city: {
    id: number | null
    name: string
  } | null
  lga: {
    id: number | null
    name: string
    slug: string | null
    latitude: number
    longitude: number
    vendorCount: number
    googlePlaceId: string | null
    formattedAddress: string | null
    boost: AdminSavedLgaBoost
  }
}

function asRecord(value: unknown): AnyRecord | null {
  if (!value || typeof value !== 'object') return null
  return value as AnyRecord
}

function asString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  return fallback
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return fallback
}

function asNullableId(value: unknown): number | null {
  const parsed = asNumber(value, Number.NaN)
  return Number.isFinite(parsed) ? parsed : null
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value
  if (value === 1 || value === '1' || value === 'true') return true
  if (value === 0 || value === '0' || value === 'false') return false
  return fallback
}

const EMPTY_STATS: LgaBoostStats = {
  totalSlots: 0,
  slotsSold: 0,
  slotsRemaining: 0,
  activeBoosts: 0,
  expiredBoosts: 0,
}

function parseBoostStats(raw: unknown): LgaBoostStats {
  const o = asRecord(raw)
  if (!o) return { ...EMPTY_STATS }
  return {
    totalSlots: asNumber(o.total_slots ?? o.totalSlots, 0),
    slotsSold: asNumber(o.slots_sold ?? o.slotsSold, 0),
    slotsRemaining: asNumber(o.slots_remaining ?? o.slotsRemaining, 0),
    activeBoosts: asNumber(o.active_boosts ?? o.activeBoosts, 0),
    expiredBoosts: asNumber(o.expired_boosts ?? o.expiredBoosts, 0),
  }
}

function parseBoostTiers(raw: unknown): LgaBoostTierForm[] {
  if (!Array.isArray(raw)) return []
  const out: LgaBoostTierForm[] = []
  for (const item of raw) {
    const o = asRecord(item)
    if (!o) continue
    out.push({
      key: asString(o.key ?? o.slug, `tier-${out.length}`),
      label: asString(o.label ?? o.title ?? o.name, ''),
      totalSlots: asNumber(o.total_slots ?? o.totalSlots, 0),
      priceAmount: asNumber(o.price_amount ?? o.priceAmount ?? o.price, 0),
    })
  }
  return out
}

function parseBoostDurations(raw: unknown): { days: number; enabled: boolean; priceAmount: number }[] {
  if (!Array.isArray(raw)) return []
  const out: { days: number; enabled: boolean; priceAmount: number }[] = []
  for (const item of raw) {
    const o = asRecord(item)
    if (!o) continue
    const days = asNumber(o.days ?? o.duration_days, 0)
    if (!days) continue
    out.push({
      days,
      enabled: asBoolean(o.enabled ?? o.is_active, true),
      priceAmount: asNumber(o.price_amount ?? o.priceAmount ?? o.price, 0),
    })
  }
  return out
}

function mergeBoostFromForm(saved: AdminSavedLocation, form: LgaBoostFormState): AdminSavedLocation {
  const tierTotals = form.tiers.reduce((sum, t) => sum + Math.max(0, t.totalSlots), 0)
  const stats: LgaBoostStats = {
    ...EMPTY_STATS,
    totalSlots: tierTotals,
    slotsSold: 0,
    slotsRemaining: tierTotals,
    activeBoosts: 0,
    expiredBoosts: 0,
  }
  return {
    ...saved,
    lga: {
      ...saved.lga,
      boost: {
        enabled: form.enabled,
        tiers: form.tiers.map((t) => ({ ...t })),
        durations: form.durations.map((d) => ({
          days: d.days,
          enabled: d.enabled,
          priceAmount: d.priceAmount,
        })),
        stats,
      },
    },
  }
}

function asObjectArrayFromJsonString(value: string): unknown[] {
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function boostFormToApiPayload(form: LgaBoostFormState) {
  return {
    enabled: form.enabled,
    tiers: form.tiers.map((t) => ({
      key: t.key,
      label: t.label,
      total_slots: t.totalSlots,
      price_amount: t.priceAmount,
    })),
    durations: form.durations.map((d) => ({
      days: d.days,
      enabled: d.enabled,
      price_amount: d.priceAmount,
    })),
  }
}

function toApiPayload(
  countryName: string,
  stateName: string,
  cityName: string,
  lgaName: string,
  fullAddress: string | undefined,
  mapPick: LgaMapPickResult,
  boostForm: LgaBoostFormState | undefined,
) {
  const city = cityName.trim()
  const country = countryName.trim()
  const address = fullAddress?.trim()
  const base = {
    country: {
      name: country || mapPick.country || 'Nigeria',
      iso_code: 'NG',
      is_active: true,
      sort_order: 0,
    },
    state: {
      name: stateName.trim(),
    },
    city: city || mapPick.locality
      ? {
        name: city || mapPick.locality,
      }
      : undefined,
    lga: {
      name: lgaName.trim(),
      google_place_id: mapPick.googlePlaceId || undefined,
      google_resource_name: mapPick.resourceName || undefined,
      latitude: mapPick.lat,
      longitude: mapPick.lng,
      viewport: mapPick.viewport ?? undefined,
      address_components_json: asObjectArrayFromJsonString(mapPick.addressComponentsJson),
    },
    map_pick: {
      placeId: mapPick.googlePlaceId || undefined,
      resourceName: mapPick.resourceName || undefined,
      formattedAddress: address || mapPick.formattedAddress || undefined,
      lat: mapPick.lat,
      lng: mapPick.lng,
      viewport: mapPick.viewport ?? undefined,
      addressComponents: asObjectArrayFromJsonString(mapPick.addressComponentsJson),
      country: mapPick.country ?? undefined,
      state: mapPick.administrativeAreaLevel1 ?? undefined,
      lga: mapPick.administrativeAreaLevel2 ?? mapPick.locality ?? mapPick.displayName ?? undefined,
    },
  }
  if (!boostForm) return base
  return {
    ...base,
    boost_config: boostFormToApiPayload(boostForm),
  }
}

function parseSavedLocationResponse(body: unknown): AdminSavedLocation {
  const root = asRecord(body)
  const inner = asRecord(root?.data)
  if (!root || root.success !== true || !inner) {
    throw new Error(asString(root?.message, 'Location save failed.'))
  }

  const country = asRecord(inner.country)
  const state = asRecord(inner.state)
  const city = asRecord(inner.city)
  const lga = asRecord(inner.lga)
  const boostRoot = asRecord(inner.boost ?? lga?.boost)

  if (!country || !state || !lga) {
    throw new Error('Invalid location response from server.')
  }

  const defaults = defaultLgaBoostFormState()
  let tiersFromApi = parseBoostTiers(boostRoot?.tiers ?? lga.boost_tiers)
  if (!tiersFromApi.length) tiersFromApi = defaults.tiers
  let durationsFromApi = parseBoostDurations(boostRoot?.durations ?? lga.boost_durations)
  if (!durationsFromApi.length) {
    durationsFromApi = defaults.durations.map((d) => ({
      days: d.days,
      enabled: d.enabled,
      priceAmount: d.priceAmount,
    }))
  }
  const statsFromApi = parseBoostStats(boostRoot?.stats ?? lga.boost_stats)
  const enabledFromApi = asBoolean(
    boostRoot?.enabled ?? lga.boost_enabled ?? lga.is_boost_active,
    true,
  )

  const totalFromTiers = tiersFromApi.reduce((s, t) => s + t.totalSlots, 0)
  const stats: LgaBoostStats = {
    totalSlots: statsFromApi.totalSlots || totalFromTiers,
    slotsSold: statsFromApi.slotsSold,
    slotsRemaining:
      statsFromApi.slotsRemaining ||
      Math.max(0, (statsFromApi.totalSlots || totalFromTiers) - statsFromApi.slotsSold),
    activeBoosts: statsFromApi.activeBoosts,
    expiredBoosts: statsFromApi.expiredBoosts,
  }

  return {
    country: {
      id: asNullableId(country.id),
      name: asString(country.name, 'Nigeria'),
      isoCode: asString(country.iso_code, 'NG'),
    },
    state: {
      id: asNullableId(state.id),
      name: asString(state.name, ''),
      slug: asString(state.slug, '') || null,
    },
    city: city
      ? {
        id: asNullableId(city.id),
        name: asString(city.name, ''),
      }
      : null,
    lga: {
      id: asNullableId(lga.id),
      name: asString(lga.name, ''),
      slug: asString(lga.slug, '') || null,
      latitude: asNumber(lga.latitude),
      longitude: asNumber(lga.longitude),
      vendorCount: asNumber(lga.vendor_count),
      googlePlaceId: asString(lga.google_place_id, '') || null,
      formattedAddress: asString(lga.formatted_address ?? lga.full_address, '') || null,
      boost: {
        enabled: enabledFromApi,
        tiers: tiersFromApi,
        durations: durationsFromApi.length
          ? durationsFromApi
          : [
            { days: 7, enabled: true, priceAmount: 0 },
            { days: 14, enabled: true, priceAmount: 0 },
            { days: 30, enabled: true, priceAmount: 0 },
          ],
        stats,
      },
    },
  }
}

export async function adminStoreLocation(params: {
  countryName: string
  stateName: string
  cityName: string
  lgaName: string
  fullAddress?: string
  mapPick: LgaMapPickResult
  boostConfig?: LgaBoostFormState
}): Promise<AdminSavedLocation> {
  const payload = toApiPayload(
    params.countryName,
    params.stateName,
    params.cityName,
    params.lgaName,
    params.fullAddress,
    params.mapPick,
    params.boostConfig,
  )
  const res = await request.post('/admin/locations/store', payload)
  let parsed = parseSavedLocationResponse(res.data)
  if (params.boostConfig) {
    parsed = mergeBoostFromForm(parsed, params.boostConfig)
  }
  const fa = params.fullAddress?.trim() || params.mapPick.formattedAddress || null
  return {
    ...parsed,
    lga: {
      ...parsed.lga,
      googlePlaceId: parsed.lga.googlePlaceId ?? params.mapPick.googlePlaceId ?? null,
      formattedAddress: parsed.lga.formattedAddress ?? fa,
    },
  }
}
