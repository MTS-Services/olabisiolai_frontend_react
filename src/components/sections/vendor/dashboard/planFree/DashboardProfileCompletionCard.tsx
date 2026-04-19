import { Check, Circle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DashboardProfileCompletionCard() {
  return (
    <Card>
      <div className="space-y-3 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground font-manrope">Profile Completion</h2>
          <h2 className="text-xl font-bold text-brand-red font-manrope">75%</h2>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-blue-100/70">
          <div className="h-full w-[75%] rounded-full bg-brand-red" />
        </div>
        <div className="grid gap-2 text-xs text-muted-foreground">
          <p className="inline-flex items-center gap-1.5 text-base font-normal text-foreground font-inter">
            <Check className="size-4 rounded-full bg-success text-success-foreground" />
            Business Info
          </p>
          <p className="inline-flex items-center gap-1.5 text-base font-normal text-foreground font-inter">
            <Check className="size-4 rounded-full bg-success text-success-foreground" />
            Verified ID
          </p>
          <p className="inline-flex items-center gap-1.5 text-base font-normal text-foreground font-inter">
            <Check className="size-4 rounded-full bg-success text-success-foreground" />
            Bank Linked
          </p>
          <p className="inline-flex items-center gap-1.5 text-base font-normal text-foreground font-inter">
            <Circle className="size-3.5 text-muted-foreground" />
            Profile Photo
          </p>
        </div>
        <Button
          variant="secondary"
          className="w-full bg-blue-100 py-3 text-base font-semibold text-foreground font-inter hover:bg-blue-100/80"
        >
          Complete Next Step
        </Button>
      </div>
    </Card>
  );
}
