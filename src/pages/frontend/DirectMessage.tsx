import * as React from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { createConversation } from "@/api/conversations";
import { useAuth } from "@/auth/useAuth";
import { MessagingLayout } from "@/features/messaging/MessagingLayout";
import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

export default function DirectMessage() {
  const { user, isAuthenticated, isUserLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const paramC = searchParams.get("c");
  const state = location.state as
    | { participantUserId?: number; from?: string }
    | null;
  const from = state?.from;

  React.useEffect(() => {
    const peerId = state?.participantUserId;
    if (peerId == null || paramC || !isAuthenticated) return;
    let cancelled = false;
    void (async () => {
      try {
        const conv = await createConversation([peerId]);
        if (cancelled) return;
        navigate(
          `/messages?c=${encodeURIComponent(conv.uuid)}`,
          { replace: true, state: { from: state?.from } },
        );
      } catch {
        toast.error("Could not start conversation");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [state?.participantUserId, state?.from, paramC, isAuthenticated, navigate]);

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

  if (!isUserLoading && !isAuthenticated) {
    return (
      <div className={cn(container, "py-16")}>
        <p className="text-ink">Sign in to use messages.</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-bg-section pb-16 pt-6 font-sans text-ink md:pt-10">
      <div className={cn(container)}>
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-2 text-base font-normal text-accent-foreground hover:underline"
        >
          <ArrowLeft className="size-6 shrink-0" aria-hidden />
          Back
        </button>

        <div
          className={cn(
            "mt-6 flex max-h-[min(1024px,calc(100dvh-10rem))] min-h-[min(640px,calc(100dvh-12rem))] flex-col overflow-hidden rounded-2xl border border-chat-border bg-chat-surface shadow-lg",
          )}
        >
          <MessagingLayout selfUser={user} conversationQueryParam="c" />
        </div>
      </div>
    </div>
  );
}
