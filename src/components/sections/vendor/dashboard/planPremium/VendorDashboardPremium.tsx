import { AccountChecklistCard } from "./AccountChecklistCard";
import { ActiveBoostsCard } from "./ActiveBoostsCard";
import { ConciergeSupportCard } from "./ConciergeSupportCard";
import { EnquiriesStatsCard } from "./EnquiriesStatsCard";
import { InteractionsListCard } from "./InteractionsListCard";
import { PremiumDashboardHeader } from "./PremiumDashboardHeader";
import { PremiumPortfolioGallery } from "./PremiumPortfolioGallery";
import { PremiumRecentActivity } from "./PremiumRecentActivity";
import { ProfileViewsStatsCard } from "./ProfileViewsStatsCard";
import { TrustScoreCard } from "./TrustScoreCard";
import { WeeklyEngagementChart } from "./WeeklyEngagementChart";

export function VendorDashboardPremium() {
  return (
    <div className="space-y-4 md:space-y-5">
      <PremiumDashboardHeader />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <TrustScoreCard />
        <EnquiriesStatsCard />
        <ProfileViewsStatsCard />
        <InteractionsListCard />
      </div>

      <WeeklyEngagementChart />

      <div className="grid gap-4 xl:grid-cols-2">
        <PremiumRecentActivity />
        <ActiveBoostsCard />
      </div>

      <PremiumPortfolioGallery />

      <div className="grid gap-4 xl:grid-cols-2">
        <ConciergeSupportCard />
        <AccountChecklistCard />
      </div>
    </div>
  );
}
