import { Link, NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import { isActivePath } from "@/lib/nav.utils";
import { useActiveUrl } from "@/hooks/useActiveUrl";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Banknote,
  BarChart2,
  LayoutGrid,
  MessageSquare,
  MessageSquareCheck,
  Rocket,
  Settings,
  User,
  X,
} from "lucide-react";

const items = [
  { to: "/vendor/dashboard", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/vendor/profile", label: "Profile", icon: User },
  { to: "/vendor/leads", label: "Leads", icon: MessageSquare },
  { to: "/vendor/verification", label: "Verification", icon: BadgeCheck },
  { to: "/vendor/boost", label: "Boost", icon: Rocket },
  { to: "/vendor/analytics", label: "Analytics", icon: BarChart2 },
  { to: "/vendor/reviews", label: "Reviews", icon: MessageSquareCheck },
  { to: "/vendor/payments", label: "Payments", icon: Banknote },
  { to: "/vendor/settings", label: "Settings", icon: Settings },
];

export function VendorSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { pathname } = useActiveUrl();

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <aside
        className={cn(
          // Mobile: fixed drawer
          "fixed top-0 left-0 z-50 h-dvh w-[260px]",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          // Desktop: sticky sidebar, always visible
          "md:static md:translate-x-0 md:h-dvh md:w-[240px] md:shrink-0",
          "flex flex-col bg-card",
        )}
      >
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between px-4 pt-4 md:hidden">
          <span className="text-sm font-medium text-muted-foreground">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="px-4 pt-6 pb-2 text-center" onClick={onClose}>
          <h2 className="text-xl font-extrabold text-vendor-header font-manrope">
            Gidira Vendor
          </h2>
          <p className="text-sm text-vendor-header font-inter font-normal">
            Verified Merchant
          </p>
        </Link>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-4 mt-2 grid gap-1 content-start">
          {items.map((i) => {
            const Icon = i.icon;
            const active = isActivePath(pathname, i.to, Boolean(i.end));

            return (
              <NavLink
                key={i.to}
                to={i.to}
                end={i.end}
                className={() =>
                  cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-base font-normal font-inter transition-all",
                    isActivePath(pathname, i.to, Boolean(i.end))
                      ? "text-base text-vendor-header font-semibold font-inter shadow-[0px_1px_2.4px_0px_rgba(0,0,0,0.24)]"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )
                }
              >
                {Icon && <Icon className="w-4 h-4 shrink-0" />}
                <span>{i.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div className="p-4">
          <div className="rounded-lg bg-[#003F87] p-4">
            <p className="text-sm font-medium text-white mb-1">
              Boost Your Listings
            </p>
            <p className="text-xs text-white/80 mb-3">
              Increase your visibility by up to 40%.
            </p>
            <Button className="w-full" variant="outline" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}