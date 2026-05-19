import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { BoostConfigureHeader } from "@/components/sections/vendor/boost/boostConfigure/BoostConfigureHeader";
import { BoostScheduleCard } from "@/components/sections/vendor/boost/boostConfigure/BoostScheduleCard";
import { EstimatedReachCard } from "@/components/sections/vendor/boost/boostConfigure/EstimatedReachCard";
import { TargetLocationCard } from "@/components/sections/vendor/boost/boostConfigure/TargetLocationCard";
import { fetchVendorBoostCatalog } from "@/features/boost/vendorBoostApi";
import VendorBoostReviewPayPage from "./VendorBoostReviewPay";

type VendorPlan = "free" | "premium";

export default function VendorBoostConfigurePage() {
  const [plan, setPlan] = useState<VendorPlan>(() => {
    const savedPlan = localStorage.getItem("vendorPlan");
    return savedPlan === "premium" ? "premium" : "free";
  });

  const isPremium = plan === "premium";

  const { data: catalog } = useQuery({
    queryKey: ["vendor", "boost", "catalog"],
    queryFn: fetchVendorBoostCatalog,
    enabled: isPremium,
    staleTime: 30_000,
  });

  const activeLocation = useMemo(() => catalog?.location ?? null, [catalog?.location]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "vendorPlan") {
        setPlan(e.newValue === "premium" ? "premium" : "free");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="p-4 md:p-6">
      {isPremium ? (
        <div className="space-y-4">
          <BoostConfigureHeader />

          <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
            <div className="space-y-4">
              <TargetLocationCard location={activeLocation} readOnly />
              <BoostScheduleCard />
            </div>

            <div className="space-y-4">
              <EstimatedReachCard />
            </div>
          </div>
        </div>
      ) : (
        <VendorBoostReviewPayPage />
      )}
    </div>
  );
}
