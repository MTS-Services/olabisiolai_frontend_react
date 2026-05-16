import { useEffect, useState } from "react";
import { ProcessSummarySection } from "@/components/sections/vendor/verification/ProcessSummarySection";
import { PurchasedVerificationPlan } from "@/components/sections/vendor/verification/PurchasedVerificationPlan";
import { SelectedPlanNote } from "@/components/sections/vendor/verification/SelectedPlanNote";
import type { PlanId } from "@/components/sections/vendor/verification/verificationData";
import { VerificationHeader } from "@/components/sections/vendor/verification/VerificationHeader";
import { VerificationPlansGrid } from "@/components/sections/vendor/verification/VerificationPlansGrid";
import { VerificationStatusActions } from "@/components/sections/vendor/verification/VerificationStatusActions";
import { WhyVerifySection } from "@/components/sections/vendor/verification/WhyVerifySection";
import {
  fetchVerificationStatus,
  type VerificationStatusPayload,
} from "@/features/verification/vendorVerificationApi";

const PLAN_STORAGE_KEY = "verificationPlanId";

export default function VendorVerification() {
  const [selectedId, setSelectedId] = useState<PlanId>(() => {
    const stored = sessionStorage.getItem(PLAN_STORAGE_KEY);
    if (stored === "individual" || stored === "business" || stored === "ltd") {
      return stored;
    }
    return "individual";
  });
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatusPayload | null>(
    null,
  );

  useEffect(() => {
    sessionStorage.setItem(PLAN_STORAGE_KEY, selectedId);
  }, [selectedId]);

  useEffect(() => {
    void fetchVerificationStatus()
      .then((status) => {
        setVerificationStatus(status);
        const purchasedId = status.purchased_package?.id;
        if (
          purchasedId === "individual" ||
          purchasedId === "business" ||
          purchasedId === "ltd"
        ) {
          setSelectedId(purchasedId);
        }
      })
      .catch(() => setVerificationStatus(null));
  }, []);

  return (
    <div className="p-4 md:p-6">
      <section className="text-foreground">
        <div className="space-y-8 md:space-y-10">
          <VerificationHeader />

          {verificationStatus?.purchased_package ? (
            <PurchasedVerificationPlan purchased={verificationStatus.purchased_package} />
          ) : null}

          <VerificationStatusActions status={verificationStatus} />

          <div className="space-y-4">
            <VerificationPlansGrid selectedId={selectedId} onPlanSelect={setSelectedId} />
            <SelectedPlanNote
              selectedId={selectedId}
              purchasedPackage={verificationStatus?.purchased_package ?? null}
            />
          </div>

          <div className="grid grid-cols-12 gap-8">
            <WhyVerifySection />
            <ProcessSummarySection packageId={selectedId} />
          </div>
        </div>
      </section>
    </div>
  );
}
