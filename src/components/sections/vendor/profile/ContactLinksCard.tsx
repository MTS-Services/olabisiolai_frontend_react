import type { LucideIcon } from "lucide-react";
import { Globe, Link2, Phone } from "lucide-react";

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

export function ContactLinksCard() {
  return (
    <Card className="overflow-hidden rounded-xl border-border-light shadow-sm">
      <CardHeader className="border-b border-border-light px-6 py-5">
        <CardTitle className="text-lg font-bold text-foreground font-manrope">Contact Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2">
          <IconInput
            label="Phone Number"
            icon={Phone}
            defaultValue="+234 800 123 4567"
            placeholder="+234 800 123 4567"
          />
          <IconInput
            label="WhatsApp Number"
            icon={Phone}
            defaultValue="+234 800 123 4567"
            placeholder="+234 800 123 4567"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2">
          <IconInput
            label="Website"
            icon={Globe}
            defaultValue="https://zenithrealestate.com"
            placeholder="https://yourbusiness.com"
          />
          <IconInput
            label="Social Media"
            icon={Link2}
            defaultValue="https://facebook.com/zenithrealestate"
            placeholder="https://facebook.com/yourbusiness"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2">
          <IconInput
            label="Email Address"
            icon={Globe}
            defaultValue="contact@zenithrealestate.com"
            placeholder="contact@yourbusiness.com"
          />
          <IconInput
            label="Instagram"
            icon={Link2}
            defaultValue="@zenithrealestate"
            placeholder="@yourbusiness"
          />
        </div>
      </CardContent>
    </Card>
  );
}
