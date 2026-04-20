import { Card, CardContent } from "@/components/ui/card";
import { benefitItems } from "./boostPlanData";

export function BoostPlanBenefits() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {benefitItems.map((item, idx) => (
        <Card key={idx} className="border-border/60 bg-card">
          <CardContent className="space-y-3 p-6">
            <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
              <item.icon className="size-6" />
            </div>
            <div>
              <p className="text-lg font-bold font-manrope text-foreground">{item.title}</p>
              <p className="mt-1 text-sm font-inter font-medium text-muted-foreground">{item.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
