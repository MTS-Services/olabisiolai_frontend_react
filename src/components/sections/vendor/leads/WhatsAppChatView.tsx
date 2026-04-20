import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCheck, Paperclip, SendHorizontal, Smile } from "lucide-react";
import { type Lead, type ChatMessage } from "./leadsData";

export function WhatsAppChatInterface({
  selectedLead,
  selectedConversation,
  lastVendorMessageIndex,
  newMessagesDividerAfterIndex,
}: {
  selectedLead: Lead | null;
  selectedConversation: ChatMessage[];
  lastVendorMessageIndex: number;
  newMessagesDividerAfterIndex: number;
}) {
  return (
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
                {selectedLead.chatSubtitle ? ` - ${selectedLead.chatSubtitle}` : ""}
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
  );
}
