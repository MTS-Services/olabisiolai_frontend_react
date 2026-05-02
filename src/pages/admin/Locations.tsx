import { useCallback, useMemo, useState } from 'react'
import { ChevronDown, ExternalLink, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  AddLocationWizardModal,
  type AddLocationWizardSubmit,
} from '@/components/admin/locations/AddLocationWizardModal'
import { env } from '@/config/env'
import {
  adminStoreLocation,
  type AdminSavedLocation,
} from '@/features/maps/adminLocationsApi'
import type { LgaMapPickResult } from '@/features/maps/lgaMapPickTypes'

type LGA = AdminSavedLocation['lga']
type StateEntry = { id: string; name: string; lgas: LGA[] }

function toStateId(saved: AdminSavedLocation) {
  return saved.state.id !== null ? `state-${saved.state.id}` : `state-${saved.state.slug ?? saved.state.name}`
}

function toLgaId(saved: AdminSavedLocation) {
  if (saved.lga.id !== null) return `lga-${saved.lga.id}`
  const seed = saved.lga.slug ?? `${saved.state.name}-${saved.lga.name}`
  return `lga-${seed}`
}

function upsertStateLocation(prev: StateEntry[], saved: AdminSavedLocation): StateEntry[] {
  const stateId = toStateId(saved)
  const lgaId = toLgaId(saved)
  const nextLga = saved.lga

  const stateIndex = prev.findIndex((s) => s.id === stateId || s.name.toLowerCase() === saved.state.name.toLowerCase())
  if (stateIndex < 0) {
    return [{ id: stateId, name: saved.state.name, lgas: [nextLga] }, ...prev]
  }

  const current = prev[stateIndex]
  const lgaIndex = current.lgas.findIndex((l) => toLgaEntryId(l, saved.state.name) === lgaId || l.name.toLowerCase() === saved.lga.name.toLowerCase())
  const updatedLgas =
    lgaIndex < 0
      ? [...current.lgas, nextLga]
      : current.lgas.map((l, idx) => {
        if (idx !== lgaIndex) return l
        return nextLga
      })

  return prev.map((state, idx) => {
    if (idx !== stateIndex) return state
    return { ...state, name: saved.state.name, lgas: updatedLgas }
  })
}

/** Stable row key when listing LGAs from merged client/server state */
function toLgaEntryId(lga: LGA, stateName: string): string {
  if (lga.id !== null) return `lga-${lga.id}`
  return `lga-${lga.slug ?? `${stateName}-${lga.name}`}`
}

type AddressComponentLike = {
  longText?: string
  shortText?: string
  types?: string[]
}

function parseAddressComponentsFromPick(pick: LgaMapPickResult): AddressComponentLike[] {
  try {
    const parsed = JSON.parse(pick.addressComponentsJson) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item) => item && typeof item === 'object') as AddressComponentLike[]
  } catch {
    return []
  }
}

function findComponent(components: AddressComponentLike[], type: string): string | null {
  const found = components.find((c) => Array.isArray(c.types) && c.types.includes(type))
  const value = found?.longText?.trim() || found?.shortText?.trim() || ''
  return value || null
}

function buildDetailedAddressFromPick(pick: LgaMapPickResult): string {
  const components = parseAddressComponentsFromPick(pick)

  const streetNumber = findComponent(components, 'street_number')
  const route = findComponent(components, 'route')
  const area =
    findComponent(components, 'sublocality_level_1') ||
    findComponent(components, 'sublocality') ||
    findComponent(components, 'neighborhood')
  const city = findComponent(components, 'locality') || pick.locality
  const lga = findComponent(components, 'administrative_area_level_2') || pick.administrativeAreaLevel2
  const state = findComponent(components, 'administrative_area_level_1') || pick.administrativeAreaLevel1
  const postal = findComponent(components, 'postal_code')
  const country = findComponent(components, 'country') || pick.country

  const roadPart = [streetNumber, route].filter(Boolean).join(' ')
  const ordered = [roadPart, area, city, lga, state, postal, country].filter(Boolean)
  const composed = ordered.join(', ').replace(/\s+,/g, ',').trim()

  return composed || pick.formattedAddress || ''
}

function mapsPreviewUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lng}`)}`
}

export default function LocationHierarchy() {
  const [locations, setLocations] = useState<StateEntry[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [lastSavedMessage, setLastSavedMessage] = useState<string | null>(null)
  const [openStates, setOpenStates] = useState<Set<string>>(new Set())
  const [openLgas, setOpenLgas] = useState<Set<string>>(new Set())

  const toggle = (set: Set<string>, id: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setter(next)
  }

  const patchLga = useCallback((stateId: string, lgaRowId: string, updater: (current: LGA) => LGA) => {
    setLocations((prev) =>
      prev.map((s) => {
        if (s.id !== stateId) return s
        return {
          ...s,
          lgas: s.lgas.map((l) => {
            const id = toLgaEntryId(l, s.name)
            if (id !== lgaRowId) return l
            return updater(l)
          }),
        }
      }),
    )
  }, [])

  const handleWizardSubmit = async (input: AddLocationWizardSubmit) => {
    const address = input.fullAddress.trim() || buildDetailedAddressFromPick(input.mapPick)
    if (!input.stateName.trim() || !input.lgaName.trim()) {
      setSaveError('State and LGA are required.')
      return
    }

    setSaving(true)
    setSaveError(null)
    setLastSavedMessage(null)

    try {
      const saved = await adminStoreLocation({
        countryName: input.countryName,
        stateName: input.stateName,
        cityName: input.cityName,
        lgaName: input.lgaName,
        fullAddress: address,
        mapPick: input.mapPick,
        boostConfig: input.boostConfig,
      })

      const stateId = toStateId(saved)
      const lgaId = toLgaId(saved)
      setLocations((prev) => upsertStateLocation(prev, saved))
      setOpenStates((prev) => new Set([...prev, stateId]))
      setOpenLgas((prev) => new Set([...prev, lgaId]))

      setShowAddModal(false)
      setLastSavedMessage(`Saved: ${saved.state.name} → ${saved.lga.name}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save location.'
      setSaveError(message)
    } finally {
      setSaving(false)
    }
  }

  const title = useMemo(() => {
    const states = locations.length
    const lgas = locations.reduce((sum, state) => sum + state.lgas.length, 0)
    return `${states} state${states === 1 ? '' : 's'} · ${lgas} LGA${lgas === 1 ? '' : 's'}`
  }, [locations])

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-sm">
      <h1 className="mb-1 text-xl font-bold text-gray-900">Locations</h1>
      <p className="mb-2 text-xs text-gray-500">{title}</p>
      {lastSavedMessage && (
        <div className="mb-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
          {lastSavedMessage}
        </div>
      )}
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => {
            setSaveError(null)
            setShowAddModal(true)
          }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-blue-600 active:scale-95"
        >
          <Plus className="size-3.5" />
          Add location
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {locations.length === 0 && (
          <div className="px-4 py-6 text-sm text-gray-500">
            No locations yet. Use <strong>Add location</strong> to capture coordinates from Google Maps and configure boost.
          </div>
        )}
        {locations.map((state, si) => {
          const stateOpen = openStates.has(state.id)
          return (
            <div key={state.id} className={si > 0 ? 'border-t border-gray-100' : ''}>
              <button
                type="button"
                onClick={() => toggle(openStates, state.id, setOpenStates)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <ChevronDown
                    className={`size-3.5 text-gray-400 transition-transform duration-150 ${stateOpen ? '' : '-rotate-90'}`}
                  />
                  <span className="font-semibold text-gray-900">{state.name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {state.lgas.length} LGA{state.lgas.length !== 1 ? 's' : ''}
                </span>
              </button>

              {stateOpen &&
                state.lgas.map((lga) => {
                  const lgaRowId = toLgaEntryId(lga, state.name)
                  const lgaOpen = openLgas.has(lgaRowId)
                  const boostOn = lga.boost.enabled
                  return (
                    <div key={lgaRowId} className="bg-green-50">
                      <button
                        type="button"
                        onClick={() => toggle(openLgas, lgaRowId, setOpenLgas)}
                        className="flex w-full items-center justify-between border-t border-gray-200 bg-green-50 py-2.5 pl-8 pr-4 text-left transition-colors hover:bg-green-100/60"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <ChevronDown
                            className={`size-3.5 shrink-0 text-gray-400 transition-transform duration-150 ${lgaOpen ? '' : '-rotate-90'}`}
                          />
                          <span className="font-medium text-gray-800">{lga.name}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${boostOn ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                              }`}
                          >
                            Boost {boostOn ? 'on' : 'off'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {lga.vendorCount} vendor{lga.vendorCount !== 1 ? 's' : ''}
                        </span>
                      </button>

                      {lgaOpen && (
                        <div className="border-t border-gray-100 bg-white py-3 pl-10 pr-4 text-gray-800">
                          <div className="mb-3 grid gap-3 sm:grid-cols-2">
                            <div>
                              <p className="text-[11px] font-semibold uppercase text-gray-500">State</p>
                              <p className="text-sm">{state.name}</p>
                            </div>
                            <div>
                              <p className="text-[11px] font-semibold uppercase text-gray-500">LGA</p>
                              <p className="text-sm">{lga.name}</p>
                            </div>
                          </div>

                          <div className="mb-3 rounded-lg border border-gray-100 bg-gray-50/80 p-3">
                            <p className="mb-2 text-[11px] font-semibold uppercase text-gray-500">Coordinates & Google data</p>
                            <p className="font-mono text-xs">
                              {lga.latitude.toFixed(6)}, {lga.longitude.toFixed(6)}
                            </p>
                            {lga.googlePlaceId && (
                              <p className="mt-1 break-all text-xs text-gray-600">
                                <span className="font-medium text-gray-700">Place ID:</span> {lga.googlePlaceId}
                              </p>
                            )}
                            {lga.formattedAddress && (
                              <p className="mt-1 text-xs text-gray-600">{lga.formattedAddress}</p>
                            )}
                            <a
                              href={mapsPreviewUrl(lga.latitude, lga.longitude)}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                            >
                              Open in Google Maps
                              <ExternalLink className="size-3" />
                            </a>
                          </div>

                          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-gray-100 p-3">
                            <div>
                              <p className="text-[11px] font-semibold uppercase text-gray-500">Boost for this LGA</p>
                              <p className="text-xs text-gray-500">Turn off if this area is not ready for paid boosts.</p>
                            </div>
                            <label className="flex cursor-pointer items-center gap-2">
                              <span className="text-xs text-gray-600">{lga.boost.enabled ? 'Active' : 'Inactive'}</span>
                              <input
                                type="checkbox"
                                className="size-4 rounded border-gray-300 text-blue-600"
                                checked={lga.boost.enabled}
                                onChange={(e) =>
                                  patchLga(state.id, lgaRowId, (cur) => ({
                                    ...cur,
                                    boost: { ...cur.boost, enabled: e.target.checked },
                                  }))
                                }
                              />
                            </label>
                          </div>

                          <div className="mb-3">
                            <p className="mb-1.5 text-[11px] font-semibold uppercase text-gray-500">Boost durations</p>
                            <ul className="flex flex-wrap gap-2">
                              {lga.boost.durations.map((d) => (
                                <li
                                  key={d.days}
                                  className={`rounded-md px-2 py-1 text-xs ${d.enabled ? 'bg-blue-50 text-blue-900' : 'bg-gray-100 text-gray-500 line-through'
                                    }`}
                                >
                                  {d.days}d
                                  {d.enabled && d.priceAmount > 0 ? ` · ₦${d.priceAmount.toLocaleString()}` : ''}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-3">
                            <p className="mb-1.5 text-[11px] font-semibold uppercase text-gray-500">Slots & pricing</p>
                            <div className="overflow-x-auto rounded-md border border-gray-200">
                              <table className="w-full min-w-[360px] text-left text-xs">
                                <thead className="bg-gray-50 text-[10px] font-semibold uppercase text-gray-600">
                                  <tr>
                                    <th className="px-2 py-1.5">Tier</th>
                                    <th className="px-2 py-1.5">Slots</th>
                                    <th className="px-2 py-1.5">Price (₦)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {lga.boost.tiers.map((t) => (
                                    <tr key={t.key} className="border-t border-gray-100">
                                      <td className="px-2 py-1.5">
                                        <span className="font-medium">{t.label}</span>
                                        <span className="ml-1 font-mono text-[10px] text-gray-400">({t.key})</span>
                                      </td>
                                      <td className="px-2 py-1.5">
                                        <input
                                          type="number"
                                          min={0}
                                          className="w-16 rounded border border-gray-200 px-1 py-0.5"
                                          value={t.totalSlots}
                                          onChange={(e) => {
                                            const n = Math.max(0, Number(e.target.value) || 0)
                                            patchLga(state.id, lgaRowId, (cur) => {
                                              const tiers = cur.boost.tiers.map((x) =>
                                                x.key === t.key ? { ...x, totalSlots: n } : x,
                                              )
                                              const totalSlots = tiers.reduce((s, x) => s + x.totalSlots, 0)
                                              const sold = cur.boost.stats.slotsSold
                                              return {
                                                ...cur,
                                                boost: {
                                                  ...cur.boost,
                                                  tiers,
                                                  stats: {
                                                    ...cur.boost.stats,
                                                    totalSlots,
                                                    slotsRemaining: Math.max(0, totalSlots - sold),
                                                  },
                                                },
                                              }
                                            })
                                          }}
                                        />
                                      </td>
                                      <td className="px-2 py-1.5">
                                        <input
                                          type="number"
                                          min={0}
                                          className="w-24 rounded border border-gray-200 px-1 py-0.5"
                                          value={t.priceAmount || ''}
                                          onChange={(e) => {
                                            const n = Math.max(0, Number(e.target.value) || 0)
                                            patchLga(state.id, lgaRowId, (cur) => ({
                                              ...cur,
                                              boost: {
                                                ...cur.boost,
                                                tiers: cur.boost.tiers.map((x) =>
                                                  x.key === t.key ? { ...x, priceAmount: n } : x,
                                                ),
                                              },
                                            }))
                                          }}
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="mb-3 rounded-lg border border-indigo-100 bg-indigo-50/50 p-3">
                            <p className="mb-2 text-[11px] font-semibold uppercase text-indigo-800">Slot availability</p>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                              <div>
                                <p className="text-[10px] text-indigo-700">Total slots</p>
                                <p className="text-lg font-semibold text-indigo-950">{lga.boost.stats.totalSlots}</p>
                              </div>
                              <div>
                                <p className="text-[10px] text-indigo-700">Sold</p>
                                <p className="text-lg font-semibold text-indigo-950">{lga.boost.stats.slotsSold}</p>
                              </div>
                              <div>
                                <p className="text-[10px] text-indigo-700">Remaining</p>
                                <p className="text-lg font-semibold text-indigo-950">{lga.boost.stats.slotsRemaining}</p>
                              </div>
                              <div>
                                <p className="text-[10px] text-indigo-700">Active boosts</p>
                                <p className="text-lg font-semibold text-indigo-950">{lga.boost.stats.activeBoosts}</p>
                              </div>
                              <div>
                                <p className="text-[10px] text-indigo-700">Expired</p>
                                <p className="text-lg font-semibold text-indigo-950">{lga.boost.stats.expiredBoosts}</p>
                              </div>
                            </div>
                          </div>

                          <Link
                            to={`/admin/businesses?lga=${encodeURIComponent(lga.name)}&state=${encodeURIComponent(state.name)}`}
                            className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-50"
                          >
                            View vendors in this LGA
                            <ExternalLink className="size-3" />
                          </Link>
                          <p className="mt-2 text-[10px] text-gray-400">
                            Local edits (boost toggle, slots, prices) stay in this session until a sync API is wired.
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          )
        })}
      </div>

      <AddLocationWizardModal
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false)
          setSaveError(null)
        }}
        googleMapsApiKey={env.googleMapsApiKey}
        onSubmit={handleWizardSubmit}
        saving={saving}
        saveError={saveError}
      />
    </div>
  )
}
