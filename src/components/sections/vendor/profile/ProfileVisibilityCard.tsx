import { BadgeCheck, Eye } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function Label({ children }: { children: string }) {
  return (
    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
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

export function ProfileVisibilityCard() {
  return (
    <Card className="overflow-hidden rounded-xl border-border-light shadow-sm">
      <CardHeader className="space-y-1 border-b border-border-light px-6 py-5">
        <CardTitle className="text-lg font-bold text-foreground font-manrope">Profile Visibility</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Eye className="size-5" aria-hidden />
            </div>
            <div>
              <p className="font-semibold text-foreground font-manrope">Profile Visible</p>
              <p className="text-sm text-muted-foreground font-inter">
                Your profile is currently visible to customers
              </p>
            </div>
          </div>
          <VisibilityToggle checked={true} onCheckedChange={() => {}} />
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex gap-3">
            <BadgeCheck className="size-5 text-emerald-600" aria-hidden />
            <div>
              <p className="font-semibold text-emerald-800 font-manrope">Verified Profile</p>
              <p className="text-sm text-emerald-700 font-inter">
                Your profile is verified and gets 3x more visibility
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Visibility Settings</Label>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="size-4 rounded border-gray-300 text-sky-600" />
              <span className="text-sm text-foreground font-inter">Show in search results</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="size-4 rounded border-gray-300 text-sky-600" />
              <span className="text-sm text-foreground font-inter">Display contact information</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="size-4 rounded border-gray-300 text-sky-600" />
              <span className="text-sm text-foreground font-inter">Allow customer reviews</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
