import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { ChevronRight, MapPin, Plus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

function SelectField({
  label,
  children,
  className,
  rightIcon: RightIcon,
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  rightIcon?: LucideIcon;
}) {
  const Extra = RightIcon;
  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className="relative">
        <select
          className={cn(
            "h-11 w-full appearance-none rounded-md border border-border-light bg-secondary/80 px-3 pr-10 text-sm text-foreground shadow-sm transition-shadow",
            Extra && "pr-12",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/25",
          )}
        >
          {children}
        </select>
        {Extra ? (
          <Extra
            className="pointer-events-none absolute right-9 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
        ) : null}
        <ChevronRight
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 rotate-90 text-muted-foreground"
          aria-hidden
        />
      </div>
    </div>
  );
}

function DashedUpload({
  id,
  accept,
  helper,
  subhelper,
  minHeight,
  multiple,
}: {
  id: string;
  accept: string;
  helper: string;
  subhelper: string;
  minHeight?: string;
  multiple?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl bg-[repeating-linear-gradient(90deg,#d1d5db_0px,#d1d5db_10px,transparent_10px,transparent_18px)] p-[2px]",
      )}
    >
      <div
        className={cn(
          "rounded-[10px] bg-neutral-50/95",
          minHeight ?? "min-h-[168px]",
        )}
      >
        <label
          htmlFor={id}
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 px-4 py-10 transition-colors hover:bg-neutral-100/60"
        >
          <input
            id={id}
            type="file"
            accept={accept}
            className="sr-only"
            multiple={multiple}
          />
          <span className="flex size-11 items-center justify-center rounded-full bg-neutral-200/80 text-foreground">
            <Upload className="size-5" aria-hidden />
          </span>
          <span className="text-center text-sm font-semibold text-foreground font-inter">
            {helper}
          </span>
          <span className="text-center text-xs text-muted-foreground font-inter">
            {subhelper}
          </span>
        </label>
      </div>
    </div>
  );
}

export default function ChoosePlanForm() {
  const navigate = useNavigate();
  const [services, setServices] = useState<string[]>([""]);

  const addService = () => setServices((s) => [...s, ""]);
  const setServiceAt = (index: number, value: string) =>
    setServices((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/vendor/dashboard");
  };

  return (
    <form className="mx-auto max-w-3xl space-y-5 pb-8" onSubmit={handleSubmit}>
      <div className="overflow-hidden rounded-2xl bg-primary px-6 py-8 text-primary-foreground shadow-sm md:px-10 md:py-10">
        <h1 className="text-2xl font-bold tracking-tight font-manrope md:text-3xl">
          Reach more customers
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/90 font-inter md:text-base">
          Create your free business profile and start connecting with customers
          across Nigeria. Get verified for more trust!
        </p>
      </div>

      <Card className="overflow-hidden rounded-xl border-border-light shadow-sm">
        <CardHeader className="border-b border-border-light px-6 py-5">
          <CardTitle className="text-lg font-bold text-foreground font-manrope">
            Basic information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          <div>
            <Label>
              Business name <span className="text-destructive">*</span>
            </Label>
            <Input
              name="businessName"
              placeholder="e.g. Swift Plumbing Services"
              className="h-11 border-border-light bg-secondary/80 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label={
                <>
                  Category <span className="text-destructive">*</span>
                </>
              }
            >
              <option value="">Select category</option>
              <option>Home services</option>
              <option>Transport &amp; logistics</option>
              <option>Professional services</option>
            </SelectField>

            <SelectField
              label={
                <>
                  Location <span className="text-destructive">*</span>
                </>
              }
              rightIcon={MapPin}
            >
              <option value="">Select location</option>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Port Harcourt</option>
            </SelectField>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField label="State">
              <option>Lagos</option>
              <option>Ogun</option>
              <option>Oyo</option>
            </SelectField>
            <SelectField label="City">
              <option>Ikeja</option>
              <option>Victoria Island</option>
              <option>Lekki</option>
            </SelectField>
          </div>

          <div>
            <Label>
              Business description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              name="description"
              placeholder="Describe your business, experience, and what makes you stand out..."
              rows={5}
              className="min-h-[120px] resize-y border-border-light bg-secondary/80 text-sm leading-relaxed shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-xl border-border-light shadow-sm">
        <CardHeader className="border-b border-border-light px-6 py-5">
          <CardTitle className="text-lg font-bold text-foreground font-manrope">
            Services offered <span className="text-destructive">*</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {services.map((value, index) => (
            <div key={index}>
              <Label>{`Service ${index + 1}`}</Label>
              <Input
                value={value}
                onChange={(e) => setServiceAt(index, e.target.value)}
                placeholder={`Service ${index + 1}`}
                className="h-11 border-border-light bg-secondary/80 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="w-full border-border font-inter"
            onClick={addService}
          >
            <Plus className="size-4" aria-hidden />
            Add another service
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-xl border-border-light shadow-sm">
        <CardHeader className="border-b border-border-light px-6 py-5">
          <CardTitle className="text-lg font-bold text-foreground font-manrope">
            Contact details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-3">
            <div>
              <Label>
                Phone number <span className="text-destructive">*</span>
              </Label>
              <Input
                type="tel"
                name="phone"
                placeholder="+234 800 123 4567"
                className="h-11 border-border-light bg-secondary/80 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
                required
              />
            </div>
            <div>
              <Label>WhatsApp number</Label>
              <Input
                type="tel"
                name="whatsapp"
                placeholder="+234 800 123 4567"
                className="h-11 border-border-light bg-secondary/80 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
              />
            </div>
            <div>
              <Label>Website (optional)</Label>
              <Input
                type="url"
                name="website"
                placeholder="https://yourbusiness.com"
                className="h-11 border-border-light bg-secondary/80 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-xl border-border-light shadow-sm">
        <CardHeader className="border-b border-border-light px-6 py-5">
          <CardTitle className="text-lg font-bold text-foreground font-manrope">
            Business logo
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <DashedUpload
            id="logo-upload"
            accept="image/jpeg,image/png,image/webp"
            helper="Click to upload photos or drag and drop"
            subhelper="JPG, PNG up to 10MB each"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-xl border-border-light shadow-sm">
        <CardHeader className="border-b border-border-light px-6 py-5">
          <CardTitle className="text-lg font-bold text-foreground font-manrope">
            Business cover photos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <DashedUpload
            id="cover-upload"
            accept="image/jpeg,image/png,image/webp"
            helper="Click to upload photos or drag and drop"
            subhelper="JPG, PNG up to 10MB each (max 5 photos)"
            multiple
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-xl border-sky-100/80 bg-sky-50/60 shadow-sm">
        <CardContent className="space-y-6 p-6 md:p-8">
          <p className="text-sm leading-relaxed text-foreground font-inter md:text-base">
            Your business will appear as{" "}
            <span className="font-semibold">Unverified</span> until you complete
            the verification process. Verified businesses get{" "}
            <span className="font-semibold text-success">
              3x more visibility!
            </span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="border-border bg-card font-inter sm:min-w-[120px]"
              onClick={() => navigate("/vendor/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit">Create business profile</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
