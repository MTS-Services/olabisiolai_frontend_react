import { CheckCircle2, FileText, Megaphone, TrendingUp, UserRound, Store } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Total Users", value: "12,458", icon: UserRound, tint: "bg-surface-soft text-chat-accent" },
    { label: "Total Businesses", value: "3,847", icon: Store, tint: "bg-tint-red text-brand-red" },
    { label: "Verified Businesses", value: "2,156", icon: CheckCircle2, tint: "bg-success/10 text-success" },
    { label: "Pending Verifications", value: "124", icon: TrendingUp, tint: "bg-amber-100 text-amber-500" },
    { label: "Total Leads", value: "8,932", icon: FileText, tint: "bg-surface-soft text-chat-accent" },
    { label: "Active Boosts", value: "456", icon: TrendingUp, tint: "bg-tint-red text-brand-red" },
    { label: "Revenue", value: "₦4.8M", icon: Megaphone, tint: "bg-success/10 text-ink" },
  ] as const;

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-chat-accent">
            Operational Overview
          </p>
          <h1 className="text-2xl font-semibold leading-tight text-ink-heading sm:text-3xl lg:text-4xl">
            Marketplace Intelligence
          </h1>
        </div>
        <div className="inline-flex shrink-0 self-start overflow-hidden rounded-lg border border-chat-border-subtle bg-card">
          <button type="button" className="px-3 py-1.5 text-xs text-chat-meta sm:py-1">
            Weekly
          </button>
          <button type="button" className="bg-chat-accent px-3 py-1.5 text-xs text-ice sm:py-1">
            Monthly
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        {stats.slice(0, 5).map((item) => (
          <article key={item.label} className="rounded-xl border border-chat-border-subtle bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-chat-meta">{item.label}</p>
                <p className="mt-1 text-4xl font-semibold leading-10 text-ink">{item.value}</p>
              </div>
              <span className={`rounded-lg p-2 ${item.tint}`}>
                <item.icon className="size-4" />
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-3 grid max-w-[680px] grid-cols-1 gap-3 md:grid-cols-2">
        {stats.slice(5).map((item) => (
          <article key={item.label} className="rounded-xl border border-chat-border-subtle bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-chat-meta">{item.label}</p>
                <p className="mt-1 text-4xl font-semibold leading-10 text-ink">{item.value}</p>
              </div>
              <span className={`rounded-lg p-2 ${item.tint}`}>
                <item.icon className="size-4" />
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <article className="rounded-xl border border-chat-border-subtle bg-card p-4">
          <h2 className="text-sm font-semibold text-ink">Leads Over Time</h2>
          <div className="mt-4 h-56 rounded-lg border border-chat-border-subtle bg-background p-3">
            <svg viewBox="0 0 500 180" className="h-full w-full">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-success"
                points="0,100 80,85 160,60 240,90 320,40 400,75 500,105"
              />
              {[0, 80, 160, 240, 320, 400, 500].map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={180}
                  className="text-chat-border-subtle"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
        </article>

        <article className="rounded-xl border border-chat-border-subtle bg-card p-4">
          <h2 className="text-sm font-semibold text-ink">New Businesses</h2>
          <div className="mt-4 flex h-56 items-end gap-3 rounded-lg border border-chat-border-subtle bg-background p-3">
            {[12, 15, 18, 14, 22, 10, 8].map((h, i) => (
              <div
                key={`${h}-${i}`}
                className="flex-1 rounded-t-md bg-chat-accent"
                style={{ height: `${h * 7}px` }}
              />
            ))}
          </div>
        </article>
      </section>

      <section className="mt-6 rounded-xl border border-chat-border-subtle bg-card p-4">
        <h2 className="text-2xl font-semibold text-ink">Quick Actions</h2>
        <div className="mt-3 space-y-3">
          {[
            {
              title: "Approve Pending Businesses",
              desc: "124 businesses waiting for approval",
              action: "Review",
            },
            {
              title: "Confirm Payments",
              desc: "18 payments pending confirmation",
              action: "View",
            },
            {
              title: "Assign Boost Slots",
              desc: "32 businesses in queue",
              action: "Manage",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-lg bg-background px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-ink">{item.title}</p>
                <p className="text-xs text-chat-meta">{item.desc}</p>
              </div>
              <button
                type="button"
                className="rounded-full bg-brand-red px-3 py-1 text-xs font-medium text-ice"
              >
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
