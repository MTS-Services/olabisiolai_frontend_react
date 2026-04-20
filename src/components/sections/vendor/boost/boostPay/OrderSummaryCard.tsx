import { Lock, PlugZap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function OrderSummaryCard() {
  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <p className="text-2xl font-semibold">Order Summary</p>

        <div className="inline-flex items-center gap-3">
          <div className="rounded-md bg-brand-red p-2 text-success-foreground">
            <PlugZap className="size-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Plan Selected</p>
            <p className="text-base font-semibold">Visibility Pro Plus</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-y py-3 text-sm">
          <div>
            <p className="text-xs uppercase text-muted-foreground">Duration</p>
            <p className="font-semibold">30 Days</p>
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground">Target Areas</p>
            <p className="font-semibold">Lagos Metro, Abuja</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₦4,650.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Processing Fee</span>
            <span>₦350.00</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-lg font-semibold">Total Price</span>
          <span className="text-4xl font-bold text-brand-red">₦5,000.00</span>
        </div>

        <Button className="w-full bg-brand-red text-white hover:bg-brand-red/90">
          <Lock className="size-4" />
          Confirm & Pay
        </Button>

        <p className="text-center text-[10px] uppercase tracking-wide text-muted-foreground">
          SSL Encrypted & PCI-DSS Compliant
        </p>
      </CardContent>
    </Card>
  );
}
