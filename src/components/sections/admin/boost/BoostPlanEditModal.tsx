import { Check, Loader2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  normalizeBoostPlan,
  planToEditablePayload,
  seededFeaturesFor,
  updateAdminBoostPlan,
  type AdminBoostPlan,
  type BoostPlanEditablePayload,
} from '@/features/boost/adminBoostPlansApi';

type Props = {
  open: boolean;
  plan: AdminBoostPlan | null;
  onClose: () => void;
  onSaved: (plan: AdminBoostPlan) => void;
};

export function BoostPlanEditModal({ open, plan, onClose, onSaved }: Props) {
  const [draft, setDraft] = useState<BoostPlanEditablePayload | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wasOpenRef = useRef(false);

  const lockedFeatures = plan ? seededFeaturesFor(plan.plan_key) : [];

  useEffect(() => {
    if (open && plan && !wasOpenRef.current) {
      setDraft(planToEditablePayload(plan));
      setError(null);
    }

    if (!open) {
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
  }, [open, plan]);

  if (!open || !plan || !draft) return null;

  function updateField<K extends keyof BoostPlanEditablePayload>(key: K, value: BoostPlanEditablePayload[K]) {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  async function handleSave() {
    if (!draft) return;

    setSaving(true);
    setError(null);

    try {
      const updated = await updateAdminBoostPlan(draft);
      onSaved(updated);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save boost plan.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="boost-plan-edit-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-chat-border-subtle bg-card p-5 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 id="boost-plan-edit-title" className="text-lg font-semibold text-ink">
              Edit {plan.title}
            </h2>
            <p className="text-sm text-chat-meta">Update pricing and copy. Features are fixed from seeder.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-muted"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {error ? <p className="mb-3 text-sm text-brand-red">{error}</p> : null}

        <div className="space-y-3">
          <label className="block text-xs font-medium text-body-secondary">
            Title
            <input
              value={draft.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="mt-1 w-full rounded-lg border border-border-gray bg-background px-3 py-2 text-sm text-ink"
            />
          </label>
          <label className="block text-xs font-medium text-body-secondary">
            Subtitle
            <input
              value={draft.subtitle ?? ''}
              onChange={(e) => updateField('subtitle', e.target.value)}
              className="mt-1 w-full rounded-lg border border-border-gray bg-background px-3 py-2 text-sm text-ink"
            />
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <label className="block text-xs font-medium text-body-secondary">
              7-day (₦)
              <input
                type="number"
                min={1}
                value={draft.price_7_days}
                onChange={(e) => updateField('price_7_days', Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-border-gray bg-background px-3 py-2 text-sm text-ink"
              />
            </label>
            <label className="block text-xs font-medium text-body-secondary">
              14-day (₦)
              <input
                type="number"
                min={1}
                value={draft.price_14_days}
                onChange={(e) => updateField('price_14_days', Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-border-gray bg-background px-3 py-2 text-sm text-ink"
              />
            </label>
            <label className="block text-xs font-medium text-body-secondary">
              30-day (₦)
              <input
                type="number"
                min={1}
                value={draft.price_30_days}
                onChange={(e) => updateField('price_30_days', Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-border-gray bg-background px-3 py-2 text-sm text-ink"
              />
            </label>
          </div>
          <label className="block text-xs font-medium text-body-secondary">
            Slots in LGA
            <input
              type="number"
              min={1}
              max={20}
              value={draft.slots_count}
              onChange={(e) => updateField('slots_count', Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-border-gray bg-background px-3 py-2 text-sm text-ink"
            />
          </label>
          <label className="block text-xs font-medium text-body-secondary">
            Slot note
            <input
              value={draft.slot_note ?? ''}
              onChange={(e) => updateField('slot_note', e.target.value)}
              className="mt-1 w-full rounded-lg border border-border-gray bg-background px-3 py-2 text-sm text-ink"
            />
          </label>
          <label className="block text-xs font-medium text-body-secondary">
            CTA label
            <input
              value={draft.cta_text}
              onChange={(e) => updateField('cta_text', e.target.value)}
              className="mt-1 w-full rounded-lg border border-border-gray bg-background px-3 py-2 text-sm text-ink"
            />
          </label>
          <label className="block text-xs font-medium text-body-secondary">
            Badge (optional)
            <input
              value={draft.badge ?? ''}
              onChange={(e) => updateField('badge', e.target.value || null)}
              className="mt-1 w-full rounded-lg border border-border-gray bg-background px-3 py-2 text-sm text-ink"
            />
          </label>

          <div className="rounded-lg border border-border-gray bg-muted/40 p-3">
            <p className="mb-2 text-xs font-semibold text-body-secondary">Features (read-only)</p>
            <p className="mb-2 text-[11px] text-chat-meta">From seeder — cannot edit or add new items.</p>
            <ul className="space-y-1.5">
              {lockedFeatures.map((feature, index) => (
                <li key={`${plan.plan_key}-seed-${index}`} className="flex items-start gap-2 text-xs text-ink">
                  <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border-gray px-4 py-2 text-sm font-semibold text-ink hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => void handleSave()}
            className="inline-flex items-center gap-2 rounded-lg bg-chat-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : null}
            Save plan
          </button>
        </div>
      </div>
    </div>
  );
}
