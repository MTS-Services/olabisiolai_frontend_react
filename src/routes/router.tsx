import { createBrowserRouter, Outlet } from "react-router-dom";

import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";

import Login from "@/pages/Login";

import UserDashboard from "@/pages/user/UserDashboard";
import Account from "@/pages/Account";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminProducts from "@/pages/admin/AdminProducts";

import { FrontendLayout } from "@/layouts/frontend/FrontendLayout";
import { AuthLayout } from "@/layouts/auth/AuthLayout";
import { AdminLayout } from "@/layouts/admin/AdminLayout";

import { RoleGate } from "@/routes/RoleGate";
import { GuestGate } from "@/routes/GuestGate";
import Filters from "@/pages/Filters";

export const router = createBrowserRouter([
  {
    element: <FrontendLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/cart', element: <Cart /> },
      { path: '/filters', element: <Filters /> },
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
      <RoleGate allow="admin" fallback="/login">
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
