import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const boosts = [
  {
    title: "Victoria Island Focus",
    meta: "12 Days remaining",
    metaClass: "text-muted-foreground",
    border: "border-l-amber-500",
  },
  {
    title: "Ikoyi Search Dominance",
    meta: "5 Days remaining",
    metaClass: "text-muted-foreground",
    border: "border-l-slate-400",
  },
  {
    title: "Lekki Wide Awareness",
    meta: "2 Days expiring soon",
    metaClass: "text-brand-red font-semibold",
    border: "border-l-amber-800",
  },
] as const;

export function ActiveBoostsCard() {
  return (
    <Card className="rounded-2xl border-border-light bg-card shadow-sm">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b border-border-light px-6 py-5 md:px-8">
          <h3 className="text-xl font-bold text-foreground font-manrope">Active boosts</h3>
          <Link
            to="/vendor/boost"
            className="text-sm font-semibold text-primary hover:underline font-inter"
          >
            Manage all
          </Link>
        </div>
        <ul className="divide-y divide-border-light px-6 py-2 md:px-8">
          {boosts.map((b) => (
            <li
              key={b.title}
              className={cn("border-l-4 py-4 pl-4", b.border)}
            >
              <p className="font-semibold text-foreground font-manrope">{b.title}</p>
              <p className={cn("mt-1 text-xs uppercase tracking-wide font-inter", b.metaClass)}>{b.meta}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
