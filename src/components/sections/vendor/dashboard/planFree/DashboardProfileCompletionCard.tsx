import { Check, Circle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DashboardProfileCompletionCard() {
  return (
    <Card>
      <div className="space-y-4 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground font-manrope sm:text-xl">Profile Completion</h2>
          <h2 className="text-lg font-bold text-brand-red font-manrope sm:text-xl">75%</h2>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-blue-100/70">
          <div className="h-full w-[75%] rounded-full bg-brand-red transition-all duration-300" />
        </div>
        <div className="grid gap-2 text-xs text-muted-foreground sm:gap-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-center gap-1.5 text-sm font-normal text-foreground font-inter sm:text-base">
              <Check className="size-3 rounded-full bg-success text-success-foreground sm:size-4" />
              Business Info
            </p>
            <p className="inline-flex items-center gap-1.5 text-sm font-normal text-foreground font-inter sm:text-base">
              <Check className="size-3 rounded-full bg-success text-success-foreground sm:size-4" />
              Verified ID
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-center gap-1.5 text-sm font-normal text-foreground font-inter sm:text-base">
              <Check className="size-3 rounded-full bg-success text-success-foreground sm:size-4" />
              Bank Linked
            </p>
            <p className="inline-flex items-center gap-1.5 text-sm font-normal text-foreground font-inter sm:text-base">
              <Circle className="size-2.5 text-muted-foreground sm:size-3.5" />
              Profile Photo
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          className="w-full bg-blue-100 py-2.5 text-sm font-semibold text-foreground font-inter hover:bg-blue-100/80 sm:py-3 sm:text-base"
        >
          Complete Next Step
        </Button>
      </div>
    </Card>
  );
}
