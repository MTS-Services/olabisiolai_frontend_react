import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const items = [
  { dot: "bg-brand-red", text: "New enquiry for “Luxury 3-bed in VI”" },
  { dot: "bg-primary", text: "Profile viewed by a verified buyer" },
  { dot: "bg-brand-red", text: "Boost expiring in 48 hours — renew to stay on top" },
  { dot: "bg-primary", text: "WhatsApp message from lead in Lekki" },
] as const;

export function PremiumRecentActivity() {
  return (
    <Card className="rounded-2xl border-border-light bg-card shadow-sm">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b border-border-light px-6 py-5 md:px-8">
          <h3 className="text-xl font-bold text-foreground font-manrope">Recent activity</h3>
          <Badge className="bg-brand-red text-white hover:bg-brand-red">4 New</Badge>
        </div>
        <ul className="divide-y divide-border-light px-6 py-2 md:px-8">
          {items.map((item) => (
            <li key={item.text} className="flex gap-3 py-3.5">
              <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", item.dot)} aria-hidden />
              <p className="text-sm leading-relaxed text-foreground font-inter">{item.text}</p>
            </li>
          ))}
        </ul>
        <div className="border-t border-border-light px-6 py-4 text-center md:px-8">
          <Link
            to="/vendor/leads"
            className="text-sm font-semibold text-primary hover:underline font-inter"
          >
            View all activity
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
