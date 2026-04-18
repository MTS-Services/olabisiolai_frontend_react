import { Link, NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import { isActivePath } from "@/lib/nav.utils";
import { useActiveUrl } from "@/hooks/useActiveUrl";
import { Button } from "@/components/ui/button";

const items = [
  { to: "/vendor/dashboard", label: "Dashboard", end: true },
  { to: "/vendor/profile", label: "Profile" },
  { to: "/vendor/leads", label: "Leads" },
  { to: "/vendor/verification", label: "Verification" },
  { to: "/vendor/boost", label: "Boost" },
  { to: "/vendor/analytics", label: "Analytics" },
  { to: "/vendor/reviews", label: "Reviews" },
  { to: "/vendor/payments", label: "Payments" },
  { to: "/vendor/settings", label: "Settings" },
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
    <aside className="relative">
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        role="presentation"
      />
      <div
        className={cn(
          "z-50 bg-card pt-3 flex flex-col",
          "fixed left-4 top-16 w-[min(260px,calc(100vw-2rem))] h-[calc(100dvh-4rem)] transition-transform",
          "md:sticky md:top-0 md:h-dvh md:translate-x-0 md:w-auto",
          open ? "translate-x-0" : "-translate-x-[120%] md:translate-x-0",
        )}
      >
        <div className="mb-3 flex items-center justify-between md:hidden">
          <div className="text-sm font-medium">Vendor</div>
          <button
            className="text-sm text-muted-foreground"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        <Link to="/" className="text-center">
          <h2 className="text-xl font-extrabold text-vendor-header font-manrope">
            Gidira Vendor
          </h2>
          <p className="text-sm text-vendor-header font-inter font-normal">
            Verified Merchant
          </p>
        </Link>

        <nav className="grid gap-1 p-4">
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              end={i.end}
              className={() =>
                cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  isActivePath(pathname, i.to, Boolean(i.end))
                    ? "bg-accent text-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )
              }
            >
              {i.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <Button className="w-full" variant="outline">
            Bottom Action
          </Button>
        </div>
      </div>
    </aside>
  );
}
