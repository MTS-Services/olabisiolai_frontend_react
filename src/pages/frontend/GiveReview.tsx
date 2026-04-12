import { useId, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Star, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

const MAX_STARS = 5;

export default function GiveReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagesId = useId();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [fullName, setFullName] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const goBack = () => {
    if (
      typeof from === "string" &&
      from.startsWith("/") &&
      !from.startsWith("//")
    ) {
      navigate(from);
      return;
    }
    navigate(-1);
  };

  const displayRating = hoverRating || rating;

  const onFilesChange = (list: FileList | null) => {
    if (!list?.length) return;
    const next = Array.from(list).filter((f) =>
      /image\/(jpeg|png|webp)/i.test(f.type),
    );
    setFiles((prev) => {
      const merged = [...prev, ...next].slice(0, 10);
      return merged;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-dvh bg-bg-section pb-16 pt-6 font-sans md:pt-10">
      <div className={cn(container)}>
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-2 text-base font-normal text-chat-accent hover:underline"
        >
          <ArrowLeft className="size-6 shrink-0" aria-hidden />
          Back
        </button>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-border-light/80 bg-card p-6 shadow-md sm:p-8"
        >
          <h1 className="text-xl font-semibold leading-7 text-ink-heading">
            Reviews
          </h1>

          <div className="mt-6 space-y-1">
            <p className="text-sm font-medium text-ink-heading">
              Your Rating
            </p>
            <div
              className="flex gap-2"
              role="group"
              aria-label="Star rating"
              onMouseLeave={() => setHoverRating(0)}
            >
              {Array.from({ length: MAX_STARS }, (_, i) => {
                const value = i + 1;
                const active = value <= displayRating;
                return (
                  <button
                    key={value}
                    type="button"
                    className="rounded-md p-1 text-amber-400 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chat-accent-ring"
                    aria-label={`${value} star${value > 1 ? "s" : ""}`}
                    aria-pressed={value <= rating}
                    onMouseEnter={() => setHoverRating(value)}
                    onClick={() => setRating(value)}
                  >
                    <Star
                      className={cn(
                        "size-8",
                        active ? "fill-amber-400" : "fill-transparent",
                      )}
                      strokeWidth={1.5}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 space-y-2 rounded-2xl p-4">
            <label
              htmlFor="review-full-name"
              className="text-sm font-medium text-ink-heading"
            >
              Your Full Name
            </label>
            <Input
              id="review-full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
              disabled={anonymous}
              className="h-auto rounded-[10px] border-transparent bg-muted px-3 py-4 text-sm text-ink placeholder:text-placeholder-text focus-visible:ring-chat-accent-ring disabled:opacity-60"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 rounded-2xl px-4 py-3 sm:px-4">
            <span className="text-sm font-medium text-ink-heading">
              Write as anonymous
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={anonymous}
              onClick={() => setAnonymous((a) => !a)}
              className={cn(
                "relative h-6 w-12 shrink-0 rounded-full transition-colors",
                anonymous ? "bg-chat-accent" : "bg-stat-muted/35",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 size-5 rounded-full border border-white bg-white shadow-sm transition-[left]",
                  anonymous ? "left-[26px]" : "left-0.5",
                )}
              />
            </button>
          </div>

          <div className="mt-2 space-y-2 rounded-2xl p-4">
            <label
              htmlFor="review-body"
              className="text-sm font-medium text-ink-heading"
            >
              Your Review
            </label>
            <Textarea
              id="review-body"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this business..."
              rows={5}
              className="min-h-[152px] resize-y rounded-[10px] border-transparent bg-muted px-3 py-5 text-sm text-ink placeholder:text-placeholder-text focus-visible:ring-chat-accent-ring"
            />
          </div>

          <div className="mt-2 space-y-2 px-4 pb-2 pt-2">
            <p className="text-base font-medium text-ink-heading">Images</p>
            <input
              ref={fileInputRef}
              id={imagesId}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="sr-only"
              onChange={(e) => onFilesChange(e.target.files)}
            />
            <label
              htmlFor={imagesId}
              className="flex min-h-[156px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border-gray bg-transparent px-4 py-6 transition-colors hover:bg-muted/30"
            >
              <Upload
                className="size-12 text-stat-muted"
                strokeWidth={1.25}
                aria-hidden
              />
              <span className="text-center text-base font-medium text-success">
                Click to upload images
              </span>
              <span className="text-center text-sm font-medium text-body-secondary">
                Upload 2–10 images (JPG, PNG, WebP)
              </span>
              {files.length > 0 ? (
                <span className="mt-2 text-xs text-stat-muted">
                  {files.length} file{files.length !== 1 ? "s" : ""} selected
                </span>
              ) : null}
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 px-4">
            <Button
              type="submit"
              className="h-9 gap-2 rounded-[10px] bg-footer-bar px-4 text-sm font-medium text-text-white shadow-sm hover:bg-footer-bar/90"
            >
              <Send className="size-4" aria-hidden />
              Submit Review
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              className="h-9 rounded-[10px] border-border/80 bg-card px-4 text-sm font-medium text-ink-heading shadow-sm hover:bg-muted/40"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
