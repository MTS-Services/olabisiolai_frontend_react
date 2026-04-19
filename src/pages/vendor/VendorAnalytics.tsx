import { AnalyticsHeader } from "@/components/sections/vendor/analytics/AnalyticsHeader";

import { EngagementHeatmapCard } from "@/components/sections/vendor/analytics/EngagementHeatmapCard";
import { LeadsByChannelCard } from "@/components/sections/vendor/analytics/LeadsByChannelCard";
import { ReachAreasCard } from "@/components/sections/vendor/analytics/ReachAreasCard";
import { StatsGrid } from "@/components/sections/vendor/analytics/StatsGrid";
import { TopListingsTable } from "@/components/sections/vendor/analytics/TopListingsTable";
import { TrafficTrendCard } from "@/components/sections/vendor/analytics/TrafficTrendCard";


export default function VendorAnalytics() {
  return (
    <div className="p-4 md:p-6">
      <div className="space-y-4">
        {/* <BasicAnalytics /> */}
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
      </div>
    </div>
  );
}
