import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  MessageCircleReply,
  MessageSquareText,
  PhoneCall,
  Send,
  Star,
} from "lucide-react";

import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

const HERO_IMAGE = "/images/feature/1-1.jpg";

const CHECKLIST = [
  {
    title: "Respond within 10 minutes",
    desc: "Speed signals professionalism and keeps warm leads from going cold.",
  },
  {
    title: "Personalize your greeting",
    desc: "Use the customer's name and reference their enquiry to build trust fast.",
  },
  {
    title: "Lean on simple templates",
    desc: "Reusable snippets keep replies fast without sounding robotic.",
  },
  {
    title: "Follow up at least twice",
    desc: "If they go quiet, a gentle nudge often closes what the first reply started.",
  },
  {
    title: "End with a clear call-to-action",
    desc: "Tell them exactly what to do next—book, pay, choose a slot, or reply with a detail.",
  },
] as const;

export default function RespondingToCustomerEnquiries() {
  const [checklistDone, setChecklistDone] = useState<Record<string, boolean>>({});

  return (
    <div className="w-full bg-background">
      <section className="bg-ink py-14 text-center sm:py-20 lg:py-24">
        <div className={cn(container, "flex flex-col items-center")}>
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-success/20 text-success">
            <MessageCircleReply className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold text-ice sm:text-4xl lg:text-6xl">
            Responding to Customer Enquiries
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-stat-muted sm:text-base lg:text-xl">
            Turn every message into a relationship. Master fast, professional communication that
            helps your Nigerian business grow.
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
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl bg-muted p-5 lg:col-span-2">
              <h2 className="text-xl font-bold text-ink">Speed is Everything</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-card p-4">
                  <p className="text-3xl font-bold text-success">5min</p>
                  <p className="mt-1 text-sm text-body-secondary">Best response window</p>
                </div>
                <div className="rounded-lg bg-card p-4">
                  <p className="text-3xl font-bold text-success">78%</p>
                  <p className="mt-1 text-sm text-body-secondary">Customers prefer fast replies</p>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-success/10 p-3 text-sm text-success">
                Reply within 5 minutes whenever possible for better conversion.
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold text-ink">Professional Greetings</p>
                <p className="mt-1 text-xs text-body-secondary">
                  Use a clear greeting with name and service context.
                </p>
              </div>
              <div className="rounded-xl bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold text-ink">Use Their Name</p>
                <p className="mt-1 text-xs text-body-secondary">
                  Personalized replies increase trust immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Common Enquiry Templates</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                "Pricing Enquiry",
                "Availability",
                "Service Area",
              ].map((t) => (
                <div key={t} className="rounded-xl border border-border-gray bg-card p-4">
                  <p className="font-semibold text-ink">{t}</p>
                  <p className="mt-2 text-sm text-body-secondary">Keep template simple and editable.</p>
                  <p className="mt-3 inline-flex items-center gap-1 text-xs text-success">
                    Copy Template <Send className="h-3 w-3" />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl bg-ink p-6">
              <h2 className="text-2xl font-bold text-ice">Handling Price Negotiations</h2>
              <ul className="mt-4 space-y-3 text-sm text-stat-muted">
                <li className="inline-flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Explain value before discussing discounts.
                </li>
                <li className="inline-flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Offer structured alternatives, not random cuts.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl bg-card p-3 shadow-md">
              <img
                src={HERO_IMAGE}
                alt="Customer responding to enquiry on phone"
                className="h-56 w-full rounded-xl object-cover sm:h-64"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-muted p-5">
              <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-ink">
                <PhoneCall className="h-4 w-4 text-success" />
                Converting to Sales
              </h3>
              <p className="mt-2 text-sm text-body-secondary">
                Ask the right qualifying questions and propose clear next steps.
              </p>
            </div>
            <div className="rounded-2xl bg-muted p-5">
              <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-ink">
                <MessageSquareText className="h-4 w-4 text-success" />
                Managing Volume
              </h3>
              <p className="mt-2 text-sm text-body-secondary">
                Use labels, templates, and queues to respond consistently at scale.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-muted p-6 text-center sm:p-8">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">The Follow-Up Engine</h2>
            <p className="mt-2 text-sm text-body-secondary">Most conversions happen after follow-up.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["24h", "48h", "72h"].map((d) => (
                <div key={d} className="rounded-lg bg-card p-3">
                  <p className="text-lg font-bold text-success">{d}</p>
                  <p className="text-xs text-body-secondary">Best follow-up window</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key takeaways */}
          <div className="mx-auto w-full max-w-3xl">
            <div className="rounded-[32px] border border-black/10 bg-[#eff6ff] px-6 py-10 shadow-sm sm:px-10 sm:py-12">
              <div className="mb-8 flex items-center gap-3">
                <Star className="size-5 text-[#158de0]" aria-hidden />
                <h3 className="text-2xl font-semibold text-[#191c1e]">Key Takeaways Checklist</h3>
              </div>
              <ul className="flex flex-col gap-6">
                {CHECKLIST.map(({ title, desc }) => {
                  const done = checklistDone[title] ?? false;
                  return (
                    <li key={title} className="flex items-start gap-4 rounded-xl p-2 sm:p-4">
                      <button
                        type="button"
                        onClick={() =>
                          setChecklistDone((prev) => ({ ...prev, [title]: !prev[title] }))
                        }
                        className={cn(
                          "mt-1.25 inline-flex size-4.5 shrink-0 cursor-pointer items-center justify-center rounded-[3px] border shadow-inner transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#158de0]",
                          done
                            ? "border-[#158de0] bg-[#158de0] ring-1 ring-[#158de0]/25"
                            : "border-[#b8bcc8] bg-white ring-1 ring-black/4 hover:border-[#158de0]/60",
                        )}
                        aria-pressed={done}
                        aria-label={done ? `Unmark: ${title}` : `Mark done: ${title}`}
                      >
                        {done ? (
                          <Check className="size-3 text-white" strokeWidth={3} aria-hidden />
                        ) : null}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold leading-snug text-[#191c1e]">{title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[#44474d]">{desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl bg-surface-soft px-4 py-10 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              Ready to Start Converting More Enquiries Today?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-body-secondary sm:text-base">
              Small improvements in response speed and clarity create meaningful growth.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-3 text-sm font-medium text-ice hover:opacity-90 sm:text-base"
            >
              Update Your Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
