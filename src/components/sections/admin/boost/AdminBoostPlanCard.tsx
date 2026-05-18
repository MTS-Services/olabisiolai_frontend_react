import { Check } from 'lucide-react';
import { formatNaira, seededFeaturesFor, type AdminBoostPlan } from '@/features/boost/adminBoostPlansApi';

const THEME_STYLES: Record<
  AdminBoostPlan['theme'],
  {
    card: string;
    accent: string;
    cta: string;
    priceRow: string;
    medalRing: string;
  }
> = {
  bronze: {
    card: 'border-[#f0d6bd] bg-gradient-to-b from-[#fff9f2] to-[#fff3e8]',
    accent: 'text-[#c77b38]',
    cta: 'bg-[#8d4a1a] text-white hover:bg-[#7a3f16] shadow-sm',
    priceRow: 'border-[#f0d6bd]/80 bg-white/90',
    medalRing: 'ring-[#e8c4a0]',
  },
  silver: {
    card: 'border-[#d9dee8] bg-gradient-to-b from-[#f8fafc] to-[#f1f4f9]',
    accent: 'text-[#5f6b7a]',
    cta: 'bg-[#364152] text-white hover:bg-[#2c3544] shadow-sm',
    priceRow: 'border-[#d9dee8] bg-white/90',
    medalRing: 'ring-[#c5ccd8]',
  },
  gold: {
    card: 'border-[#f2dd8b] bg-gradient-to-b from-[#fffdf2] to-[#fff8dc]',
    accent: 'text-[#b47d00]',
    cta: 'bg-[#c89c2a] text-white hover:bg-[#b48822] shadow-sm',
    priceRow: 'border-[#f2dd8b]/90 bg-white/90',
    medalRing: 'ring-[#f2dd8b]',
  },
};

const DURATIONS = [
  { label: '7 Days', key: 'price_7_days' as const },
  { label: '14 Days', key: 'price_14_days' as const },
  { label: '30 Days', key: 'price_30_days' as const },
];

type Props = {
  plan: AdminBoostPlan;
  onEdit?: () => void;
};

export function AdminBoostPlanCard({ plan, onEdit }: Props) {
  const styles = THEME_STYLES[plan.theme] ?? THEME_STYLES.bronze;
  const features = seededFeaturesFor(plan.plan_key);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md ${styles.card} ${plan.is_highlighted ? 'md:-mt-1 md:mb-1' : ''}`}
    >
      {plan.badge ? (
        <span className="absolute right-4 top-4 rounded-full bg-[#ffe8a3] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#b47d00]">
          {plan.badge}
        </span>
      ) : null}

      <div className="mb-4 pr-16">
        <div
          className={`mb-3 inline-flex size-11 items-center justify-center rounded-full bg-white text-xl shadow-sm ring-2 ${styles.medalRing}`}
          aria-hidden="true"
        >
          {plan.medal ?? '🏅'}
        </div>
        <h4 className="text-base font-bold text-ink">{plan.title}</h4>
        {plan.subtitle ? (
          <p className="mt-0.5 text-xs leading-relaxed text-body-secondary">{plan.subtitle}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        {DURATIONS.map(({ label, key }) => (
          <div
            key={key}
            className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs ${styles.priceRow}`}
          >
            <span className="font-medium text-body-secondary">{label}</span>
            <span className="font-bold text-ink">{formatNaira(plan[key])}</span>
          </div>
        ))}
      </div>

      {plan.slot_note ? (
        <p className={`mt-3 text-xs font-semibold ${styles.accent}`}>* {plan.slot_note}</p>
      ) : null}

      <ul className="mt-3 flex-1 space-y-2">
        {features.map((feature, index) => (
          <li key={`${plan.plan_key}-feature-${index}`} className="flex items-start gap-2 text-xs text-body-secondary">
            <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
              <Check className="size-2.5" strokeWidth={3} />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          disabled={plan.cta_type === 'waiting_list'}
          className={`w-full rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors ${styles.cta} disabled:cursor-default disabled:opacity-90`}
        >
          {plan.cta_text}
        </button>
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="w-full rounded-lg border border-border-gray bg-white/90 px-3 py-2 text-xs font-semibold text-ink hover:bg-white"
          >
            Edit this plan
          </button>
        ) : null}
      </div>
    </article>
  );
}
