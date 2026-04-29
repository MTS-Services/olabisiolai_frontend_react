import { importLibrary } from '@googlemaps/js-api-loader'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { useCallback, useEffect, useRef, useState } from 'react'

import { parsePlaceToLgaPick } from '@/features/maps/parsePlaceToLgaPick'
import type { LgaMapPickResult } from '@/features/maps/lgaMapPickTypes'
import { ensureGoogleMapsConfigured } from '@/lib/googleMapsInit'

const NG_BIAS_CENTER: google.maps.LatLngLiteral = { lat: 9.082, lng: 8.6753 }

type Props = {
  apiKey: string | undefined
  onPick: (pick: LgaMapPickResult) => void
  /** When true, draws sample pins around the selected point to validate clustering (replace with API vendor coords later). */
  showDemoVendorCluster?: boolean
}

function randomDemoMarkers(center: google.maps.LatLngLiteral, count: number): google.maps.Marker[] {
  const markers: google.maps.Marker[] = []
  for (let i = 0; i < count; i++) {
    const lat = center.lat + (Math.random() - 0.5) * 0.06
    const lng = center.lng + (Math.random() - 0.5) * 0.06
    markers.push(
      new google.maps.Marker({
        position: { lat, lng },
      }),
    )
  }
  return markers
}

export function AdminLgaMapPicker({ apiKey, onPick, showDemoVendorCluster = true }: Props) {
  const autocompleteHostRef = useRef<HTMLDivElement>(null)
  const mapHostRef = useRef<HTMLDivElement>(null)
  const clustererRef = useRef<MarkerClusterer | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const applyPick = useCallback(
    (pick: LgaMapPickResult) => {
      onPick(pick)
      const map = mapRef.current
      if (!map) return

      const center = { lat: pick.lat, lng: pick.lng }
      const vp = pick.viewport
      if (vp) {
        map.fitBounds(
          new google.maps.LatLngBounds(
            { lat: vp.south, lng: vp.west },
            { lat: vp.north, lng: vp.east },
          ),
        )
      } else {
        map.setCenter(center)
        map.setZoom(12)
      }

      clustererRef.current?.clearMarkers()
      if (showDemoVendorCluster) {
        const markers = randomDemoMarkers(center, 28)
        clustererRef.current?.addMarkers(markers)
      }
    },
    [onPick, showDemoVendorCluster],
  )

  useEffect(() => {
    const acHost = autocompleteHostRef.current
    const mapHost = mapHostRef.current
    if (!apiKey?.trim() || !acHost || !mapHost) {
      setStatus('idle')
      return
    }

    let cancelled = false
    let autocompleteEl: google.maps.places.PlaceAutocompleteElement | null = null
    let selectListener: ((e: Event) => void) | null = null

    setStatus('loading')
    setErrorMessage(null)

    const run = async () => {
      try {
        ensureGoogleMapsConfigured(apiKey.trim())
        const { Map } = (await importLibrary('maps')) as google.maps.MapsLibrary
        await importLibrary('places')

        if (cancelled) return

        mapHost.innerHTML = ''

        const map = new Map(mapHost, {
          center: NG_BIAS_CENTER,
          zoom: 6,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        })
        mapRef.current = map

        const clusterer = new MarkerClusterer({ map, markers: [] })
        clustererRef.current = clusterer

        const PlaceAutocompleteElement = google.maps.places.PlaceAutocompleteElement
        const autocomplete = new PlaceAutocompleteElement({
          includedRegionCodes: ['ng'],
        })
        autocomplete.locationBias = { center: NG_BIAS_CENTER, radius: 900_000 }
        autocomplete.placeholder = 'Search LGA, city, or area (Google)…'

        const onSelect = async (ev: google.maps.places.PlacePredictionSelectEvent) => {
          const place = ev.placePrediction.toPlace()
          await place.fetchFields({
            fields: [
              'id',
              'resourceName',
              'displayName',
              'formattedAddress',
              'location',
              'viewport',
              'addressComponents',
            ],
          })
          const parsed = parsePlaceToLgaPick(place)
          if (parsed) applyPick(parsed)
        }

        const onSelectEvent = (e: Event) => {
          void onSelect(e as google.maps.places.PlacePredictionSelectEvent)
        }

        autocomplete.addEventListener('gmp-select', onSelectEvent)
        autocompleteEl = autocomplete
        selectListener = onSelectEvent

        acHost.innerHTML = ''
        acHost.appendChild(autocomplete)

        if (!cancelled) setStatus('ready')
      } catch (e) {
        if (cancelled) return
        const msg = e instanceof Error ? e.message : 'Failed to load Google Maps'
        setErrorMessage(msg)
        setStatus('error')
      }
    }

    void run()

    return () => {
      cancelled = true
      if (autocompleteEl && selectListener) {
        autocompleteEl.removeEventListener('gmp-select', selectListener)
      }
      autocompleteEl = null
      selectListener = null
      clustererRef.current?.clearMarkers()
      clustererRef.current = null
      mapRef.current = null
      acHost.innerHTML = ''
      mapHost.innerHTML = ''
    }
  }, [apiKey, applyPick])

  if (!apiKey?.trim()) {
    return (
      <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
        Set <code className="rounded bg-amber-100/80 px-1">VITE_GOOGLE_MAPS_API_KEY</code> in{' '}
        <code className="rounded bg-amber-100/80 px-1">.env</code> and enable{' '}
        <strong>Maps JavaScript API</strong> + <strong>Places API</strong> on the key. Restrict the key by HTTP referrer
        for this app.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {status === 'loading' && <p className="text-xs text-gray-500">Loading map…</p>}
      {status === 'error' && errorMessage && (
        <p className="text-xs text-red-600" role="alert">
          {errorMessage}
        </p>
      )}
      <div
        ref={autocompleteHostRef}
        className="[&_input]:box-border [&_input]:w-full [&_input]:rounded-md [&_input]:border [&_input]:border-gray-300 [&_input]:px-3 [&_input]:py-2 [&_input]:text-sm"
      />
      <div
        ref={mapHostRef}
        className="h-[220px] w-full overflow-hidden rounded-md border border-gray-200 bg-gray-100"
        aria-label="Map preview"
      />
      {showDemoVendorCluster && status === 'ready' && (
        <p className="text-[11px] text-gray-500">
          Demo orange clusters show sample density. Replace with real vendor coordinates from your API when ready.
        </p>
      )}
    </div>
  )
}
