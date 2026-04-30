import { request } from '@/api/request'

import type { LgaMapPickResult } from '@/features/maps/lgaMapPickTypes'

type AnyRecord = Record<string, unknown>

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

function asObjectArrayFromJsonString(value: string): unknown[] {
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function toApiPayload(
  countryName: string,
  stateName: string,
  cityName: string,
  lgaName: string,
  fullAddress: string | undefined,
  mapPick: LgaMapPickResult,
) {
  const city = cityName.trim()
  const country = countryName.trim()
  const address = fullAddress?.trim()
  return {
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

  if (!country || !state || !lga) {
    throw new Error('Invalid location response from server.')
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
}): Promise<AdminSavedLocation> {
  const payload = toApiPayload(
    params.countryName,
    params.stateName,
    params.cityName,
    params.lgaName,
    params.fullAddress,
    params.mapPick,
  )
  const res = await request.post('/admin/locations/store', payload)
  return parseSavedLocationResponse(res.data)
}
