import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { VendorLayout } from "@/layouts/vendor/VendorLayout";
import { RoleGate } from "@/routes/RoleGate";
import { suspensePage } from "@/routes/routeUtils";

const VendorDashboardWrapper = lazy(() => import("@/pages/vendor/VendorDashboardWrapper"));
const VendorDashboard = lazy(() => import("@/pages/vendor/VendorDashboard"));
const VendorProfile = lazy(() => import("@/pages/vendor/VendorProfile"));
const VendorLeads = lazy(() => import("@/pages/vendor/VendorLeads"));
const VendorVerification = lazy(() => import("@/pages/vendor/VendorVerification"));
const VendorBoost = lazy(() => import("@/pages/vendor/VendorBoost"));
const VendorBoostConfigure = lazy(() => import("@/pages/vendor/VendorBoostConfigure"));
const VendorBoostReviewPay = lazy(() => import("@/pages/vendor/VendorBoostReviewPay"));
const VendorAnalytics = lazy(() => import("@/pages/vendor/VendorAnalytics"));
const VendorReviews = lazy(() => import("@/pages/vendor/VendorReviews"));
const VendorPayments = lazy(() => import("@/pages/vendor/VendorPayments"));
const VendorSettings = lazy(() => import("@/pages/vendor/VendorSettings"));
const AfterVerification = lazy(() => import("@/pages/vendor/AfterVerification"));
const DocumentUpload = lazy(() => import("@/pages/vendor/DocumentUpload"));


/** Authenticated `vendor` role area (vendor shell + nested vendor pages). */
export const vendorRoutes: RouteObject = {
  element: (
    <RoleGate allow="vendor" fallback="/unauthorized">
      <VendorLayout />
    </RoleGate>
  ),
  children: [
    { path: "/vendor", element: suspensePage(VendorDashboardWrapper) },
    { path: "/vendor/dashboard", element: suspensePage(VendorDashboard) },
    { path: "/vendor/profile", element: suspensePage(VendorProfile) },
    { path: "/vendor/leads", element: suspensePage(VendorLeads) },
    { path: "/vendor/verification", element: suspensePage(VendorVerification) },
    { path: "/vendor/boost", element: suspensePage(VendorBoost) },
    { path: "/vendor/boost/configure", element: suspensePage(VendorBoostConfigure) },
    { path: "/vendor/review-pay", element: suspensePage(VendorBoostReviewPay) },
    { path: "/vendor/analytics", element: suspensePage(VendorAnalytics) },
    { path: "/vendor/reviews", element: suspensePage(VendorReviews) },
    { path: "/vendor/payments", element: suspensePage(VendorPayments) },
    { path: "/vendor/settings", element: suspensePage(VendorSettings) },
    { path: "/vendor/after-verification", element: suspensePage(AfterVerification) },
    { path: "/vendor/document-upload", element: suspensePage(DocumentUpload) },
  ],
};
