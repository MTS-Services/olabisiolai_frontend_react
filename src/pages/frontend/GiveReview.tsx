import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Send, Star, Upload, X } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAuthDisplayName } from "@/auth/displayName";
import { useAuth } from "@/auth/useAuth";
import { container } from "@/lib/container";
import { cn } from "@/lib/utils";
import { submitReview } from "@/features/reviews/publicReviewApi";

const MAX_STARS = 5;

type LocationState = {
  from?: string;
  business_id?: number;
  business_name?: string;
  review_as_named?: boolean;
} | null;

export default function GiveReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state?.from;
  const businessId = state?.business_id;
  const businessName = state?.business_name ?? null;

  const { user, isAuthenticated, isUserLoading } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagesId = useId();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [fullName, setFullName] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const redirectToLoginForNamedReview = useCallback(() => {
    navigate("/login/email", {
      state: {
        from: {
          pathname: location.pathname,
          state: {
            from,
            business_id: businessId,
            business_name: businessName,
            review_as_named: true,
          },
        },
      },
    });
  }, [navigate, location.pathname, from, businessId, businessName]);

  useEffect(() => {
    if (state?.review_as_named) {
      setAnonymous(false);
    }
  }, [state?.review_as_named]);

  useEffect(() => {
    if (isUserLoading) return;

    if (!anonymous && !isAuthenticated) {
      redirectToLoginForNamedReview();
      return;
    }

    if (!anonymous && isAuthenticated) {
      setFullName(getAuthDisplayName(user));
    }
  }, [anonymous, isAuthenticated, isUserLoading, user, redirectToLoginForNamedReview]);

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const goBack = () => {
    if (typeof from === "string" && from.startsWith("/") && !from.startsWith("//")) {
      navigate(from);
      return;
    }
    navigate(-1);
  };

  const displayRating = hoverRating || rating;

  const onFilesChange = (list: FileList | null) => {
    if (!list?.length) return;
    const next = Array.from(list).filter((f) => /image\/(jpeg|png|webp)/i.test(f.type));
    const newFiles = [...files, ...next].slice(0, 10);
    const added = newFiles.slice(files.length);
    const newPreviews = [...previews, ...added.map((f) => URL.createObjectURL(f))];
    setFiles(newFiles);
    setPreviews(newPreviews);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAnonymousToggle = () => {
    const nextAnonymous = !anonymous;
    if (!nextAnonymous && !isAuthenticated && !isUserLoading) {
      redirectToLoginForNamedReview();
      return;
    }
    setAnonymous(nextAnonymous);
    if (!nextAnonymous && isAuthenticated) {
      setFullName(getAuthDisplayName(user));
    }
  };

  const validate = (): string | null => {
    if (!businessId) return "No business selected. Please go back and try again.";
    if (rating === 0) return "Please select a star rating.";
    if (!anonymous && !isAuthenticated) return "Please sign in to post a review with your name.";
    if (reviewText.trim().length < 10) return "Review must be at least 10 characters.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!anonymous && !isAuthenticated) {
      redirectToLoginForNamedReview();
      return;
    }

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const resolvedName = anonymous
      ? fullName.trim() || "Anonymous"
      : getAuthDisplayName(user) || fullName.trim();

    setSubmitting(true);
    try {
      await submitReview({
        business_id: businessId!,
        full_name: resolvedName,
        is_anonymous: anonymous,
        rating,
        review_text: reviewText,
        images: files.length > 0 ? files : undefined,
      });
      setSuccess(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 422) {
        const data = err.response.data as {
          message?: string;
          data?: { errors?: Record<string, string[]> };
          errors?: Record<string, string[]>;
        };
        setError(data.message ?? "Validation failed. Please check the form.");
        setFieldErrors(data.data?.errors ?? data.errors ?? {});
        const authError = data.data?.errors?.is_anonymous?.[0] ?? data.errors?.is_anonymous?.[0];
        if (authError?.toLowerCase().includes("logged in")) {
          redirectToLoginForNamedReview();
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const pageShell = "min-h-dvh bg-bg-section pb-16 pt-6 font-sans md:pt-10";

  if (success) {
    return (
      <div className={pageShell}>
        <div className={cn(container)}>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-border-light/80 bg-card p-10 shadow-md text-center">
            <CheckCircle className="size-14 text-success" strokeWidth={1.5} />
            <h1 className="text-xl font-semibold text-ink-heading">Review Submitted!</h1>
            <p className="text-sm text-body-secondary">
              Thank you for your feedback. Your review has been received and is awaiting approval.
            </p>
            <Button
              type="button"
              onClick={goBack}
              className="mt-2 h-9 gap-2 rounded-[10px] bg-footer-bar px-6 text-sm font-medium text-text-white hover:bg-footer-bar/90"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!anonymous && !isUserLoading && !isAuthenticated) {
    return (
      <div className={pageShell}>
        <div className={cn(container)}>
          <div className="mt-12 rounded-2xl border border-border-light/80 bg-card p-8 shadow-md text-center">
            <p className="text-sm text-body-secondary">Redirecting to sign in…</p>
            <Button type="button" variant="outline" onClick={goBack} className="mt-4">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const showNameField = !anonymous;
  const nameReadOnly = !anonymous && isAuthenticated;

  return (
    <div className={pageShell}>
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
            {businessName ? `Review for ${businessName}` : "Write a Review"}
          </h1>
          {!businessId && (
            <p className="mt-3 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">
              No business selected. Please go back and try again.
            </p>
          )}

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <div className="mt-6 space-y-1">
            <p className="text-sm font-medium text-ink-heading">Your Rating</p>
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
                      className={cn("size-8", active ? "fill-amber-400" : "fill-transparent")}
                      strokeWidth={1.5}
                    />
                  </button>
                );
              })}
            </div>
            {fieldErrors.rating && (
              <p className="text-xs text-red-600">{fieldErrors.rating[0]}</p>
            )}
          </div>

          {showNameField && (
            <div className="mt-4 space-y-2 rounded-2xl p-4">
              <label htmlFor="review-full-name" className="text-sm font-medium text-ink-heading">
                Your Full Name
              </label>
              <Input
                id="review-full-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name as shown on the review"
                autoComplete="name"
                readOnly={nameReadOnly}
                disabled={nameReadOnly}
                className={cn(
                  "h-auto rounded-[10px] border-transparent bg-muted px-3 py-4 text-sm text-ink placeholder:text-placeholder-text focus-visible:ring-chat-accent-ring",
                  nameReadOnly && "cursor-default opacity-90",
                )}
              />
              {nameReadOnly && (
                <p className="text-xs text-body-secondary">
                  Using your account name. Turn on anonymous to hide your identity.
                </p>
              )}
              {fieldErrors.full_name && (
                <p className="text-xs text-red-600">{fieldErrors.full_name[0]}</p>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-6 rounded-2xl px-4 py-3 sm:px-4">
            <span className="text-sm font-medium text-ink-heading">Write as anonymous</span>
            <button
              type="button"
              role="switch"
              aria-checked={anonymous}
              onClick={handleAnonymousToggle}
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
            {!anonymous && (
              <span className="text-xs text-body-secondary">Sign-in required to show your name</span>
            )}
          </div>

          <div className="mt-2 space-y-2 rounded-2xl p-4">
            <label htmlFor="review-body" className="text-sm font-medium text-ink-heading">
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
            {fieldErrors.review_text && (
              <p className="text-xs text-red-600">{fieldErrors.review_text[0]}</p>
            )}
          </div>

          <div className="mt-2 space-y-2 px-4 pb-2 pt-2">
            <p className="text-base font-medium text-ink-heading">
              Images{files.length > 0 ? ` (${files.length}/10)` : ""}
            </p>
            <input
              ref={fileInputRef}
              id={imagesId}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="sr-only"
              onChange={(e) => onFilesChange(e.target.files)}
            />

            {previews.length > 0 ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                  {previews.map((src, i) => (
                    <div
                      key={src}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-border-gray bg-muted"
                    >
                      <img
                        src={src}
                        alt={files[i]?.name ?? `Image ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                        aria-label={`Remove image ${i + 1}`}
                      >
                        <X className="size-3" strokeWidth={2.5} />
                      </button>
                    </div>
                  ))}
                  {files.length < 10 && (
                    <label
                      htmlFor={imagesId}
                      className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border-gray bg-transparent transition-colors hover:bg-muted/30"
                    >
                      <Upload className="size-6 text-stat-muted" strokeWidth={1.5} aria-hidden />
                      <span className="text-center text-xs font-medium text-body-secondary">
                        Add more
                      </span>
                    </label>
                  )}
                </div>
              </div>
            ) : (
              <label
                htmlFor={imagesId}
                className="flex min-h-[156px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border-gray bg-transparent px-4 py-6 transition-colors hover:bg-muted/30"
              >
                <Upload className="size-12 text-stat-muted" strokeWidth={1.25} aria-hidden />
                <span className="text-center text-base font-medium text-success">
                  Click to upload images
                </span>
                <span className="text-center text-sm font-medium text-body-secondary">
                  Upload 2–10 images (JPG, PNG, WebP)
                </span>
              </label>
            )}

            {fieldErrors.images && (
              <p className="text-xs text-red-600">{fieldErrors.images[0]}</p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2 px-4">
            <Button
              type="submit"
              disabled={submitting}
              className="h-9 gap-2 rounded-[10px] bg-footer-bar px-4 text-sm font-medium text-text-white shadow-sm hover:bg-footer-bar/90 disabled:opacity-60"
            >
              <Send className="size-4" aria-hidden />
              {submitting ? "Submitting…" : "Submit Review"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              disabled={submitting}
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

