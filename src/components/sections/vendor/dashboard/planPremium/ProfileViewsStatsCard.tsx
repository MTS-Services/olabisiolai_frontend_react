import { Eye } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function ProfileViewsStatsCard() {
  return (
    <Card className="rounded-2xl border-border-light bg-card shadow-sm">
      <CardContent className="space-y-4 p-6 md:p-8">
        <div className="flex items-start justify-between gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Eye className="size-5" aria-hidden />
          </div>
          <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">+8%</span>
        </div>
        <div>
          <p className="text-3xl font-bold tracking-tight text-foreground font-manrope">42.5k</p>
          <p className="text-sm text-muted-foreground font-inter">Profile views</p>
        </div>
         <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-emerald-100 transition-all duration-500"
           
          />
        </div>
      </CardContent>
    </Card>
  );
}
