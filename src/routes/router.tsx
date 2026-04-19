import { lazy, Suspense, useEffect, type ComponentType, type LazyExoticComponent } from "react";
import { Navigate, createBrowserRouter, Outlet, useLocation } from "react-router-dom";

const Home = lazy(() => import("@/pages/frontend/Home"));
const Cart = lazy(() => import("@/pages/frontend/Cart"));
const NotFound = lazy(() => import("@/pages/frontend/NotFound"));
const Unauthorized = lazy(() => import("@/pages/frontend/Unauthorized"));

const Login = lazy(() => import("@/pages/frontend/auth/Login"));

const UserDashboard = lazy(() => import("@/pages/user/UserDashboard"));
const Favorites = lazy(() => import("@/pages/user/Favorites"));
const Messages = lazy(() => import("@/pages/user/Messages"));
const Settings = lazy(() => import("@/pages/user/Settings"));
const VendorDashboard = lazy(() => import("@/pages/vendor/VendorDashboard"));
const Account = lazy(() => import("@/pages/frontend/Account"));

const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const Users = lazy(() => import("@/pages/admin/Users"));
const Businesses = lazy(() => import("@/pages/admin/Businesses"));
const AdminLogin = lazy(() => import("@/pages/frontend/auth/AdminLogin"));
const Verifications = lazy(() => import("@/pages/admin/Verifications"));
const Leads = lazy(() => import("@/pages/admin/Leads"));
const Reviews = lazy(() => import("@/pages/admin/Reviews"));
const Payments = lazy(() => import("@/pages/admin/Payments"));

import { FrontendLayout } from "@/layouts/frontend/FrontendLayout";
import { AuthLayout } from "@/layouts/auth/AuthLayout";
import { AdminLayout } from "@/layouts/admin/AdminLayout";

import { RoleGate } from "@/routes/RoleGate";
import { GuestGate } from "@/routes/GuestGate";
const UserType = lazy(() => import("@/pages/frontend/auth/UserType"));
const LoginGoogle = lazy(() => import("@/pages/frontend/auth/LoginGoogle"));
const LoginEmail = lazy(() => import("@/pages/frontend/auth/LoginEmail"));
const ForgetPassword = lazy(() => import("@/pages/frontend/auth/ForgetPassword"));
const OTPVerification = lazy(() => import("@/pages/frontend/auth/OTPVerification"));
const ResetPassword = lazy(() => import("@/pages/frontend/auth/ResetPassword"));
const Register = lazy(() => import("@/pages/frontend/auth/Register"));

const About = lazy(() => import("@/pages/frontend/About"));
const Contact = lazy(() => import("@/pages/frontend/Contact"));
const Terms = lazy(() => import("@/pages/frontend/Terms"));
const PrivacyPolicy = lazy(() => import("@/pages/frontend/PrivacyPolicy"));
const SingleApplication = lazy(() => import("@/pages/frontend/SingleApplication"));
const CookiesPolicy = lazy(() => import("@/pages/frontend/CookiesPolicy"));
const Careers = lazy(() => import("@/pages/frontend/Careers"));
const Faq = lazy(() => import("@/pages/frontend/Faq"));
const BusinessTips = lazy(() => import("@/pages/frontend/BusinessTips/index"));
const PhotosThatSell = lazy(() => import("@/pages/frontend/BusinessTips/PhotosThatSell"));
const WritingACompellingDescription = lazy(
  () => import("@/pages/frontend/BusinessTips/WritingACompellingDescription"),
);
const GettingMorePositiveReviews = lazy(
  () => import("@/pages/frontend/BusinessTips/GettingMorePositiveReviews"),
);
const RespondingToCustomerEnquiries = lazy(
  () => import("@/pages/frontend/BusinessTips/RespondingToCustomerEnquiries"),
);
const MarketingBeyondGidira = lazy(
  () => import("@/pages/frontend/BusinessTips/MarketingBeyondGidira"),
);
const PricingYourServicesRight = lazy(
  () => import("@/pages/frontend/BusinessTips/PricingYourServicesRight"),
);
const Filters = lazy(() => import("@/pages/frontend/Filters"));
const Trade = lazy(() => import("@/pages/frontend/Trade"));
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

function ScrollToTopLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    element: <ScrollToTopLayout />,
    children: [
      {
        element: <FrontendLayout />,
        children: [
          { path: '/', element: suspensePage(Home) },
          { path: '/cart', element: suspensePage(Cart) },
          { path: '/filters', element: suspensePage(Filters) },
          { path: '/trade', element: suspensePage(Trade) },
          { path: '/service', element: suspensePage(Service) },
          { path: '/messages', element: suspensePage(DirectMessage) },
          { path: '/reviews', element: suspensePage(GiveReview) },
          { path: '/about', element: suspensePage(About) },
          { path: '/contact', element: suspensePage(Contact) },
          { path: '/faq', element: suspensePage(Faq) },
          { path: '/business-tips', element: suspensePage(BusinessTips) },
          { path: '/business-tips/photos-that-sell', element: suspensePage(PhotosThatSell) },
          {
            path: '/business-tips/writing-a-compelling-description',
            element: suspensePage(WritingACompellingDescription),
          },
          {
            path: '/business-tips/getting-more-positive-reviews',
            element: suspensePage(GettingMorePositiveReviews),
          },
          {
            path: '/business-tips/responding-to-customer-enquiries',
            element: suspensePage(RespondingToCustomerEnquiries),
          },
          {
            path: '/business-tips/marketing-beyond-gidira',
            element: suspensePage(MarketingBeyondGidira),
          },
          {
            path: '/business-tips/pricing-your-services-right',
            element: suspensePage(PricingYourServicesRight),
          },
          { path: '/terms', element: suspensePage(Terms) },
          { path: '/privacy-policy', element: suspensePage(PrivacyPolicy) },
          { path: '/single-application', element: suspensePage(SingleApplication) },
          { path: '/cookies-policy', element: suspensePage(CookiesPolicy) },
          { path: '/careers', element: suspensePage(Careers) },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/user-type',
            element: (
              <GuestGate>
                {suspensePage(UserType)}
              </GuestGate>
            ),
          },
          {
            path: '/login',
            element: (
              <GuestGate>
                {suspensePage(Login)}
              </GuestGate>
            ),
          },
          {
            path: '/login/google',
            element: (
              <GuestGate>
                {suspensePage(LoginGoogle)}
              </GuestGate>
            ),
          },
          {
            path: '/login/email',
            element: (
              <GuestGate>
                {suspensePage(LoginEmail)}
              </GuestGate>
            ),
          },
          {
            path: '/forget-password',
            element: (
              <GuestGate>
                {suspensePage(ForgetPassword)}
              </GuestGate>
            ),
          },
          {
            path: '/otp-verification',
            element: (
              <GuestGate>
                {suspensePage(OTPVerification)}
              </GuestGate>
            ),
          },
          {
            path: '/reset-password',
            element: (
              <GuestGate>
                {suspensePage(ResetPassword)}
              </GuestGate>
            ),
          },
          {
            path: '/register',
            element: (
              <GuestGate>
                {suspensePage(Register)}
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
        path: '/dashboard',
        element: <Navigate to="/user/dashboard" replace />,
      },
      {
        path: '/vendor',
        element: <Navigate to="/vendor/dashboard" replace />,
      },
      {
        element: (
          <RoleGate allow="user" fallback="/unauthorized">
            <Outlet />
          </RoleGate>
        ),
        children: [
          { path: '/user/dashboard', element: suspensePage(UserDashboard) },
          { path: '/user/favorites', element: suspensePage(Favorites) },
          { path: '/user/messages', element: suspensePage(Messages) },
          { path: '/user/settings', element: suspensePage(Settings) },
          { path: '/account', element: suspensePage(Account) },
        ],
      },
      {
        element: (
          <RoleGate allow="vendor" fallback="/unauthorized">
            <Outlet />
          </RoleGate>
        ),
        children: [{ path: '/vendor/dashboard', element: suspensePage(VendorDashboard) }],
      },
      {
        element: (
          <RoleGate allow="admin" fallback="/admin/login">
            <AdminLayout />
          </RoleGate>
        ),
        children: [
          { path: '/admin', element: <Navigate to="/admin/dashboard" replace /> },
          { path: '/admin/dashboard', element: suspensePage(Dashboard) },
          { path: '/admin/users', element: suspensePage(Users) },
          { path: '/admin/businesses', element: suspensePage(Businesses) },
          { path: '/admin/verifications', element: suspensePage(Verifications) },
          { path: '/admin/leads', element: suspensePage(Leads) },
          { path: '/admin/reviews', element: suspensePage(Reviews) },
          { path: '/admin/payments', element: suspensePage(Payments) },
        ],
      },
      {
        path: '*',
        element: suspensePage(NotFound),
      },
    ],
  },
]);
