import { lazy } from "react";
import { Outlet, type RouteObject } from "react-router-dom";

import { RoleGate } from "@/routes/RoleGate";
import { suspensePage } from "@/routes/routeUtils";

const VendorDashboard = lazy(() => import("@/pages/vendor/VendorDashboard"));

/** Authenticated `vendor` role area. */
export const vendorRoutes: RouteObject = {
  element: (
    <RoleGate allow="vendor" fallback="/unauthorized">
      <Outlet />
    </RoleGate>
  ),
  children: [{ path: "/vendor/dashboard", element: suspensePage(VendorDashboard) }],
};
