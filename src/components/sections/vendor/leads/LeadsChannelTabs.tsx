import { FileText, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type LeadChannel } from "./leadsData";

export function LeadsTabs({
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
