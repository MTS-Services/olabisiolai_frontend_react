import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { BusinessProfileCard } from "@/components/sections/vendor/settings/BusinessProfileCard";
import { SecurityAccessCard } from "@/components/sections/vendor/settings/SecurityAccessCard";
import { NotificationChannelsCard } from "@/components/sections/vendor/settings/NotificationChannelsCard";
import { VerifiedStatusCard } from "@/components/sections/vendor/settings/VerifiedStatusCard";
import { CurrentPlanCard } from "@/components/sections/vendor/settings/CurrentPlanCard";
import { ActionButtons } from "@/components/sections/vendor/settings/ActionButtons";
import { fetchUserSettings, patchUserSettings } from "@/api/userSettings";
import {
  notificationTogglesFromSettings,
  type NotificationChannelToggles,
} from "@/utils/notificationPreferences";

type VendorPlan = "free" | "premium";

function togglesEqual(a: NotificationChannelToggles, b: NotificationChannelToggles): boolean {
  return a.email === b.email && a.push === b.push && a.whatsapp === b.whatsapp;
}

export default function VendorSettings() {
  const queryClient = useQueryClient();

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
  const [notifyPush, setNotifyPush] = useState(true);
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);

  const settingsQuery = useQuery({
    queryKey: ["user-settings"],
    queryFn: fetchUserSettings,
  });

  const savedToggles = useMemo(
    () => notificationTogglesFromSettings(settingsQuery.data),
    [settingsQuery.data],
  );

  useEffect(() => {
    if (!settingsQuery.data) return;
    const toggles = notificationTogglesFromSettings(settingsQuery.data);
    setNotifyEmail(toggles.email);
    setNotifyPush(toggles.push);
    setNotifyWhatsapp(toggles.whatsapp);
  }, [settingsQuery.data]);

  const currentToggles: NotificationChannelToggles = {
    email: notifyEmail,
    push: notifyPush,
    whatsapp: notifyWhatsapp,
  };

  const isDirty = !togglesEqual(currentToggles, savedToggles);

  const saveMutation = useMutation({
    mutationFn: async () => {
      return patchUserSettings({
        wants_marketing_emails: notifyEmail,
        settings: {
          notifications: {
            email: notifyEmail,
            push: notifyPush,
            whatsapp: notifyWhatsapp,
          },
        },
      });
    },
    onSuccess: (payload) => {
      queryClient.setQueryData(["user-settings"], payload);
      setSaveError(null);
    },
    onError: (err: Error) => {
      setSaveError(err.message || "Could not save notification settings.");
    },
  });

  const handleDiscard = () => {
    setNotifyEmail(savedToggles.email);
    setNotifyPush(savedToggles.push);
    setNotifyWhatsapp(savedToggles.whatsapp);
    setSaveError(null);
  };

  return (
    <div className="p-4 md:p-6">
      <section className="space-y-6 md:space-y-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-start">
          <div className="space-y-6">
            <BusinessProfileCard />
            <SecurityAccessCard twoFactor={twoFactor} setTwoFactor={setTwoFactor} />
            <ActionButtons
              onDiscard={handleDiscard}
              onSave={() => saveMutation.mutate()}
              isSaving={saveMutation.isPending}
              canSave={isDirty && !settingsQuery.isLoading}
            />
            {saveError ? (
              <p className="text-sm text-destructive font-inter" role="alert">
                {saveError}
              </p>
            ) : null}
          </div>

          <div className="space-y-6">
            <VerifiedStatusCard />
            <NotificationChannelsCard
              notifyEmail={notifyEmail}
              setNotifyEmail={setNotifyEmail}
              notifyPush={notifyPush}
              setNotifyPush={setNotifyPush}
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
