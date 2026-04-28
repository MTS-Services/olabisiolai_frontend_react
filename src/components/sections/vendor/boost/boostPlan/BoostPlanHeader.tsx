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
        <button className="bg-[#C2FFE0] rounded-3xl px-2 py-2 text-sm font-medium my-2">GROWTH ENGINE</button>
        <h2 className="text-4xl font-extrabold font-manrope tracking-tight text-foreground mb-4">
          Boost Your Business
        </h2>
        <p className="max-w-9xl text-md font-inter font-medium text-muted-foreground">
          Increase your visibility and reach the top of search results in your chosen LGA. Boosting helps you reach more customers, get more enquiries, and stand out from competitors in your area.
        </p>
      </div>
      <div className="inline-flex rounded-2xl border bg-background p-1">
        {/* <button
          type="button"
          onClick={() => onChange("one-time")}
          className={cn(
            "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
            mode === "one-time" ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          One-time Boost
        </button> */}
        {/* <button
          type="button"
          onClick={() => onChange("subscription")}
          className={cn(
            "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
            mode === "subscription" ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          Subscription
        </button> */}
      </div>
    </div>
  );
}
