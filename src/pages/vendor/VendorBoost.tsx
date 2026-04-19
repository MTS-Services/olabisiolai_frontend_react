import { useMemo, useState } from "react";

import { BoostPlanBenefits } from "@/components/sections/vendor/boost/boostPlan/BoostPlanBenefits";
import { BoostPlanCard } from "@/components/sections/vendor/boost/boostPlan/BoostPlanCard";
import { BoostPlanHeader } from "@/components/sections/vendor/boost/boostPlan/BoostPlanHeader";
import { oneTimePlans, subscriptionPlans } from "@/components/sections/vendor/boost/boostPlan/boostPlanData";

export default function VendorBoost() {
  const [mode, setMode] = useState<"one-time" | "subscription">("one-time");
  const plans = useMemo(() => (mode === "one-time" ? oneTimePlans : subscriptionPlans), [mode]);

  return (
    <div className="p-4 md:p-6">
      <section className="space-y-5">
        <BoostPlanHeader mode={mode} onChange={setMode} />

        <div className="grid gap-8 xl:grid-cols-3">
          {plans.map((plan) => (
            <BoostPlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <BoostPlanBenefits />
      </section>
    </div>
  );
}
