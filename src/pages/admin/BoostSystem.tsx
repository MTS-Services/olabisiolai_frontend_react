import { ChevronDown, Download, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

type SlotOption = { label: string; value: string; max: number };

const SLOT_OPTIONS: SlotOption[] = [
  { label: "Top 1", value: "1", max: 1 },
  { label: "Top 3", value: "3", max: 3 },
  { label: "Top 5", value: "5", max: 5 },
];

type ActiveBoost = {
  id: number;
  businessName: string;
  type: "bronze" | "silver" | "gold";
  lga: string;
  startDate: string;
  endDate: string;
  status: "active" | "ending";
  performanceViews: number;
};

type WaitingEntry = {
  id: number;
  name: string;
  categoryLine: string;
  lga: string;
  rank: number;
};

const INITIAL_ACTIVE: ActiveBoost[] = [
  {
    id: 1,
    businessName: "Mama Kay's Kitchen",
    type: "gold",
    lga: "Ikeja",
    startDate: "2026-04-12",
    endDate: "2026-04-30",
    status: "active",
    performanceViews: 3237,
  },
  {
    id: 2,
    businessName: "Lagos Tech Hub",
    type: "silver",
    lga: "Ikeja",
    startDate: "2026-03-20",
    endDate: "2026-04-30",
    status: "ending",
    performanceViews: 2107,
  },
  {
    id: 3,
    businessName: "Royal Beauty Spot",
    type: "bronze",
    lga: "Lekki",
    startDate: "2026-04-12",
    endDate: "2026-05-02",
    status: "active",
    performanceViews: 1582,
  },
  {
    id: 4,
    businessName: "Ken Fashion Boutique",
    type: "bronze",
    lga: "Lekki",
    startDate: "2026-03-18",
    endDate: "2026-04-30",
    status: "ending",
    performanceViews: 1182,
  },
  {
    id: 5,
    businessName: "Port Harcourt Auto Services",
    type: "gold",
    lga: "Port Harcourt",
    startDate: "2026-04-15",
    endDate: "2026-05-06",
    status: "active",
    performanceViews: 4034,
  },
];

const INITIAL_WAITING: WaitingEntry[] = [
  { id: 1, name: "AutoFix Mechanics", categoryLine: "Auto Services", lga: "Ikeja", rank: 1 },
  { id: 2, name: "Divine Salon & Spa", categoryLine: "Beauty Services", lga: "Lekki", rank: 2 },
  { id: 3, name: "QuickFix Plumbing", categoryLine: "Home Services", lga: "Ikeja", rank: 3 },
];

const BOOST_PLANS = [
  {
    title: "Bronze",
    price: "₦6,000",
    description: "7 days boost, basic analytics",
    tag: "basic",
  },
  {
    title: "Silver",
    price: "₦15,000",
    description: "15 days boost, priority support",
    tag: "most popular",
  },
  {
    title: "Gold",
    price: "₦35,000",
    description: "30 days boost, featured manager",
    tag: "elite",
  },
] as const;

export default function BoostSystem() {
  const [slotOpen, setSlotOpen] = useState(false);
  const [slotValue, setSlotValue] = useState("5");
  const [selectedLga, setSelectedLga] = useState("Ikeja");
  const [activeList, setActiveList] = useState<ActiveBoost[]>(INITIAL_ACTIVE);
  const [waitingList, setWaitingList] = useState<WaitingEntry[]>(INITIAL_WAITING);

  const slotOption = useMemo(() => SLOT_OPTIONS.find((o) => o.value === slotValue) ?? SLOT_OPTIONS[2], [slotValue]);
  const lgaOptions = useMemo(() => Array.from(new Set(activeList.map((item) => item.lga))).sort(), [activeList]);
  const activeInSelectedLga = useMemo(
    () => activeList.filter((item) => item.lga === selectedLga),
    [activeList, selectedLga],
  );
  const activeCount = activeInSelectedLga.length;
  const slotLabel = useMemo(() => `Top ${slotOption.value}`, [slotOption.value]);
  const atSlotCapacity = activeCount >= slotOption.max;

  function removeActive(id: number) {
    setActiveList((list) => list.filter((a) => a.id !== id));
  }

  function assignFromWaiting(entry: WaitingEntry) {
    const currentForLga = activeList.filter((item) => item.lga === entry.lga).length;
    if (currentForLga >= slotOption.max) return;
    setWaitingList((list) => list.filter((w) => w.id !== entry.id));
    setActiveList((list) => [
      ...list,
      {
        id: Date.now(),
        businessName: entry.name,
        type: "bronze",
        lga: entry.lga,
        startDate: new Date().toISOString().slice(0, 10),
        endDate: "2026-05-30",
        status: "active",
        performanceViews: 0,
      },
    ]);
  }

  function exportTrackingCsv() {
    const headers = ["Business", "LGA", "Type", "Start Date", "End Date", "Status", "Performance Views"];
    const csvLines = [
      headers.join(","),
      ...activeList.map((row) =>
        [
          row.businessName,
          row.lga,
          row.type,
          row.startDate,
          row.endDate,
          row.status,
          row.performanceViews,
        ]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      ),
    ];
    const blob = new Blob([`\uFEFF${csvLines.join("\r\n")}`], { type: "text/csv;charset=utf-8;" });
    const now = new Date();
    const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `boost-tracking-${stamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold leading-tight text-ink-heading sm:text-3xl">Boost System</h1>
      </div>

      <section className="mb-4 rounded-2xl border border-chat-border-subtle bg-card p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-chat-accent">Boost Overview</p>
        <h2 className="text-xl font-semibold text-ink">Boost System</h2>
        <p className="text-sm text-chat-meta">Manage boost slots, campaigns, and promotional activities</p>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-chat-meta">Active Boosts</p>
            <p className="mt-1 text-4xl font-semibold leading-10 text-ink">{activeList.length}</p>
            <p className="text-xs font-medium text-success">+12%</p>
          </article>
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-chat-meta">Monthly Revenue</p>
            <p className="mt-1 text-4xl font-semibold leading-10 text-ink">₦19.8M</p>
            <p className="text-xs font-medium text-success">+22%</p>
          </article>
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-chat-meta">Avg Duration</p>
            <p className="mt-1 text-4xl font-semibold leading-10 text-ink">14 days</p>
            <p className="text-xs font-medium text-body-secondary">Per campaign</p>
          </article>
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-chat-meta">Avg CTR</p>
            <p className="mt-1 text-4xl font-semibold leading-10 text-ink">3.2x</p>
            <p className="text-xs font-medium text-body-secondary">Industry average</p>
          </article>
        </div>
      </section>

      <section className="mb-4 rounded-2xl border border-chat-border-subtle bg-card p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-ink">Boost Plans</h3>
          <button
            type="button"
            onClick={exportTrackingCsv}
            className="inline-flex items-center gap-2 rounded-lg border border-border-gray bg-background px-3 py-2 text-xs font-semibold text-ink hover:bg-muted"
          >
            <Download className="size-4" />
            Export for tracking
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {BOOST_PLANS.map((plan) => (
            <article key={plan.title} className="rounded-xl border border-chat-border-subtle bg-background p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-ink">{plan.title}</h4>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-700">
                  {plan.tag}
                </span>
              </div>
              <p className="text-2xl font-semibold text-ink">{plan.price}</p>
              <p className="mt-1 text-xs text-chat-meta">{plan.description}</p>
              <button type="button" className="mt-3 rounded-md bg-brand-red px-3 py-1.5 text-xs font-semibold text-white">
                Manage Tier
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-4 rounded-2xl border border-chat-border-subtle bg-card p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-ink">LGA Slot Manager</h3>
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-chat-meta">LGA</label>
            <select
              value={selectedLga}
              onChange={(event) => setSelectedLga(event.target.value)}
              className="h-9 rounded-lg border border-border-gray bg-background px-3 text-sm text-ink"
            >
              {lgaOptions.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
            <div className="relative">
              <button
                type="button"
                onClick={() => setSlotOpen((o) => !o)}
                className="inline-flex h-9 min-w-28 items-center justify-between gap-2 rounded-lg border border-border-gray bg-background px-3 text-sm font-medium text-ink"
              >
                {slotLabel}
                <ChevronDown className="size-4 shrink-0 text-body-secondary" />
              </button>
              {slotOpen ? (
                <div className="absolute left-0 z-20 mt-1 w-full min-w-28 overflow-hidden rounded-lg border border-border-gray bg-card py-1 shadow-md">
                  {SLOT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setSlotValue(opt.value);
                        setSlotOpen(false);
                      }}
                      className="flex w-full px-3 py-2 text-left text-sm text-ink hover:bg-muted"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-chat-border-subtle bg-background px-3 py-2 text-sm">
          <span className="font-semibold text-ink">{selectedLga}</span>: {activeCount}/{slotOption.max} slots used -{" "}
          <span className={atSlotCapacity ? "font-semibold text-brand-red" : "font-semibold text-success"}>
            {atSlotCapacity ? "FULL" : "AVAILABLE"}
          </span>
        </div>
      </section>

      <section className="mb-4 rounded-2xl border border-chat-border-subtle bg-card p-4">
        <h3 className="mb-3 text-base font-semibold text-ink">Active Boost Campaigns</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="border-b border-border-gray">
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-body-secondary">Business</th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-body-secondary">Type</th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-body-secondary">LGA</th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-body-secondary">Start Date</th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-body-secondary">End Date</th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-body-secondary">Status</th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-body-secondary">Performance</th>
                <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-body-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeList.map((item) => (
                <tr key={item.id} className="border-b border-border-light">
                  <td className="px-3 py-3 text-sm font-medium text-ink">{item.businessName}</td>
                  <td className="px-3 py-3 text-sm capitalize text-body-secondary">{item.type}</td>
                  <td className="px-3 py-3 text-sm text-body-secondary">{item.lga}</td>
                  <td className="px-3 py-3 text-sm text-body-secondary">{item.startDate}</td>
                  <td className="px-3 py-3 text-sm text-body-secondary">{item.endDate}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === "active" ? "bg-success/10 text-success" : "bg-amber-100 text-amber-700"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm text-ink">{item.performanceViews.toLocaleString()} views</td>
                  <td className="px-3 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => removeActive(item.id)}
                        className="inline-flex size-7 items-center justify-center rounded-md hover:bg-muted"
                        aria-label={`Remove boost for ${item.businessName}`}
                      >
                        <X className="size-4 text-brand-red" strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-chat-border-subtle bg-card p-4">
        <h3 className="mb-3 text-base font-semibold text-ink">Waiting List</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {waitingList.map((item) => (
            <article key={item.id} className="rounded-xl border border-chat-border-subtle bg-background p-3">
              <p className="font-semibold text-ink">{item.name}</p>
              <p className="text-xs text-body-secondary">{item.categoryLine}</p>
              <p className="text-xs text-body-secondary">LGA: {item.lga}</p>
              <p className="text-xs text-body-secondary">Rank: #{item.rank}</p>
              <button
                type="button"
                disabled={activeList.filter((entry) => entry.lga === item.lga).length >= slotOption.max}
                onClick={() => assignFromWaiting(item)}
                className="mt-2 inline-flex items-center gap-1 rounded-md bg-success px-3 py-1.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="size-3.5" />
                Assign
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
