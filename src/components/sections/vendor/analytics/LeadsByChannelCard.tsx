import { Card, CardContent } from "@/components/ui/card";

export function LeadsByChannelCard() {
  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <p className="text-2xl font-semibold">Leads by Channel</p>
        <div className="mx-auto flex size-44 items-center justify-center rounded-full bg-[conic-gradient(#e11d48_0_48%,#dbe3f7_48%_100%)]">
          <div className="flex size-32 flex-col items-center justify-center rounded-full bg-background">
            <p className="text-4xl font-bold">74%</p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Search Power</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <p className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-brand-red" />Search (48%)</p>
          <p className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-slate-900" />Direct (22%)</p>
          <p className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-sky-700" />Social (18%)</p>
          <p className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-slate-400" />Boost (12%)</p>
        </div>
      </CardContent>
    </Card>
  );
}
