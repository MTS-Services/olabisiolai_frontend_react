import type { LucideIcon } from "lucide-react";
import { ChevronRight, Eye, MessageCircle, Star } from "lucide-react";

import { Card } from "@/components/ui/card";

type ActivityItem = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

const recentActivities: ActivityItem[] = [
  { title: "Profile viewed by a potential buyer", subtitle: "20 minutes ago", icon: Eye },
  { title: "New inquiry about your listing", subtitle: "2 hours ago", icon: MessageCircle },
  { title: "5-star review published on your profile", subtitle: "Yesterday", icon: Star },
];

export function DashboardRecentActivityCard() {
  return (
    <Card className="flex flex-col overflow-hidden rounded-xl border-border-light shadow-sm">
      <div className="border-b border-border px-6 pb-4 pt-6 md:px-8 md:pb-5 md:pt-8">
        <h3 className="text-xl font-bold text-foreground font-manrope">Recent Activity</h3>
      </div>
      <div className="flex-1 divide-y divide-border">
        {recentActivities.map((activity) => {
          const ActivityIcon = activity.icon;
          return (
            <button
              key={activity.title}
              type="button"
              className="flex w-full items-center gap-3 px-6 py-3.5 text-left transition-colors hover:bg-muted/40 md:px-8 md:py-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center text-brand-red">
                <ActivityIcon className="size-5 shrink-0" strokeWidth={2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
              </div>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            </button>
          );
        })}
      </div>
      <div className="border-t border-border bg-indigo-50/90 px-4 py-3 dark:bg-indigo-950/40">
        <p className="text-center text-[10px] font-semibold uppercase tracking-wide text-foreground">
          Showing last 3 activities
        </p>
      </div>
    </Card>
  );
}
