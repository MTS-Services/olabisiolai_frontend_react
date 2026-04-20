import { BadgeCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DashboardVerificationCard() {
  return (
    <Card>
      <div className="space-y-3 p-8">
        <div>
          <h2 className="text-xl font-bold text-foreground font-manrope">Verification Status</h2>
        </div>
        <div className="space-y-3">
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            <BadgeCheck className="mr-1 size-3.5" />
            In Review
          </Badge>
          <div className="max-w-xl">
            <p>
              Our curation team is currently reviewing your licensing and identity documents. This typically takes
              24-48 hours.
            </p>
          </div>

          <Button variant="outline" size="sm" className="w-full font-inter text-base font-bold">
            View Status
          </Button>
        </div>
      </div>
    </Card>
  );
}
