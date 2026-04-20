import { AnalyticsHeader } from "@/components/sections/vendor/analytics/AnalyticsHeader";
import { BasicAnalytics } from "@/components/sections/vendor/analytics/BasicAnalytics";


import { EngagementHeatmapCard } from "@/components/sections/vendor/analytics/EngagementHeatmapCard";
import { LeadsByChannelCard } from "@/components/sections/vendor/analytics/LeadsByChannelCard";
import { ReachAreasCard } from "@/components/sections/vendor/analytics/ReachAreasCard";
import { StatsGrid } from "@/components/sections/vendor/analytics/StatsGrid";
import { TopListingsTable } from "@/components/sections/vendor/analytics/TopListingsTable";
import { TrafficTrendCard } from "@/components/sections/vendor/analytics/TrafficTrendCard";
import { useEffect, useState } from "react";

type VendorPlan = "free" | "premium";


export default function VendorAnalytics() {
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
  return (
    <div className="p-4 md:p-6">
      <div className="space-y-4">

         {isPremium ? (
          <>
            <AnalyticsHeader />

            <StatsGrid />

            <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
              <TrafficTrendCard />
              <LeadsByChannelCard />
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <ReachAreasCard />
              <EngagementHeatmapCard />
            </div>

            <TopListingsTable />
          </>
        ) : (
          <BasicAnalytics />
        )}
      
       
      </div>
    </div>
  );
}
