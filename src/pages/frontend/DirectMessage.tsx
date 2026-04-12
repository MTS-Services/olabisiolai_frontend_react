import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCheck,
  MessageCircle,
  Paperclip,
  Send,
  Smile,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

const PROVIDER_AVATAR = "/images/service/review1.jpg";

export default function DirectMessage() {
  const [draft, setDraft] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

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
          <header className="flex h-20 shrink-0 items-center justify-between border-b border-chat-border bg-chat-surface-header px-6 backdrop-blur-sm sm:px-8">
            <div className="flex min-w-0 items-center gap-4">
              <img
                src={PROVIDER_AVATAR}
                alt=""
                className="size-10 shrink-0 rounded-lg object-cover"
                width={40}
                height={40}
                decoding="async"
              />
              <div className="min-w-0">
                <h1 className="truncate text-base font-extrabold tracking-tight text-ink">
                  Sarah J. - Expert Home Sanctuary
                </h1>
                <div className="mt-0.5 flex items-center gap-2">
                  <span
                    className="size-2 shrink-0 rounded-full bg-chat-online-dot"
                    aria-hidden
                  />
                  <span className="text-xs font-semibold text-chat-online-text">
                    Online
                  </span>
                </div>
              </div>
            </div>
            <MessageCircle
              className="size-6 shrink-0 text-stat-muted sm:hidden"
              aria-hidden
            />
          </header>

          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-6 sm:px-8">
            <ProviderBlock
              avatar={PROVIDER_AVATAR}
              time="10:45 AM"
              lines={[
                "Hello Alex! I've reviewed the photos of your home office. We",
                "can definitely optimize the layout to create more flow and",
                "reduce clutter.",
              ]}
            />

            <UserBlock
              time="10:48 AM"
              lines={[
                "That sounds amazing! I'm particularly struggling with the cable",
                "management and the natural light distribution during afternoon calls.",
              ]}
            />

            <ProviderBlock
              avatar={PROVIDER_AVATAR}
              time="10:52 AM"
              lines={[
                "Noted. I have a few modular solutions for the cables that we",
                "can install. As for the lighting, some sheer linen diffusers",
                "would work beautifully without blocking the view.",
              ]}
            />

            <UserBlock
              time="10:55 AM"
              read
              lines={[
                "Perfect. I'll make sure to clear the space before our session on",
                "Monday. Looking forward to seeing the space on Monday!",
              ]}
            />

            <div className="flex items-center gap-4 py-2">
              <div className="h-px flex-1 bg-chat-border-subtle" />
              <span className="text-xs font-semibold uppercase tracking-widest text-chat-meta">
                New Messages
              </span>
              <div className="h-px flex-1 bg-chat-border-subtle" />
            </div>

            <ProviderBlock
              avatar={PROVIDER_AVATAR}
              time="11:02 AM"
              lines={[
                "Great! Just one last thing: could you send over the rough",
                "dimensions of that main desk? I want to make sure the cable",
                "bins I bring will fit perfectly.",
              ]}
            />
          </div>

          <footer className="shrink-0 border-t border-chat-border-footer bg-card px-4 pb-6 pt-5 backdrop-blur-sm sm:px-6">
            <div className="flex items-end gap-3 sm:gap-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-11 shrink-0 rounded-xl text-ink hover:bg-muted"
                aria-label="Attach file"
              >
                <Paperclip className="size-5" />
              </Button>
              <div className="relative min-w-0 flex-1">
                <Textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type your message here..."
                  rows={1}
                  className="max-h-32 min-h-12 resize-none rounded-2xl border-0 bg-chat-input-bg py-3 pl-5 pr-12 text-sm text-ink placeholder:text-placeholder-text focus-visible:ring-2 focus-visible:ring-chat-accent-ring"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-1.5 right-2 size-9 text-stat-muted hover:bg-transparent hover:text-ink"
                  aria-label="Emoji"
                >
                  <Smile className="size-5" />
                </Button>
              </div>
              <Button
                type="button"
                size="icon"
                className={cn(
                  "size-12 shrink-0 rounded-xl bg-chat-accent text-text-white shadow-md hover:opacity-90",
                )}
                aria-label="Send message"
              >
                <Send className="size-5" />
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

function ProviderBlock({
  avatar,
  time,
  lines,
}: {
  avatar: string;
  time: string;
  lines: string[];
}) {
  return (
    <div className="flex gap-4">
      <img
        src={avatar}
        alt=""
        className="mt-1 size-8 shrink-0 rounded-lg object-cover"
        width={32}
        height={32}
        decoding="async"
      />
      <div className="min-w-0 max-w-md">
        <div
          className={cn(
            "rounded-br-2xl rounded-tr-2xl rounded-bl-2xl bg-chat-bubble-them p-4 shadow-sm",
          )}
        >
          {lines.map((line, i) => (
            <p key={i} className="text-sm leading-5 text-ink">
              {line}
            </p>
          ))}
        </div>
        <p className="mt-1 text-xs text-chat-meta">{time}</p>
      </div>
    </div>
  );
}

function UserBlock({
  time,
  lines,
  read,
}: {
  time: string;
  lines: string[];
  read?: boolean;
}) {
  return (
    <div className="flex justify-end">
      <div className="min-w-0 max-w-md">
        <div
          className={cn(
            "rounded-bl-2xl rounded-tl-2xl rounded-br-md bg-chat-accent px-4 py-4 text-right text-text-white shadow-md sm:rounded-br-2xl sm:rounded-tr-md",
          )}
        >
          {lines.map((line, i) => (
            <p key={i} className="text-sm leading-5">
              {line}
            </p>
          ))}
        </div>
        <div className="mt-1 flex items-center justify-end gap-1">
          <p className="text-xs text-chat-meta">{time}</p>
          {read ? (
            <CheckCheck
              className="size-3.5 text-chat-accent"
              aria-label="Read"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
