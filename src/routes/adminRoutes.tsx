import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";

import { AdminLayout } from "@/layouts/admin/AdminLayout";
import { RoleGate } from "@/routes/RoleGate";
import { suspensePage } from "@/routes/routeUtils";

const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const Users = lazy(() => import("@/pages/admin/Users"));
const Businesses = lazy(() => import("@/pages/admin/Businesses"));
const Categories = lazy(() => import("@/pages/admin/Categories"));
const Verifications = lazy(() => import("@/pages/admin/Verifications"));
const Leads = lazy(() => import("@/pages/admin/Leads"));
const Reviews = lazy(() => import("@/pages/admin/Reviews"));
const Payments = lazy(() => import("@/pages/admin/Payments"));
const BoostSystem = lazy(() => import("@/pages/admin/BoostSystem"));

/** Authenticated `admin` role area (admin shell + nested admin pages). */
export const adminRoutes: RouteObject = {
  element: (
    <RoleGate allow="admin" fallback="/admin/login">
      <AdminLayout />
    </RoleGate>
  ),
  children: [
    { path: "/admin", element: <Navigate to="/admin/dashboard" replace /> },
    { path: "/admin/dashboard", element: suspensePage(Dashboard) },
    { path: "/admin/users", element: suspensePage(Users) },
    { path: "/admin/businesses", element: suspensePage(Businesses) },
    { path: "/admin/categories", element: suspensePage(Categories) },
    { path: "/admin/verifications", element: suspensePage(Verifications) },
    { path: "/admin/leads", element: suspensePage(Leads) },
    { path: "/admin/reviews", element: suspensePage(Reviews) },
    { path: "/admin/payments", element: suspensePage(Payments) },
    { path: "/admin/boost-system", element: suspensePage(BoostSystem) },
  ],
};
