import { useMemo, useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useNavigate } from "react-router-dom";
import { showError, showInfo, showSuccess } from "@/lib/sweetAlert";

import { useAuth } from "@/auth/useAuth";
import { BillingInformationCard } from "@/components/sections/vendor/boost/boostPay/BillingInformationCard";
import { BoostPayHeader } from "@/components/sections/vendor/boost/boostPay/BoostPayHeader";
import { OrderSummaryCard } from "@/components/sections/vendor/boost/boostPay/OrderSummaryCard";
import { PaymentMethodsCard } from "@/components/sections/vendor/boost/boostPay/PaymentMethodsCard";
import { plans, type PlanId } from "@/components/sections/vendor/verification/verificationData";
import { env } from "@/config/env";
import {
  confirmVerificationPayment,
  initVerificationPayment,
} from "@/features/verification/vendorVerificationApi";

const PAYMENT_ID_KEY = "verificationPaymentId";
const PLAN_STORAGE_KEY = "verificationPlanId";

export default function VendorBoostReviewPayPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank">("card");
  const [isPaying, setIsPaying] = useState(false);
  const { user } = useAuth();

  const isVerification = sessionStorage.getItem("paymentSource") === "verification";
  const packageId = (sessionStorage.getItem(PLAN_STORAGE_KEY) as PlanId | null) ?? "individual";
  const selectedPlan = plans.find((p) => p.id === packageId) ?? plans[0];
  const amountNgn = Number(selectedPlan.amount.replace(/,/g, "")) || 5000;

  const customerEmail = user?.email ?? "guest@gidira.app";
  const customerPhone =
    (user as { phone?: string; phone_number?: string })?.phone ??
    (user as { phone?: string; phone_number?: string })?.phone_number ??
    "08000000000";
  const customerName =
    (user as { name?: string; full_name?: string })?.name ??
    (user as { name?: string; full_name?: string })?.full_name ??
    "Gidira Vendor";

  const [paymentId, setPaymentId] = useState<number | null>(() => {
    const stored = sessionStorage.getItem(PAYMENT_ID_KEY);
    return stored ? Number(stored) : null;
  });

  const txRef = useMemo(() => `verification_${Date.now()}_${String(user?.id ?? "guest")}`, [user?.id]);

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
      title: isVerification ? "Gidira Verification Payment" : "Gidira Boost Payment",
      description: isVerification ? "Verification package" : "Boost plan purchase",
      logo: "/favicon.ico",
    },
  });

  const onConfirmPay = async () => {
    if (selectedMethod === "bank") {
      showInfo("Bank transfer checkout is coming soon. Please use Card for now.");
      return;
    }

    if (!env.flutterwavePublicKey) {
      showError("Flutterwave public key is missing. Set VITE_FLUTTERWAVE_PUBLIC_KEY.");
      return;
    }

    if (!isVerification) {
      showInfo("Boost payment API is not wired yet.");
      return;
    }

    try {
      setIsPaying(true);

      let activePaymentId = paymentId;
      if (!activePaymentId) {
        const payment = await initVerificationPayment(packageId);
        activePaymentId = payment.id;
        setPaymentId(payment.id);
        sessionStorage.setItem(PAYMENT_ID_KEY, String(payment.id));
      }

      const resolvedPaymentId = activePaymentId;

      handleFlutterPayment({
        callback: async (response) => {
          try {
            const txId =
              (response as { transaction_id?: string | number })?.transaction_id ??
              (response as { id?: string | number })?.id;

            if (!txId) {
              showError("Payment completed but transaction id was missing.");
              return;
            }

            await confirmVerificationPayment(resolvedPaymentId, String(txId));
            closePaymentModal();
            showSuccess("Payment confirmed. Upload your documents next.");
            navigate("/vendor/document-upload");
          } catch {
            showError("Payment succeeded but confirmation failed. Contact support.");
          } finally {
            setIsPaying(false);
          }
        },
        onClose: () => setIsPaying(false),
      });
    } catch {
      setIsPaying(false);
      showError("Unable to start payment.");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-4">
        <BoostPayHeader />

        <div className="mt-10 grid gap-4 xl:grid-cols-[1fr_390px]">
          <div className="space-y-4">
            <PaymentMethodsCard selectedMethod={selectedMethod} onMethodChange={setSelectedMethod} />
            <BillingInformationCard />
          </div>

          <OrderSummaryCard
            onConfirmPay={() => void onConfirmPay()}
            isPaying={isPaying}
            planTitle={isVerification ? selectedPlan.title : "Visibility Pro Plus"}
            totalAmount={amountNgn}
            isVerification={isVerification}
          />
        </div>
      </div>
    </div>
  );
}
