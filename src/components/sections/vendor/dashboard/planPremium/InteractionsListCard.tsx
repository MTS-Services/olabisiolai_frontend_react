import { Globe, MessageCircle, Phone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const rows = [
  { icon: Phone, label: "Calls", count: "482" },
  { icon: MessageCircle, label: "WhatsApp", count: "924" },
  { icon: Globe, label: "Website", count: "1,120" },
] as const;

export function InteractionsListCard() {
  return (
    <Card className="rounded-2xl border-border-light bg-card shadow-sm">
      <CardContent className="space-y-4 p-6 md:p-8">
        <h3 className="text-lg font-bold text-foreground font-manrope">Interactions</h3>
        <ul className="space-y-3">
          {rows.map(({ icon: Icon, label, count }) => (
            <li key={label} className="flex items-center justify-between gap-3 border-b border-border-light pb-3 last:border-0 last:pb-0">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground font-inter">
                <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                {label}
              </span>
              <span className="text-sm font-semibold tabular-nums text-foreground">{count}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
