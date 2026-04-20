import { BillingInformationCard } from "@/components/sections/vendor/boost/boostPay/BillingInformationCard";
import { BoostPayHeader } from "@/components/sections/vendor/boost/boostPay/BoostPayHeader";
import { OrderSummaryCard } from "@/components/sections/vendor/boost/boostPay/OrderSummaryCard";
import { PaymentMethodsCard } from "@/components/sections/vendor/boost/boostPay/PaymentMethodsCard";
import { useState } from "react";

export default function VendorBoostReviewPayPage() {
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank">("card");
  return (
    <div className="p-4 md:p-6">
      <div className="space-y-4">
        <BoostPayHeader />

        <div className="grid gap-4 xl:grid-cols-[1fr_390px] mt-10">
          <div className="space-y-4">
            <PaymentMethodsCard
              selectedMethod={selectedMethod}
              onMethodChange={setSelectedMethod}
            />
            <BillingInformationCard />
          </div>

          <OrderSummaryCard />
        </div>
      </div>
    </div>
  );
}
