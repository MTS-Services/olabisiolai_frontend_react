import { MessageCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sparkHeights = [35, 50, 42, 68, 55, 48, 72, 60, 45, 80, 52, 58];

export function EnquiriesStatsCard() {
  return (
    <Card className="rounded-2xl border-border-light bg-card shadow-sm">
      <CardContent className="space-y-4 p-6 md:p-8">
        <div className="flex items-start justify-between gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
            <MessageCircle className="size-5" aria-hidden />
          </div>
          <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">+12%</span>
        </div>
        <div>
          <p className="text-3xl font-bold tracking-tight text-foreground font-manrope">1,284</p>
          <p className="text-sm text-muted-foreground font-inter">Total enquiries</p>
        </div>
        <div className="flex h-10 items-end gap-0.5 pt-2">
          {sparkHeights.map((h, i) => (
            <div
              key={i}
              className={cn("flex-1 rounded-sm bg-brand-red/35")}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
