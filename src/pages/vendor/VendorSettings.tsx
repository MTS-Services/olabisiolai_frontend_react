import { useEffect, useState } from "react";

import { BusinessProfileCard } from "@/components/sections/vendor/settings/BusinessProfileCard";
import { SecurityAccessCard } from "@/components/sections/vendor/settings/SecurityAccessCard";
import { NotificationChannelsCard } from "@/components/sections/vendor/settings/NotificationChannelsCard";
import { VerifiedStatusCard } from "@/components/sections/vendor/settings/VerifiedStatusCard";
import { CurrentPlanCard } from "@/components/sections/vendor/settings/CurrentPlanCard";
import { ActionButtons } from "@/components/sections/vendor/settings/ActionButtons";

type VendorPlan = "free" | "premium";

export default function VendorSettings() {
  const [plan, setPlan] = useState<VendorPlan>(() => {
    const savedPlan = localStorage.getItem("vendorPlan");
    return savedPlan === "premium" ? "premium" : "free";
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "vendorPlan") {
        setPlan(e.newValue === "premium" ? "premium" : "free");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const [twoFactor, setTwoFactor] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(false);
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);

  return (
    <div className="p-4 md:p-6">
      <section className="space-y-6 md:space-y-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-start">
          <div className="space-y-6">
            <BusinessProfileCard />
            <SecurityAccessCard twoFactor={twoFactor} setTwoFactor={setTwoFactor} />
            <ActionButtons />
          </div>

          <div className="space-y-6">
            <VerifiedStatusCard />
            <NotificationChannelsCard 
              notifyEmail={notifyEmail} 
              setNotifyEmail={setNotifyEmail} 
              notifySms={notifySms} 
              setNotifySms={setNotifySms} 
              notifyWhatsapp={notifyWhatsapp} 
              setNotifyWhatsapp={setNotifyWhatsapp} 
            />
            <CurrentPlanCard plan={plan} />
          </div>
        </div>
      </section>
    </div>
  );
}
