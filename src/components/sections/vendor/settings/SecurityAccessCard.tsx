import { Shield } from "lucide-react";
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

export function SecurityAccessCard({ 
  twoFactor, 
  setTwoFactor 
}: { 
  twoFactor: boolean; 
  setTwoFactor: (v: boolean) => void; 
}) {
  return (
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
              defaultValue="****"
              className="h-11 border-border-light bg-card text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
            />
          </div>
          <div>
            <Label>New password</Label>
            <Input
              type="password"
              placeholder="****"
              className="h-11 border-border-light bg-card text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
            />
          </div>
          <div>
            <Label>Confirm password</Label>
            <Input
              type="password"
              placeholder="****"
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
  );
}
