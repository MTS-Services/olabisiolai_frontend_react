import { createBrowserRouter, Outlet } from "react-router-dom";

import Home from "@/pages/frontend/Home";
import Cart from "@/pages/frontend/Cart";
import NotFound from "@/pages/frontend/NotFound";
import Unauthorized from "@/pages/frontend/Unauthorized";

import Login from "@/pages/frontend/auth/Login";

import UserDashboard from "@/pages/user/UserDashboard";
import Account from "@/pages/frontend/Account";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminProducts from "@/pages/admin/AdminProducts";

import { FrontendLayout } from "@/layouts/frontend/FrontendLayout";
import { AuthLayout } from "@/layouts/auth/AuthLayout";
import { AdminLayout } from "@/layouts/admin/AdminLayout";

import { RoleGate } from "@/routes/RoleGate";
import { GuestGate } from "@/routes/GuestGate";
import Filters from "@/pages/frontend/Filters";
import Trend from "@/pages/frontend/Trend";
import Service from "@/pages/frontend/Service";
import DirectMessage from "@/pages/frontend/DirectMessage";
import GiveReview from "@/pages/frontend/GiveReview";

export const router = createBrowserRouter([
  {
    element: <FrontendLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/cart', element: <Cart /> },
      { path: '/filters', element: <Filters /> },
      { path: '/trend', element: <Trend /> },
      { path: '/service', element: <Service /> },
      { path: '/messages', element: <DirectMessage /> },
      { path: '/reviews', element: <GiveReview /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: (
          <GuestGate>
            <Login />
          </GuestGate>
        ),
      },
      {
        path: '/admin/login',
        element: (
          <GuestGate>
            <AdminLogin />
          </GuestGate>
        ),
      },
    ],
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    element: (
      <RoleGate allow={['user', 'buyer']} fallback="/unauthorized">
        <Outlet />
      </RoleGate>
    ),
    children: [
      { path: '/dashboard', element: <UserDashboard /> },
      { path: '/account', element: <Account /> },
    ],
  },
  {
    element: (
      <RoleGate allow="admin" fallback="/admin/login">
        <AdminLayout />
      </RoleGate>
    ),
    children: [
      { path: '/admin', element: <AdminDashboard /> },
      { path: '/admin/users', element: <AdminUsers /> },
      { path: '/admin/orders', element: <AdminOrders /> },
      { path: '/admin/products', element: <AdminProducts /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
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
