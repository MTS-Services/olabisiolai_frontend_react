import { useCallback, useEffect, useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Loader2 } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { showError, showInfo, showSuccess } from "@/lib/sweetAlert";

import { useAuth } from "@/auth/useAuth";
import { getAccessToken } from "@/auth/token";
import { hasAnyRole } from "@/auth/roles";
import type { BillingFormValues } from "@/components/sections/vendor/boost/boostPay/BillingInformationCard";
import { BillingInformationCard } from "@/components/sections/vendor/boost/boostPay/BillingInformationCard";
import { BoostPayHeader } from "@/components/sections/vendor/boost/boostPay/BoostPayHeader";
import { OrderSummaryCard } from "@/components/sections/vendor/boost/boostPay/OrderSummaryCard";
import { PaymentMethodsCard } from "@/components/sections/vendor/boost/boostPay/PaymentMethodsCard";
import { SavedCheckoutProfilesCard } from "@/components/sections/vendor/boost/boostPay/SavedCheckoutProfilesCard";
import { env } from "@/config/env";
import {
  extractFlutterwaveCardMeta,
  extractFlutterwaveTransactionId,
  isFlutterwavePaymentSuccessful,
  type FlutterwaveCallbackResponse,
} from "@/features/payments/flutterwaveResponse";
import {
  readBoostCheckoutSelection,
  clearBoostCheckoutSelection,
} from "@/features/boost/boostCheckoutSession";
import {
  confirmSubscriptionPayment,
  fetchSubscriptionPackages,
  initSubscriptionPayment,
  type SubscriptionPayment,
} from "@/features/subscription/vendorSubscriptionApi";
import { billingFromUser, billingFromVendorPaymentMethod } from "@/features/vendor/vendorBillingProfile";
import { createVendorPaymentMethod, fetchVendorPaymentMethods } from "@/features/vendor/vendorPaymentsApi";
import type { VendorPaymentMethod } from "@/features/vendor/vendorPaymentsApi";

const CHECKOUT_SESSION_KEY = "subscriptionCheckoutJson";

function readCheckoutFromSession(): SubscriptionPayment | null {
  try {
    const raw = sessionStorage.getItem(CHECKOUT_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SubscriptionPayment;
  } catch {
    return null;
  }
}

function writeCheckoutToSession(p: SubscriptionPayment | null) {
  if (!p) {
    sessionStorage.removeItem(CHECKOUT_SESSION_KEY);
    return;
  }
  sessionStorage.setItem(CHECKOUT_SESSION_KEY, JSON.stringify(p));
}

export default function VendorSubscriptionPayPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank">("card");
  const [isPaying, setIsPaying] = useState(false);
  const [checkout, setCheckout] = useState<SubscriptionPayment | null>(() => readCheckoutFromSession());
  const [shouldOpenFlutterwave, setShouldOpenFlutterwave] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [billing, setBilling] = useState<BillingFormValues>(() => billingFromUser(null));
  const [saveProfileAfterPay, setSaveProfileAfterPay] = useState(true);
  const [profileInitDone, setProfileInitDone] = useState(false);

  const { user, isAuthenticated, isSessionLoading, isUserLoading } = useAuth();
  const hasToken = Boolean(getAccessToken());
  const canFetchPackages = isAuthenticated || hasToken;

  const { data: packagesData, isPending: packagesLoading, isError: packagesError } = useQuery({
    queryKey: ["vendor", "subscription", "packages"],
    queryFn: fetchSubscriptionPackages,
    enabled: canFetchPackages,
    retry: 1,
  });

  const { data: methodsData } = useQuery({
    queryKey: ["vendor", "payment-methods"],
    queryFn: fetchVendorPaymentMethods,
    enabled: canFetchPackages,
    staleTime: 30_000,
  });

  const boostSelection = readBoostCheckoutSelection();
  const premiumPackage = packagesData?.packages[0];
  const premiumBase = premiumPackage?.amount ?? 25000;
  const boostAddon = boostSelection?.amount ?? 0;
  const amountNgn = checkout?.amount ?? premiumBase + boostAddon;

  useEffect(() => {
    if (profileInitDone) return;
    if (!methodsData?.items) return;
    setProfileInitDone(true);
    const def = methodsData.items.find((x) => x.is_default) ?? methodsData.items[0];
    if (def) {
      setSelectedProfileId(def.id);
      setBilling(billingFromVendorPaymentMethod(def));
    }
  }, [methodsData, profileInitDone]);

  useEffect(() => {
    if (!profileInitDone) return;
    if (selectedProfileId !== null) return;
    setBilling(billingFromUser(user));
  }, [user, profileInitDone, selectedProfileId]);

  const customerEmail = billing.email.trim() || user?.email || "guest@gidira.app";
  const customerPhone = billing.phone.trim() || "08000000000";
  const customerName = billing.cardholder_name.trim() || "Gidira Vendor";

  const flutterAmount = checkout?.amount ?? amountNgn;
  const flutterCurrency = checkout?.currency ?? "NGN";
  const flutterTxRef = checkout?.tx_ref ?? `subscription_pending_${String(user?.id ?? "guest")}`;

  const handleFlutterPayment = useFlutterwave({
    public_key: env.flutterwavePublicKey ?? "",
    tx_ref: flutterTxRef,
    amount: flutterAmount,
    currency: flutterCurrency,
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

  const persistCheckout = useCallback((p: SubscriptionPayment | null) => {
    setCheckout(p);
    writeCheckoutToSession(p);
  }, []);

  const trySaveProfileFromResponse = useCallback(
    async (response: FlutterwaveCallbackResponse) => {
      if (!saveProfileAfterPay) return;
      const card = extractFlutterwaveCardMeta(response);
      try {
        await createVendorPaymentMethod({
          label: card.card_brand && card.last_four ? `${card.card_brand} •••• ${card.last_four}` : "Subscription checkout",
          cardholder_name: billing.cardholder_name.trim() || customerName,
          email: billing.email.trim() || customerEmail,
          phone: billing.phone.trim() || customerPhone,
          last_four: card.last_four,
          card_brand: card.card_brand,
          exp_month: card.exp_month,
          exp_year: card.exp_year,
          billing_line1: billing.billing_line1.trim() || null,
          billing_city: billing.billing_city.trim() || null,
          billing_state: billing.billing_state.trim() || null,
          billing_country: billing.billing_country.trim() || null,
          is_default: true,
        });
        void queryClient.invalidateQueries({ queryKey: ["vendor", "payment-methods"] });
      } catch {
        // non-blocking
      }
    },
    [
      saveProfileAfterPay,
      billing.billing_city,
      billing.billing_country,
      billing.billing_line1,
      billing.billing_state,
      billing.cardholder_name,
      billing.email,
      billing.phone,
      customerEmail,
      customerName,
      customerPhone,
      queryClient,
    ],
  );

  useEffect(() => {
    if (!shouldOpenFlutterwave || !checkout) {
      return;
    }

    setShouldOpenFlutterwave(false);
    const resolvedPaymentId = checkout.id;

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

          await confirmSubscriptionPayment(resolvedPaymentId, String(txId));
          await trySaveProfileFromResponse(response);
          closePaymentModal();
          persistCheckout(null);
          clearBoostCheckoutSelection();
          localStorage.setItem("vendorPlan", "premium");
          localStorage.setItem("vendorBusinessCreated", "true");
          void queryClient.invalidateQueries({ queryKey: ["vendor"] });
          void queryClient.invalidateQueries({ queryKey: ["vendor", "onboarding", "status"] });
          void queryClient.invalidateQueries({ queryKey: ["vendor", "payments"] });
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
  }, [
    shouldOpenFlutterwave,
    checkout,
    handleFlutterPayment,
    navigate,
    persistCheckout,
    queryClient,
    trySaveProfileFromResponse,
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

    if (!billing.email.trim() || !billing.phone.trim() || !billing.cardholder_name.trim()) {
      showError("Please fill in billing name, email, and phone before paying.");
      return;
    }

    try {
      setIsPaying(true);

      let pay = checkout;
      if (!pay) {
        pay = await initSubscriptionPayment(
          boostSelection
            ? { tierKey: boostSelection.tierKey, durationDays: boostSelection.durationDays }
            : undefined,
        );
        persistCheckout(pay);
      }

      setCheckout(pay);
      setShouldOpenFlutterwave(true);
    } catch {
      setIsPaying(false);
      showError("Unable to start payment.");
    }
  };

  const onSelectProfile = (_id: number | null, method: VendorPaymentMethod | null) => {
    setSelectedProfileId(_id);
    if (method) {
      setBilling(billingFromVendorPaymentMethod(method));
    } else {
      setBilling(billingFromUser(user));
    }
  };

  const billingHint =
    selectedProfileId !== null
      ? "Using a saved profile — you can still edit fields before opening the payment window. Card number and CVV are entered only inside Flutterwave."
      : null;

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

  const methods = methodsData?.items ?? [];

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
            <SavedCheckoutProfilesCard
              items={methods}
              selectedId={selectedProfileId}
              onSelect={onSelectProfile}
            />
            <BillingInformationCard value={billing} onChange={setBilling} editable hint={billingHint} />
          </div>

          <OrderSummaryCard
            onConfirmPay={() => void onConfirmPay()}
            isPaying={isPaying || packagesLoading}
            planTitle={premiumPackage?.title ?? "Premium"}
            totalAmount={amountNgn}
            boostLine={
              boostSelection
                ? {
                  label: `${boostSelection.tierLabel} · ${boostSelection.durationDays} days`,
                  amount: boostSelection.amount,
                }
                : null
            }
            isVerification={false}
            beforePayButton={
              <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 rounded border"
                  checked={saveProfileAfterPay}
                  onChange={(e) => setSaveProfileAfterPay(e.target.checked)}
                />
                <span>
                  After a successful card payment, save masked card details and billing as a default checkout profile
                  (last 4 digits only; never your full card number).
                </span>
              </label>
            }
          />
        </div>
      </div>
    </div>
  );
}
