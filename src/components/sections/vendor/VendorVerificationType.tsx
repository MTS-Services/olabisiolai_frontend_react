import { useState } from "react";
import { type PlanId } from "./verification/verificationData";

import { VerificationHeader } from "./verification/VerificationHeader";
import { VerificationPlansGrid } from "./verification/VerificationPlansGrid";
import { WhyVerifySection } from "./verification/WhyVerifySection";
import { ProcessSummarySection } from "./verification/ProcessSummarySection";


export function VendorVerificationType() {
  const [selectedId, setSelectedId] = useState<PlanId>("individual");

  return (
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
  );
}
