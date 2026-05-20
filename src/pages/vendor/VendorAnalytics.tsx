import { Loader2 } from "lucide-react";

import { AnalyticsHeader } from "@/components/sections/vendor/analytics/AnalyticsHeader";
import { BasicAnalytics } from "@/components/sections/vendor/analytics/BasicAnalytics";
import { EngagementHeatmapCard } from "@/components/sections/vendor/analytics/EngagementHeatmapCard";
import { LeadsByChannelCard } from "@/components/sections/vendor/analytics/LeadsByChannelCard";
import { ReachAreasCard } from "@/components/sections/vendor/analytics/ReachAreasCard";
import { StatsGrid } from "@/components/sections/vendor/analytics/StatsGrid";
import { TopListingsTable } from "@/components/sections/vendor/analytics/TopListingsTable";
import { TrafficTrendCard } from "@/components/sections/vendor/analytics/TrafficTrendCard";
import { useVendorSubscriptionAccess } from "@/hooks/useVendorSubscriptionAccess";

export default function VendorAnalytics() {
  const { isPremiumActive, isLoading } = useVendorSubscriptionAccess();

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-6">
        <Loader2 className="size-8 animate-spin text-brand-red" aria-label="Loading analytics" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-4">
        {isPremiumActive ? (
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
