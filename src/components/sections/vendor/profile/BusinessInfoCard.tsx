import type { ReactNode } from "react";
import { ChevronRight, Upload } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function Label({ children }: { children: string }) {
  return (
    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
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

/** Ring of longer dashes around upload (2px "border" from striped background + inset fill). */
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

export function BusinessInfoCard() {
  return (
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
  );
}
