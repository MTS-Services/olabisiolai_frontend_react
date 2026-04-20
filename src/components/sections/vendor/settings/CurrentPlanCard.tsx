import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CurrentPlanCard() {
  return (
    <Card className="relative overflow-hidden rounded-xl border-border-light shadow-sm">
      <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground hover:bg-primary">
        Free
      </Badge>
      <CardContent className="flex flex-col items-center px-6 pb-6 pt-14 text-center">
        <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-tint-red text-brand-red">
          <Award className="size-7" aria-hidden />
        </div>
        <p className="text-sm text-muted-foreground font-inter">Current plan</p>
        <p className="text-xl font-bold text-foreground font-manrope">Default</p>
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
