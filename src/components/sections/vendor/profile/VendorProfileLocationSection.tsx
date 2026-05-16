import type { ReactNode } from "react";
import { useMemo } from "react";
import { ChevronRight, MapPin } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useVendorBusinessFormOptions } from "@/features/categories/useVendorBusinessFormOptions";
import { parseVendorLocationOptions } from "@/features/locations/vendorLocationOptions";
import { VendorLocationBoostDetails } from "@/components/sections/vendor/shared/VendorLocationBoostDetails";
import { useVendorProfileContext } from "@/components/sections/vendor/profile/VendorProfileContext";

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

function SelectField({
  label,
  value,
  disabled,
  onChange,
  children,
}: {
  label: ReactNode;
  value: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  children: ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "h-11 w-full appearance-none rounded-md border border-border-light bg-background px-3 pr-12 text-sm text-foreground shadow-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/25",
            disabled && "cursor-not-allowed opacity-80",
          )}
        >
          {children}
        </select>
        <MapPin className="pointer-events-none absolute right-9 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <ChevronRight className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 rotate-90 text-muted-foreground" />
      </div>
    </div>
  );
}

export function VendorProfileLocationSection() {
  const { profile, isEditing, draft, setDraftField, fieldErrors } = useVendorProfileContext();
  const { data: formOptions, isPending } = useVendorBusinessFormOptions();
  const parsedLocations = useMemo(
    () => parseVendorLocationOptions(formOptions?.locations),
    [formOptions?.locations],
  );

  const locationId = isEditing && draft ? draft.locationId : String(profile?.locationId || "");
  const selectedLocation = useMemo(
    () => parsedLocations.find((entry) => entry.id === locationId) ?? null,
    [parsedLocations, locationId],
  );

  if (!profile) return null;

  const state = selectedLocation?.state || profile.state || "";
  const city = selectedLocation?.city || profile.city || "";
  const lga = selectedLocation?.lga || profile.lga || "";

  return (
    <div className="space-y-5">
      <SelectField
        label="Location"
        value={locationId}
        disabled={!isEditing || isPending}
        onChange={(e) => setDraftField("locationId", e.target.value)}
      >
        <option value="">
          {isPending ? "Loading locations…" : "Select location"}
        </option>
        {parsedLocations.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </SelectField>
      {fieldErrors.location_id ? (
        <p className="text-xs text-destructive">{fieldErrors.location_id}</p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label>State</Label>
          <Input value={state} readOnly className="h-11 border-border-light bg-background text-sm shadow-sm" />
        </div>
        <div>
          <Label>City</Label>
          <Input value={city} readOnly className="h-11 border-border-light bg-background text-sm shadow-sm" />
        </div>
      </div>

      <div>
        <Label>LGA (Local Government Area)</Label>
        <Input value={lga} readOnly className="h-11 border-border-light bg-background text-sm shadow-sm" />
      </div>

      {selectedLocation ? (
        <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-4">
          <p className="text-sm font-semibold text-foreground">Boost options</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {selectedLocation.state} / {selectedLocation.city} / {selectedLocation.lga}
          </p>
          <VendorLocationBoostDetails location={selectedLocation} readOnly />
          {profile.boostStatus === "active" ? (
            <p className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
              Your business currently has an active boost on this listing.
            </p>
          ) : null}
        </div>
      ) : locationId ? (
        <div className="rounded-xl border border-amber-100 bg-amber-50/80 p-4 text-sm text-amber-900">
          Location details could not be matched to the catalog. Showing saved address:{" "}
          <span className="font-medium">{profile.locationFullName || profile.locationLabel}</span>
        </div>
      ) : null}
    </div>
  );
}
