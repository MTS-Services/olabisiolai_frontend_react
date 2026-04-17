import type { ReactNode } from "react";
import {
  Bell,
  Lock,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  Smartphone,
  UserSquare2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { FrontendHeader } from "@/components/partials/frontend/FrontendHeader";
import { UserSidebar } from "@/components/partials/user/UserSidebar";
import { HeaderAvatar } from "@/components/ui/HeaderAvatar";
import { Button } from "@/components/ui/button";

const LOGO_FOOTER = "/images/landing/gidira-logo-footer.svg";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About Gidira", to: "/about" },
      { label: "Contact Us", to: "/contact" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Cookies Policy", to: "/cookies-policy" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Business Tips", to: "/business-tips" },
      { label: "FAQs", to: "/faq" },
    ],
  },
] as const;

function Field({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-chat-meta">{label}</label>
      <div className="flex h-11 items-center gap-2 rounded-lg bg-chat-input-bg px-3 text-sm text-ink">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  icon,
}: {
  title: string;
  description: string;
  enabled: boolean;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-chat-border-subtle px-4 py-4 last:border-b-0">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 rounded-md bg-surface-soft p-1.5 text-chat-accent">{icon}</span>
        <div>
          <p className="text-sm font-medium text-ink">{title}</p>
          <p className="text-xs text-chat-meta">{description}</p>
        </div>
      </div>
      <span
        className={`relative h-4 w-7 rounded-full ${enabled ? "bg-chat-accent" : "bg-border-gray"}`}
      >
        <span
          className={`absolute top-0.5 size-3 rounded-full bg-white transition-all ${enabled ? "left-[14px]" : "left-0.5"
            }`}
        />
      </span>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <FrontendHeader />

      <main className="bg-auth-bg">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col lg:flex-row">
          <UserSidebar active="settings" />

          <section className="flex-1 bg-chat-surface p-4 sm:p-8">
            <div className="rounded-xl bg-card p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <HeaderAvatar src={null} alt="Profile avatar" className="size-16 rounded-full" />
                  <button
                    type="button"
                    className="absolute -bottom-1 -right-1 rounded-full bg-chat-accent p-1 text-white"
                    aria-label="Change profile photo"
                  >
                    <UserSquare2 className="size-3.5" />
                  </button>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-ink">Julian Montgomery</h1>
                  <p className="text-body-secondary">julian.montgomery@fluid-marketplace.com</p>
                  <div className="mt-2 flex gap-2 text-xs">
                    <span className="rounded-full bg-brand px-3 py-1 font-medium text-ice">
                      Boosted service
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1 font-medium text-chat-meta">
                      Verified identity
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <section className="mt-6">
              <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold text-ink">
                <UserSquare2 className="size-5 text-chat-accent" />
                Personal Information
              </h2>
              <div className="rounded-xl bg-card p-5 shadow-sm sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First Name" value="Julian" />
                  <Field label="Last Name" value="Montgomery" />
                </div>
                <div className="mt-4">
                  <Field label="Phone Number" value="+1 (555) 0123-4567" icon={<Phone className="size-4 text-chat-meta" />} />
                </div>
              </div>
            </section>

            <section className="mt-6">
              <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold text-ink">
                <Lock className="size-5 text-chat-accent" />
                Password & Security
              </h2>
              <div className="rounded-xl bg-card p-5 shadow-sm sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Current Password" value="••••••••••" />
                  <Field label="New Password" value="Min. 12 characters" />
                </div>
              </div>
            </section>

            <section className="mt-6">
              <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold text-ink">
                <Bell className="size-5 text-chat-accent" />
                Notification Preferences
              </h2>
              <div className="rounded-xl bg-card shadow-sm">
                <ToggleRow
                  title="Email Notifications"
                  description="Product updates, booking confirmations, and Quote."
                  enabled
                  icon={<Mail className="size-4" />}
                />
                <ToggleRow
                  title="Push Notifications"
                  description="Real-time alerts for messages and activity."
                  enabled
                  icon={<Bell className="size-4" />}
                />
                <ToggleRow
                  title="SMS Alerts"
                  description="Crucial security alerts via text message."
                  enabled={false}
                  icon={<Smartphone className="size-4" />}
                />
              </div>
            </section>

            <div className="mt-6 flex items-center justify-between">
              <Button className="h-11 rounded-xl bg-brand px-6 text-ice hover:bg-brand/90">
                <Save className="size-4" />
                Save Changes
              </Button>
              <button type="button" className="inline-flex items-center gap-1 text-sm text-brand-red">
                <ShieldCheck className="size-4" />
                Deactivate Account
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-footer-bar">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-14 xl:px-12">
          <div className="grid gap-8 md:grid-cols-[280px_1fr]">
            <div>
              <img src={LOGO_FOOTER} alt="Gidira" className="h-8 w-auto" />
              <p className="mt-4 text-sm text-white">FIND BETTER | CONNECT FASTER</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h4 className="text-base font-semibold text-white">{column.title}</h4>
                  <ul className="mt-4 space-y-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link to={link.to} className="text-sm text-footer-muted hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-8 text-center">
            <p className="text-sm text-footer-muted">
              © 2026 GIDIRA. All rights reserved. Built for Nigeria&apos;s Digital Economy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
