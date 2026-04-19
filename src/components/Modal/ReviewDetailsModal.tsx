import { Star, X } from "lucide-react";

import type { ReviewRow } from "@/components/Modal/ReviewDetailsModal.types";

export type { ReviewRow } from "@/components/Modal/ReviewDetailsModal.types";

type ReviewDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  review: ReviewRow | null;
};

export function ReviewDetailsModal({ open, onClose, review }: ReviewDetailsModalProps) {
  if (!open || !review) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-card shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-details-title"
      >
        <div className="flex h-[61px] items-center justify-between border-b border-border-gray px-6">
          <h2 id="review-details-title" className="text-lg font-semibold leading-7 text-ink-heading">
            Review Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-5 items-center justify-center text-body-secondary hover:text-ink"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 pb-6 pt-6">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-body-secondary">User</p>
            <p className="text-base font-normal leading-6 text-ink">{review.userName}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-body-secondary">Business</p>
            <p className="text-base font-normal leading-6 text-ink">{review.business}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-body-secondary">Rating</p>
            <div className="flex items-center gap-1 pt-1" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`size-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                  strokeWidth={1.5}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-body-secondary">Comment</p>
            <div className="pt-1">
              <p className="inline-block max-w-full rounded-xl bg-[rgb(27_175_93/0.1)] px-3 py-2 text-sm font-medium leading-relaxed text-[#1baf5d]">
                {review.comment}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-body-secondary">Date &amp; Time</p>
            <p className="text-base font-normal leading-6 text-ink">{review.dateTimeLong}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
