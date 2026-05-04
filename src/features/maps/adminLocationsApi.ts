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

  const payload = {
    location: {
      country_name: country || mapPick.country || 'Nigeria',
      country_iso_code: 'NG',
      state_name: stateName.trim(),
      city_name: city || mapPick.locality || undefined,
      lga_name: lgaName.trim(),
      latitude: mapPick.lat,
      longitude: mapPick.lng,
      formatted_address: address || mapPick.formattedAddress || undefined,
      google_place_id: mapPick.googlePlaceId || undefined,
      google_resource_name: mapPick.resourceName || undefined,
      viewport: mapPick.viewport ?? undefined,
      address_components: asObjectArrayFromJsonString(mapPick.addressComponentsJson),
    },
    is_boost_active: boostForm?.enabled ?? false,
    boost_enabled: boostForm?.enabled ?? false,
    boost_tiers: boostForm?.tiers.map((t) => ({
      key: t.key,
      label: t.label,
      total_slots: t.totalSlots,
      price_amount: t.priceAmount,
    })),
    boost_durations: boostForm?.durations.map((d) => ({
      duration_days: d.days,
      enabled: d.enabled,
      price_amount: d.priceAmount,
    })),
    boost_config: boostForm ? boostFormToApiPayload(boostForm) : undefined,
  }

  return payload
}

function parseSavedLocationResponse(body: unknown): AdminSavedLocation {
  const root = asRecord(body)
  const inner = asRecord(root?.data)

  if (!root || root.success !== true || !inner) {
    const message = asString(root?.message || (root as any)?.error, 'Location save failed.')
    const errors = (root as any)?.errors
      ? ': ' + Object.values((root as any).errors).flat().join(', ')
      : ''
    throw new Error(`${message}${errors}`)
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
          ? (durationsFromApi as any)
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

  try {
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
  } catch (error: any) {
    if (error.response?.status === 422) {
      const data = error.response.data
      const message = data.message || 'Validation failed'
      const errors = data.errors ? ': ' + Object.values(data.errors).flat().join(', ') : ''
      throw new Error(`${message}${errors}`)
    }
    throw error
  }
}

export async function adminListLocations(): Promise<AdminSavedLocation[]> {
  const res = await request.post('/admin/locations', {})
  const root = asRecord(res.data)
  if (!root || root.success !== true) {
    throw new Error(asString(root?.message, 'Failed to load locations.'))
  }

  const data = asRecord(root.data)
  const locations = data?.locations ?? data?.data ?? []

  if (!Array.isArray(locations)) {
    return []
  }

  return locations
    .map((item) => {
      try {
        return parseSavedLocationResponse({ success: true, data: item })
      } catch {
        return null
      }
    })
    .filter((item): item is AdminSavedLocation => item !== null)
}

export async function adminUpdateLocationStatus(params: {
  lgaId: number
  boostEnabled: boolean
}): Promise<AdminSavedLocation> {
  const res = await request.post('/admin/locations/update-status', {
    lga_id: params.lgaId,
    boost_enabled: params.boostEnabled,
  })
  return parseSavedLocationResponse(res.data)
}

export async function adminUpdateBoostConfig(params: {
  lgaId: number
  boostConfig: LgaBoostFormState
}): Promise<AdminSavedLocation> {
  const payload = boostFormToApiPayload(params.boostConfig)
  const res = await request.post('/admin/locations/update-boost', {
    lga_id: params.lgaId,
    boost_config: payload,
  })
  return parseSavedLocationResponse(res.data)
}

export async function adminDeleteLocation(lgaId: number): Promise<void> {
  const res = await request.post('/admin/locations/delete', { lga_id: lgaId })
  const root = asRecord(res.data)
  if (!root || root.success !== true) {
    throw new Error(asString(root?.message, 'Failed to delete location.'))
  }
}
