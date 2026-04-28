import { ChevronDown, ChevronLeft, ChevronRight, Download, Eye } from "lucide-react";
import { useMemo, useState } from "react";


import type { PaymentRow, PaymentStatus, PaymentStatusFilter } from "@/components/Modal/PaymentDetailsModal.types";

const TOTAL_PAYMENTS = 482;
type TransactionTab = "all" | "subscription" | "boost" | "verification";
type PaymentWithType = PaymentRow & { transactionType: Exclude<TransactionTab, "all"> };

const payments: PaymentWithType[] = [
  {
    id: 1,
    business: "Mama Put Restaurant",
    payerName: "Chukwudi Okafor",
    payerEmail: "chukwudi.okafor@email.com",
    reference: "PAY-9F2A1C8D",
    amountNgn: 12500,
    method: "card",
    status: "completed",
    transactionType: "verification",
    dateShort: "Apr 1, 02:30 PM",
    dateTimeLong: "April 1, 2024 at 02:30 PM",
  },
  {
    id: 2,
    business: "TechHub Solutions",
    payerName: "Aisha Mohammed",
    payerEmail: "aisha.m@email.com",
    reference: "PAY-3B7E9021",
    amountNgn: 48000,
    method: "bank_transfer",
    status: "completed",
    transactionType: "subscription",
    dateShort: "Apr 1, 03:45 PM",
    dateTimeLong: "April 1, 2024 at 03:45 PM",
  },
  {
    id: 3,
    business: "Divine Salon & Spa",
    payerName: "Ngozi Eze",
    payerEmail: "ngozi.eze@email.com",
    reference: "PAY-55CC10AB",
    amountNgn: 8200,
    method: "wallet",
    status: "pending",
    transactionType: "boost",
    dateShort: "Apr 2, 10:15 AM",
    dateTimeLong: "April 2, 2024 at 10:15 AM",
  },
  {
    id: 4,
    business: "Fresh Groceries Ltd",
    payerName: "Ibrahim Musa",
    payerEmail: "ibrahim.musa@email.com",
    reference: "PAY-1100DE4F",
    amountNgn: 15600,
    method: "card",
    status: "failed",
    transactionType: "verification",
    dateShort: "Apr 2, 11:20 AM",
    dateTimeLong: "April 2, 2024 at 11:20 AM",
  },
  {
    id: 5,
    business: "AutoFix Mechanics",
    payerName: "Emeka Nwankwo",
    payerEmail: "emeka.n@email.com",
    reference: "PAY-77AA0099",
    amountNgn: 22000,
    method: "bank_transfer",
    status: "completed",
    transactionType: "subscription",
    dateShort: "Apr 3, 09:05 AM",
    dateTimeLong: "April 3, 2024 at 09:05 AM",
  },
  {
    id: 6,
    business: "QuickFix Plumbing",
    payerName: "John Okoro",
    payerEmail: "john.okoro@email.com",
    reference: "PAY-441122EE",
    amountNgn: 9900,
    method: "card",
    status: "pending",
    transactionType: "boost",
    dateShort: "Apr 3, 01:40 PM",
    dateTimeLong: "April 3, 2024 at 01:40 PM",
  },
];

function formatNgn(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function methodLabel(method: PaymentRow["method"]) {
  if (method === "card") return "Card";
  if (method === "bank_transfer") return "Bank transfer";
  return "Wallet";
}

function StatusCell({ status }: { status: PaymentStatus }) {
  if (status === "completed") {
    return (
      <span className="inline-flex rounded-full bg-[rgb(27_175_93/0.1)] px-2.5 py-0.5 text-xs font-medium text-[#1baf5d]">
        Completed
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
        Pending
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
      Failed
    </span>
  );
}

export default function Payments() {
  const [statusFilter, setStatusFilter] = useState<PaymentStatusFilter>("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TransactionTab>("all");
  const [trendRange, setTrendRange] = useState<"monthly" | "yearly">("monthly");



  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      const matchesTab = activeTab === "all" || p.transactionType === activeTab;
      return matchesStatus && matchesTab;
    });
  }, [statusFilter, activeTab]);

  const filterLabel =
    statusFilter === "all"
      ? "Select status"
      : statusFilter === "completed"
        ? "Completed"
        : statusFilter === "pending"
          ? "Pending"
          : "Failed";

  const trendSeries = trendRange === "monthly"
    ? [
      { label: "Jan", value: 62 },
      { label: "Feb", value: 69 },
      { label: "Mar", value: 76 },
      { label: "Apr", value: 82 },
      { label: "May", value: 88 },
      { label: "Jun", value: 93 },
    ]
    : [
      { label: "2021", value: 34 },
      { label: "2022", value: 46 },
      { label: "2023", value: 61 },
      { label: "2024", value: 74 },
      { label: "2025", value: 86 },
      { label: "2026", value: 95 },
    ];

  const chartHeight = 128;
  const chartWidth = 560;
  const spacing = chartWidth / Math.max(trendSeries.length - 1, 1);
  const maxValue = Math.max(...trendSeries.map((point) => point.value));
  const minValue = Math.min(...trendSeries.map((point) => point.value));
  const range = Math.max(maxValue - minValue, 1);

  const points = trendSeries
    .map((point, index) => {
      const x = index * spacing;
      const y = chartHeight - ((point.value - minValue) / range) * (chartHeight - 20) - 10;
      return `${x},${y}`;
    })
    .join(" ");

  const exportForFinance = () => {
    const headers = ["Business", "Payer", "Email", "Reference", "Amount (NGN)", "Type", "Method", "Status", "Date"];
    const csv = [
      headers.join(","),
      ...filtered.map((row) =>
        [
          row.business,
          row.payerName,
          row.payerEmail,
          row.reference,
          row.amountNgn,
          row.transactionType,
          methodLabel(row.method),
          row.status,
          row.dateShort,
        ]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      ),
    ].join("\r\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const now = new Date();
    const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `finance-payments-${stamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold leading-8 text-ink-heading sm:text-2xl">Payments</h1>
        <p className="mt-1 text-sm text-chat-meta">Track platform revenue and verification settlements.</p>
      </div>

      <section className="mb-4 rounded-2xl border border-chat-border-subtle bg-card p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-chat-accent">Financial Overview</p>
            <h2 className="text-xl font-semibold text-ink">Payments & Revenue</h2>
          </div>
          <button
            type="button"
            onClick={exportForFinance}
            className="inline-flex items-center gap-2 rounded-lg border border-border-gray bg-background px-3 py-2 text-xs font-semibold text-ink hover:bg-muted"
          >
            <Download className="size-4" />
            Export for Finance
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-chat-meta">Total Revenue</p>
            <p className="mt-1 text-4xl font-semibold leading-10 text-ink">₦48.2M</p>
            <p className="text-xs font-medium text-success">+14%</p>
          </article>
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-chat-meta">Verification Revenue</p>
            <p className="mt-1 text-4xl font-semibold leading-10 text-ink">₦3.8M</p>
            <p className="text-xs font-medium text-success">+12%</p>
          </article>
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-chat-meta">Subscription Revenue</p>
            <p className="mt-1 text-4xl font-semibold leading-10 text-ink">₦28.4M</p>
            <p className="text-xs font-medium text-success">+18%</p>
          </article>
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-chat-meta">Boost Revenue</p>
            <p className="mt-1 text-4xl font-semibold leading-10 text-ink">₦19.8M</p>
            <p className="text-xs font-medium text-success">+22%</p>
          </article>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-ink">Revenue Trends</p>
              <div className="inline-flex rounded-md border border-border-gray bg-card p-1">
                <button
                  type="button"
                  onClick={() => setTrendRange("monthly")}
                  className={`rounded px-2.5 py-1 text-xs font-medium ${trendRange === "monthly" ? "bg-chat-accent text-ice" : "text-body-secondary hover:bg-muted"
                    }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setTrendRange("yearly")}
                  className={`rounded px-2.5 py-1 text-xs font-medium ${trendRange === "yearly" ? "bg-chat-accent text-ice" : "text-body-secondary hover:bg-muted"
                    }`}
                >
                  Yearly
                </button>
              </div>
            </div>
            <div className="mt-3 rounded-md border border-border-gray bg-linear-to-b from-blue-50 to-transparent p-3">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-28 w-full" preserveAspectRatio="none">
                {[0, 1, 2, 3].map((line) => {
                  const y = (chartHeight / 4) * line;
                  return <line key={line} x1={0} y1={y} x2={chartWidth} y2={y} stroke="currentColor" className="text-border-gray" strokeWidth="1" />;
                })}
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-chat-accent"
                  points={points}
                />
                {trendSeries.map((point, index) => {
                  const x = index * spacing;
                  const y = chartHeight - ((point.value - minValue) / range) * (chartHeight - 20) - 10;
                  return <circle key={point.label} cx={x} cy={y} r="3" className="fill-chat-accent" />;
                })}
              </svg>
              <div className="mt-2 grid grid-cols-6 text-[10px] text-body-secondary">
                {trendSeries.map((point) => (
                  <span key={point.label} className="text-center">
                    {point.label}
                  </span>
                ))}
              </div>
            </div>
          </article>
          <article className="rounded-xl border border-chat-border-subtle bg-background p-3">
            <p className="text-sm font-semibold text-ink">Revenue Breakdown</p>
            <div className="mt-2 space-y-2 text-xs">
              {[
                { label: "Subscriptions", width: "56%" },
                { label: "Boosts", width: "39%" },
                { label: "Verifications", width: "5%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-body-secondary">
                    <span>{item.label}</span>
                    <span>{item.width}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-chat-accent" style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>


      <section className="rounded-2xl border border-border-gray bg-card p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-ink">Transaction History</h2>
          <div className="mt-3 flex flex-wrap items-center gap-2 border-b border-border-gray pb-2">
            {([
              ["all", "All Transactions"],
              ["subscription", "Subscriptions"],
              ["boost", "Boosts"],
              ["verification", "Verification"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold ${activeTab === key ? "bg-chat-accent text-ice" : "text-body-secondary hover:bg-muted"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="relative inline-block w-48">
            <button
              type="button"
              onClick={() => setFilterOpen((o) => !o)}
              className="flex h-[42px] w-full items-center justify-between rounded-xl border border-border-gray bg-card pl-[15px] pr-10 text-left text-sm font-normal text-ink"
            >
              {filterLabel}
            </button>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-5 -translate-y-1/2 text-body-secondary" />
            {filterOpen ? (
              <div className="absolute left-0 z-20 mt-2 w-full overflow-hidden rounded-xl border border-border-gray bg-card shadow-sm">
                {(["all", "completed", "pending", "failed"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setStatusFilter(key);
                      setFilterOpen(false);
                    }}
                    className="flex w-full px-3 py-2 text-left text-sm text-ink hover:bg-muted"
                  >
                    {key === "all" ? "All statuses" : key === "completed" ? "Completed" : key === "pending" ? "Pending" : "Failed"}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse">
            <thead>
              <tr className="border-b border-border-gray">
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Business</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Payer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Reference</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Method</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Date</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-body-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-sm text-chat-meta">
                    No payments for this filter.
                  </td>
                </tr>
              ) : null}
              {filtered.map((row) => (
                <tr key={row.id} className="border-b border-border-light">
                  <td className="px-4 py-5 text-base font-medium text-ink">{row.business}</td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-ink">{row.payerName}</p>
                    <p className="text-xs text-gray-500">{row.payerEmail}</p>
                  </td>
                  <td className="px-4 py-4 font-mono text-sm text-ink">{row.reference}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-ink">{formatNgn(row.amountNgn)}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{methodLabel(row.method)}</td>
                  <td className="px-4 py-4 text-sm capitalize text-gray-600">{row.transactionType}</td>
                  <td className="px-4 py-4">
                    <StatusCell status={row.status} />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{row.dateShort}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => { }}
                        className="inline-flex h-8 items-center gap-2 rounded-xl px-3 text-sm font-medium text-body-secondary hover:bg-muted"
                      >
                        <Eye className="size-4 shrink-0" strokeWidth={2} />
                        View details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-tint-red/20 px-1 pb-0 pt-4">
          <p className="text-xs font-medium text-stone-700">
            Showing 1-10 of {TOTAL_PAYMENTS} payments
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg opacity-30"
              disabled
              aria-label="Previous page"
            >
              <ChevronLeft className="size-3.5 text-stone-700" />
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg bg-brand-red text-xs font-semibold text-white"
            >
              1
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-xs font-semibold text-stone-700 hover:bg-muted"
            >
              2
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-xs font-semibold text-stone-700 hover:bg-muted"
            >
              3
            </button>
            <span className="px-1 text-base text-stone-700">...</span>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-xs font-semibold text-stone-700 hover:bg-muted"
            >
              49
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-stone-700 hover:bg-muted"
              aria-label="Next page"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
