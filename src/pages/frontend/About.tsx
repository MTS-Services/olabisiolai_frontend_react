import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Store, Target, Trophy, UsersRound } from "lucide-react";

import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "flex w-full max-w-4xl flex-col gap-4 self-center rounded-2xl bg-card p-8 shadow-md",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center" aria-hidden>
          {icon}
        </div>
        <h2 className="text-2xl font-bold leading-8 text-ink-heading">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function About() {
  return (
    <div className="w-full bg-muted">
      <div
        className={cn(
          container,
          "flex flex-col gap-10 lg:py-16 sm:gap-9 py-10 lg:gap-10",
        )}
      >
        <header className="mx-auto flex w-full max-w-4xl flex-col gap-4 text-center">
          <h1 className="lg:text-4xl text-2xl font-bold leading-10 text-ink-heading">
            About Gidira
          </h1>
          <p className="text-xl font-normal leading-7 text-body-secondary">
            Nigeria&apos;s Leading Multi-Service Marketplace
          </p>
        </header>

        <SectionCard
          icon={<Target className="size-8 text-brand" strokeWidth={2} aria-hidden />}
          title="Our Mission"
        >
          <p className="text-base leading-relaxed text-body-secondary">
            Gidira is dedicated to connecting Nigerians with trusted, verified
            service providers across the country. We believe in empowering local
            businesses while making it easier for customers to find reliable
            services they can trust. Our platform bridges the gap between service
            providers and customers, creating opportunities for growth and
            building a thriving digital economy.
          </p>
        </SectionCard>

        <SectionCard
          icon={<Store className="size-8 text-brand-red" strokeWidth={2} aria-hidden />}
          title="What We Do"
        >
          <p className="text-base leading-relaxed text-body-secondary">
            Gidira is a comprehensive multi-vendor and multi-service marketplace
            that serves as a digital bridge between customers and service
            providers. We offer:
          </p>
          <ul className="flex flex-col gap-3">
            <li className="flex gap-3">
              <span
                className="mt-2 h-2 w-1.5 shrink-0 rounded-full bg-footer-bar"
                aria-hidden
              />
              <p className="text-base leading-6 text-body-secondary">
                <span className="font-bold">Verified Business Listings:</span> Every
                business can list for free, with premium verification badges for
                businesses that complete our trust and safety verification
                process.
              </p>
            </li>
            <li className="flex gap-3">
              <span
                className="mt-2 h-2 w-1.5 shrink-0 rounded-full bg-footer-bar"
                aria-hidden
              />
              <p className="text-base leading-6 text-body-secondary">
                <span className="font-bold">Featured Placement:</span> Service
                providers can boost their visibility through targeted local
                advertising and featured placements.
              </p>
            </li>
            <li className="flex gap-3">
              <span
                className="mt-2 h-2 w-1.5 shrink-0 rounded-full bg-footer-bar"
                aria-hidden
              />
              <p className="text-base leading-6 text-body-secondary">
                <span className="font-bold">Easy Contact:</span> Direct WhatsApp
                and phone integration makes it simple for customers to connect
                with businesses instantly.
              </p>
            </li>
            <li className="flex gap-3">
              <span
                className="mt-2 h-2 w-1.5 shrink-0 rounded-full bg-footer-bar"
                aria-hidden
              />
              <p className="text-base leading-6 text-body-secondary">
                <span className="font-bold">Reviews &amp; Ratings:</span>{" "}
                Transparent customer feedback helps build trust and helps others
                make informed decisions.
              </p>
            </li>
          </ul>
        </SectionCard>

        <SectionCard
          icon={
            <Trophy className="size-8 text-brand" strokeWidth={2} aria-hidden />
          }
          title="Why Choose Gidira?"
        >
          <div className="grid gap-8 md:grid-cols-2 md:gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold leading-7 text-ink-heading">
                For Customers
              </h3>
              <ul className="flex flex-col gap-2 text-sm leading-5 text-body-secondary">
                <li>✓ Access to verified, trustworthy businesses</li>
                <li>✓ Easy filtering by location and category</li>
                <li>✓ Direct contact via WhatsApp and phone</li>
                <li>✓ Real customer reviews and ratings</li>
                <li>✓ Priority ranking shows the best first</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold leading-7 text-ink-heading">
                For Businesses
              </h3>
              <ul className="flex flex-col gap-2 text-sm leading-5 text-body-secondary">
                <li>✓ Free business listing to get started</li>
                <li>✓ Verification badges to build trust</li>
                <li>✓ Featured placement options for visibility</li>
                <li>✓ Analytics dashboard to track performance</li>
                <li>✓ Direct customer engagement</li>
              </ul>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          icon={
            <UsersRound className="size-8 text-brand-red" strokeWidth={2} aria-hidden />
          }
          title="Our Values"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <div className="flex max-w-60 flex-col gap-2">
              <h3 className="text-lg font-semibold leading-7 text-footer-bar">
                Trust
              </h3>
              <p className="text-sm leading-5 text-body-secondary">
                We verify businesses to help you make confident choices. We still
                recommend double-checking details and asking questions so you can
                proceed with complete peace of mind.
              </p>
            </div>
            <div className="flex max-w-60 flex-col gap-2">
              <h3 className="text-lg font-semibold leading-7 text-footer-bar">
                Transparency
              </h3>
              <p className="text-sm leading-5 text-body-secondary">
                Honest reviews, clear pricing, and open communication between
                businesses and customers.
              </p>
            </div>
            <div className="flex max-w-60 flex-col gap-2 sm:col-span-2 sm:max-w-none lg:col-span-1">
              <h3 className="text-lg font-semibold leading-7 text-footer-bar">
                Growth
              </h3>
              <p className="text-sm leading-5 text-body-secondary">
                We&apos;re committed to helping Nigerian businesses grow and thrive
                in the digital economy.
              </p>
            </div>
          </div>
        </SectionCard>

        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4">
          <h2 className="text-center lg:text-2xl text-2xl font-bold leading-8 text-ink-heading">
            Ready to Get Started?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/filters"
              className="inline-flex items-center justify-center rounded-xl bg-brand lg:px-8 px-4 lg:py-4 py-2 text-base font-normal text-ice transition-opacity hover:opacity-90"
            >
              Explore businesses
            </Link>
            <Link
              to="/trade"
              className="inline-flex items-center justify-center rounded-xl bg-brand-red lg:px-8 px-4 lg:py-4 py-2 text-base font-normal text-primary-foreground transition-opacity hover:opacity-90"
            >
              Trade
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
