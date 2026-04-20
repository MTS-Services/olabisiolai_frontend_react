import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { trafficData } from "./analyticsData";

export function TrafficTrendCard() {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="mb-4 text-2xl font-semibold">Visitor Traffic Trend</p>
        <div className="mb-3 flex justify-end gap-4 text-xs">
          <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-brand-red" />Views</span>
          <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-slate-700" />Enquiries</span>
        </div>
        <div className="grid h-52 grid-cols-10 items-end gap-2">
          {trafficData.map((value, idx) => (
            <div key={`${value}-${idx}`} className={cn("rounded-t bg-slate-200/80", idx === 5 && "bg-brand-red")} style={{ height: `${value}%` }} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
