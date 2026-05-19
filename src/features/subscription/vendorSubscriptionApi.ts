import { request } from '@/api/request';

export type SubscriptionPackage = {
  id: string;
  title: string;
  amount: number;
  description: string;
  perks: string[];
};

export type SubscriptionPayment = {
  id: number;
  purpose: string;
  package_id: string;
  amount: number;
  currency: string;
  tx_ref: string;
  status: 'pending' | 'completed' | 'failed';
  is_consumed: boolean;
  paid_at: string | null;
};

export type VendorSubscriptionState = {
  plan: 'free' | 'premium';
  plan_label: string;
  status: 'active' | 'pending_payment' | 'expired';
  status_label: string;
  expires_at: string | null;
  expires_at_iso: string | null;
  is_expired: boolean;
  days_remaining: number;
  requires_payment: boolean;
  can_pay_premium: boolean;
  is_premium_active: boolean;
  can_access_features: boolean;
};

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function fetchSubscriptionPackages(): Promise<{
  currency: string;
  packages: SubscriptionPackage[];
}> {
  const res = await request.get<ApiEnvelope<{ currency: string; packages: SubscriptionPackage[] }>>(
    '/vendor/subscription/packages',
  );
  return res.data.data;
}

export async function fetchSubscriptionStatus(): Promise<{
  subscription: VendorSubscriptionState;
}> {
  const res = await request.get<ApiEnvelope<{ subscription: VendorSubscriptionState }>>(
    '/vendor/subscription/status',
  );
  return res.data.data;
}

export async function initSubscriptionPayment(boost?: {
  tierKey: string;
  durationDays: number;
}): Promise<SubscriptionPayment> {
  const res = await request.post<ApiEnvelope<{ payment: SubscriptionPayment }>>(
    '/vendor/subscription/payment/init',
    boost
      ? {
        boost_tier_key: boost.tierKey,
        boost_duration_days: boost.durationDays,
      }
      : undefined,
  );
  return res.data.data.payment;
}

export async function confirmSubscriptionPayment(
  paymentId: number,
  gatewayTransactionId: string,
): Promise<{
  subscription: VendorSubscriptionState;
}> {
  const res = await request.post<
    ApiEnvelope<{ subscription: VendorSubscriptionState; payment: SubscriptionPayment }>
  >('/vendor/subscription/payment/confirm', {
    payment_id: paymentId,
    gateway_transaction_id: gatewayTransactionId,
  });
  return { subscription: res.data.data.subscription };
}
