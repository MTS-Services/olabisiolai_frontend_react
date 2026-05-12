import { useEffect, useMemo, useState } from "react";

import { BasicBoost } from "@/components/sections/vendor/boost/BasicBoost";
import { BoostPlanBenefits } from "@/components/sections/vendor/boost/boostPlan/BoostPlanBenefits";
import { BoostPlanCard } from "@/components/sections/vendor/boost/boostPlan/BoostPlanCard";
import { BoostPlanHeader } from "@/components/sections/vendor/boost/boostPlan/BoostPlanHeader";
import { oneTimePlans, subscriptionPlans } from "@/components/sections/vendor/boost/boostPlan/boostPlanData";
import { cn } from "@/lib/utils";

type VendorPlan = "free" | "premium";

export default function VendorBoost() {
  const [plan, setPlan] = useState<VendorPlan>(() => {
    const savedPlan = localStorage.getItem("vendorPlan");
    return savedPlan === "premium" ? "premium" : "free";
  });

  const isPremium = plan === "premium";

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "vendorPlan") {
        setPlan(e.newValue === "premium" ? "premium" : "free");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const [mode] = useState<"one-time" | "subscription">("one-time");
  const plans = useMemo(() => (mode === "one-time" ? oneTimePlans : subscriptionPlans), [mode]);

  return (
    <div className={cn('p-4', 'md:p-6')}>
      <section className="space-y-5">
        {isPremium ? (
          <>
            <BoostPlanHeader  />

            <div className={cn('grid', 'gap-8', 'xl:grid-cols-3')}>
              {plans.map((plan) => (
                <BoostPlanCard key={plan.id} plan={plan} />
              ))}
            </div>

            <BoostPlanBenefits />
          </>
        ) : (
          <BasicBoost />
        )}
      </section>
    </div>
  );
}
