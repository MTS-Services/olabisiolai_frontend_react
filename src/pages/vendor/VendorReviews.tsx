import { ReviewCard } from "@/components/sections/vendor/review/ReviewCard";
import { initialReviews, type ReviewItem } from "@/components/sections/vendor/review/reviewData";
import { ReviewSummaryCard } from "@/components/sections/vendor/review/ReviewSummaryCard";
import { useState } from "react";


export default function VendorReviews() {
    const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
    const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
    const [draft, setDraft] = useState("");
  
    const submitReply = (reviewId: string) => {
      const text = draft.trim();
      if (!text) return;
  
      setReviews((prev) =>
        prev.map((item) => (item.id === reviewId ? { ...item, reply: text } : item)),
      );
      setDraft("");
      setActiveReplyId(null);
    };
  return (
    <div className="p-4 md:p-6">
       <section className="space-y-4">
            <ReviewSummaryCard />
      
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                activeReplyId={activeReplyId}
                draft={draft}
                onReplyClick={setActiveReplyId}
                onDraftChange={setDraft}
                onSubmitReply={submitReply}
                onCancelReply={() => {
                  setActiveReplyId(null);
                  setDraft("");
                }}
              />
            ))}
          </section>
    </div>
  );
}

