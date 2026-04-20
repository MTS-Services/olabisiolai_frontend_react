import { Crown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { StatPill } from "./StatPill";

export function DashboardAnalyticsCard() {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-5 md:p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Analytics Overview</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatPill value="1,249" label="Profile Views" />
          <StatPill value="342" label="Lead Clicks" />
          <StatPill value="4.8" label="Rating" />
          <StatPill value="2.3%" label="Conversion" />
        </div>
        <div className="absolute inset-x-4 bottom-4 top-4 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-[2px]">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-lg font-semibold text-foreground">
              <Crown className="size-5 text-brand-red" />
              Upgrade to Premium
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Unlock analytics, competitor tracking, and priority placement.
            </p>
            <Button className="mt-3 bg-brand-red text-white hover:bg-brand-red/90">Get Premium Access</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
