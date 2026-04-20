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
  { label: "Businesses", to: "/admin/businesses", icon: Building2 },
  { label: "Verifications", to: "/admin/verifications", icon: ClipboardCheck },
  { label: "Leads", to: "/admin/leads", icon: ListChecks },
  { label: "Reviews", to: "/admin/reviews", icon: Star },
  { label: "Payments", to: "/admin/payments", icon: CircleDollarSign },
  { label: "Boost System", to: "/admin/boost-system", icon: Wrench },
  { label: "Categories", to: "/admin/categories", icon: Tags },
  { label: "Career", to: "/admin/career", icon: UserRound },
  { label: "Locations", to: "/admin/locations", icon: MapPin },
  { label: "Notifications", to: "/admin/dashboard", icon: Bell },
  { label: "Settings", to: "/admin/dashboard", icon: ShieldCheck },
];

type AdminSidebarProps = {
  mobileOpen?: boolean;
  onNavigate?: () => void;
};

export function AdminSidebar({ mobileOpen = false, onNavigate }: AdminSidebarProps) {
  return (
    <aside
      id="admin-sidebar-nav"
      className={cn(
        "flex w-[min(18rem,calc(100vw-3rem))] shrink-0 flex-col overflow-y-auto border-r border-chat-border-subtle bg-card sm:w-64",
        "fixed left-0 top-16 z-50 h-[calc(100dvh-4rem)] -translate-x-full transition-transform duration-200 ease-out sm:top-20 sm:h-[calc(100dvh-5rem)]",
        "lg:sticky lg:top-20 lg:z-auto lg:h-[calc(100dvh-5rem)] lg:translate-x-0 lg:self-start lg:shadow-none",
        mobileOpen && "translate-x-0 shadow-lg",
      )}
    >
      <div className="px-3 pb-4 pt-3 sm:px-4 sm:pb-6 sm:pt-4">
        <p className="text-base font-semibold text-ink-heading sm:text-lg">Dashboard</p>
        <p className="text-xs text-chat-meta">Manage your account</p>
      </div>

      <nav className="space-y-1 px-2 pb-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => onNavigate?.()}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-surface-soft text-chat-accent" : "text-body-secondary hover:bg-muted",
                )
              }
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
