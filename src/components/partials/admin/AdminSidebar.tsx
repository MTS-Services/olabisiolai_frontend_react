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
import { NavLink } from "react-router-dom";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

type SidebarItem = {
  label: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
};

const items: SidebarItem[] = [
  { label: "Dashboard", to: "/admin/dashboard", icon: Gauge },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Businesses", to: "/admin/dashboard", icon: Building2 },
  { label: "Verifications", to: "/admin/dashboard", icon: ClipboardCheck },
  { label: "Leads", to: "/admin/dashboard", icon: ListChecks },
  { label: "Reviews", to: "/admin/dashboard", icon: Star },
  { label: "Payments", to: "/admin/dashboard", icon: CircleDollarSign },
  { label: "Boost System", to: "/admin/dashboard", icon: Wrench },
  { label: "Categories", to: "/admin/dashboard", icon: Tags },
  { label: "Career", to: "/admin/dashboard", icon: UserRound },
  { label: "Locations", to: "/admin/dashboard", icon: MapPin },
  { label: "Notifications", to: "/admin/dashboard", icon: Bell },
  { label: "Settings", to: "/admin/dashboard", icon: ShieldCheck },
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
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-surface-soft text-chat-accent" : "text-body-secondary hover:bg-muted",
                )
              }
            >
              <Icon className="size-4" aria-hidden />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
