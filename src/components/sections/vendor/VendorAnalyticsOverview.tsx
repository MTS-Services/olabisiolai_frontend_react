import { Clock3, Eye, Mail, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  { title: "Total Enquiries", value: "1,284", delta: "+12%", icon: Mail, up: true },
  { title: "Profile Views", value: "42.5k", delta: "+8%", icon: Eye, up: true },
  { title: "Avg Conversion", value: "3.8%", delta: "-0.5%", icon: TrendingUp, up: false },
  { title: "Response Time", value: "15m", delta: "Stable", icon: Clock3, up: true },
];

const reachAreas = [
  { area: "Eti-Osa", value: 92 },
  { area: "Ikeja", value: 78 },
  { area: "Lagos Island", value: 65 },
  { area: "Surulere", value: 40 },
  { area: "Lekki Ph 1", value: 32 },
];

const listings = [
  { name: "Luxury Penthouse Staging", views: "12,402", clicks: "890", ctr: "7.1%", enquiries: "142", status: "Active" },
  { name: "Commercial Interior Refit", views: "8,110", clicks: "420", ctr: "5.2%", enquiries: "88", status: "Active" },
  { name: "Smart Home Consulting", views: "5,430", clicks: "215", ctr: "3.9%", enquiries: "54", status: "Boosted" },
  { name: "Bespoke Kitchen Design", views: "4,902", clicks: "180", ctr: "3.6%", enquiries: "31", status: "Active" },
];

function StatCard({
  title,
  value,
  delta,
  icon: Icon,
  up,
}: {
  title: string;
  value: string;
  delta: string;
  icon: React.ComponentType<{ className?: string }>;
  up: boolean;
}) {
  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div className="rounded-md bg-muted p-2 text-brand-red">
            <Icon className="size-4" />
          </div>
          <p className={cn("text-xs font-semibold", up ? "text-emerald-600" : "text-red-600")}>{delta}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function VendorAnalyticsOverview() {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Performance Overview</h1>
          <p className="text-sm text-muted-foreground">Real-time data for your vendor ecosystem.</p>
        </div>
        <div className="inline-flex rounded-xl border bg-background p-1 text-xs">
          <button className="rounded-lg bg-muted px-3 py-1.5 font-medium">Last 30 Days</button>
          <button className="rounded-lg px-3 py-1.5 text-muted-foreground">Last Quarter</button>
          <button className="rounded-lg px-3 py-1.5 text-muted-foreground">Yearly</button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <Card>
          <CardContent className="p-5">
            <p className="mb-4 text-2xl font-semibold">Visitor Traffic Trend</p>
            <div className="mb-3 flex justify-end gap-4 text-xs">
              <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-brand-red" />Views</span>
              <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-slate-700" />Enquiries</span>
            </div>
            <div className="grid h-52 grid-cols-10 items-end gap-2">
              {[30, 45, 40, 68, 54, 72, 50, 35, 63, 45].map((value, idx) => (
                <div key={`${value}-${idx}`} className={cn("rounded-t bg-slate-200/80", idx === 5 && "bg-brand-red")} style={{ height: `${value}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>

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
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
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

        <Card>
          <CardContent className="space-y-4 p-5">
            <p className="text-2xl font-semibold">Engagement Heatmap</p>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-muted-foreground">
              {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="space-y-1.5">
              {[
                [25, 40, 35, 42, 55, 70, 58],
                [50, 68, 75, 85, 88, 90, 77],
                [45, 58, 65, 72, 81, 62, 49],
              ].map((row, i) => (
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
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <p className="text-2xl font-semibold">Top Performing Listings</p>
            <button type="button" className="text-xs font-semibold text-brand-red hover:underline">
              Export Report
            </button>
          </div>
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Service Name</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Clicks</th>
                <th className="px-4 py-3">CTR</th>
                <th className="px-4 py-3">Enquiries</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item) => (
                <tr key={item.name} className="border-t">
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3">{item.views}</td>
                  <td className="px-4 py-3">{item.clicks}</td>
                  <td className="px-4 py-3">{item.ctr}</td>
                  <td className="px-4 py-3 font-semibold text-brand-red">{item.enquiries}</td>
                  <td className="px-4 py-3">
                    <Badge
                      className={cn(
                        item.status === "Boosted"
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
                      )}
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </section>
  );
}

