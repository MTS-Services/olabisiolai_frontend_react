import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";

import { AdminLayout } from "@/layouts/admin/AdminLayout";
import { RoleGate } from "@/routes/RoleGate";
import { suspensePage } from "@/routes/routeUtils";

const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const Users = lazy(() => import("@/pages/admin/Users"));
const Businesses = lazy(() => import("@/pages/admin/Businesses"));
const Categories = lazy(() => import("@/pages/admin/Categories"));
const Career = lazy(() => import("@/pages/admin/Career"));
const CareerEdit = lazy(() => import("@/pages/admin/CareerEdit"));
const Locations = lazy(() => import("@/pages/admin/Locations"));
const Settings = lazy(() => import("@/pages/admin/Settings"));
const Notifications = lazy(() => import("@/pages/admin/Notifications"));
const Verifications = lazy(() => import("@/pages/admin/Verifications"));
const Leads = lazy(() => import("@/pages/admin/Leads"));
const Reviews = lazy(() => import("@/pages/admin/Reviews"));
const Payments = lazy(() => import("@/pages/admin/Payments"));
const BoostSystem = lazy(() => import("@/pages/admin/BoostSystem"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const AdminAccounts = lazy(() => import("@/pages/admin/AdminAccounts"));

/**
 * User-management URLs mirror `blogging_rasta_laravel` `routes/admin.php`:
 * - `/admin/user-management/admin` — administrator accounts
 * - `/admin/user-management/user` — site users (vendors, customers, etc.)
 * - `/admin/user-management/roles` — Spatie roles & permissions (API-backed SPA)
 */
export const adminRoutes: RouteObject = {
  element: (
    <RoleGate allow="admin" fallback="/admin/login">
      <AdminLayout />
    </RoleGate>
  ),
  children: [
    { path: "/admin", element: <Navigate to="/admin/dashboard" replace /> },
    { path: "/admin/dashboard", element: suspensePage(Dashboard) },
    { path: "/admin/user-management", element: <Navigate to="/admin/user-management/roles" replace /> },
    { path: "/admin/user-management/admin", element: suspensePage(AdminAccounts) },
    { path: "/admin/user-management/user", element: suspensePage(Users) },
    { path: "/admin/user-management/roles", element: suspensePage(UserManagement) },
    { path: "/admin/users", element: <Navigate to="/admin/user-management/user" replace /> },
    { path: "/admin/businesses", element: suspensePage(Businesses) },
    { path: "/admin/categories", element: suspensePage(Categories) },
    { path: "/admin/career", element: suspensePage(Career) },
    { path: "/admin/career/add", element: suspensePage(CareerEdit) },
    { path: "/admin/career/edit/:id", element: suspensePage(CareerEdit) },
    { path: "/admin/settings", element: suspensePage(Settings) },
    { path: "/admin/locations", element: suspensePage(Locations) },
    { path: "/admin/notifications", element: suspensePage(Notifications) },
    { path: "/admin/verifications", element: suspensePage(Verifications) },
    { path: "/admin/leads", element: suspensePage(Leads) },
    { path: "/admin/reviews", element: suspensePage(Reviews) },
    { path: "/admin/payments", element: suspensePage(Payments) },
    { path: "/admin/boost-system", element: suspensePage(BoostSystem) },
  ],
};
