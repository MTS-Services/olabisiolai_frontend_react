import { request } from '@/api/request';
import type { AxiosError } from 'axios';

export type BoostPlanTheme = 'bronze' | 'silver' | 'gold';
export type BoostPlanCtaType = 'boost' | 'waiting_list';

/** Locked feature bullets from BoostPlanSeeder — never editable in admin UI. */
export const SEEDED_BOOST_FEATURES: Record<string, string[]> = {
  bronze: [
    'Appear in Top 5 in your LGA',
    'Boost badge on listing',
    'Increased visibility & inquiries',
  ],
  silver: [
    'Guaranteed Top 3 placement',
    'Higher ranking than Bronze',
    'Boost badge & strong visibility',
  ],
  gold: [
    'Guaranteed #1 position',
    'Exclusive - one per LGA',
    'Spotlight badge & 10x more reach',
    'Premium vendors get first access',
  ],
};

export type AdminBoostPlan = {
  id: number;
  plan_key: string;
  title: string;
  subtitle: string | null;
  tier: string;
  medal: string | null;
  slots_count: number;
  slot_note: string | null;
  price_7_days: number;
  price_14_days: number;
  price_30_days: number;
  features: string[];
  cta_text: string;
  cta_type: BoostPlanCtaType;
  theme: BoostPlanTheme;
  badge: string | null;
  is_highlighted: boolean;
  is_active: boolean;
  sort_order: number;
};

export type BoostPlanPayload = Omit<AdminBoostPlan, 'id'>;

/** Fields admins can change per plan card. */
export type BoostPlanEditablePayload = Omit<BoostPlanPayload, 'features'>;

type BoostPlansResponse = {
  success?: boolean;
  message?: string;
  data?: { plans?: AdminBoostPlan[]; plan?: AdminBoostPlan };
};

export function seededFeaturesFor(planKey: string): string[] {
  return [...(SEEDED_BOOST_FEATURES[planKey] ?? [])];
}

export function normalizeBoostPlan(plan: AdminBoostPlan): AdminBoostPlan {
  return {
    ...plan,
    features: seededFeaturesFor(plan.plan_key),
  };
}

function extractPlans(res: { data: BoostPlansResponse }): AdminBoostPlan[] {
  const plans = res.data?.data?.plans ?? [];
  return plans.map(normalizeBoostPlan);
}

function extractApiError(error: unknown): string {
  const axiosError = error as AxiosError<BoostPlansResponse & { errors?: Record<string, string[]> }>;
  const data = axiosError.response?.data;

  if (data?.errors) {
    const first = Object.values(data.errors).flat()[0];
    if (first) return first;
  }

  if (data?.message) return data.message;

  return 'Could not save boost plan. Please try again.';
}

export async function fetchAdminBoostPlans(): Promise<AdminBoostPlan[]> {
  const res = await request.post<BoostPlansResponse>('/admin/boost-plans');
  return extractPlans(res);
}

export async function updateAdminBoostPlan(plan: BoostPlanEditablePayload): Promise<AdminBoostPlan> {
  try {
    const res = await request.post<BoostPlansResponse>('/admin/boost-plans/update-one', {
      plan: {
        ...plan,
        features: seededFeaturesFor(plan.plan_key),
      },
    });

    if (res.data?.success === false) {
      throw new Error(res.data.message ?? 'Could not save boost plan.');
    }

    const updated = res.data?.data?.plan;
    if (!updated) {
      throw new Error('Could not save boost plan.');
    }

    return normalizeBoostPlan(updated);
  } catch (error) {
    throw new Error(extractApiError(error));
  }
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function planToEditablePayload(plan: AdminBoostPlan): BoostPlanEditablePayload {
  const { id: _id, features: _features, ...editable } = normalizeBoostPlan(plan);
  return editable;
}
