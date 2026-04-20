import { useEffect, useState } from "react";
import { BusinessGalleryCard } from "@/components/sections/vendor/profile/BusinessGalleryCard";
import { BusinessInfoCard } from "@/components/sections/vendor/profile/BusinessInfoCard";
import { ContactLinksCard } from "@/components/sections/vendor/profile/ContactLinksCard";
import { ProfileManagementHeader } from "@/components/sections/vendor/profile/ProfileManagementHeader";
import { ProfileVisibilityCard } from "@/components/sections/vendor/profile/ProfileVisibilityCard";
import { PremiumBusinessGalleryCard } from "@/components/sections/vendor/profile/PremiumBusinessGalleryCard";

type VendorPlan = "free" | "premium";

export default function VendorProfile() {
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

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    // Keep scrolling inside vendor layout main area only.
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-6 md:space-y-8">
        <ProfileManagementHeader />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.85fr)_minmax(280px,1fr)] lg:items-start lg:gap-6">
          <div className="space-y-5">
            <BusinessInfoCard />
            {isPremium ? (
              <PremiumBusinessGalleryCard />
            ) : (
              <BusinessGalleryCard />
            )}
          </div>

          <div className="space-y-5">
            <ContactLinksCard />
            <ProfileVisibilityCard />
          </div>
        </div>
      </div>
    </div>
  );
}