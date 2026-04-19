import { Link } from "react-router-dom";
import { useState, type ReactNode } from "react";
import {
  Award,
  BadgeCheck,
  ExternalLink,
  Mail,
  MessageCircle,
  MessageSquare,
  Save,
  Shield,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function Label({ children }: { children: string }) {
  return (
    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

/** Toggle aligned with vendor accent — “on” uses `brand-red` like dashboard CTAs. */
function RedToggle({
  checked,
  onCheckedChange,
  id,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  id?: string;
}) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-2",
        checked ? "bg-brand-red" : "bg-muted",
      )}
    >
      <span
        className={cn(
          "pointer-events-none block size-6 rounded-full bg-white shadow-md ring-0 transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

export default function VendorSettings() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(false);
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);

  return (
    <section className="space-y-6 md:space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-start">
        <div className="space-y-6 ">
          <Card className="overflow-hidden rounded-xl border-0 border-l-4 border-brand-red shadow-sm ">
            <CardHeader className="relative flex flex-row flex-wrap items-center justify-between gap-4">
              <div className="space-y-1 pr-28 sm:pr-0">
                <CardTitle className="text-2xl font-extrabold text-foreground font-manrope">  
                  Business Profile
                </CardTitle>
                <p className="text-sm text-muted-foreground font-inter">
                  Manage your public presence and contact details.
                </p>
              </div>
              <div className="absolute right-6 top-5 sm:static sm:shrink-0">
                <div className="flex flex-col items-center justify-center gap-1 px-2 py-3">

                  <img src="/src/assets/Background+Border.png" alt="" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider  text-muted-foreground">
                    Logo
                  </span>
                </div>

              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label>Business name</Label>
                  <Input
                    defaultValue="Gidira Logistics Premium"
                    className="h-11 border-border-light bg-accent/60 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
                  />
                </div>
                <div>
                  <Label>Contact Person</Label>
                  <Input
                    defaultValue="Alexander Thorne"
                    className="h-11 border-border-light bg-accent/60 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
                  />
                </div>
                <div>
                  <Label>Business Email</Label>
                  <Input
                    type="email"
                    defaultValue="contact@gidiralogistics.com"
                    className="h-11 border-border-light bg-accent/60 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    defaultValue="+1 (555) 000-1234"
                    className="h-11 border-border-light bg-accent/60 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-xl border-border-light bg-sky-50/50 shadow-sm">
            <CardHeader className="border-b border-sky-100/80 px-6 py-5">
              <CardTitle className="text-2xl font-extrabold text-foreground font-manrope">
                Security &amp; Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="grid gap-5 lg:grid-cols-3">
                <div>
                  <Label>Current password</Label>
                  <Input
                    type="password"
                    defaultValue="••••••••"
                    className="h-11 border-border-light bg-card text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
                  />
                </div>
                <div>
                  <Label>New password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-11 border-border-light bg-card text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
                  />
                </div>
                <div>
                  <Label>Confirm password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-11 border-border-light bg-card text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-xl border border-border-light bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                    <Shield className="size-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground font-manrope">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-muted-foreground font-inter">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                </div>
                <RedToggle checked={twoFactor} onCheckedChange={setTwoFactor} />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" className="min-w-[140px] border-foreground/20 bg-card font-inter">
              Discard changes
            </Button>
            <Button
              type="button"
              className="min-w-[160px] bg-brand-red font-inter font-semibold text-white shadow-sm hover:bg-brand-red/90"
            >
              <Save className="size-4" aria-hidden />
              Save changes
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl bg-brand-red p-6 text-white shadow-sm">
            <BadgeCheck className="mb-2 size-5 opacity-90" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/90">
              Authority status
            </p>
            <p className="mt-2 text-2xl font-bold font-manrope">Verified</p>
            <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-white/90 font-inter">
              Completing verification helps buyers trust your business and unlocks premium placement.
            </p>
            <Button
              asChild
              variant="secondary"
              className="mt-5 rounded-full border-0 bg-white/20 px-5 text-white backdrop-blur-sm hover:bg-white/30"
            >
              <Link to="/vendor/verification">
                Try verify
                <ExternalLink className="size-4" aria-hidden />
              </Link>
            </Button>
            <BadgeCheck
              className="pointer-events-none absolute -bottom-2 -right-2 size-32 text-white/8"
              strokeWidth={1}
              aria-hidden
            />
          </div>

          <Card className="overflow-hidden rounded-xl border-sky-100/80 bg-[#D3E4FE] shadow-sm">
            <CardHeader className="px-6 py-5">
              <CardTitle className="text-lg font-bold text-foreground font-manrope">
                Notification channels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 px-6 pb-6">
              <div className="flex items-center justify-between gap-3 pb-3 first:pt-0">
                <div className="flex items-center gap-3">
                  
                    <Mail className="size-4" aria-hidden />
                  
                  <span className="text-sm font-medium text-foreground font-inter">Email alerts</span>
                </div>
                <RedToggle checked={notifyEmail} onCheckedChange={setNotifyEmail} />
              </div>
              <div className="flex items-center justify-between gap-3 pb-3">
                <div className="flex items-center gap-3">
                  
                    <MessageSquare className="size-4" aria-hidden />
                 
                  <span className="text-sm font-medium text-foreground font-inter">SMS notifications</span>
                </div>
                <RedToggle checked={notifySms} onCheckedChange={setNotifySms} />
              </div>
              <div className="flex items-center justify-between gap-3 pb-3">
                <div className="flex items-center gap-3">
                  
                    <MessageCircle className="size-4" aria-hidden />
                  
                  <span className="text-sm font-medium text-foreground font-inter">WhatsApp updates</span>
                </div>
                <RedToggle checked={notifyWhatsapp} onCheckedChange={setNotifyWhatsapp} />
              </div>
              <p className="mt-4 text-xs italic text-muted-foreground font-inter leading-relaxed">
                Premium members may receive priority routing for urgent booking alerts.
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden rounded-xl border-border-light shadow-sm">
            <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground hover:bg-primary">
              Free
            </Badge>
            <CardContent className="flex flex-col items-center px-6 pb-6 pt-14 text-center">
              <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-tint-red text-brand-red">
                <Award className="size-7" aria-hidden />
              </div>
              <p className="text-sm text-muted-foreground font-inter">Current plan</p>
              <p className="text-xl font-bold text-foreground font-manrope">Default</p>
              <Button
                type="button"
                className="mt-6 w-full bg-sky-100 font-inter font-semibold text-foreground shadow-none hover:bg-sky-100/80"
              >
                Manage subscription
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
