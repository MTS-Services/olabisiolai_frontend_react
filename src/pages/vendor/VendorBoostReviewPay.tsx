import { useCallback, useEffect, useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { showError, showInfo, showSuccess } from "@/lib/sweetAlert";

import { useAuth } from "@/auth/useAuth";
import { getAccessToken } from "@/auth/token";
import { BillingInformationCard } from "@/components/sections/vendor/boost/boostPay/BillingInformationCard";
import { BoostPayHeader } from "@/components/sections/vendor/boost/boostPay/BoostPayHeader";
import { OrderSummaryCard } from "@/components/sections/vendor/boost/boostPay/OrderSummaryCard";
import { PaymentMethodsCard } from "@/components/sections/vendor/boost/boostPay/PaymentMethodsCard";
import { plans, type PlanId } from "@/components/sections/vendor/verification/verificationData";
import { env } from "@/config/env";
import {
  extractFlutterwaveTransactionId,
  isFlutterwavePaymentSuccessful,
  type FlutterwaveCallbackResponse,
} from "@/features/payments/flutterwaveResponse";
import {
  clearVerificationPaymentSession,
  confirmVerificationPayment,
  fetchVerificationPackages,
  fetchVerificationStatus,
  initVerificationPayment,
  primeVerificationDocumentSession,
  type VerificationPayment,
} from "@/features/verification/vendorVerificationApi";
import { getLaravelErrorMessage } from "@/lib/laravelApiError";

const PLAN_STORAGE_KEY = "verificationPlanId";

function redirectToDocumentUpload(
  navigate: ReturnType<typeof useNavigate>,
  status: Awaited<ReturnType<typeof fetchVerificationStatus>> | null,
) {
  if (status) {
    primeVerificationDocumentSession(status);
  }
  navigate("/vendor/document-upload", { replace: true });
}

export default function VendorBoostReviewPayPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank">("card");
  const [isPaying, setIsPaying] = useState(false);
  const [checkoutPayment, setCheckoutPayment] = useState<VerificationPayment | null>(null);
  const [shouldOpenFlutterwave, setShouldOpenFlutterwave] = useState(false);
  const { user } = useAuth();

  const isVerification = sessionStorage.getItem("paymentSource") === "verification";
  const packageId = (sessionStorage.getItem(PLAN_STORAGE_KEY) as PlanId | null) ?? "individual";
  const selectedPlan = plans.find((p) => p.id === packageId) ?? plans[0];

  const { data: packagesData } = useQuery({
    queryKey: ["vendor", "verification", "packages"],
    queryFn: fetchVerificationPackages,
    enabled: isVerification,
    staleTime: 60_000,
  });

  const { data: verificationStatus } = useQuery({
    queryKey: ["vendor", "verification", "status", "review-pay"],
    queryFn: fetchVerificationStatus,
    enabled: isVerification,
    staleTime: 0,
  });

  const apiPackage = packagesData?.packages.find((p) => p.id === packageId);
  const amountNgn =
    checkoutPayment?.amount ??
    apiPackage?.amount ??
    Number(selectedPlan.amount.replace(/,/g, "")) ??
    5000;

  useEffect(() => {
    if (!isVerification || !verificationStatus?.awaiting_document_submission) {
      return;
    }
    showInfo("Payment already completed. Continue with document upload.");
    redirectToDocumentUpload(navigate, verificationStatus);
  }, [isVerification, navigate, verificationStatus]);

  const customerEmail = user?.email ?? "guest@gidira.app";
  const customerPhone =
    (user as { phone?: string; phone_number?: string })?.phone ??
    (user as { phone?: string; phone_number?: string })?.phone_number ??
    "08000000000";
  const customerName =
    (user as { name?: string; full_name?: string })?.name ??
    (user as { name?: string; full_name?: string })?.full_name ??
    "Gidira Vendor";

  const flutterwaveTxRef = checkoutPayment?.tx_ref ?? `verification_pending_${packageId}`;

  const handleFlutterPayment = useFlutterwave({
    public_key: env.flutterwavePublicKey,
    tx_ref: flutterwaveTxRef,
    amount: amountNgn,
    currency: checkoutPayment?.currency ?? packagesData?.currency ?? "NGN",
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

  const completeVerificationCheckout = useCallback(
    async (paymentId: number, gatewayTransactionId: string) => {
      const result = await confirmVerificationPayment(paymentId, gatewayTransactionId);

      if (result.consumable_payment_id) {
        sessionStorage.setItem("verificationPaymentId", String(result.consumable_payment_id));
      }

      if (result.awaiting_document_submission) {
        const status = await fetchVerificationStatus();
        redirectToDocumentUpload(navigate, status);
        return;
      }

      navigate("/vendor/document-upload", { replace: true });
    },
    [navigate],
  );

  const recoverAfterConfirmFailure = useCallback(async (): Promise<boolean> => {
    try {
      const status = await fetchVerificationStatus();
      if (status.awaiting_document_submission) {
        redirectToDocumentUpload(navigate, status);
        return true;
      }
    } catch {
      // ignore recovery probe errors
    }
    return false;
  }, [navigate]);

  useEffect(() => {
    if (!shouldOpenFlutterwave || !checkoutPayment) {
      return;
    }

    setShouldOpenFlutterwave(false);
    const resolvedPaymentId = checkoutPayment.id;

    handleFlutterPayment({
      callback: async (response: FlutterwaveCallbackResponse) => {
        try {
          if (!isFlutterwavePaymentSuccessful(response)) {
            showError("Payment was not completed. Please try again.");
            return;
          }

          const txId = extractFlutterwaveTransactionId(response);
          if (!txId) {
            showError("Payment completed but transaction id was missing.");
            return;
          }

          await completeVerificationCheckout(resolvedPaymentId, txId);
          closePaymentModal();
          showSuccess("Payment confirmed. Upload your documents next.");
        } catch (error) {
          const recovered = await recoverAfterConfirmFailure();
          if (recovered) {
            closePaymentModal();
            showSuccess("Payment confirmed. Upload your documents next.");
            return;
          }
          showError(
            getLaravelErrorMessage(
              error,
              "Payment succeeded but confirmation failed. Contact support.",
            ),
          );
        } finally {
          setIsPaying(false);
        }
      },
      onClose: () => setIsPaying(false),
    });
  }, [
    shouldOpenFlutterwave,
    checkoutPayment,
    handleFlutterPayment,
    recoverAfterConfirmFailure,
    completeVerificationCheckout,
  ]);

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

    if (!getAccessToken()) {
      showError("Your session expired. Please sign in again.");
      navigate("/login", { replace: true, state: { from: "/vendor/review-pay" } });
      return;
    }

    if (verificationStatus?.awaiting_document_submission) {
      redirectToDocumentUpload(navigate, verificationStatus);
      return;
    }

    try {
      setIsPaying(true);
      clearVerificationPaymentSession();

      const payment = await initVerificationPayment(packageId);
      setCheckoutPayment(payment);
      sessionStorage.setItem("verificationPaymentId", String(payment.id));
      setShouldOpenFlutterwave(true);
    } catch (error) {
      setIsPaying(false);
      showError(getLaravelErrorMessage(error, "Unable to start payment."));
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
            planTitle={isVerification ? (apiPackage?.title ?? selectedPlan.title) : "Visibility Pro Plus"}
            totalAmount={amountNgn}
            isVerification={isVerification}
          />
        </div>
      </div>
    </div>
  );
}
