import { useEffect, useState } from "react";
import { BusinessGallerySection } from "@/components/sections/vendor/profile/BusinessGallerySection";
import { BusinessInfoCard } from "@/components/sections/vendor/profile/BusinessInfoCard";
import { ContactLinksCard } from "@/components/sections/vendor/profile/ContactLinksCard";
import { ProfileManagementHeader } from "@/components/sections/vendor/profile/ProfileManagementHeader";
import { ProfileVisibilityCard } from "@/components/sections/vendor/profile/ProfileVisibilityCard";
import { VendorProfileProvider } from "@/components/sections/vendor/profile/VendorProfileContext";

type VendorPlan = "free" | "premium";

function VendorProfileContent() {
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
    <div className="mx-auto w-full  space-y-6 p-4 md:space-y-8 md:p-6 lg:px-8">
      <ProfileManagementHeader />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.85fr)_minmax(300px,1fr)] lg:items-start lg:gap-6 xl:gap-8">
        <div className="flex w-full min-w-0 flex-col gap-5 self-start">
          <BusinessInfoCard />
          <BusinessGallerySection variant={isPremium ? "premium" : "free"} />
        </div>

        <div className="flex w-full min-w-0 flex-col gap-5 self-start">
          <ContactLinksCard />
          <ProfileVisibilityCard />
        </div>
      </div>
    </div>
  );
}

export default function VendorProfile() {
  return (
    <VendorProfileProvider>
      <VendorProfileContent />
    </VendorProfileProvider>
  );
}
