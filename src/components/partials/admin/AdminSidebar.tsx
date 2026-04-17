import {
  Bell,
  Building2,
  CircleDollarSign,
  ClipboardCheck,
  Gauge,
  ListChecks,
  MapPin,
  ShieldCheck,
  Star,
  Tags,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

type SidebarItem = {
  label: string;
  icon: ComponentType<{ className?: string }>;
};

const items: SidebarItem[] = [
  { label: "Dashboard", icon: Gauge },
  { label: "Users", icon: Users },
  { label: "Businesses", icon: Building2 },
  { label: "Verifications", icon: ClipboardCheck },
  { label: "Leads", icon: ListChecks },
  { label: "Reviews", icon: Star },
  { label: "Payments", icon: CircleDollarSign },
  { label: "Boost System", icon: Wrench },
  { label: "Categories", icon: Tags },
  { label: "Career", icon: UserRound },
  { label: "Locations", icon: MapPin },
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: ShieldCheck },
];

export function AdminSidebar() {
  return (
    <aside className="sticky top-20 h-[calc(100vh-5rem)] w-64 shrink-0 overflow-y-auto border-r border-chat-border-subtle bg-card">
      <div className="px-4 pb-6 pt-4">
        <p className="text-lg font-semibold text-ink-heading">Dashboard</p>
        <p className="text-xs text-chat-meta">Manage your account</p>
      </div>

      <nav className="space-y-1 px-2 pb-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.label === "Dashboard";
          return (
            <Link
              key={item.label}
              to="/admin/dashboard"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-surface-soft text-chat-accent" : "text-body-secondary hover:bg-muted",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
