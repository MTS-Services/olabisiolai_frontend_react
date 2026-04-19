import { VendorDashboardPremium } from "./dashboard/planPremium/VendorDashboardPremium";
import { DashboardAnalyticsCard } from "./dashboard/planFree/DashboardAnalyticsCard";
import { DashboardPortfolioCard } from "./dashboard/planFree/DashboardPortfolioCard";
import { DashboardPremiumCtaBar } from "./dashboard/planFree/DashboardPremiumCtaBar";
import { DashboardProfileCompletionCard } from "./dashboard/planFree/DashboardProfileCompletionCard";
import { DashboardRecentActivityCard } from "./dashboard/planFree/DashboardRecentActivityCard";
import { DashboardSupportCard } from "./dashboard/planFree/DashboardSupportCard";
import { DashboardVerificationCard } from "./dashboard/planFree/DashboardVerificationCard";
import { DashboardVisibilityBoostCard } from "./dashboard/planFree/DashboardVisibilityBoostCard";
import { DashboardWelcomeCard } from "./dashboard/planFree/DashboardWelcomeCard";

/** Swap to `"free"` while building, or wire to subscription / profile API. */
const VENDOR_DASHBOARD_PLAN: "free" | "premium" = "premium";

export function VendorDashboardOverview() {
  if (VENDOR_DASHBOARD_PLAN === "premium") {
    return <VendorDashboardPremium />;
  }

  return (
    <div className="space-y-4 md:space-y-5">
      <DashboardWelcomeCard />

      <div className="grid gap-4 xl:grid-cols-2">
        <DashboardProfileCompletionCard />
        <DashboardPortfolioCard />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
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
  );
}
