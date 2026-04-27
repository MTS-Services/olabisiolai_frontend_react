import { ChevronLeft, ChevronRight, Eye, EyeOff, Flag, Star, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { ReviewDetailsModal } from "@/components/Modal/ReviewDetailsModal";
import type { ReviewRow } from "@/components/Modal/ReviewDetailsModal.types";

const TOTAL_TRANSACTIONS = 482;

const reviews: ReviewRow[] = [
  {
    id: 1,
    userName: "Chukwudi Okafor",
    userDate: "Mar 28, 2024",
    business: "Mama Put Restaurant",
    rating: 5,
    comment: "Excellent food and service! The jollof rice is amazing.",
    flagged: false,
    status: "approved",
    dateTimeLong: "April 1, 2024 at 02:30 PM",
  },
  {
    id: 2,
    userName: "Aisha Mohammed",
    userDate: "Mar 29, 2024",
    business: "TechHub Solutions",
    rating: 5,
    comment: "Great work, delivered on time. Very professional team.",
    flagged: false,
    status: "approved",
    dateTimeLong: "March 29, 2024 at 11:00 AM",
  },
  {
    id: 3,
    userName: "Ngozi Eze",
    userDate: "Mar 30, 2024",
    business: "Divine Salon & Spa",
    rating: 2,
    comment: "Service was poor and unprofessional. Not recommended.",
    flagged: true,
    status: "pending",
    dateTimeLong: "March 30, 2024 at 04:15 PM",
  },
  {
    id: 4,
    userName: "Ibrahim Musa",
    userDate: "Apr 1, 2024",
    business: "Fresh Groceries Ltd",
    rating: 5,
    comment: "Fresh produce at good prices. Will definitely come back!",
    flagged: false,
    status: "approved",
    dateTimeLong: "April 1, 2024 at 09:00 AM",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function statusBadge(status: ReviewRow["status"]) {
  if (status === "approved") {
    return (
      <span className="inline-flex rounded-full bg-[rgb(27_175_93/0.1)] px-2.5 py-0.5 text-xs font-medium lowercase text-[#1baf5d]">
        approved
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium lowercase text-amber-800">
      pending
    </span>
  );
}

export default function Reviews() {
  const [selectedReview, setSelectedReview] = useState<ReviewRow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "flagged" | "approved">("all");

  const visibleReviews = useMemo(() => {
    if (activeTab === "all") return reviews;
    if (activeTab === "flagged") return reviews.filter((review) => review.flagged);
    return reviews.filter((review) => review.status === activeTab);
  }, [activeTab]);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold leading-8 text-ink-heading sm:text-2xl">Reviews</h1>
      </div>

      <section className="mb-4 rounded-2xl border border-chat-border-subtle bg-card p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-chat-accent">Content Moderation</p>
        <h2 className="text-2xl font-semibold text-ink">Review Management</h2>
        <p className="text-sm text-chat-meta">Monitor and moderate customer reviews across the platform</p>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-chat-meta">Total Reviews</p>
            <p className="mt-1 text-4xl font-semibold leading-10 text-ink">18,432</p>
            <p className="mt-1 text-xs font-medium text-success">+8%</p>
          </article>
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-chat-meta">Average Rating</p>
            <p className="mt-1 text-4xl font-semibold leading-10 text-ink">4.3</p>
            <p className="mt-1 text-xs font-medium text-amber-600">★★★★★</p>
          </article>
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-chat-meta">Flagged Reviews</p>
            <p className="mt-1 text-4xl font-semibold leading-10 text-ink">24</p>
            <p className="mt-1 text-xs font-medium text-brand-red">Urgent</p>
          </article>
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-chat-meta">Pending Today</p>
            <p className="mt-1 text-4xl font-semibold leading-10 text-ink">156</p>
            <p className="mt-1 text-xs font-medium text-success">+9%</p>
          </article>
        </div>
      </section>

      <section className="rounded-2xl border border-border-gray bg-card p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]">
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg bg-background p-2">
          {(["all", "pending", "flagged", "approved"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${activeTab === tab ? "bg-chat-accent text-ice" : "bg-card text-body-secondary hover:bg-muted"
                }`}
            >
              {tab === "all" ? "All Reviews" : tab}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse">
            <thead>
              <tr className="border-b border-border-gray">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-body-secondary">Reviewer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-body-secondary">Business</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-body-secondary">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-body-secondary">Review Excerpt</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-body-secondary">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-body-secondary">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-body-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleReviews.map((review) => (
                <tr key={review.id} className="border-b border-border-light">
                  <td className="px-4 py-4">
                    <p className="text-base font-medium text-ink">{review.userName}</p>
                    <p className="text-xs text-gray-500">{review.userDate}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-ink">{review.business}</td>
                  <td className="px-4 py-4">
                    <StarRow rating={review.rating} />
                  </td>
                  <td className="max-w-sm px-4 py-4">
                    <div className="flex items-start gap-2">
                      <p className="text-sm leading-5 text-gray-600">{review.comment}</p>
                      {review.flagged ? <Flag className="mt-0.5 size-4 shrink-0 text-brand-red" aria-label="Flagged" /> : null}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-body-secondary">{review.userDate}</td>
                  <td className="px-4 py-4">{statusBadge(review.status)}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedReview(review);
                          setModalOpen(true);
                        }}
                        className="inline-flex size-7 items-center justify-center rounded-xl hover:bg-muted"
                        aria-label="View review"
                      >
                        <Eye className="size-4 text-emerald-600" strokeWidth={2} />
                      </button>
                      <button
                        type="button"
                        className="inline-flex size-7 items-center justify-center rounded-xl hover:bg-muted"
                        aria-label="Hide review"
                      >
                        <EyeOff className="size-4 text-amber-600" strokeWidth={2} />
                      </button>
                      <button
                        type="button"
                        className="inline-flex size-7 items-center justify-center rounded-xl hover:bg-muted"
                        aria-label="Delete review"
                      >
                        <Trash2 className="size-4 text-brand-red" strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {visibleReviews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-chat-meta">
                    No reviews found for this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-tint-red/20 px-1 pb-0 pt-4">
          <p className="text-xs font-medium text-stone-700">
            Showing 1-10 of {TOTAL_TRANSACTIONS} transactions
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg opacity-30"
              disabled
              aria-label="Previous page"
            >
              <ChevronLeft className="size-3.5 text-stone-700" />
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg bg-brand-red text-xs font-semibold text-white"
            >
              1
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-xs font-semibold text-stone-700 hover:bg-muted"
            >
              2
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-xs font-semibold text-stone-700 hover:bg-muted"
            >
              3
            </button>
            <span className="px-1 text-base text-stone-700">...</span>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-xs font-semibold text-stone-700 hover:bg-muted"
            >
              49
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-stone-700 hover:bg-muted"
              aria-label="Next page"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-chat-border-subtle bg-card p-4">
        <h3 className="text-sm font-semibold text-ink">Sentiment Analysis</h3>
        <div className="mt-3 space-y-3">
          {[
            { label: "Positive", value: 78, color: "bg-success" },
            { label: "Neutral", value: 14, color: "bg-amber-500" },
            { label: "Negative", value: 8, color: "bg-brand-red" },
          ].map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-body-secondary">{item.label}</span>
                <span className="font-medium text-ink">{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <ReviewDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} review={selectedReview} />
    </div>
  );
}
