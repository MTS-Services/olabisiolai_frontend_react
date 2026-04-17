import { CheckCheck, Paperclip, Search, Send, Smile } from "lucide-react";
import { Link } from "react-router-dom";

import { FrontendHeader } from "@/components/partials/frontend/FrontendHeader";
import { UserSidebar } from "@/components/partials/user/UserSidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const LOGO_FOOTER = "/images/landing/gidira-logo-footer.svg";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About Gidira", to: "/about" },
      { label: "Contact Us", to: "/contact" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Cookies Policy", to: "/cookies-policy" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Business Tips", to: "/business-tips" },
      { label: "FAQs", to: "/faq" },
    ],
  },
] as const;

type ChatListItem = {
  name: string;
  preview: string;
  time: string;
  avatar: string;
  online?: boolean;
  active?: boolean;
};

const chatList: ChatListItem[] = [
  {
    name: "Sarah J. - Home Sanctu...",
    preview: "Looking forward to seeing the space ...",
    time: "ACTIVE",
    avatar: "/images/messages/sarah-active.jpg",
    online: true,
    active: true,
  },
  {
    name: "Marcus Chen",
    preview: "The blueprint revisions are ready for r...",
    time: "2h ago",
    avatar: "/images/messages/marcus.jpg",
  },
  {
    name: "Elena Rodriguez",
    preview: "Payment confirmed for the Q4 consult...",
    time: "Yesterday",
    avatar: "/images/messages/elena.jpg",
  },
  {
    name: "Coach David",
    preview: "See you at the gym tomorrow morning...",
    time: "Tue",
    avatar: "/images/messages/coach-david.jpg",
  },
] as const;

const providerAvatar = "/images/messages/sarah-header.jpg";

function ProviderMessage({ lines, time }: { lines: string[]; time: string }) {
  return (
    <div className="flex gap-4">
      <img
        src={providerAvatar}
        alt=""
        className="mt-1 size-8 rounded-lg object-cover"
        width={32}
        height={32}
        decoding="async"
      />
      <div className="max-w-xl">
        <div className="rounded-2xl rounded-bl-md bg-chat-bubble-them p-4 shadow-sm">
          {lines.map((line) => (
            <p key={line} className="text-sm leading-5 text-ink">
              {line}
            </p>
          ))}
        </div>
        <p className="mt-1 text-[10px] text-chat-meta">{time}</p>
      </div>
    </div>
  );
}

function UserMessage({ lines, time, read }: { lines: string[]; time: string; read?: boolean }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-xl">
        <div className="rounded-2xl rounded-tr-sm bg-chat-accent p-4 text-right text-ice shadow-md">
          {lines.map((line) => (
            <p key={line} className="text-sm leading-5">
              {line}
            </p>
          ))}
        </div>
        <div className="mt-1 flex items-center justify-end gap-1">
          <p className="text-[10px] text-chat-meta">{time}</p>
          {read ? <CheckCheck className="size-3.5 text-chat-accent" aria-hidden /> : null}
        </div>
      </div>
    </div>
  );
}

export default function Messages() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <FrontendHeader />

      <main className="bg-auth-bg">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col lg:flex-row">
          <UserSidebar active="messages" />

          <section className="flex min-h-screen flex-1 overflow-hidden">
            <aside className="hidden w-[340px] shrink-0 border-r border-chat-border bg-chat-input-bg lg:flex lg:flex-col">
              <div className="space-y-6 p-6">
                <h1 className="font-heading text-3xl font-black tracking-tight text-ink">Messages</h1>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-chat-meta" />
                  <input
                    type="search"
                    placeholder="Search conversations..."
                    className="h-12 w-full rounded-full border border-transparent bg-card pl-11 pr-4 text-sm text-ink placeholder:text-chat-meta/70 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2 px-2 pb-6">
                {chatList.map((chat) => (
                  <button
                    key={chat.name}
                    type="button"
                    className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left ${chat.active
                      ? "border-l-4 border-chat-accent bg-card shadow-sm"
                      : "border-l-4 border-transparent hover:bg-card/60"
                      }`}
                  >
                    <div className="relative">
                      <img
                        src={chat.avatar}
                        alt=""
                        className="size-12 rounded-xl object-cover"
                        width={48}
                        height={48}
                        decoding="async"
                      />
                      {chat.online ? (
                        <span className="absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-chat-surface bg-chat-online-dot" />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-base font-bold text-ink">{chat.name}</p>
                        <span
                          className={`text-[10px] ${chat.active
                            ? "font-semibold uppercase text-chat-accent"
                            : "text-chat-meta"
                            }`}
                        >
                          {chat.time}
                        </span>
                      </div>
                      <p className="truncate text-xs text-chat-meta">{chat.preview}</p>
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            <section className="relative flex min-h-[780px] flex-1 flex-col bg-chat-surface">
              <header className="flex h-20 items-center justify-between border-b border-chat-border-footer bg-chat-surface-header px-6 backdrop-blur-sm sm:px-8">
                <div className="flex items-center gap-4">
                  <img
                    src={providerAvatar}
                    alt=""
                    className="size-10 rounded-lg object-cover"
                    width={40}
                    height={40}
                    decoding="async"
                  />
                  <div>
                    <h2 className="font-heading text-base font-extrabold tracking-tight text-ink">
                      Sarah J. - Expert Home Sanctuary
                    </h2>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="size-2 rounded-full bg-chat-online-dot" />
                      <span className="text-xs font-semibold text-chat-online-text">Online</span>
                    </div>
                  </div>
                </div>
              </header>

              <div className="flex-1 space-y-6 overflow-y-auto px-6 py-8">
                <ProviderMessage
                  time="10:45 AM"
                  lines={[
                    "Hello Alex! I've reviewed the photos of your home office. We",
                    "can definitely optimize the layout to create more flow and",
                    "reduce clutter.",
                  ]}
                />
                <UserMessage
                  time="10:48 AM"
                  lines={[
                    "That sounds amazing! I'm particularly struggling with the cable",
                    "management and the natural light distribution during afternoon calls.",
                  ]}
                />
                <ProviderMessage
                  time="10:52 AM"
                  lines={[
                    "Noted. I have a few modular solutions for the cables that we",
                    "can install. As for the lighting, some sheer linen diffusers",
                    "would work beautifully without blocking the view.",
                  ]}
                />
                <UserMessage
                  time="10:55 AM"
                  read
                  lines={[
                    "Perfect. I'll make sure to clear the space before our session on",
                    "Monday. Looking forward to seeing the space on Monday!",
                  ]}
                />

                <div className="flex items-center gap-4 py-1">
                  <div className="h-px flex-1 bg-chat-border-subtle" />
                  <span className="text-[10px] font-semibold uppercase tracking-[1px] text-chat-meta">
                    New Messages
                  </span>
                  <div className="h-px flex-1 bg-chat-border-subtle" />
                </div>

                <ProviderMessage
                  time="11:02 AM"
                  lines={[
                    "Great! Just one last thing: could you send over the rough",
                    "dimensions of that main desk? I want to make sure the cable",
                    "bins I bring will fit perfectly.",
                  ]}
                />
              </div>

              <footer className="border-t border-chat-border-footer bg-card px-6 py-5 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-11 rounded-xl text-ink hover:bg-muted"
                  >
                    <Paperclip className="size-5" />
                  </Button>
                  <div className="relative min-w-0 flex-1">
                    <Textarea
                      placeholder="Type your message here..."
                      rows={1}
                      className="max-h-32 min-h-12 resize-none rounded-2xl border-0 bg-chat-input-bg py-3 pl-5 pr-12 text-sm text-ink placeholder:text-chat-meta/70 focus-visible:ring-2 focus-visible:ring-chat-accent-ring"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-1.5 right-2 size-9 text-stat-muted hover:bg-transparent hover:text-ink"
                    >
                      <Smile className="size-5" />
                    </Button>
                  </div>
                  <Button type="button" size="icon" className="size-12 rounded-xl bg-chat-accent text-ice">
                    <Send className="size-5" />
                  </Button>
                </div>
              </footer>
            </section>
          </section>
        </div>
      </main>

      <footer className="bg-footer-bar">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-14 xl:px-12">
          <div className="grid gap-8 md:grid-cols-[280px_1fr]">
            <div>
              <img src={LOGO_FOOTER} alt="Gidira" className="h-8 w-auto" />
              <p className="mt-4 text-sm text-white">FIND BETTER | CONNECT FASTER</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h4 className="text-base font-semibold text-white">{column.title}</h4>
                  <ul className="mt-4 space-y-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link to={link.to} className="text-sm text-footer-muted hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-white/20 pt-8 text-center">
            <p className="text-sm text-footer-muted">
              © 2026 GIDIRA. All rights reserved. Built for Nigeria&apos;s Digital Economy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
