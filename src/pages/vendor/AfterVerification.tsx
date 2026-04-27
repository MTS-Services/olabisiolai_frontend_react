import { AssistanceCard } from "@/components/sections/vendor/afterYerification/AssistanceCard";
import { FooterContact } from "@/components/sections/vendor/afterYerification/FooterContact";
import { AfterVerificationHeader } from "@/components/sections/vendor/afterYerification/header";
import { HighlightCards } from "@/components/sections/vendor/afterYerification/HighlightCards";
import { RequiredDocuments } from "@/components/sections/vendor/afterYerification/RequiredDocuments";
import { VerificationProgress } from "@/components/sections/vendor/afterYerification/VerificationProgress";
import { VerificationTypeSelector } from "@/components/sections/vendor/afterYerification/VerificationTypeSelector";
import { WhyVerifySection } from "@/components/sections/vendor/afterYerification/WhyVerifySection";

export default function AfterVerification() {
  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto space-y-12 text-foreground md:space-y-16">
        <AfterVerificationHeader />
        <HighlightCards />
        <div className="grid gap-6 grid-cols-12">
          <VerificationTypeSelector className="col-span-8" />
          <VerificationProgress className="col-span-4" />
        </div>
        <div className="grid gap-6 grid-cols-12">
          <RequiredDocuments className="col-span-8" />
          <AssistanceCard className="col-span-4" />
        </div>
        <div className="grid lg:grid-cols-3">
          <div className="lg:col-span-2">
            <WhyVerifySection />
          </div>
          
        </div>
        <FooterContact />
      </div>
    </div>
  );
}
