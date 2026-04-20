export function AnalyticsHeader() {
  return (
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
  );
}
