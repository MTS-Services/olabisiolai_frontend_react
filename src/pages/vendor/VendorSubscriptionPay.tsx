import { useMemo, useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Loader2 } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { showError, showInfo, showSuccess } from "@/lib/sweetAlert";

import { useAuth } from "@/auth/useAuth";
import { getAccessToken } from "@/auth/token";
import { hasAnyRole } from "@/auth/roles";
import { BillingInformationCard } from "@/components/sections/vendor/boost/boostPay/BillingInformationCard";
import { BoostPayHeader } from "@/components/sections/vendor/boost/boostPay/BoostPayHeader";
import { OrderSummaryCard } from "@/components/sections/vendor/boost/boostPay/OrderSummaryCard";
import { PaymentMethodsCard } from "@/components/sections/vendor/boost/boostPay/PaymentMethodsCard";
import { env } from "@/config/env";
import {
  confirmSubscriptionPayment,
  fetchSubscriptionPackages,
  initSubscriptionPayment,
} from "@/features/subscription/vendorSubscriptionApi";

const PAYMENT_ID_KEY = "subscriptionPaymentId";

export default function VendorSubscriptionPayPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank">("card");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentId, setPaymentId] = useState<number | null>(() => {
    const stored = sessionStorage.getItem(PAYMENT_ID_KEY);
    return stored ? Number(stored) : null;
  });

  const { user, isAuthenticated, isSessionLoading, isUserLoading } = useAuth();
  const hasToken = Boolean(getAccessToken());
  const canFetchPackages = isAuthenticated || hasToken;

  const { data: packagesData, isPending: packagesLoading, isError: packagesError } = useQuery({
    queryKey: ["vendor", "subscription", "packages"],
    queryFn: fetchSubscriptionPackages,
    enabled: canFetchPackages,
    retry: 1,
  });

  const premiumPackage = packagesData?.packages[0];
  const amountNgn = premiumPackage?.amount ?? 25000;

  const customerEmail = user?.email ?? "guest@gidira.app";
  const customerPhone =
    (user as { phone?: string; phone_number?: string })?.phone ??
    (user as { phone?: string; phone_number?: string })?.phone_number ??
    "08000000000";
  const customerName =
    (user as { name?: string; full_name?: string })?.name ??
    (user as { name?: string; full_name?: string })?.full_name ??
    "Gidira Vendor";

  const txRef = useMemo(
    () => `subscription_${Date.now()}_${String(user?.id ?? "guest")}`,
    [user?.id],
  );

  const handleFlutterPayment = useFlutterwave({
    public_key: env.flutterwavePublicKey ?? "",
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
      title: "Gidira Premium Subscription",
      description: "Annual premium subscription",
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

    try {
      setIsPaying(true);

      let activePaymentId = paymentId;
      if (!activePaymentId) {
        const payment = await initSubscriptionPayment();
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

            await confirmSubscriptionPayment(resolvedPaymentId, String(txId));
            closePaymentModal();
            sessionStorage.removeItem(PAYMENT_ID_KEY);
            localStorage.setItem("vendorPlan", "premium");
            localStorage.setItem("vendorBusinessCreated", "true");
            void queryClient.invalidateQueries({ queryKey: ["vendor"] });
            void queryClient.invalidateQueries({ queryKey: ["vendor", "onboarding", "status"] });
            showSuccess("Premium activated. Your business is now verified.");
            navigate("/vendor/dashboard", { replace: true });
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

  if (isSessionLoading || (isUserLoading && !user && hasToken)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-brand-red" aria-label="Loading checkout" />
      </div>
    );
  }

  if (!isAuthenticated && !hasToken) {
    return <Navigate to="/login" replace state={{ from: "/vendor/premium-payment" }} />;
  }

  if (user && !hasAnyRole(user, "vendor")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-4">
        <BoostPayHeader variant="subscription" />

        {packagesError ? (
          <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            Could not load premium package details. You can still pay ₦{amountNgn.toLocaleString()} below.
          </p>
        ) : null}

        <div className="mt-10 grid gap-4 xl:grid-cols-[1fr_390px]">
          <div className="space-y-4">
            <PaymentMethodsCard selectedMethod={selectedMethod} onMethodChange={setSelectedMethod} />
            <BillingInformationCard />
          </div>

          <OrderSummaryCard
            onConfirmPay={() => void onConfirmPay()}
            isPaying={isPaying || packagesLoading}
            planTitle={premiumPackage?.title ?? "Premium"}
            totalAmount={amountNgn}
            isVerification={false}
          />
        </div>
      </div>
    </div>
  );
}
