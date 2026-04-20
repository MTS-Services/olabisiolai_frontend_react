import { Card, CardContent } from "@/components/ui/card";
import { reachAreas } from "./analyticsData";

export function ReachAreasCard() {
  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <p className="text-2xl font-semibold">Top Reach Areas (LGA)</p>
        {reachAreas.map((item) => (
          <div key={item.area} className="grid grid-cols-[110px_1fr_40px] items-center gap-2 text-sm">
            <span>{item.area}</span>
            <div className="h-3 rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-brand-red" style={{ width: `${item.value}%` }} />
            </div>
            <span className="text-right text-xs font-semibold">{item.value}%</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
