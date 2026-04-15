import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  CircleCheck,
  PenSquare,
  TriangleAlert,
} from "lucide-react";

import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

/** Hero photo from Figma (node 591:4771), exported to repo: olabisiolai--Copy- */
const HERO_IMAGE = "/images/business-tips/writing-compelling-description-hero.jpg";

export default function WritingACompellingDescription() {
  return (
    <div className="w-full bg-background">
      <section className="bg-ink py-14 text-center sm:py-20 lg:py-24">
        <div className={cn(container, "flex flex-col items-center")}>
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-success/20 text-success">
            <PenSquare className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold text-ice sm:text-4xl lg:text-6xl">
            Writing a Compelling Description
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-stat-muted sm:text-base lg:text-xl">
            Craft descriptions that convert visitors into customers and build immediate trust for
            your brand.
          </p>
        </div>
      </section>

      <section className="py-6">
        <div className={cn(container)}>
          <Link
            to="/business-tips"
            className="inline-flex items-center gap-2 text-sm font-medium text-body-secondary hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Business Tips
          </Link>
        </div>
      </section>

      <section className="pb-10 lg:pb-16">
        <div className={cn(container, "space-y-8 lg:space-y-12")}>
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">First Impressions Count</h2>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="space-y-4 text-base leading-7 text-body-secondary">
                <p>
                  Your business description is often the first thing a potential customer reads
                  about you on Gidira. While photos grab attention, your description explains what
                  you do and why someone should choose you over competitors.
                </p>
                <p>
                  Profiles with detailed, well-written descriptions receive{" "}
                  <span className="font-semibold text-success">3x more inquiries</span> than those
                  with vague or missing information.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border-light bg-card p-2 shadow-md">
                <img
                  src={HERO_IMAGE}
                  alt="Person writing in a notebook next to a laptop in a bright office"
                  className="h-52 w-full rounded-xl object-cover sm:h-64"
                  decoding="async"
                />
              </div>
            </div>
            <div className="rounded-r-xl border-l-4 border-success bg-success/10 p-5">
              <p className="text-sm font-semibold text-ink">Gidira Insight</p>
              <p className="mt-2 text-sm italic text-body-secondary">
                Customers look for key pieces of info: what you offer, how you&apos;re different,
                your experience, and how to contact you.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">The Perfect Structure</h2>
            <div className="space-y-3">
              {[
                "Opening Hook (1 sentence): Explain what makes your service different.",
                "What You Offer (2-3 sentences): Mention your key services and specialties.",
                "Why You’re Different (1-2 sentences): Add proof points or credibility.",
                "Social Proof (1-2 sentences): Mention customer satisfaction or success stories.",
                "Call to Action (1 sentence): Encourage immediate contact or booking.",
              ].map((line) => (
                <div key={line} className="rounded-xl border border-border-gray bg-card p-4">
                  <p className="inline-flex items-start gap-2 text-sm text-body-secondary">
                    <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span>{line}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-ink p-6">
              <h3 className="text-lg font-semibold text-ice">What to Include</h3>
              <ul className="mt-3 space-y-2 text-sm text-stat-muted">
                <li>Location, specialties, and business focus</li>
                <li>Years of experience and certifications</li>
                <li>How customers can contact or book you</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border-gray bg-card p-6">
              <h3 className="text-lg font-semibold text-ink">Services/Products List</h3>
              <p className="mt-3 text-sm text-body-secondary">
                Keep this section clear and scan-friendly. Group related offerings and avoid long
                paragraphs.
              </p>
              <div className="mt-3 rounded-lg bg-surface-soft p-3 text-sm text-body-secondary">
                Use bullet-style formatting to improve readability.
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Power Words That Convert</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Trusted", "Guaranteed", "Professional", "Affordable"].map((word) => (
                <div key={word} className="rounded-lg border border-border-gray bg-card p-3 text-center">
                  <p className="text-sm font-semibold text-success">{word}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-muted p-6">
            <h2 className="text-2xl font-bold text-ink">Common Mistakes to Avoid</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Too short: Missing important details and credibility.",
                "Generic copy: Sounds like every other profile.",
                "Using all caps: Hard to read and appears unprofessional.",
                "Being too vague: Customers need specific information.",
              ].map((mistake) => (
                <p key={mistake} className="inline-flex items-start gap-2 text-sm text-body-secondary">
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  <span>{mistake}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">Examples by Industry</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-border-gray bg-card p-4">
                <p className="text-sm font-semibold text-ink">Restaurant / Catering</p>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  <p className="rounded-lg bg-tint-red p-3 text-sm text-body-secondary">
                    Weak: &quot;We cook food. Fast delivery.&quot;
                  </p>
                  <p className="rounded-lg bg-success/10 p-3 text-sm text-body-secondary">
                    Better: &quot;We provide fresh meals for events and offices with same-day
                    delivery across Lagos.&quot;
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-border-gray bg-card p-4">
                <p className="text-sm font-semibold text-ink">Tech & Phone Repair</p>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  <p className="rounded-lg bg-tint-red p-3 text-sm text-body-secondary">
                    Weak: &quot;Phone repairs done quickly.&quot;
                  </p>
                  <p className="rounded-lg bg-success/10 p-3 text-sm text-body-secondary">
                    Better: &quot;Screen, battery, and charging repairs with warranty-backed parts
                    and same-day turnaround.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-surface-soft px-4 py-10 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              Ready to Put These Tips Into Action?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-body-secondary sm:text-base">
              Update your description today and see the difference it makes in your customer
              conversion rate.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-3 text-sm font-medium text-ice hover:opacity-90 sm:text-base"
            >
              <CheckCircle2 className="h-4 w-4" />
              Improve Your Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
