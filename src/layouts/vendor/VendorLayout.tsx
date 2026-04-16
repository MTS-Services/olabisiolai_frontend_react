import { Outlet } from "react-router-dom";

import { cn } from "@/lib/utils";
import { useNav } from "@/hooks/useNav";
import { VendorHeader } from "@/components/partials/vendor/VendorHeader";
import { VendorSidebar } from "@/components/partials/vendor/VendorSidebar";

export function VendorLayout() {
  const nav = useNav();

  return (
    <div className="min-h-dvh bg-vendor-body-bg">
      <div className={cn("grid grid-cols-1 md:grid-cols-[260px_1fr]")}>
        <VendorSidebar open={nav.open} onClose={nav.close} />
        <main className="min-w-0">
          <VendorHeader />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
