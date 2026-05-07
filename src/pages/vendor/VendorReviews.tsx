import { Loader2, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { fetchPublicReviews } from "@/features/reviews/publicReviewApi";
import type { ReviewDto } from "@/features/reviews/types";
import { request } from "@/api/request";

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="inline-flex items-center gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-slate-300"}`}
        />
      ))}
    </div>
  );
}

async function fetchVendorBusinessId(): Promise<number | null> {
  try {
    const res = await request.get("/vendor/business");
    const body = res.data as { data?: { id?: number; business_id?: number } };
    return body.data?.id ?? body.data?.business_id ?? null;
  } catch {
    return null;
  }
}

export default function VendorReviews() {
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const businessId = await fetchVendorBusinessId();
      if (!businessId) {
        setError("No business found. Please set up your business profile first.");
        return;
      }
      const result = await fetchPublicReviews({ business_id: businessId, per_page: 50 });
      setReviews(result.data);
      setTotalCount(result.pagination.total);
      if (result.data.length > 0) {
        const avg = result.data.reduce((sum, r) => sum + r.rating, 0) / result.data.length;
        setAvgRating(Math.round(avg * 10) / 10);
      }
    } catch {
      setError("Failed to load reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
    percent:
      reviews.length > 0
        ? Math.round((reviews.filter((r) => r.rating === stars).length / reviews.length) * 100)
        : 0,
  }));

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-chat-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <section className="space-y-4">
        <Card>
          <CardContent className="space-y-4 p-4 md:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-inter text-2xl font-semibold">Customer Reviews</h2>
                <p className="font-inter text-base text-muted-foreground">
                  Manage and respond to customer feedback
                </p>
              </div>
              <div className="text-right">
                <p className="inline-flex items-center gap-1 text-4xl font-bold">
                  <Star className="size-5 fill-yellow-400 text-yellow-400" />
                  {avgRating > 0 ? avgRating.toFixed(1) : "—"}
                </p>
                <p className="text-xs text-muted-foreground">{totalCount} review{totalCount !== 1 ? "s" : ""}</p>
              </div>
            </div>

            <div className="space-y-2">
              {ratingCounts.map((row) => (
                <div
                  key={row.stars}
                  className="grid grid-cols-[22px_1fr_20px] items-center gap-10 text-xs"
                >
                  <span className="font-inter text-sm font-medium">{row.stars}*</span>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                  <span className="text-right text-muted-foreground">{row.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {reviews.length === 0 ? (
          <p className="rounded-xl border border-border-light bg-card px-6 py-8 text-center text-sm text-body-secondary">
            No approved reviews yet.
          </p>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="space-y-3 p-4 md:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {getInitials(review.reviewer_name)}
                  </div>
                  <div>
                    <p className="font-semibold">{review.reviewer_name}</p>
                    <p className="text-xs text-muted-foreground">{review.created_at}</p>
                  </div>
                </div>

                <StarRow rating={review.rating} />

                <p className="max-w-4xl text-sm text-foreground">{review.review_text}</p>

                {review.images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {review.images.map((img) => (
                      <a
                        key={img.id}
                        href={img.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-14 w-14 overflow-hidden rounded-lg border border-border-gray bg-muted"
                      >
                        <img
                          src={img.url}
                          alt={img.original_filename}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </a>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </div>
  );
}
