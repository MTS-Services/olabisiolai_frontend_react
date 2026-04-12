import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

const Home = lazy(() => import("@/pages/frontend/Home"));
const Cart = lazy(() => import("@/pages/frontend/Cart"));
const NotFound = lazy(() => import("@/pages/frontend/NotFound"));
const Unauthorized = lazy(() => import("@/pages/frontend/Unauthorized"));

const Login = lazy(() => import("@/pages/frontend/auth/Login"));

const UserDashboard = lazy(() => import("@/pages/user/UserDashboard"));
const Account = lazy(() => import("@/pages/frontend/Account"));

const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminOrders = lazy(() => import("@/pages/admin/AdminOrders"));
const AdminProducts = lazy(() => import("@/pages/admin/AdminProducts"));

import { FrontendLayout } from "@/layouts/frontend/FrontendLayout";
import { AuthLayout } from "@/layouts/auth/AuthLayout";
import { AdminLayout } from "@/layouts/admin/AdminLayout";

import { RoleGate } from "@/routes/RoleGate";
import { GuestGate } from "@/routes/GuestGate";

const About = lazy(() => import("@/pages/frontend/About"));
const Contact = lazy(() => import("@/pages/frontend/Contact"));
const Faq = lazy(() => import("@/pages/frontend/Faq"));
const Filters = lazy(() => import("@/pages/frontend/Filters"));
const Trend = lazy(() => import("@/pages/frontend/Trend"));
const Service = lazy(() => import("@/pages/frontend/Service"));
const DirectMessage = lazy(() => import("@/pages/frontend/DirectMessage"));
const GiveReview = lazy(() => import("@/pages/frontend/GiveReview"));

const pageFallback = (
  <div className="flex min-h-dvh items-center justify-center text-sm text-muted-foreground">
    Loading…
  </div>
);

function suspensePage(Comp: LazyExoticComponent<ComponentType>) {
  return (
    <Suspense fallback={pageFallback}>
      <Comp />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <FrontendLayout />,
    children: [
      { path: '/', element: suspensePage(Home) },
      { path: '/cart', element: suspensePage(Cart) },
      { path: '/filters', element: suspensePage(Filters) },
      { path: '/trend', element: suspensePage(Trend) },
      { path: '/service', element: suspensePage(Service) },
      { path: '/messages', element: suspensePage(DirectMessage) },
      { path: '/reviews', element: suspensePage(GiveReview) },
      { path: '/about', element: suspensePage(About) },
      { path: '/contact', element: suspensePage(Contact) },
      { path: '/faq', element: suspensePage(Faq) },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: (
          <GuestGate>
            {suspensePage(Login)}
          </GuestGate>
        ),
      },
      {
        path: '/admin/login',
        element: (
          <GuestGate>
            {suspensePage(AdminLogin)}
          </GuestGate>
        ),
      },
    ],
  },
  {
    path: '/unauthorized',
    element: suspensePage(Unauthorized),
  },
  {
    element: (
      <RoleGate allow={['user', 'buyer']} fallback="/unauthorized">
        <Outlet />
      </RoleGate>
    ),
    children: [
      { path: '/dashboard', element: suspensePage(UserDashboard) },
      { path: '/account', element: suspensePage(Account) },
    ],
  },
  {
    element: (
      <RoleGate allow="admin" fallback="/admin/login">
        <AdminLayout />
      </RoleGate>
    ),
    children: [
      { path: '/admin', element: suspensePage(AdminDashboard) },
      { path: '/admin/users', element: suspensePage(AdminUsers) },
      { path: '/admin/orders', element: suspensePage(AdminOrders) },
      { path: '/admin/products', element: suspensePage(AdminProducts) },
    ],
  },
  {
    path: '*',
    element: suspensePage(NotFound),
  },

  // Single
  // {
  //   path: '/',
  //   element: <Home />,
  // }

  // Layout Grouping
  // {
  //   element: <FrontendLayout />,
  //   children: [
  //     {
  //       path: '/',
  //       element: <Home />,
  //     },
  //     {
  //       path: '/cart',
  //       element: <Cart />,
  //     },
  //     {
  //       path: '/filters',
  //       element: <Filters />,
  //     },
  //   ]
  // }

  // Protected Route Grouping
  // {
  //   element: (
  //     <ProtectedRoute>
  //       <AdminLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     {
  //       path: "/admin",
  //       element: <AdminDashboard />,
  //     },
  //     {
  //       path: "/admin/users",
  //       element: <AdminUsers />,
  //     },
  //   ],
  // },

  // Role Based Route Protection
  // {
  //   element: (
  //     <RoleGate allow={['admin', 'seller']} fallback="/admin/login">
  //       <AdminLayout />
  //     </RoleGate>
  //   ),
  //   children: [
  //     {
  //       path: "/admin",
  //       element: <AdminDashboard />,
  //     },
  //     {
  //       path: "/admin/users",
  //       element: <AdminUsers />,
  //     },
  //   ],
  // }

  // Guest Route Protection
  // {
  //   element: (
  //     <GuestGate>
  //       <AuthLayout />
  //     </GuestGate>
  //   ),
  //   children: [
  //     {
  //       path: "/login",
  //       element: <Login />,
  //     },
  //   ],
  // },
]);
