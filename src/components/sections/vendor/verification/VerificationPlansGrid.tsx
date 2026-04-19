import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { plans, type PlanId } from "./verificationData";
import { TierRadio } from "./TierRadio";

export function VerificationPlansGrid({
  selectedId,
  onPlanSelect,
}: {
  selectedId: PlanId;
  onPlanSelect: (id: PlanId) => void;
}) {
  return (
    <div
      className="grid gap-4 md:gap-5 lg:grid-cols-3"
      role="radiogroup"
      aria-label="Verification tier"
    >
      {plans.map((plan) => {
        const selected = selectedId === plan.id;
        const Icon = plan.icon;
        return (
          <button
            key={plan.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onPlanSelect(plan.id)}
            className={cn(
              "flex h-full flex-col rounded-2xl border border-border-light bg-card p-5 text-left shadow-sm transition-all md:p-6",
              plan.surface === "white" ? "bg-card" : "bg-[#eef2fb]",
              selected
                ? "border-brand-red ring-2 ring-brand-red/25"
                : "hover:border-neutral-300",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-red text-white shadow-sm">
                <Icon className="size-5" strokeWidth={2} aria-hidden />
              </div>
              <div className="flex flex-1 items-start justify-end gap-3">
                <p className="text-2xl font-bold leading-none tracking-tight text-slate-900 md:text-[26px]">
                  ${plan.amount}
                </p>
                <TierRadio selected={selected} />
              </div>
            </div>

            <div className="mt-5 flex-1 space-y-2">
              <h2 className="text-xl font-bold text-slate-900 font-manrope md:text-2xl">{plan.title}</h2>
              <p className="text-sm leading-relaxed text-slate-600">{plan.description}</p>
            </div>

            <div className="mt-5 space-y-2 border-t border-border-light pt-4">
              {plan.perkStyle === "badge" ? (
                plan.perks.map((perk) => (
                  <p
                    key={perk}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-vendor-header"
                  >
                    <Check className="size-4 shrink-0 text-vendor-header" strokeWidth={2.5} aria-hidden />
                    {perk}
                  </p>
                ))
              ) : (
                plan.perks.map((perk) => (
                  <p
                    key={perk}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground"
                  >
                    <Check className="size-3.5 shrink-0 text-foreground" strokeWidth={3} aria-hidden />
                    {perk}
                  </p>
                ))
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
