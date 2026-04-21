import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type VendorPlan = "free" | "premium";

export function CurrentPlanCard({ plan }: { plan: VendorPlan }) {
  const isPremium = plan === "premium";
  
  return (
    <Card className="relative rounded-xl border-border-light shadow-sm">
      <Badge 
        className="absolute -left-3 -top-3 uppercase font-semibold text-primary-foreground hover:bg-primary py-1 px-8 text-base! z-50! bg-[#005E8D]"
      >
        {isPremium ? "Premium" : "Free"}
      </Badge>
      <CardContent className="px-6 pb-6 pt-14">
        <div className="flex gap-4">
          <div className="mb-3 flex size-14 items-center justify-center rounded-xl bg-[#FF6B35]/10 bg-tint-red text-brand-red">
            <Award className="size-7" aria-hidden />
          </div>
          <div className="">
            <p className="text-sm text-muted-foreground font-inter">
              Current Plan
            </p>
            <p className="text-xl font-bold text-foreground font-manrope">
              Curator Platinum
            </p>
          </div>
        </div>
        <Button
          type="button"
          className="mt-6 w-full bg-sky-100 font-inter font-semibold text-foreground shadow-none hover:bg-sky-100/80"
        >
          Manage subscription
        </Button>
      </CardContent>
    </Card>
  );
}
