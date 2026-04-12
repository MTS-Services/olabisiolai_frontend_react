import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Heart,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";

import { ServicePhotosModal } from "@/components/service/ServicePhotosModal";
import { Button } from "@/components/ui/button";
import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

const IMAGES = {
  hero: "/images/service/hero.jpg",
  avatar: "/images/service/avatar.jpg",
  photo1: "/images/service/photo1.jpg",
  photo2: "/images/service/photo2.jpg",
  photo3: "/images/service/photo3.jpg",
  photo4: "/images/service/photo4.jpg",
  photo5: "/images/service/photo5.jpg",
  map: "/images/service/map.jpg",
  review1: "/images/service/review1.jpg",
  review2: "/images/service/review2.jpg",
} as const;

const SERVICES = [
  "Pipe Installation",
  "Leak Repairs",
  "Water Heater Installation",
  "Drain Cleaning",
  "Emergency Services",
] as const;

/** Fills box with object-cover; avoids inline-gap and layout jump from raw img. */
function AspectCover({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-border-light",
        className,
      )}
    >
      <img
        src={src}
        alt=""
        className="absolute inset-0 block size-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function StarRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[0, 1, 2, 3].map((i) => (
        <Star
          key={i}
          className="size-5 shrink-0 fill-brand-red text-brand-red"
          aria-hidden
        />
      ))}
      <Star
        className="size-5 shrink-0 fill-brand-red/50 text-brand-red"
        aria-hidden
      />
    </div>
  );
}

export default function Service() {
  const [photosOpen, setPhotosOpen] = useState(false);

  return (
    <div className="bg-bg-section font-sans text-ink">
      <div className={cn(container, "pb-16 pt-6 md:pt-10")}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-base font-normal text-accent-foreground hover:underline"
        >
          <ArrowLeft className="size-6 shrink-0" aria-hidden />
          Back
        </Link>

        <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="min-w-0 flex-1 space-y-10">
            <div className="relative">
              <AspectCover
                src={IMAGES.hero}
                className="w-full rounded-2xl shadow-md aspect-[16/10] sm:aspect-[2/1] lg:aspect-[2.65/1]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" aria-hidden />
              <div className="absolute bottom-4 right-4 z-20 sm:bottom-6 sm:right-6">
                <Button
                  type="button"
                  variant="outline"
                  className="pointer-events-auto rounded-xl border-brand bg-ice px-6 py-4 text-base font-medium text-brand shadow-sm hover:bg-ice"
                  onClick={() => setPhotosOpen(true)}
                >
                  See all Photos
                </Button>
              </div>
              <div className="absolute -bottom-1 left-4 z-20 overflow-hidden rounded-xl border border-stat-muted bg-card shadow-sm sm:left-8 md:left-12">
                <AspectCover
                  src={IMAGES.avatar}
                  className="size-20 sm:size-24 md:h-[90px] md:w-[110px] md:max-w-[110px]"
                />
              </div>
            </div>

            <div className="space-y-4 pt-10 sm:pt-12">
              <h1 className="font-heading text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl lg:leading-[4.25rem]">
                Plumbing king
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-amber-950">
                  <Sparkles className="size-3.5" aria-hidden />
                  Boosted Listing
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-ink md:text-base">
                <StarRow />
                <span>4.8 (124 Reviews)</span>
                <span className="text-stat-muted" aria-hidden>
                  •
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-success">
                  <BadgeCheck className="size-4 shrink-0" aria-hidden />
                  Identity Verified
                </span>
              </div>
              <div className="space-y-4 text-base text-ink">
                <p className="flex items-start gap-1">
                  <MapPin
                    className="mt-0.5 size-6 shrink-0 text-brand-red"
                    aria-hidden
                  />
                  Locate in Lagos
                </p>
                <p className="flex items-start gap-1">
                  <CheckCircle2
                    className="mt-0.5 size-6 shrink-0 text-brand-red"
                    aria-hidden
                  />
                  Gidira member since March 2026
                </p>
              </div>
            </div>

            <section className="space-y-6">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                Overview
              </h2>
              <p className="max-w-3xl text-lg leading-relaxed text-body-secondary">
                Lumina Elite provides bespoke property maintenance solutions for
                discerning homeowners. Our team of certified professionals
                combines traditional meticulousness with modern eco-friendly
                technology. From specialized marble restoration to deep-clean
                sanitization, we ensure your living space remains a sanctuary.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: Leaf,
                    title: "Eco-Certified",
                    body: "We use 100% biodegradable, non-toxic cleaning agents.",
                  },
                  {
                    icon: Clock,
                    title: "Flexible Timing",
                    body: "Available for early morning or late night sessions.",
                  },
                  {
                    icon: Shield,
                    title: "Fully Insured",
                    body: "Comprehensive $2M liability coverage for peace of mind.",
                  },
                ].map(({ icon: Icon, title, body }) => (
                  <div
                    key={title}
                    className="flex flex-col gap-3 rounded-2xl bg-surface-soft p-6 shadow-sm"
                  >
                    <Icon className="size-6 text-brand" aria-hidden />
                    <h3 className="text-base font-semibold text-ink">{title}</h3>
                    <p className="text-sm leading-5 text-body-secondary">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-border-gray pt-6">
              <h2 className="font-heading text-xl font-semibold text-ink-heading">
                Services
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {SERVICES.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-base text-body-secondary"
                  >
                    <span
                      className="size-1.5 shrink-0 rounded-full bg-footer-bar"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="w-full shrink-0 space-y-6 lg:max-w-md lg:pt-0">
            <div className="relative rounded-3xl border border-border-light bg-card p-8 shadow-xl">
              <div className="flex flex-col gap-4">
                <Button
                  type="button"
                  className="h-14 rounded-xl bg-brand-red text-base font-medium text-ice hover:bg-brand-red/90"
                >
                  <Phone className="size-5" aria-hidden />
                  Show phone number
                </Button>
                <Button
                  type="button"
                  className="h-14 rounded-xl border border-ice bg-brand text-base font-medium text-ice hover:bg-brand/90"
                >
                  <MessageCircle className="size-5" aria-hidden />
                  Direct Message
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-14 rounded-xl border-brand bg-surface-soft text-base font-medium text-brand hover:bg-surface-soft"
                >
                  <svg
                    className="size-5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat via WhatsApp
                </Button>
              </div>
              <div className="mt-6 space-y-4 border-t border-border-light pt-5">
                <p className="flex items-center gap-3 text-sm font-medium text-ink">
                  <Clock className="size-4 shrink-0 text-stat-muted" aria-hidden />
                  Usually responds within 15 mins
                </p>
                <p className="flex items-center gap-3 text-sm font-medium text-ink">
                  <Shield className="size-5 shrink-0 text-stat-muted" aria-hidden />
                  Secure transaction protection
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-medium uppercase tracking-tight text-stat-muted">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 hover:text-ink"
                >
                  <Heart className="size-4" aria-hidden />
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 hover:text-ink"
                >
                  <ExternalLink className="size-4" aria-hidden />
                  Website
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 hover:text-ink"
                >
                  <Share2 className="size-4" aria-hidden />
                  Share listing
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-surface-soft p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-stat-muted">
                Business Hours
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex justify-between gap-4">
                  <span className="text-body-secondary">Mon — Fri</span>
                  <span className="font-semibold text-ink">08:00 AM - 07:00 PM</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-body-secondary">Saturday</span>
                  <span className="font-semibold text-ink">09:00 AM - 04:00 PM</span>
                </li>
                <li className="flex justify-between gap-4 font-medium text-brand-red">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <section className="mt-12 space-y-4 rounded-2xl border border-stat-muted bg-card-ice p-6 md:p-8">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Photos
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <AspectCover
              src={IMAGES.photo1}
              className="aspect-[4/3] w-full rounded-xl md:min-h-[280px] md:aspect-auto md:h-[min(432px,50vw)]"
            />
            <AspectCover
              src={IMAGES.photo2}
              className="aspect-[4/3] w-full rounded-xl md:min-h-[280px] md:aspect-auto md:h-[min(432px,50vw)]"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <AspectCover
              src={IMAGES.photo3}
              className="aspect-[4/3] w-full rounded-xl md:aspect-[5/4] md:min-h-[240px]"
            />
            <AspectCover
              src={IMAGES.photo4}
              className="aspect-[4/3] w-full rounded-xl md:aspect-[5/4] md:min-h-[240px]"
            />
            <button
              type="button"
              className="relative w-full cursor-pointer overflow-hidden rounded-xl border-0 p-0 text-left outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-brand"
              onClick={() => setPhotosOpen(true)}
            >
              <AspectCover
                src={IMAGES.photo5}
                className="aspect-[4/3] w-full rounded-xl md:aspect-[5/4] md:min-h-[240px]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/30" aria-hidden />
              <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-4xl font-semibold text-white drop-shadow-md">
                +20
              </span>
            </button>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Service Area
            </h2>
            <button
              type="button"
              className="text-left text-sm font-semibold text-accent-foreground hover:underline sm:text-base"
            >
              New York, NY &amp; Surrounding Boroughs
            </button>
          </div>
          <div className="relative h-80 overflow-hidden rounded-2xl border border-stat-muted shadow-inner md:h-96">
            <img
              src={IMAGES.map}
              alt=""
              className="absolute inset-0 block size-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-white/40 mix-blend-saturation" aria-hidden />
            <MapPin
              className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-brand drop-shadow-md"
              strokeWidth={1.5}
              aria-hidden
            />
            <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-4 py-2 shadow-md backdrop-blur-sm">
              <p className="text-xs font-semibold text-ink">
                Click to expand detailed map
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Reviews
            </h2>
            <button
              type="button"
              className="border-b-2 border-accent-foreground/20 pb-0.5 text-base font-semibold text-accent-foreground hover:opacity-90"
            >
              Write a review
            </button>
          </div>
          <div className="space-y-10">
            <article className="flex gap-6">
              <AspectCover
                src={IMAGES.review1}
                className="size-14 shrink-0 rounded-full ring-2 ring-border-light md:size-16"
              />
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-ink">Sarah Jenkins</p>
                  <p className="text-sm text-stat-muted">Oct 2023</p>
                </div>
                <StarRow className="scale-90 origin-left" />
                <p className="text-base leading-relaxed text-body-secondary">
                  Absolutely impeccable. The team arrived on time, were
                  incredibly respectful of my home office space, and the
                  attention to detail on the glass surfaces was beyond what I
                  expected.
                </p>
              </div>
            </article>
            <article className="flex gap-6 opacity-70">
              <AspectCover
                src={IMAGES.review2}
                className="size-14 shrink-0 rounded-full ring-2 ring-border-light md:size-16"
              />
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-ink">Marcus Thorne</p>
                  <p className="text-sm text-stat-muted">Sept 2023</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {[0, 1, 2, 3].map((i) => (
                    <Star
                      key={i}
                      className="size-5 shrink-0 fill-brand-red text-brand-red"
                      aria-hidden
                    />
                  ))}
                  <Star className="size-5 shrink-0 text-brand-red" aria-hidden />
                </div>
                <p className="text-base leading-relaxed text-body-secondary">
                  Great service for maintenance. They fixed a plumbing issue and
                  cleaned the HVAC filters in one visit. Highly recommend for
                  busy professionals.
                </p>
              </div>
            </article>
          </div>
          <div className="flex items-center justify-center gap-2 pt-4">
            <span className="size-2 rounded-full bg-stat-muted" aria-hidden />
            <span
              className="size-2 rounded-full bg-stat-muted/50"
              aria-hidden
            />
            <span
              className="size-2 rounded-full bg-stat-muted/20"
              aria-hidden
            />
            <span className="pl-2 text-xs font-semibold uppercase tracking-widest text-stat-muted">
              Loading more...
            </span>
          </div>
        </section>
      </div>

      <ServicePhotosModal
        open={photosOpen}
        onClose={() => setPhotosOpen(false)}
        images={{
          hero: IMAGES.hero,
          photo1: IMAGES.photo1,
          photo2: IMAGES.photo2,
          photo3: IMAGES.photo3,
          photo4: IMAGES.photo4,
          photo5: IMAGES.photo5,
        }}
      />
    </div>
  );
}
