import { Banknote, ChevronDown, ChevronLeft, ChevronRight, CircleDollarSign, Clock3, Eye } from "lucide-react";
import { useMemo, useState } from "react";

import { PaymentDetailsModal } from "@/components/Modal/PaymentDetailsModal";
import type { PaymentRow, PaymentStatus, PaymentStatusFilter } from "@/components/Modal/PaymentDetailsModal.types";

const TOTAL_PAYMENTS = 482;

const payments: PaymentRow[] = [
  {
    id: 1,
    business: "Mama Put Restaurant",
    payerName: "Chukwudi Okafor",
    payerEmail: "chukwudi.okafor@email.com",
    reference: "PAY-9F2A1C8D",
    amountNgn: 12500,
    method: "card",
    status: "completed",
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
  const [selected, setSelected] = useState<PaymentRow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    if (statusFilter === "all") return payments;
    return payments.filter((p) => p.status === statusFilter);
  }, [statusFilter]);

  const filterLabel =
    statusFilter === "all"
      ? "Select status"
      : statusFilter === "completed"
        ? "Completed"
        : statusFilter === "pending"
          ? "Pending"
          : "Failed";

  const totals = useMemo(() => {
    const completed = payments.filter((p) => p.status === "completed");
    const pending = payments.filter((p) => p.status === "pending");
    const completedSum = completed.reduce((s, p) => s + p.amountNgn, 0);
    const pendingSum = pending.reduce((s, p) => s + p.amountNgn, 0);
    return {
      volume: completedSum + pendingSum + payments.filter((p) => p.status === "failed").reduce((s, p) => s + p.amountNgn, 0),
      completedSum,
      pendingCount: pending.length,
    };
  }, []);

  const statCards = [
    {
      label: "Total volume",
      value: formatNgn(totals.volume),
      icon: CircleDollarSign,
      tint: "bg-surface-soft text-chat-accent",
    },
    {
      label: "Completed",
      value: formatNgn(totals.completedSum),
      icon: Banknote,
      tint: "bg-success/10 text-success",
    },
    {
      label: "Pending",
      value: String(totals.pendingCount),
      icon: Clock3,
      tint: "bg-amber-100 text-amber-700",
    },
  ] as const;

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold leading-8 text-ink-heading sm:text-2xl">Payments</h1>
        <p className="mt-1 text-sm text-chat-meta">Track marketplace transactions and payout activity.</p>
      </div>

      <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {statCards.map((item) => (
          <article
            key={item.label}
            className="rounded-xl border border-chat-border-subtle bg-card p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-chat-meta">{item.label}</p>
                <p className="mt-1 truncate text-2xl font-semibold leading-8 text-ink sm:text-3xl">{item.value}</p>
              </div>
              <span className={`shrink-0 rounded-lg p-2 ${item.tint}`}>
                <item.icon className="size-4" />
              </span>
            </div>
          </article>
        ))}
      </section>

      <div className="max-w-9xl mx-auto p-6 bg-gray-50 ">
  
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Payout Methods</h2>
        <button className="flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
          <span className="mr-1 text-lg leading-none">+</span> Add Payout Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10zm3 3h2v5H7v-5zm5 0h2v5h-2v-5zm5 0h2v5h-2v-5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Zenith Bank</h3>
              <p className="text-sm text-gray-500 font-mono">**** 4590</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
            Primary
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-gray-200 transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10zm3 3h2v5H7v-5zm5 0h2v5h-2v-5zm5 0h2v5h-2v-5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Access Bank</h3>
              <p className="text-sm text-gray-500 font-mono">**** 1288</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="text-sm font-semibold text-blue-600 px-4 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              Set as primary
            </button>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>

      <section className="rounded-2xl border border-border-gray bg-card p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]">
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
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Date</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-body-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-sm text-chat-meta">
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
                  <td className="px-4 py-4">
                    <StatusCell status={row.status} />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{row.dateShort}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(row);
                          setModalOpen(true);
                        }}
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

      <PaymentDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} payment={selected} />
    </div>
  );
}
