import { cn } from "@/lib/utils";

export function BoostPlanHeader({
  mode,
  onChange,
}: {
  mode: "one-time" | "subscription";
  onChange: (mode: "one-time" | "subscription") => void;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-4xl font-extrabold font-manrope tracking-tight text-foreground mb-4">
          Boost Your Business Visibility
        </h2>
        <p className="max-w-2xl text-xl font-inter font-medium text-muted-foreground">
          Choose a plan to reach more customers in your area and grow your sales volume.
        </p>
      </div>
      <div className="inline-flex rounded-2xl border bg-background p-1">
        <button
          type="button"
          onClick={() => onChange("one-time")}
          className={cn(
            "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
            mode === "one-time" ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          One-time Boost
        </button>
        <button
          type="button"
          onClick={() => onChange("subscription")}
          className={cn(
            "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
            mode === "subscription" ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          Subscription
        </button>
      </div>
    </div>
  );
}
