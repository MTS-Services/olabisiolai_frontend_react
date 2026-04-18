import { Fragment, useEffect, useMemo, useState } from "react";
import {
  CheckCheck,
  FileText,
  MessageCircle,
  Paperclip,
  Phone,
  Search,
  SendHorizontal,
  Smile,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type LeadChannel = "direct" | "whatsapp";
type LeadStatus = "new" | "contacted";

type Lead = {
  id: string;
  name: string;
  initials: string;
  phone: string;
  channel: LeadChannel;
  dateTime: string;
  status: LeadStatus;
  message: string;
  lastSeen: string;
  /** When true, list row shows green “Online” dot (direct inbox). */
  online?: boolean;
  /** Optional second line in chat header, e.g. business name */
  chatSubtitle?: string;
};

type ChatMessage = {
  id: string;
  from: "lead" | "vendor";
  text: string;
  time: string;
};

const leads: Lead[] = [
  {
    id: "ld-001",
    name: "Chinedu Okafor",
    initials: "CO",
    phone: "+234 812 123 4567",
    channel: "whatsapp",
    dateTime: "2026-04-02 10:30 AM",
    status: "new",
    message: "Hello, I'd like to book a reservation for 6 people this Friday evening.",
    lastSeen: "2h ago",
  },
  {
    id: "ld-002",
    name: "Tunde Balogun",
    initials: "TB",
    phone: "+234 807 888 7820",
    channel: "whatsapp",
    dateTime: "2026-04-01 11:45 AM",
    status: "contacted",
    message: "Can I get your premium package details and delivery timeline?",
    lastSeen: "23m ago",
  },
  {
    id: "ld-003",
    name: "Linda Smith",
    initials: "LS",
    phone: "+234 813 222 9191",
    channel: "whatsapp",
    dateTime: "2026-04-01 09:10 AM",
    status: "contacted",
    message: "Please share current pricing for your business listing plans.",
    lastSeen: "Yesterday",
  },
  {
    id: "ld-004",
    name: "Sam Wilson",
    initials: "SW",
    phone: "+234 705 555 7843",
    channel: "whatsapp",
    dateTime: "2026-03-31 08:00 AM",
    status: "contacted",
    message: "I'm looking for weekend availability and full package details.",
    lastSeen: "Fri",
  },
  {
    id: "ld-007",
    name: "Sarah Johnson",
    initials: "SJ",
    phone: "+234 803 111 2222",
    channel: "whatsapp",
    dateTime: "2026-03-28 04:15 PM",
    status: "new",
    message: "Is your team available for a site visit next week?",
    lastSeen: "Mon",
  },
  {
    id: "ld-008",
    name: "Emeka Nwosu",
    initials: "EN",
    phone: "+234 901 444 8899",
    channel: "whatsapp",
    dateTime: "2026-03-27 01:20 PM",
    status: "contacted",
    message: "Following up on the quote you sent last Tuesday.",
    lastSeen: "Tue",
  },
  {
    id: "ld-005",
    name: "Diana Smith",
    initials: "DS",
    phone: "+234 701 765 1632",
    channel: "direct",
    dateTime: "2026-03-30 10:00 AM",
    status: "contacted",
    message: "Do you offer custom plans for medium-sized agencies?",
    lastSeen: "18m ago",
    online: true,
  },
  {
    id: "ld-006",
    name: "Michael Adeyemi",
    initials: "MA",
    phone: "+234 802 245 6789",
    channel: "direct",
    dateTime: "2026-03-29 09:00 AM",
    status: "contacted",
    message: "Interested in monthly contract, can we discuss options?",
    lastSeen: "1h ago",
    online: false,
  },
  {
    id: "ld-009",
    name: "Sarah J.",
    initials: "SJ",
    phone: "+234 810 000 1122",
    channel: "direct",
    dateTime: "2026-04-02 08:15 AM",
    status: "new",
    message: "Quick question about availability for a walkthrough.",
    lastSeen: "now",
    online: true,
    chatSubtitle: "Expert Home Sanctuary",
  },
];

const chatByLead: Record<string, ChatMessage[]> = {
  "ld-001": [
    { id: "m1", from: "lead", text: "Hello! Is this service available on Friday evening?", time: "09:42 AM" },
    {
      id: "m2",
      from: "vendor",
      text: "Yes, it is available. We can reserve a slot for your event and share the package options.",
      time: "09:44 AM",
    },
    {
      id: "m3",
      from: "lead",
      text: "Great! I need a reservation for six people and full price details.",
      time: "09:46 AM",
    },
    {
      id: "m4",
      from: "vendor",
      text: "Perfect, I'll send the full details in a minute and confirm your booking.",
      time: "09:47 AM",
    },
  ],
  "ld-005": [
    {
      id: "m5-1",
      from: "lead",
      text: "Hi, do you have a custom package for medium agencies?",
      time: "10:02 AM",
    },
    {
      id: "m5-2",
      from: "vendor",
      text: "Yes, we do. We can tailor monthly plans based on lead volume and visibility needs.",
      time: "10:04 AM",
    },
    {
      id: "m5-3",
      from: "lead",
      text: "Great, can you share the pricing range and what is included?",
      time: "10:06 AM",
    },
    {
      id: "m5-4",
      from: "vendor",
      text: "Sure. I'll share starter, growth, and premium options with feature comparison shortly.",
      time: "10:08 AM",
    },
  ],
  "ld-006": [
    {
      id: "m6-1",
      from: "lead",
      text: "I'm interested in a monthly contract. Is there a discount for 3 months upfront?",
      time: "09:10 AM",
    },
    {
      id: "m6-2",
      from: "vendor",
      text: "Yes, we offer discounted pricing for 3 and 6 month commitments.",
      time: "09:13 AM",
    },
    {
      id: "m6-3",
      from: "lead",
      text: "Nice. Can we schedule a quick call tomorrow morning?",
      time: "09:15 AM",
    },
    {
      id: "m6-4",
      from: "vendor",
      text: "Absolutely. I have 10:30 AM and 11:15 AM available. Which one works for you?",
      time: "09:17 AM",
    },
  ],
  "ld-009": [
    {
      id: "m9-1",
      from: "lead",
      text: "Hi! I'd love to confirm a walkthrough for the property we discussed.",
      time: "10:30 AM",
    },
    {
      id: "m9-2",
      from: "vendor",
      text: "Good morning Sarah — happy to help. Does Thursday 2 PM work for you?",
      time: "10:32 AM",
    },
    {
      id: "m9-3",
      from: "lead",
      text: "Thursday works. Could you also send the checklist beforehand?",
      time: "10:35 AM",
    },
    {
      id: "m9-4",
      from: "vendor",
      text: "Absolutely. I'll email the checklist and meeting link in the next few minutes.",
      time: "10:36 AM",
    },
    {
      id: "m9-5",
      from: "lead",
      text: "Perfect, thank you!",
      time: "10:38 AM",
    },
    {
      id: "m9-6",
      from: "vendor",
      text: "You're welcome — talk soon!",
      time: "10:45 AM",
    },
  ],
};

function splitDateTime(dateTime: string): { date: string; time: string } {
  const idx = dateTime.indexOf(" ");
  if (idx === -1) return { date: dateTime, time: "" };
  return { date: dateTime.slice(0, idx), time: dateTime.slice(idx + 1) };
}

/** e.g. `2026-04-02 10:30 AM` → `2026-04-02 at 10:30 AM` */
function formatReceivedOnDisplay(dateTime: string): string {
  const { date, time } = splitDateTime(dateTime);
  if (!time) return date;
  return `${date} at ${time}`;
}

function modalLeadTypeLabel(channel: LeadChannel): string {
  return channel === "whatsapp" ? "WhatsApp Lead" : "Direct Message Lead";
}

function ChannelLabel({ channel }: { channel: LeadChannel }) {
  if (channel === "whatsapp") {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-foreground">
        <MessageCircle className="size-4 shrink-0 text-emerald-600" strokeWidth={2} aria-hidden />
        <span className="font-medium">WhatsApp</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 text-sm text-foreground">
      <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <span className="font-medium">Direct</span>
    </span>
  );
}

function LeadsTabs({
  channelFilter,
  onChange,
  directCount,
  whatsappCount,
}: {
  channelFilter: LeadChannel;
  onChange: (c: LeadChannel) => void;
  directCount: number;
  whatsappCount: number;
}) {
  const tabBase =
    "relative flex items-center gap-2 pb-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:ring-offset-2";

  return (
    <div className="border-b border-neutral-200">
      <div className="flex gap-8">
        <button
          type="button"
          onClick={() => onChange("direct")}
          className={cn(
            tabBase,
            channelFilter === "direct" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <FileText className="size-4 shrink-0" aria-hidden />
          Direct Messages ({directCount})
          <span
            className={cn(
              "absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full transition-colors",
              channelFilter === "direct" ? "bg-foreground" : "bg-transparent",
            )}
          />
        </button>
        <button
          type="button"
          onClick={() => onChange("whatsapp")}
          className={cn(
            tabBase,
            channelFilter === "whatsapp" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <MessageCircle className="size-4 shrink-0" aria-hidden />
          WhatsApp ({whatsappCount})
          <span
            className={cn(
              "absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full transition-colors",
              channelFilter === "whatsapp" ? "bg-foreground" : "bg-transparent",
            )}
          />
        </button>
      </div>
    </div>
  );
}

export function VendorLeadsManagement() {
  const [channelFilter, setChannelFilter] = useState<LeadChannel>("whatsapp");
  const [selectedLeadId, setSelectedLeadId] = useState<string>(
    () => leads.find((l) => l.channel === "whatsapp")?.id ?? leads[0]?.id ?? "",
  );
  const [openLeadDetails, setOpenLeadDetails] = useState<Lead | null>(null);

  const directCount = useMemo(() => leads.filter((l) => l.channel === "direct").length, []);
  const whatsappCount = useMemo(() => leads.filter((l) => l.channel === "whatsapp").length, []);

  const filteredLeads = useMemo(
    () => leads.filter((lead) => lead.channel === channelFilter),
    [channelFilter],
  );

  const selectedLead =
    filteredLeads.find((lead) => lead.id === selectedLeadId) ?? filteredLeads[0] ?? null;
  const selectedConversation = selectedLead ? (chatByLead[selectedLead.id] ?? []) : [];
  const isDirectChannel = channelFilter === "direct";

  const lastVendorMessageIndex = useMemo(() => {
    let last = -1;
    selectedConversation.forEach((m, i) => {
      if (m.from === "vendor") last = i;
    });
    return last;
  }, [selectedConversation]);

  /** “New messages” rule: divider before third message when enough history */
  const newMessagesDividerAfterIndex = selectedConversation.length >= 4 ? 1 : -1;

  useEffect(() => {
    if (!filteredLeads.length) return;
    if (!filteredLeads.some((l) => l.id === selectedLeadId)) {
      setSelectedLeadId(filteredLeads[0].id);
    }
  }, [channelFilter, filteredLeads, selectedLeadId]);

  return (
    <div className="space-y-5 md:space-y-6">
      <Card className="overflow-hidden rounded-xl border-neutral-200/90 bg-card shadow-sm">
        <CardContent className="space-y-4 p-5 md:p-6">
          <h1 className="text-xl font-bold tracking-tight text-foreground font-manrope md:text-2xl">Your Leads</h1>
          <LeadsTabs
            channelFilter={channelFilter}
            onChange={setChannelFilter}
            directCount={directCount}
            whatsappCount={whatsappCount}
          />
        </CardContent>
      </Card>

      {isDirectChannel ? (
        <Card className="overflow-hidden rounded-xl border-neutral-200/90 bg-card shadow-sm">
          <div className="grid min-h-[min(640px,calc(100dvh-220px))] lg:grid-cols-[minmax(260px,300px)_1fr]">
            <div className="border-b border-neutral-200 bg-[#F3F3FE] lg:border-b-0 lg:border-r">
              <div className="space-y-4 p-4 md:p-5">
                <h2 className="text-base font-bold text-foreground">Messages</h2>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <Input
                    className="h-10 rounded-full border border-neutral-200 bg-white pl-10 pr-4 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-sky-500/25"
                    placeholder="Search conversations..."
                  />
                </div>
                <div className="space-y-1.5">
                  {filteredLeads.map((lead) => {
                    const active = selectedLead?.id === lead.id;
                    return (
                      <button
                        key={lead.id}
                        type="button"
                        onClick={() => setSelectedLeadId(lead.id)}
                        className={cn(
                          "relative w-full rounded-lg py-2.5 pl-3 pr-2 text-left transition-colors",
                          active ? "bg-sky-50 shadow-sm" : "hover:bg-white/90",
                        )}
                      >
                        {active ? (
                          <span
                            className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-sky-600"
                            aria-hidden
                          />
                        ) : null}
                        <div className="flex items-start gap-3 pl-2">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-200/90 text-xs font-semibold text-neutral-700">
                            {lead.initials}
                          </div>
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="flex min-w-0 items-center gap-1.5">
                                <span className="truncate text-sm font-semibold text-foreground">{lead.name}</span>
                                {lead.online ? (
                                  <span className="inline-flex size-2 shrink-0 rounded-full bg-emerald-500 ring-2 ring-white" title="Online" />
                                ) : null}
                              </span>
                              <span className="shrink-0 text-[11px] text-muted-foreground">{lead.lastSeen}</span>
                            </div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{lead.message}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex min-h-[480px] flex-col bg-[#FAF8FF]">
              <div className="border-b border-neutral-200 bg-[#FAF8FF] px-5 py-4">
                {selectedLead ? (
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-full bg-neutral-200/90 text-xs font-semibold text-neutral-700">
                      {selectedLead.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {selectedLead.name}
                        {selectedLead.chatSubtitle ? ` — ${selectedLead.chatSubtitle}` : ""}
                      </p>
                      <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <span className="inline-flex size-2 rounded-full bg-emerald-500" />
                        Online
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No conversation selected</p>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-0 overflow-y-auto px-4 py-5 md:px-6">
                {selectedConversation.map((message, idx) => (
                  <Fragment key={message.id}>
                    {idx === newMessagesDividerAfterIndex + 1 && newMessagesDividerAfterIndex >= 0 ? (
                      <div className="relative py-6">
                        <div className="absolute inset-x-0 top-1/2 border-t border-neutral-200" />
                        <p className="relative mx-auto w-fit bg-[#f5f6fa] px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          New messages
                        </p>
                      </div>
                    ) : null}
                    {message.from === "lead" ? (
                      <div className="mb-4 flex max-w-[min(100%,520px)] items-end gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-200/90 text-[10px] font-semibold text-neutral-700">
                          {selectedLead?.initials}
                        </div>
                        <div>
                          <div className="rounded-2xl rounded-bl-md bg-[#e8e6f4] px-3.5 py-2.5 text-sm leading-relaxed text-foreground shadow-sm">
                            {message.text}
                          </div>
                          <p className="mt-1 pl-1 text-[11px] text-muted-foreground">{message.time}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4 flex justify-end">
                        <div className="max-w-[min(100%,520px)] text-right">
                          <div className="ml-auto rounded-2xl rounded-br-md bg-sky-600 px-3.5 py-2.5 text-left text-sm leading-relaxed text-white shadow-sm">
                            {message.text}
                          </div>
                          <div className="mt-1 flex items-center justify-end gap-1 pr-0.5">
                            <span className="text-[11px] text-muted-foreground">{message.time}</span>
                            {idx === lastVendorMessageIndex ? (
                              <CheckCheck className="size-3.5 text-sky-600" aria-label="Read" />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>

              <div className="border-t border-neutral-200 bg-white p-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-neutral-100 hover:text-foreground"
                    aria-label="Attach file"
                  >
                    <Paperclip className="size-5" />
                  </button>
                  <div className="relative min-w-0 flex-1">
                    <Input
                      className="h-11 rounded-xl border border-neutral-200 bg-neutral-100/80 pr-11 text-sm shadow-inner placeholder:text-muted-foreground focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-sky-500/25"
                      placeholder="Type your message here..."
                    />
                    <button
                      type="button"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Emoji"
                    >
                      <Smile className="size-5" />
                    </button>
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    className="size-11 shrink-0 rounded-xl bg-sky-600 text-white shadow-sm hover:bg-sky-600/90"
                    aria-label="Send message"
                  >
                    <SendHorizontal className="size-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden rounded-xl border-neutral-200/90 bg-card shadow-sm">
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  {(["User", "Lead Type", "Date & Time", "Status", "Action"] as const).map((h, i) => (
                    <th
                      key={h}
                      className={cn(
                        "px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500",
                        i === 4 && "text-center",
                      )}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredLeads.map((lead) => {
                  const { date, time } = splitDateTime(lead.dateTime);
                  return (
                    <tr key={lead.id} className="border-b border-neutral-100 last:border-0">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-200/90 text-xs font-semibold text-neutral-600">
                            {lead.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <ChannelLabel channel={lead.channel} />
                      </td>
                      <td className="px-5 py-4 align-middle text-muted-foreground">
                        <p className="text-sm">{date}</p>
                        <p className="text-xs">{time}</p>
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <Badge
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-medium shadow-none",
                            lead.status === "new"
                              ? "border-0 bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                              : "border-0 bg-neutral-200/70 text-neutral-600 hover:bg-neutral-200/70",
                          )}
                        >
                          {lead.status === "new" ? "New" : "Contacted"}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 text-center align-middle">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-lg border-neutral-200 bg-white px-4 font-semibold text-foreground shadow-sm hover:bg-neutral-50"
                          onClick={() => setOpenLeadDetails(lead)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {openLeadDetails ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
          role="presentation"
          onClick={() => setOpenLeadDetails(null)}
        >
          <Card
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-details-title"
            className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-neutral-200/90 bg-card shadow-[0_24px_48px_-12px_rgba(15,23,42,0.22)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 pb-4 pt-6 md:px-8 md:pb-5 md:pt-8">
              <h2 id="lead-details-title" className="text-lg font-bold tracking-tight text-foreground font-manrope">
                Lead Details
              </h2>
              <button
                type="button"
                onClick={() => setOpenLeadDetails(null)}
                className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-neutral-100 hover:text-foreground"
                aria-label="Close"
              >
                <X className="size-5" strokeWidth={2} />
              </button>
            </div>

            <div className="space-y-6 px-6 py-6 md:space-y-7 md:px-8 md:py-8">
              <div className="flex items-center gap-4 rounded-xl bg-neutral-100/90 p-4 md:p-5">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-neutral-300/90 text-sm font-bold text-neutral-700">
                  {openLeadDetails.initials}
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="text-base font-bold text-foreground">{openLeadDetails.name}</p>
                  <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Phone className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                    <span className="truncate">{openLeadDetails.phone}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Lead Type</p>
                <div className="inline-flex items-center gap-2">
                  {openLeadDetails.channel === "whatsapp" ? (
                    <MessageCircle className="size-5 shrink-0 text-emerald-600" strokeWidth={2} aria-hidden />
                  ) : (
                    <FileText className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                  )}
                  <span className="text-base font-bold text-foreground">{modalLeadTypeLabel(openLeadDetails.channel)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Message</p>
                <div className="rounded-xl bg-neutral-100/90 px-4 py-3.5 text-sm leading-relaxed text-foreground md:px-5 md:py-4">
                  {openLeadDetails.message}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Received On</p>
                <p className="text-sm font-medium text-foreground md:text-base">
                  {formatReceivedOnDisplay(openLeadDetails.dateTime)}
                </p>
              </div>
            </div>

            <div className="border-t border-neutral-200 px-6 pb-6 pt-5 md:px-8 md:pb-8 md:pt-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <Button
                  type="button"
                  className="h-12 rounded-xl bg-sky-500 text-[15px] font-semibold text-white shadow-sm hover:bg-sky-500/92 [&_svg]:size-5"
                >
                  <MessageCircle className="text-white" strokeWidth={2} aria-hidden />
                  Contact on WhatsApp
                </Button>
                <Button
                  type="button"
                  className="h-12 rounded-xl border-0 bg-red-500 text-[15px] font-semibold text-white shadow-sm hover:bg-red-500/92 [&_svg]:size-5"
                >
                  <Phone className="text-white" strokeWidth={2} aria-hidden />
                  Call Now
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
