import { Loader2 } from "lucide-react";

import { DashboardAnalyticsCard } from "@/components/sections/vendor/dashboard/planFree/DashboardAnalyticsCard";
import { DashboardPortfolioCard } from "@/components/sections/vendor/dashboard/planFree/DashboardPortfolioCard";
import { DashboardPremiumCtaBar } from "@/components/sections/vendor/dashboard/planFree/DashboardPremiumCtaBar";
import { DashboardProfileCompletionCard } from "@/components/sections/vendor/dashboard/planFree/DashboardProfileCompletionCard";
import { DashboardRecentActivityCard } from "@/components/sections/vendor/dashboard/planFree/DashboardRecentActivityCard";
import { DashboardSupportCard } from "@/components/sections/vendor/dashboard/planFree/DashboardSupportCard";
import { DashboardVerificationCard } from "@/components/sections/vendor/dashboard/planFree/DashboardVerificationCard";
import { DashboardVisibilityBoostCard } from "@/components/sections/vendor/dashboard/planFree/DashboardVisibilityBoostCard";
import { DashboardWelcomeCard } from "@/components/sections/vendor/dashboard/planFree/DashboardWelcomeCard";
import { PremiumDashboardHeader } from "@/components/sections/vendor/dashboard/planPremium/PremiumDashboardHeader";
import { TrustScoreCard } from "@/components/sections/vendor/dashboard/planPremium/TrustScoreCard";
import { EnquiriesStatsCard } from "@/components/sections/vendor/dashboard/planPremium/EnquiriesStatsCard";
import { ProfileViewsStatsCard } from "@/components/sections/vendor/dashboard/planPremium/ProfileViewsStatsCard";
import { InteractionsListCard } from "@/components/sections/vendor/dashboard/planPremium/InteractionsListCard";
import { WeeklyEngagementChart } from "@/components/sections/vendor/dashboard/planPremium/WeeklyEngagementChart";
import { PremiumRecentActivity } from "@/components/sections/vendor/dashboard/planPremium/PremiumRecentActivity";
import { ActiveBoostsCard } from "@/components/sections/vendor/dashboard/planPremium/ActiveBoostsCard";
import { PremiumPortfolioGallery } from "@/components/sections/vendor/dashboard/planPremium/PremiumPortfolioGallery";
import { ConciergeSupportCard } from "@/components/sections/vendor/dashboard/planPremium/ConciergeSupportCard";
import { AccountChecklistCard } from "@/components/sections/vendor/dashboard/planPremium/AccountChecklistCard";
import { useVendorSubscriptionAccess } from "@/hooks/useVendorSubscriptionAccess";

export default function VendorDashboard() {
  const { isPremiumActive, isLoading } = useVendorSubscriptionAccess();

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-6">
        <Loader2 className="size-8 animate-spin text-brand-red" aria-label="Loading dashboard" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {isPremiumActive ? (
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
      ) : (
        <div className="space-y-4 md:space-y-5">
          <DashboardWelcomeCard />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <DashboardProfileCompletionCard />
            <DashboardPortfolioCard />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <DashboardVisibilityBoostCard />
            <DashboardVerificationCard />
          </div>

          <DashboardAnalyticsCard />

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]">
            <DashboardSupportCard />
            <DashboardRecentActivityCard />
          </div>

          <DashboardPremiumCtaBar />
        </div>
      )}
    </div>
  );
}
