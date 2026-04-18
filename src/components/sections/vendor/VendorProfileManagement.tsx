import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  BadgeCheck,
  ChevronRight,
  Eye,
  Globe,
  Link2,
  Phone,
  Plus,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import gallery1 from "@/assets/protfolio_image/Property Image 1.png";
import gallery2 from "@/assets/protfolio_image/Property Image 2.png";
import gallery3 from "@/assets/protfolio_image/Property Image 3.png";

const galleryImages = [
  { id: "1", src: gallery1, alt: "Gallery preview 1" },
  { id: "2", src: gallery2, alt: "Gallery preview 2" },
  { id: "3", src: gallery3, alt: "Gallery preview 3" },
] as const;

function Label({ children }: { children: string }) {
  return (
    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

function IconInput({
  label,
  icon: Icon,
  defaultValue,
  placeholder,
  iconClassName,
}: {
  label: string;
  icon: LucideIcon;
  defaultValue?: string;
  placeholder?: string;
  iconClassName?: string;
}) {
  return (
    <div className="space-y-0">
      <Label>{label}</Label>
      <div className="relative">
        <Icon
          className={cn(
            "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
            iconClassName,
          )}
          aria-hidden
        />
        <Input
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="h-11 border-border-light bg-background pl-10 pr-3 text-sm shadow-sm transition-shadow focus-visible:ring-2 focus-visible:ring-sky-500/25"
        />
      </div>
    </div>
  );
}

function SelectField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        <select
          className={cn(
            "h-11 w-full appearance-none rounded-md border border-border-light bg-background px-3 pr-10 text-sm text-foreground shadow-sm transition-shadow",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/25",
          )}
        >
          {children}
        </select>
        <ChevronRight
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 rotate-90 text-muted-foreground"
          aria-hidden
        />
      </div>
    </div>
  );
}

function VisibilityToggle({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2",
        checked ? "bg-sky-600" : "bg-muted",
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

/** Ring of longer dashes around upload (2px “border” from striped background + inset fill). */
function DashedFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl bg-[repeating-linear-gradient(90deg,#d1d5db_0px,#d1d5db_10px,transparent_10px,transparent_18px)] p-[2px]",
        className,
      )}
    >
      <div className="rounded-[10px] bg-neutral-50/95">{children}</div>
    </div>
  );
}

export function VendorProfileManagement() {
  const [profileVisible, setProfileVisible] = useState(true);

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-manrope md:text-3xl">
            Profile Management
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground font-inter">
            Keep your business information up-to-date to attract more clients.
          </p>
        </div>
        <Button
          type="button"
          className="h-11 shrink-0 rounded-lg bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-sky-600/90"
        >
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.85fr)_minmax(280px,1fr)] lg:items-start lg:gap-6">
        <div className="space-y-5">
          <Card className="overflow-hidden rounded-xl border-border-light shadow-sm">
            <CardHeader className="space-y-1 border-b border-border-light bg-card px-6 py-5">
              <CardTitle className="text-lg font-bold text-foreground font-manrope">Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div>
                <Label>Business Name</Label>
                <Input
                  defaultValue="Zenith Real Estate"
                  className="h-11 border-border-light bg-background text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField label="Category">
                  <option>Transportation &amp; Logistics</option>
                  <option>Real Estate</option>
                  <option>Home Services</option>
                </SelectField>
                <SelectField label="Subcategory">
                  <option>Last Mile Delivery</option>
                  <option>Freight</option>
                </SelectField>
              </div>

              <div>
                <Label>Location (Area)</Label>
                <Input
                  defaultValue="Victoria Island, Lagos"
                  className="h-11 border-border-light bg-background text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
                />
              </div>

              <div>
                <Label>Business Description</Label>
                <Textarea
                  defaultValue="Gidira Logistics provides seamless haulage and last-mile delivery services across Lagos. With a fleet of over 50 vehicles, we ensure your goods arrive safely and on time."
                  rows={5}
                  className="min-h-[120px] resize-y border-border-light bg-background text-sm leading-relaxed shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
                />
              </div>

              <div>
                <Label>Business Logo</Label>
                <DashedFrame>
                  <label className="flex min-h-[168px] w-full cursor-pointer flex-col items-center justify-center gap-2 px-4 py-10 transition-colors hover:bg-neutral-100/60">
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" />
                    <span className="flex size-11 items-center justify-center rounded-full bg-neutral-200/80 text-foreground">
                      <Upload className="size-5" aria-hidden />
                    </span>
                    <span className="text-sm font-semibold text-emerald-600">Click to upload images</span>
                    <span className="text-center text-xs text-muted-foreground">
                      Upload images (JPG, PNG, WebP)
                    </span>
                  </label>
                </DashedFrame>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-xl border-border-light shadow-sm">
            <CardHeader className="space-y-1 border-b border-border-light px-6 py-5">
              <CardTitle className="text-lg font-bold text-foreground font-manrope">Business Gallery</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-4">
                {galleryImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border-light bg-muted shadow-sm"
                  >
                    <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
                {[1, 2].map((slot) => (
                  <label
                    key={slot}
                    className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-lg border-[3px] border-dashed border-neutral-300 bg-neutral-50/50 text-muted-foreground transition-colors hover:border-sky-400/60 hover:bg-neutral-100/80"
                    aria-label="Add gallery image"
                  >
                    <input type="file" accept="image/*" className="sr-only" />
                    <Plus className="size-5 stroke-[2.25]" aria-hidden />
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="overflow-hidden rounded-xl border-border-light shadow-sm">
            <CardHeader className="border-b border-border-light px-6 py-5">
              <CardTitle className="text-lg font-bold text-foreground font-manrope">Contact Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <IconInput label="Phone Number" icon={Phone} defaultValue="+234 812 345 6789" />
              <IconInput
                label="WhatsApp Link"
                icon={Link2}
                defaultValue="wa.me/gidira_logistics"
                iconClassName="text-emerald-600"
              />
              <IconInput label="Website URL" icon={Globe} defaultValue="https://gidira.com" />
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-xl border border-sky-100 bg-sky-50/40 shadow-sm">
            <CardHeader className="border-b border-sky-100/80 px-6 py-5">
              <CardTitle className="text-lg font-bold text-foreground font-manrope">Verification Badge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white shadow-sm">
                  <BadgeCheck className="size-6" strokeWidth={2} aria-hidden />
                </div>
                <div className="min-w-0 space-y-2">
                  <p className="text-sm font-semibold text-foreground">Verified business</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Your business is verified. This increases trust and lead potential with buyers on Gidira.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-semibold text-sky-700 transition-colors hover:text-sky-800"
              >
                View Certificate
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-xl border-border-light shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 border-b border-border-light px-6 py-5">
              <CardTitle className="text-lg font-bold text-foreground font-manrope">Profile Visibility</CardTitle>
              <VisibilityToggle checked={profileVisible} onCheckedChange={setProfileVisible} />
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                When active, your profile is searchable by all Gidira marketplace users.
              </p>
              <div className="rounded-lg border border-border-light bg-muted/20 px-4 py-3">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Views today</p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    <div
                      className="size-9 rounded-full border-2 border-card bg-avatar-a shadow-sm"
                      aria-hidden
                    />
                    <div
                      className="size-9 rounded-full border-2 border-card bg-avatar-b shadow-sm"
                      aria-hidden
                    />
                    <div
                      className="size-9 rounded-full border-2 border-card bg-avatar-c shadow-sm"
                      aria-hidden
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Eye className="size-4 shrink-0" aria-hidden />
                    <span className="font-medium text-foreground">28</span>
                    <span>views</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
