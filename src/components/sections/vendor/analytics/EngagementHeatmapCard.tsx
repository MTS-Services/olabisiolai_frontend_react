import { Card, CardContent } from "@/components/ui/card";
import { heatmapData } from "./analyticsData";

export function EngagementHeatmapCard() {
  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <p className="text-2xl font-semibold">Engagement Heatmap</p>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-muted-foreground">
          {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="space-y-1.5">
          {heatmapData.map((row, i) => (
            <div key={i} className="grid grid-cols-7 gap-1">
              {row.map((v, idx) => (
                <div key={`${i}-${idx}`} className="h-6 rounded-sm" style={{ backgroundColor: `rgba(225,29,72,${v / 100})` }} />
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Peak activity detected on Thursdays @ 2pm</p>
      </CardContent>
    </Card>
  );
}
