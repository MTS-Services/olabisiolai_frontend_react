import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, MapPin, Plus, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createVendorBusiness } from "@/features/business/vendorBusinessApi";
import { useVendorBusinessFormOptions } from "@/features/categories/useVendorBusinessFormOptions";

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
  value,
  onChange,
  disabled,
  required,
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  rightIcon?: LucideIcon;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  required?: boolean;
}) {
  const Extra = RightIcon;
  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={cn(
            "h-11 w-full appearance-none rounded-md border border-border-light bg-secondary/80 px-3 pr-10 text-sm text-foreground shadow-sm transition-shadow",
            Extra && "pr-12",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/25",
            disabled && "cursor-not-allowed opacity-70",
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
  onChange,
  preview,
}: {
  id: string;
  accept: string;
  helper: string;
  subhelper: string;
  minHeight?: string;
  multiple?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  preview?: ReactNode;
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
        <input
          id={id}
          type="file"
          accept={accept}
          className="sr-only"
          multiple={multiple}
          onChange={onChange}
        />
        {preview ? (
          <div className="h-full w-full">{preview}</div>
        ) : (
          <label
            htmlFor={id}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 px-4 py-10 transition-colors hover:bg-neutral-100/60"
          >
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
        )}
      </div>
    </div>
  );
}

export default function ChoosePlanForm() {
  const navigate = useNavigate();
  const { data: formOptions, isPending: formOptionsLoading, isError: formOptionsError } =
    useVendorBusinessFormOptions();
  const categories = formOptions?.categories ?? [];
  const locationTree = useMemo(() => normalizeLocationTree(formOptions?.locations), [formOptions?.locations]);
  const locationOptions = useMemo(() => Object.keys(locationTree), [locationTree]);
  const [categoryId, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [services, setServices] = useState<string[]>([""]);
  const [logo, setLogo] = useState<File | null>(null);
  const [coverPhotos, setCoverPhotos] = useState<File[]>([]);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [coverPreviewUrls, setCoverPreviewUrls] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const addService = () => setServices((s) => [...s, ""]);
  const setServiceAt = (index: number, value: string) =>
    setServices((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  const stateOptions = useMemo(() => {
    if (!location) return [];
    return Object.keys(locationTree[location] ?? {});
  }, [location, locationTree]);
  const cityOptions = useMemo(() => {
    if (!location || !state) return [];
    return locationTree[location]?.[state] ?? [];
  }, [location, state, locationTree]);

  useEffect(() => {
    setState("");
    setCity("");
  }, [location]);

  useEffect(() => {
    setCity("");
  }, [state]);

  useEffect(() => {
    if (!logo) {
      setLogoPreviewUrl(null);
      return;
    }
    const nextUrl = URL.createObjectURL(logo);
    setLogoPreviewUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [logo]);

  useEffect(() => {
    const urls = coverPhotos.map((file) => URL.createObjectURL(file));
    setCoverPreviewUrls(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [coverPhotos]);

  const createBusinessMutation = useMutation({
    mutationFn: createVendorBusiness,
    onSuccess: () => {
      navigate("/vendor/dashboard");
    },
    onError: (error: unknown) => {
      setSubmitError(getMessageFromUnknown(error));
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    const formData = new FormData(e.currentTarget);
    const normalizedServices = services.map((service) => service.trim()).filter(Boolean);

    if (!categoryId || !location || !state || !city) {
      setSubmitError("Please select category, location, state, and city.");
      return;
    }
    if (normalizedServices.length === 0) {
      setSubmitError("Please add at least one service.");
      return;
    }

    createBusinessMutation.mutate({
      category_id: categoryId,
      business_name: String(formData.get("businessName") ?? ""),
      location,
      state,
      city,
      business_description: String(formData.get("description") ?? ""),
      services: normalizedServices,
      phone: String(formData.get("phone") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
      website: String(formData.get("website") ?? ""),
      logo,
      cover_photos: coverPhotos,
    });
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
            <div className="space-y-1.5">
              <SelectField
                label={
                  <>
                    Category <span className="text-destructive">*</span>
                  </>
                }
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                disabled={formOptionsLoading || formOptionsError}
                required
              >
                <option value="">
                  {formOptionsLoading
                    ? "Loading categories…"
                    : formOptionsError
                      ? "Categories unavailable"
                      : "Select category"}
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={String(c.id)}>
                    {c.name}
                  </option>
                ))}
              </SelectField>
              {formOptionsError ? (
                <p className="text-xs text-destructive">
                  Form options failed to load. Check{" "}
                  <span className="font-mono">GET /vendor/business/form-options</span>.
                </p>
              ) : null}
            </div>

            <SelectField
              label={
                <>
                  Location <span className="text-destructive">*</span>
                </>
              }
              rightIcon={MapPin}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={formOptionsLoading || locationOptions.length === 0}
              required
            >
              <option value="">
                {formOptionsLoading
                  ? "Loading locations…"
                  : locationOptions.length === 0
                    ? "No locations"
                    : "Select location"}
              </option>
              {locationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectField>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              disabled={!location || stateOptions.length === 0}
              required
            >
              <option value="">Select state</option>
              {stateOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectField>
            <SelectField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!state || cityOptions.length === 0}
              required
            >
              <option value="">Select city</option>
              {cityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
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
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              if (!file) {
                setLogo(null);
                return;
              }
              if (!isAcceptedImage(file)) {
                setSubmitError("Logo must be JPG, PNG, or WebP.");
                e.currentTarget.value = "";
                setLogo(null);
                return;
              }
              if (!isWithinSizeLimit(file, 10)) {
                setSubmitError("Logo must be 10MB or smaller.");
                e.currentTarget.value = "";
                setLogo(null);
                return;
              }
              setSubmitError(null);
              setLogo(file);
            }}
            preview={
              logoPreviewUrl ? (
                <div className="relative h-full min-h-[168px] w-full overflow-hidden rounded-[10px]">
                  <img src={logoPreviewUrl} alt="Logo preview" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/55 px-3 py-2">
                    <p className="max-w-[75%] truncate text-xs text-white">{logo?.name}</p>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="logo-upload"
                        className="cursor-pointer rounded bg-white/20 px-2 py-1 text-xs text-white hover:bg-white/30"
                      >
                        Change
                      </label>
                      <button
                        type="button"
                        onClick={() => setLogo(null)}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/75"
                        aria-label="Remove logo"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : undefined
            }
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
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              if (files.length > 5) {
                setSubmitError("You can upload up to 5 cover photos.");
                setCoverPhotos(files.slice(0, 5));
                return;
              }
              const hasBadType = files.some((file) => !isAcceptedImage(file));
              if (hasBadType) {
                setSubmitError("Cover photos must be JPG, PNG, or WebP.");
                e.currentTarget.value = "";
                setCoverPhotos([]);
                return;
              }
              const hasBigFile = files.some((file) => !isWithinSizeLimit(file, 10));
              if (hasBigFile) {
                setSubmitError("Each cover photo must be 10MB or smaller.");
                e.currentTarget.value = "";
                setCoverPhotos([]);
                return;
              }
              setSubmitError(null);
              setCoverPhotos(files);
            }}
            preview={
              coverPhotos.length > 0 ? (
                <div className="h-full min-h-[168px] space-y-3 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{coverPhotos.length} file(s) selected</p>
                    <label
                      htmlFor="cover-upload"
                      className="cursor-pointer rounded border border-border-light bg-background px-2 py-1 text-xs text-foreground hover:bg-neutral-100"
                    >
                      Add/Change
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {coverPhotos.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="relative overflow-hidden rounded-lg border border-border-light">
                        <img
                          src={coverPreviewUrls[index]}
                          alt={`Cover preview ${index + 1}`}
                          className="h-28 w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setCoverPhotos((prev) => prev.filter((_, prevIndex) => prevIndex !== index))
                          }
                          className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/75"
                          aria-label={`Remove cover photo ${index + 1}`}
                        >
                          <X className="size-4" />
                        </button>
                        <p className="truncate px-2 py-1 text-[11px] text-muted-foreground">{file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : undefined
            }
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
            {submitError ? (
              <p className="text-sm text-destructive sm:mr-auto">{submitError}</p>
            ) : null}
            <Button
              type="button"
              variant="outline"
              className="border-border bg-card font-inter sm:min-w-[120px]"
              onClick={() => navigate("/vendor/dashboard")}
              disabled={createBusinessMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createBusinessMutation.isPending}>
              {createBusinessMutation.isPending ? "Creating..." : "Create business profile"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

function getMessageFromUnknown(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object"
  ) {
    const data = error.response.data as Record<string, unknown>;
    if (typeof data.message === "string" && data.message.trim()) return data.message;
  }
  if (error instanceof Error && error.message.trim()) return error.message;
  return "Could not create business profile.";
}

type LocationTree = Record<string, Record<string, string[]>>;

function normalizeLocationTree(raw: unknown): LocationTree {
  const out: LocationTree = {};

  const setRow = (locationName: string, stateName: string, cityName: string) => {
    const location = locationName.trim();
    const state = stateName.trim();
    const city = cityName.trim();
    if (!location || !state || !city) return;
    if (!out[location]) out[location] = {};
    if (!out[location][state]) out[location][state] = [];
    if (!out[location][state].includes(city)) out[location][state].push(city);
  };

  const parseNode = (node: unknown, inheritedLocation?: string, inheritedState?: string) => {
    if (Array.isArray(node)) {
      node.forEach((item) => parseNode(item, inheritedLocation, inheritedState));
      return;
    }
    if (!node || typeof node !== "object") return;
    const record = node as Record<string, unknown>;

    const locationName =
      readString(record.name) ??
      readString(record.location) ??
      readString(record.country) ??
      inheritedLocation;
    const stateName = readString(record.state) ?? inheritedState;

    const citiesCandidate = record.cities ?? record.city;
    if (Array.isArray(citiesCandidate) && locationName && stateName) {
      citiesCandidate.forEach((city) => setRow(locationName, stateName, String(city)));
    }

    if (Array.isArray(record.states) && locationName) {
      (record.states as unknown[]).forEach((stateNode) => parseNode(stateNode, locationName));
    }

    if (record.locations && Array.isArray(record.locations)) {
      parseNode(record.locations);
    }

    Object.entries(record).forEach(([key, value]) => {
      if (["states", "cities", "city", "locations"].includes(key)) return;

      if (Array.isArray(value)) {
        if (value.every((entry) => typeof entry === "string") && locationName) {
          value.forEach((entry) => setRow(locationName, key, String(entry)));
          return;
        }
        parseNode(value, locationName ?? key, stateName);
        return;
      }

      if (value && typeof value === "object") {
        parseNode(value, locationName ?? key, stateName);
      }
    });
  };

  parseNode(raw);

  if (Object.keys(out).length === 0) {
    out.Nigeria = {
      Lagos: ["Ikeja", "Victoria Island", "Lekki"],
    };
  }

  return out;
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function isAcceptedImage(file: File): boolean {
  return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
}

function isWithinSizeLimit(file: File, maxMb: number): boolean {
  return file.size <= maxMb * 1024 * 1024;
}
