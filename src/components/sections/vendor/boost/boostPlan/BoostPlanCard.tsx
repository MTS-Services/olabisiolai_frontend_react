import { useNavigate } from "react-router-dom";
import { CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type Plan } from "./boostPlanData";

export function BoostPlanCard({ plan }: { plan: Plan }) {
  const navigate = useNavigate();
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-border/60",
        plan.tone === "soft" && "bg-slate-50",
        plan.highlighted && "border-brand-red/50",
      )}
    >
      {plan.highlighted ? (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-md bg-brand-red px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          Most Popular
        </div>
      ) : null}
      <CardContent className="space-y-4 p-8">
        <div className={cn("inline-flex rounded-lg p-2", plan.highlighted ? "bg-brand-red text-white" : "bg-muted text-brand-red")}>
          <plan.icon className="size-5" />
        </div>

        <div>
          <p className="text-2xl font-bold font-manrope">{plan.title}</p>
          <p className="mt-1 text-sm font-inter font-medium text-muted-foreground">{plan.subtitle}</p>
        </div>

        <p className="text-5xl font-bold leading-none tracking-tight">
          ${plan.price}
          <span className="ml-1 text-sm font-medium text-muted-foreground">/ {plan.duration}</span>
        </p>

        <div className="space-y-2">
          {plan.features.map((feature) => (
            <p key={feature} className="flex items-center gap-3 text-sm font-inter font-medium text-foreground">
              <CircleCheck className="size-5 text-brand-red" />
              {feature}
            </p>
          ))}
        </div>

        <Button
          onClick={() => navigate(`/vendor/boost/configure?plan=${plan.id}`)}
          variant={plan.highlighted ? "default" : "outline"}
          className={cn(
            "mt-2 w-full py-6 text-base font-inter font-semibold",
            plan.highlighted && "bg-brand-red text-white hover:bg-brand-red/90",
            plan.tone === "soft" &&
              !plan.highlighted &&
              "bg-blue-100 text-foreground hover:bg-blue-100/80 py-6 text-base font-inter font-semibold",
          )}
        >
          {plan.cta}
        </Button>
      </CardContent>
    </Card>
  );
}
