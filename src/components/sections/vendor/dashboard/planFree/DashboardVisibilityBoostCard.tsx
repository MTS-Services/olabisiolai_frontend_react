import { Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DashboardVisibilityBoostCard() {
  return (
    <Card>
      <div className="space-y-3 p-8">
        <div className="flex items-center gap-2">
          <Zap className="text-brand-red" />
          <p className="font-inter text-sm font-bold text-brand-red">Authority Boost</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground font-manrope">Visibility Boost</h2>
        </div>
        <Badge variant="outline" className="text-[10px] uppercase">
          Inactive
        </Badge>
        <p className="text-sm text-muted-foreground">Boosted vendors appear 5x more often in search results.</p>
        <Button size="sm" className="bg-sky-600 text-white hover:bg-sky-600/90">
          Explore Boosts
        </Button>
      </div>
    </Card>
  );
}
