import { BillingInformationCard } from "@/components/sections/vendor/boost/boostPay/BillingInformationCard";
import { BoostPayHeader } from "@/components/sections/vendor/boost/boostPay/BoostPayHeader";
import { OrderSummaryCard } from "@/components/sections/vendor/boost/boostPay/OrderSummaryCard";
import { PaymentMethodsCard } from "@/components/sections/vendor/boost/boostPay/PaymentMethodsCard";
import { useState } from "react";
import { useFlutterwave } from "flutterwave-react-v3";
import { env } from "@/config/env";
import { useAuth } from "@/auth/useAuth";
import { useMemo } from "react";

export default function VendorBoostReviewPayPage() {
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank">("card");
  const [isPaying, setIsPaying] = useState(false);
  const { user } = useAuth();

  const amountNgn = 5000;
  const customerEmail = user?.email ?? "guest@gidira.app";
  const customerPhone =
    (user as unknown as { phone?: string; phone_number?: string })?.phone ??
    (user as unknown as { phone?: string; phone_number?: string })?.phone_number ??
    "08000000000";
  const customerName =
    (user as unknown as { name?: string; full_name?: string })?.name ??
    (user as unknown as { name?: string; full_name?: string })?.full_name ??
    "Gidira Vendor";

  // Keep tx_ref stable across re-renders so Flutterwave init doesn't churn.
  const txRef = useMemo(() => {
    return `boost_${Date.now()}_${String(user?.id ?? "guest")}`;
  }, [user?.id]);

  const handleFlutterPayment = useFlutterwave({
    public_key: env.flutterwavePublicKey,
    tx_ref: txRef,
    amount: amountNgn,
    currency: "NGN",
    payment_options: "card",
    customer: {
      email: customerEmail,
      phone_number: customerPhone,
      name: customerName,
    },
    customizations: {
      title: "Gidira Boost Payment",
      description: "Boost plan purchase",
      logo: "/favicon.ico",
    },
  });

  const onConfirmPay = () => {
    if (selectedMethod === "bank") {
      window.alert("Bank transfer checkout is coming soon. Please use Card for now.");
      return;
    }

    if (!env.flutterwavePublicKey) {
      window.alert("Flutterwave public key is missing. Set VITE_FLUTTERWAVE_PUBLIC_KEY and restart dev server.");
      return;
    }

    try {
      setIsPaying(true);
      handleFlutterPayment({
        callback: async (response) => {
          // Dev-only: verify via Vite dev proxy (keeps secret out of browser bundle).
          // Production: move this to Laravel backend.
          if (import.meta.env.DEV) {
            try {
              const txId = (response as unknown as { transaction_id?: string | number })
                ?.transaction_id;
              if (txId) {
                const res = await fetch(
                  `/__dev/flutterwave/verify/${encodeURIComponent(String(txId))}`,
                );
                const data = await res.json().catch(() => null);
                // eslint-disable-next-line no-console
                console.log("[flutterwave] verify result", { status: res.status, data });
              } else {
                // eslint-disable-next-line no-console
                console.log("[flutterwave] payment response (no transaction_id)", response);
              }
            } catch (e) {
              // eslint-disable-next-line no-console
              console.log("[flutterwave] dev verify failed", e);
            }
          }
          setIsPaying(false);
        },
        onClose: () => {
          setIsPaying(false);
        },
      });
    } catch (e) {
      setIsPaying(false);
      window.alert(`Unable to start payment: ${String(e)}`);
    }
  };
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

          <OrderSummaryCard onConfirmPay={onConfirmPay} isPaying={isPaying} />
        </div>
      </div>
    </div>
  );
}
