import { useMemo } from "react";
import { Download } from "lucide-react";

type QueueHealth = "stable" | "unstable";
type VerificationStatus = "pending" | "approved" | "flagged";

type VerificationRow = {
  id: number;
  businessName: string;
  category: string;
  dateJoined: string;
  verificationDate: string;
  status: VerificationStatus;
};

const DATA: VerificationRow[] = [
  {
    id: 1,
    businessName: "Lagos Logistics Ltd",
    category: "Logistics",
    dateJoined: "2023-10-24",
    verificationDate: "2026-04-24",
    status: "pending",
  },
  {
    id: 2,
    businessName: "Horizon Plumbing",
    category: "Plumbing",
    dateJoined: "2023-10-25",
    verificationDate: "2026-04-25",
    status: "pending",
  },
  {
    id: 3,
    businessName: "City Electricals Hub",
    category: "Electrical",
    dateJoined: "2023-10-25",
    verificationDate: "2026-04-27",
    status: "approved",
  },
  {
    id: 4,
    businessName: "Fresh Clean Nigeria",
    category: "Cleaning",
    dateJoined: "2023-10-26",
    verificationDate: "2026-04-28",
    status: "flagged",
  },
];

function formatDate(input: string) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return date.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
}

function statusClass(status: VerificationStatus) {
  if (status === "approved") return "bg-green-100 text-green-700";
  if (status === "flagged") return "bg-red-100 text-red-700";
  return "bg-amber-100 text-amber-700";
}

function exportCsv(rows: VerificationRow[]) {
  const headers = [
    "Business Name",
    "Category",
    "Date Joined",
    "Verification Date",
    "Status",
  ];
  const csvLines = [
    headers.join(","),
    ...rows.map((row) =>
      [row.businessName, row.category, formatDate(row.dateJoined), formatDate(row.verificationDate), row.status]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(","),
    ),
  ];
  const blob = new Blob([`\uFEFF${csvLines.join("\r\n")}`], { type: "text/csv;charset=utf-8;" });
  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `verification-log-${stamp}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export default function VerificationGrid() {
  const todayKey = new Date().toDateString();
  const todaysVerified = useMemo(
    () =>
      DATA.filter(
        (item) => item.status === "approved" && new Date(item.verificationDate).toDateString() === todayKey,
      ).length,
    [todayKey],
  );

  const averageHours = 2.4;
  const queueHealth: QueueHealth = averageHours < 24 ? "stable" : "unstable";

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold leading-tight text-ink-heading sm:text-3xl">Verifications</h1>
      </div>

      <div className="mb-4">
        <button
          type="button"
          onClick={() => exportCsv(DATA)}
          className="inline-flex items-center gap-2 rounded-xl border border-border-gray bg-card px-4 py-2.5 text-sm font-semibold text-ink hover:bg-muted"
        >
          <Download className="size-4" />
          Export Log (Excel/CSV)
        </button>
      </div>

      <section className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <article className="rounded-xl border border-chat-border-subtle bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-chat-meta">Queue Health</p>
          <p className={`mt-1 text-4xl font-semibold leading-10 ${queueHealth === "stable" ? "text-success" : "text-brand-red"}`}>
            {queueHealth === "stable" ? "Stable" : "Unstable"}
          </p>
          <p className="mt-1 text-sm text-body-secondary">Avg response time: {averageHours}hrs</p>
          <p className="mt-1 text-xs text-body-secondary">
            {queueHealth === "stable" ? "Less than 24 hours" : "Above 24 hours"}
          </p>
        </article>

        <article className="rounded-xl border border-chat-border-subtle bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-chat-meta">Today&apos;s Verified</p>
          <p className="mt-1 text-4xl font-semibold leading-10 text-ink">{todaysVerified.toLocaleString()}</p>
          <p className="mt-1 text-sm font-medium text-success">+12% from yesterday</p>
        </article>
      </section>

      <section className="overflow-x-auto rounded-2xl border border-border-gray bg-card">
        <table className="w-full min-w-[980px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-gray bg-muted/40">
              <th className="px-4 py-3 text-left text-xs font-semibold text-body-secondary">Business Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-body-secondary">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-body-secondary">Date Joined</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-body-secondary">Verification Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-body-secondary">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-body-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {DATA.map((row) => (
              <tr key={row.id} className="border-b border-border-light">
                <td className="px-4 py-3 font-medium text-ink">{row.businessName}</td>
                <td className="px-4 py-3 text-ink">{row.category}</td>
                <td className="px-4 py-3 text-body-secondary">{formatDate(row.dateJoined)}</td>
                <td className="px-4 py-3 text-body-secondary">{formatDate(row.verificationDate)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      className="rounded-md bg-success px-3 py-1.5 text-xs font-semibold text-white hover:bg-success/90"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600"
                    >
                      Flag
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-border-gray px-3 py-1.5 text-xs font-semibold text-body-secondary hover:bg-muted"
                    >
                      Request Info
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}