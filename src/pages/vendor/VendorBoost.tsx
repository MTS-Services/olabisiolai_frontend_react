import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { BasicBoost } from "@/components/sections/vendor/boost/BasicBoost";
import { BoostPlanBenefits } from "@/components/sections/vendor/boost/boostPlan/BoostPlanBenefits";
import {
  BoostPlanCard,
  type BoostPlanSelection,
} from "@/components/sections/vendor/boost/boostPlan/BoostPlanCard";
import { BoostPlanHeader } from "@/components/sections/vendor/boost/boostPlan/BoostPlanHeader";
import { TargetLocationCard } from "@/components/sections/vendor/boost/boostConfigure/TargetLocationCard";
import { VendorLocationBoostDetails } from "@/components/sections/vendor/shared/VendorLocationBoostDetails";
import { saveBoostCheckoutSelection } from "@/features/boost/boostCheckoutSession";
import { buildPlansFromLocationBoost } from "@/features/boost/locationBoostPlans";
import { fetchVendorBoostCatalog, submitVendorBoostRequest } from "@/features/boost/vendorBoostApi";
import { useVendorBusinessFormOptions } from "@/features/categories/useVendorBusinessFormOptions";
import { parseVendorLocationOptions } from "@/features/locations/vendorLocationOptions";
import { showError, showSuccess } from "@/lib/sweetAlert";
import { getLaravelErrorMessage } from "@/lib/laravelApiError";
import { cn } from "@/lib/utils";

type VendorPlan = "free" | "premium";

function useVendorPlan(): VendorPlan {
  const [plan] = useState<VendorPlan>(() => {
    const savedPlan = localStorage.getItem("vendorPlan");
    return savedPlan === "premium" ? "premium" : "free";
  });
  return plan;
}

export default function VendorBoost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const plan = useVendorPlan();
  const isPremium = plan === "premium";

  const { data: catalog, isPending: catalogLoading } = useQuery({
    queryKey: ["vendor", "boost", "catalog"],
    queryFn: fetchVendorBoostCatalog,
    enabled: isPremium,
    staleTime: 30_000,
  });

  const { data: formOptions } = useVendorBusinessFormOptions();
  const parsedLocations = useMemo(
    () => parseVendorLocationOptions(formOptions?.locations),
    [formOptions?.locations],
  );

  const [previewLocationId, setPreviewLocationId] = useState("");

  const activeLocation = useMemo(() => {
    if (catalog?.location) return catalog.location;
    if (previewLocationId) {
      return parsedLocations.find((entry) => entry.id === previewLocationId) ?? null;
    }
    return parsedLocations[0] ?? null;
  }, [catalog?.location, parsedLocations, previewLocationId]);

  const plans = useMemo(
    () => (activeLocation ? buildPlansFromLocationBoost(activeLocation) : []),
    [activeLocation],
  );

  const durationAmountMaps = useMemo(() => {
    const boost = activeLocation?.boost;
    if (!boost) return {} as Record<string, Record<string, number>>;

    return Object.fromEntries(
      boost.tiers.map((tier) => {
        const map: Record<string, number> = {};
        for (const days of [7, 14, 30]) {
          const tierDuration = tier.durations?.find((d) => d.days === days && d.enabled);
          const global = boost.durations.find((d) => d.days === days && d.enabled);
          const amount = tierDuration?.priceAmount || global?.priceAmount || tier.priceAmount;
          if (amount > 0) {
            map[`${days} Days`] = amount;
          }
        }
        return [tier.key, map];
      }),
    );
  }, [activeLocation?.boost]);

  const submitBoostMutation = useMutation({
    mutationFn: submitVendorBoostRequest,
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: ["vendor", "boost", "catalog"] });
      showSuccess(result.message);
    },
    onError: (error: unknown) => {
      showError(getLaravelErrorMessage(error, "Unable to submit boost request."));
    },
  });

  const handlePlanSelect = (selection: BoostPlanSelection) => {
    if (!activeLocation) {
      showError("Select a business location first.");
      return;
    }

    if (!catalog?.isPremiumActive) {
      saveBoostCheckoutSelection({
        locationId: activeLocation.id,
        locationLabel: activeLocation.label,
        tierKey: selection.planId,
        tierLabel: selection.planTitle,
        durationDays: selection.durationDays,
        amount: selection.amount,
      });
      navigate("/vendor/premium-payment");
      return;
    }

    if (catalog.pendingRequest) {
      showError("You already have a boost request awaiting admin approval.");
      return;
    }

    submitBoostMutation.mutate({
      tierKey: selection.planId,
      durationDays: selection.durationDays,
    });
  };

  return (
    <div className={cn("p-4", "md:p-6")}>
      <section className="space-y-5">
        {isPremium ? (
          <>
            <BoostPlanHeader />

            <TargetLocationCard
              location={activeLocation}
              locations={parsedLocations}
              selectedLocationId={activeLocation?.id ?? previewLocationId}
              onLocationChange={setPreviewLocationId}
              readOnly={Boolean(catalog?.location)}
            />

            {catalog?.pendingRequest ? (
              <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {catalog.pendingRequest.status_label}: {catalog.pendingRequest.tier_label} (
                {catalog.pendingRequest.duration_days} days) — admin will confirm activation.
              </p>
            ) : null}

            {catalogLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="size-8 animate-spin text-brand-red" aria-label="Loading boost plans" />
              </div>
            ) : activeLocation && !activeLocation.boost?.enabled ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center text-sm text-muted-foreground">
                Boost is not configured for {activeLocation.label} yet. Ask an admin to enable LGA boost
                slots for this area.
                <VendorLocationBoostDetails location={activeLocation} readOnly />
              </div>
            ) : plans.length > 0 ? (
              <div className={cn("grid", "gap-8", "xl:grid-cols-3")}>
                {plans.map((boostPlan) => (
                  <BoostPlanCard
                    key={boostPlan.id}
                    plan={boostPlan}
                    durationAmounts={durationAmountMaps[boostPlan.id]}
                    onSelect={handlePlanSelect}
                    disabled={submitBoostMutation.isPending || Boolean(catalog?.pendingRequest)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No boost plans available for this location.</p>
            )}

            <BoostPlanBenefits />
          </>
        ) : (
          <BasicBoost previewLocation={parsedLocations[0] ?? null} />
        )}
      </section>
    </div>
  );
}
