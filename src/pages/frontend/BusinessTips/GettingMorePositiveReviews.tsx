import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  MessageSquareQuote,
  ShieldCheck,
  Star,
  TriangleAlert,
} from "lucide-react";

import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

const TEAM_IMAGE = "https://www.figma.com/api/mcp/asset/b684f1c3-9b4c-48a0-8f5d-0d3486f3913e";
const CUSTOMER_IMAGE =
  "https://www.figma.com/api/mcp/asset/73e7ba8f-54dd-4902-87c8-81e13061c269";

export default function GettingMorePositiveReviews() {
  return (
    <div className="w-full bg-background">
      <section className="bg-ink py-14 text-center sm:py-20 lg:py-24">
        <div className={cn(container, "flex flex-col items-center")}>
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-success/20 text-success">
            <Star className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold text-ice sm:text-4xl lg:text-6xl">
            Getting More Positive Reviews
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-stat-muted sm:text-base lg:text-xl">
            Transform your customer feedback into a powerful growth engine for your business in
            Nigeria.
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
          <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">Why Reviews Matter</h2>
              <p className="text-base leading-7 text-body-secondary">
                In our digital-first market, reviews act as your digital handshake. They build trust
                quickly and influence purchase decisions.
              </p>
              <div className="rounded-r-xl border-l-4 border-success bg-success/10 p-4">
                <p className="text-sm text-body-secondary">
                  90% of Nigerian customers read online reviews before buying. Strong positive
                  reviews increase your chance of conversion significantly.
                </p>
              </div>
            </div>
            <img
              src={TEAM_IMAGE}
              alt="Team discussing customer reviews"
              className="h-56 w-full rounded-2xl object-cover sm:h-72"
            />
          </div>

          <div className="rounded-3xl bg-muted p-6 sm:p-8">
            <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">
              Delivering Review-Worthy Service
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {[
                "Exceed Expectations",
                "Be Professional",
                "Personal Touches",
                "Consistency",
              ].map((item) => (
                <div key={item} className="rounded-xl bg-card p-4 text-sm font-semibold text-ink">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl bg-ink p-6">
              <h3 className="text-xl font-semibold text-ice">When to Ask for Reviews</h3>
              <div className="mt-4 space-y-3 text-sm text-stat-muted">
                <p>
                  <span className="font-semibold text-success">01 -</span> The Happiness Peak:
                  ask right after successful delivery.
                </p>
                <p>
                  <span className="font-semibold text-success">02 -</span> Service-Specific Timing:
                  ask after impact is visible.
                </p>
              </div>
            </div>
            <img
              src={CUSTOMER_IMAGE}
              alt="Happy customer checking phone"
              className="h-56 w-full rounded-2xl object-cover sm:h-72"
            />
          </div>

          <div className="rounded-2xl border border-border-gray bg-card p-6">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">How to Ask</h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="space-y-3">
                <div className="rounded-lg bg-success/10 p-3 text-sm text-body-secondary">
                  <p className="font-semibold text-success">In Person</p>
                  Ask politely once the customer confirms satisfaction.
                </div>
                <div className="rounded-lg bg-success/10 p-3 text-sm text-body-secondary">
                  <p className="font-semibold text-success">Via WhatsApp</p>
                  Send a short and friendly follow-up message with your review link.
                </div>
              </div>
              <div className="rounded-lg border border-border-gray bg-muted p-4 text-sm text-body-secondary">
                <p className="font-semibold text-ink">Message Template Box</p>
                <p className="mt-2 italic">
                  “Hi [Name], thank you for your support. If you enjoyed our service, please share a
                  quick review on Gidira. It helps more customers find us.”
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">
              Handling Negative Reviews
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {["Stay Calm", "Respond Professionally", "Offer Solution", "Turn Positive"].map((s) => (
                <div key={s} className="rounded-xl bg-muted p-4 text-sm font-semibold text-ink">
                  {s}
                </div>
              ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl bg-success/10 p-5">
                <p className="font-semibold text-ink">Responding to All Reviews</p>
                <p className="mt-2 text-sm text-body-secondary">
                  Thank positive reviewers and acknowledge every complaint respectfully. This shows
                  accountability and builds confidence for new customers.
                </p>
              </div>
              <div className="rounded-2xl bg-ink p-5">
                <p className="font-semibold text-ice">Building a Review Culture</p>
                <ul className="mt-3 space-y-2 text-sm text-stat-muted">
                  <li className="inline-flex gap-2">
                    <ShieldCheck className="h-4 w-4 text-success" />
                    Make reviews part of your service routine.
                  </li>
                  <li className="inline-flex gap-2">
                    <MessageSquareQuote className="h-4 w-4 text-success" />
                    Provide clear review links.
                  </li>
                  <li className="inline-flex gap-2">
                    <ClipboardCheck className="h-4 w-4 text-success" />
                    Train your team to request feedback.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-2xl rounded-3xl bg-surface-soft p-6 sm:p-8">
            <h3 className="text-xl font-bold text-ink">Key Takeaways Checklist</h3>
            <ul className="mt-4 space-y-2 text-sm text-body-secondary">
              {[
                "Deliver excellent service consistently.",
                "Ask at the right moment.",
                "Use friendly and clear language.",
                "Respond to every review quickly.",
              ].map((line) => (
                <li key={line} className="inline-flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-surface-soft px-4 py-10 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              Ready to Put These Tips Into Action?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-body-secondary sm:text-base">
              Collecting positive reviews consistently can significantly improve your profile
              performance.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-3 text-sm font-medium text-ice hover:opacity-90 sm:text-base"
            >
              <TriangleAlert className="h-4 w-4" />
              Start Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
