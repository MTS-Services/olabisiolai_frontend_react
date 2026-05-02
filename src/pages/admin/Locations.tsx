import { useCallback, useMemo, useState } from 'react'
import { ChevronDown, Plus, X } from 'lucide-react'

import { AdminLgaMapPicker } from '@/components/maps/AdminLgaMapPicker'
import { env } from '@/config/env'
import { adminStoreLocation, type AdminSavedLocation } from '@/features/maps/adminLocationsApi'
import type { LgaMapPickResult } from '@/features/maps/lgaMapPickTypes'

type LGA = {
  id: string
  name: string
  vendorCount: number
  lat: number
  lng: number
}
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

  const nextLga: LGA = {
    id: lgaId,
    name: saved.lga.name,
    vendorCount: saved.lga.vendorCount,
    lat: saved.lga.latitude,
    lng: saved.lga.longitude,
  }

  const stateIndex = prev.findIndex((s) => s.id === stateId || s.name.toLowerCase() === saved.state.name.toLowerCase())
  if (stateIndex < 0) {
    return [{ id: stateId, name: saved.state.name, lgas: [nextLga] }, ...prev]
  }

  const current = prev[stateIndex]
  const lgaIndex = current.lgas.findIndex((l) => l.id === lgaId || l.name.toLowerCase() === saved.lga.name.toLowerCase())
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

export default function LocationHierarchy() {
  const [locations, setLocations] = useState<StateEntry[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCountryName, setNewCountryName] = useState('Nigeria')
  const [newStateName, setNewStateName] = useState('')
  const [newCityName, setNewCityName] = useState('')
  const [newLgaName, setNewLgaName] = useState('')
  const [newFullAddress, setNewFullAddress] = useState('')
  const [mapPick, setMapPick] = useState<LgaMapPickResult | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [lastSavedMessage, setLastSavedMessage] = useState<string | null>(null)
  const [openStates, setOpenStates] = useState<Set<string>>(new Set())
  const [openLgas, setOpenLgas] = useState<Set<string>>(new Set())

  const toggle = (set: Set<string>, id: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setter(next)
  }

  const addLocation = async () => {
    if (!mapPick) {
      setSaveError('Please pick a location from the Google map first.')
      return
    }
    if (!newStateName.trim() || !newLgaName.trim()) {
      setSaveError('State and LGA are required.')
      return
    }

    setSaving(true)
    setSaveError(null)
    setLastSavedMessage(null)

    try {
      const saved = await adminStoreLocation({
        countryName: newCountryName,
        stateName: newStateName,
        cityName: newCityName,
        lgaName: newLgaName,
        fullAddress: newFullAddress.trim() || buildDetailedAddressFromPick(mapPick),
        mapPick,
      })

      const stateId = toStateId(saved)
      const lgaId = toLgaId(saved)
      setLocations((prev) => upsertStateLocation(prev, saved))
      setOpenStates((prev) => new Set([...prev, stateId]))
      setOpenLgas((prev) => new Set([...prev, lgaId]))

      setNewStateName('')
      setNewCityName('')
      setNewLgaName('')
      setNewFullAddress('')
      setNewCountryName('Nigeria')
      setMapPick(null)
      setShowAddModal(false)
      setLastSavedMessage(`Saved: ${saved.state.name} -> ${saved.lga.name}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save location.'
      setSaveError(message)
    } finally {
      setSaving(false)
    }
  }

  const closeAddModal = () => {
    setShowAddModal(false)
    setMapPick(null)
    setSaveError(null)
  }

  const handleMapPick = useCallback((pick: LgaMapPickResult) => {
    setMapPick(pick)
    setSaveError(null)
    setNewCountryName(pick.country || 'Nigeria')
    setNewStateName(pick.administrativeAreaLevel1 || pick.country || '')
    setNewCityName(pick.locality || '')
    setNewLgaName(pick.administrativeAreaLevel2 || pick.locality || pick.displayName || '')
    setNewFullAddress(buildDetailedAddressFromPick(pick))
  }, [])

  const title = useMemo(() => {
    const states = locations.length
    const lgas = locations.reduce((sum, state) => sum + state.lgas.length, 0)
    return `${states} state${states === 1 ? '' : 's'} · ${lgas} LGA${lgas === 1 ? '' : 's'}`
  }, [locations])

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-sm">
      <h1 className="text-xl font-bold text-gray-900 mb-1">Locations</h1>
      <p className="mb-2 text-xs text-gray-500">{title}</p>
      {lastSavedMessage && (
        <div className="mb-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
          {lastSavedMessage}
        </div>
      )}
      {/* Top bar */}
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => {
            setMapPick(null)
            setSaveError(null)
            setShowAddModal(true)
          }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-600 active:scale-95 transition-all"
        >
          <Plus className="size-3.5" />
          Add Location
        </button>
      </div>

      {/* Main card */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        {locations.length === 0 && (
          <div className="px-4 py-6 text-sm text-gray-500">
            No locations saved yet. Click <strong>Add Location</strong> to create from Google map.
          </div>
        )}
        {locations.map((state, si) => {
          const stateOpen = openStates.has(state.id)
          return (
            <div key={state.id} className={si > 0 ? "border-t border-gray-100" : ""}>
              {/* State row */}
              <button
                type="button"
                onClick={() => toggle(openStates, state.id, setOpenStates)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ChevronDown
                    className={`size-3.5 text-gray-400 transition-transform duration-150 ${stateOpen ? "" : "-rotate-90"}`}
                  />
                  <span className="font-semibold text-gray-900">{state.name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {state.lgas.length} LGA{state.lgas.length !== 1 ? 's' : ''}
                </span>
              </button>

              {/* LGAs */}
              {stateOpen &&
                state.lgas.map((lga) => {
                  const lgaOpen = openLgas.has(lga.id)
                  return (
                    <div key={lga.id} className="bg-green-50">
                      {/* LGA row */}
                      <button
                        type="button"
                        onClick={() => toggle(openLgas, lga.id, setOpenLgas)}
                        className="flex w-full items-center justify-between border-t border-gray-200 bg-green-50 py-2.5 pl-8 pr-4 text-left hover:bg-green-100/60 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <ChevronDown
                            className={`size-3.5 text-gray-400 transition-transform duration-150 ${lgaOpen ? "" : "-rotate-90"}`}
                          />
                          <span className="font-medium text-gray-800">{lga.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {lga.vendorCount} vendor{lga.vendorCount !== 1 ? 's' : ''}
                        </span>
                      </button>

                      {lgaOpen && (
                        <div className="border-t border-gray-100 bg-white py-2.5 pl-14 pr-4 text-gray-700">
                          <span className="text-gray-500">
                            Lat/Lng: {lga.lat.toFixed(5)}, {lga.lng.toFixed(5)}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          )
        })}
      </div>

      {/* Add Location Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[98vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Location</h2>
              <button
                type="button"
                onClick={closeAddModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-700 mb-1.5">Search on map (Google)</p>
              <AdminLgaMapPicker
                apiKey={env.googleMapsApiKey}
                onPick={handleMapPick}
                showDemoVendorCluster={false}
              />
            </div>

            {mapPick && (
              <div className="mb-4 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700 space-y-0.5">
                <p>
                  <span className="font-medium text-gray-800">Place ID:</span> {mapPick.googlePlaceId}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Coords:</span> {mapPick.lat.toFixed(5)},{" "}
                  {mapPick.lng.toFixed(5)}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Country / State / LGA²:</span>{" "}
                  {[mapPick.country, mapPick.administrativeAreaLevel1, mapPick.administrativeAreaLevel2]
                    .filter(Boolean)
                    .join(" → ") || "—"}
                </p>
                <p className="text-[11px] text-gray-500 pt-1">
                  This will be submitted to backend `POST /api/v1/admin/locations/store`.
                </p>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="countryName" className="block text-sm font-medium text-gray-700 mb-1">
                Country Name
              </label>
              <input
                id="countryName"
                type="text"
                value={newCountryName}
                onChange={(e) => setNewCountryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter country name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="stateName" className="block text-sm font-medium text-gray-700 mb-1">
                State Name
              </label>
              <input
                id="stateName"
                type="text"
                value={newStateName}
                onChange={(e) => setNewStateName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter state name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cityName" className="block text-sm font-medium text-gray-700 mb-1">
                City Name
              </label>
              <input
                id="cityName"
                type="text"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lgaName" className="block text-sm font-medium text-gray-700 mb-1">
                LGA Name
              </label>
              <input
                id="lgaName"
                type="text"
                value={newLgaName}
                onChange={(e) => setNewLgaName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter LGA name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Full Address
              </label>
              <textarea
                id="fullAddress"
                value={newFullAddress}
                onChange={(e) => setNewFullAddress(e.target.value)}
                rows={3}
                dir="ltr"
                className="w-full text-left px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full address from map / manual edit"
              />
            </div>
            {saveError && (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {saveError}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeAddModal}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addLocation}
                disabled={saving}
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}