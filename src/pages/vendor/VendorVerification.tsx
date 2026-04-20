
import { ProcessSummarySection } from "@/components/sections/vendor/verification/ProcessSummarySection";
import type { PlanId } from "@/components/sections/vendor/verification/verificationData";
import { VerificationHeader } from "@/components/sections/vendor/verification/VerificationHeader";
import { VerificationPlansGrid } from "@/components/sections/vendor/verification/VerificationPlansGrid";
import { WhyVerifySection } from "@/components/sections/vendor/verification/WhyVerifySection";
import { useState } from "react";

export default function VendorVerification() {
  const [selectedId, setSelectedId] = useState<PlanId>("individual");
  return (
    <div className="p-4 md:p-6">
      {/* <VendorVerificationType /> */}
      <section className="text-foreground">
      <div className="space-y-8 md:space-y-10">
        <VerificationHeader />

        <VerificationPlansGrid
          selectedId={selectedId}
          onPlanSelect={setSelectedId}
        />

        <div className="grid grid-cols-12 gap-8">
          <WhyVerifySection />
          <ProcessSummarySection />
        </div>
      </div>
    </section>
    </div>
  );
}

