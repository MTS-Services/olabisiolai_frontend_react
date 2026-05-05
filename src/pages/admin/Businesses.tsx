import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
  Trash2,
} from "lucide-react";
import { BusinessDetailsModal } from "@/components/Modal/BusinessDetailsModal";
import { fetchAdminBusinessInfo, type AdminBusinessInfo } from "@/features/business/adminBusinessInfoApi";

type Status = "pending" | "active" | "suspended";
type Verification = "pending" | "verified" | "rejected";
type Boost = "none" | "active";
type Business = AdminBusinessInfo;

const statusStyles: Record<Status, string> = {
  pending: "bg-orange-50 text-orange-500 border border-orange-200",
  active: "bg-green-50 text-green-600 border border-green-200",
  suspended: "bg-red-50 text-red-500 border border-red-200",
};

const verificationStyles: Record<Verification, string> = {
  pending: "bg-orange-50 text-orange-500 border border-orange-200",
  verified: "bg-green-50 text-green-600 border border-green-200",
  rejected: "bg-red-50 text-red-500 border border-red-200",
};

const boostStyles: Record<Boost, string> = {
  none: "bg-gray-100 text-gray-500 border border-gray-200",
  active: "bg-blue-50 text-blue-500 border border-blue-200",
};

function Badge({ label, className }: { label: string; className: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
}

function SelectFilter({
  placeholder,
  value,
  onChange,
  options,
}: {
  placeholder: string;
  value: string;
  onChange: (next: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-8 text-sm text-gray-600 outline-none transition-colors hover:border-gray-300 focus:border-gray-400"
      >
        <option value="all">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

export default function BusinessTable() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 49;
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const listQuery = useQuery({
    queryKey: ["admin", "business-info"],
    queryFn: fetchAdminBusinessInfo,
  });
  const businesses = listQuery.data ?? [];
  const errorMessage =
    listQuery.error instanceof Error && listQuery.error.message.trim()
      ? listQuery.error.message
      : "Failed to load business list.";

  const typeOptions = useMemo(() => Array.from(new Set(businesses.map((item) => item.type))), [businesses]);
  const categoryOptions = useMemo(
    () => Array.from(new Set(businesses.map((item) => item.category))),
    [businesses],
  );

  const filtered = businesses.filter((b) => {
    const query = search.toLowerCase();
    const matchesSearch =
      b.name.toLowerCase().includes(query) ||
      b.category.toLowerCase().includes(query) ||
      b.location.toLowerCase().includes(query);
    const matchesType = typeFilter === "all" || b.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || b.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const totalBusinesses = businesses.length;
  const freeVendors = businesses.filter((item) => item.plan === "free").length;
  const premiumVendors = businesses.filter((item) => item.plan === "premium").length;
  const verifiedBusinesses = businesses.filter((item) => item.verification === "verified").length;
  const verificationRate = totalBusinesses === 0 ? 0 : Math.round((verifiedBusinesses / totalBusinesses) * 100);
  const pendingReview = businesses.filter((item) => item.verification === "pending").length;

  const handleExport = () => {
    const headers = [
      "Business Name",
      "Category",
      "Type",
      "Location",
      "Status",
      "Verification",
      "Boost",
      "Plan",
      "Join Date",
    ];
    const rows = filtered.map((item) => [
      item.name,
      item.category,
      item.type,
      item.location,
      item.status,
      item.verification,
      item.boost,
      item.plan,
      formatDate(item.joinDate),
    ]);
    const csvRows = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");
    const now = new Date();
    const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const blob = new Blob([`\uFEFF${csvRows}`], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `businesses-export-${stamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const pages = [1, 2, 3];

  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold leading-tight text-ink-heading sm:text-3xl">Businesses</h1>
      </div>

      <section className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        <article className="rounded-xl border border-chat-border-subtle bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-chat-meta">Total Businesses</p>
          <p className="mt-1 text-4xl font-semibold leading-10 text-ink">{totalBusinesses.toLocaleString()}</p>
          <p className="mt-1 text-xs font-medium text-success">+8%</p>
        </article>
        <article className="rounded-xl border border-chat-border-subtle bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-chat-meta">Free Vendors</p>
          <p className="mt-1 text-4xl font-semibold leading-10 text-ink">{freeVendors.toLocaleString()}</p>
          <p className="mt-1 text-xs font-medium text-chat-accent">Plan: Free</p>
        </article>
        <article className="rounded-xl border border-chat-border-subtle bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-chat-meta">Premium Vendors</p>
          <p className="mt-1 text-4xl font-semibold leading-10 text-ink">{premiumVendors.toLocaleString()}</p>
          <p className="mt-1 text-xs font-medium text-brand-red">Plan: Premium</p>
        </article>
        <article className="rounded-xl border border-chat-border-subtle bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-chat-meta">Verification Rate</p>
          <p className="mt-1 text-4xl font-semibold leading-10 text-ink">{verificationRate}%</p>
          <p className="mt-1 text-xs font-medium text-amber-600">Stable</p>
        </article>
        <article className="rounded-xl border border-chat-border-subtle bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-chat-meta">Pending Review</p>
          <p className="mt-1 text-4xl font-semibold leading-10 text-ink">{pendingReview.toLocaleString()}</p>
          <p className="mt-1 text-xs font-medium text-brand-red">Urgent</p>
        </article>
      </section>
      {listQuery.isError ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}{" "}
          <span className="font-mono">
            (tried: POST /admin/business-info, POST /admin/businesses, POST /admin/businesses/list, GET
            /admin/business-info)
          </span>
        </div>
      ) : null}

      <div className="bg-gray-50 font-sans">
        <div className="mx-auto max-w-9xl rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <SelectFilter
                placeholder="Select Type"
                value={typeFilter}
                onChange={setTypeFilter}
                options={typeOptions}
              />
              <SelectFilter
                placeholder="Select Category"
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={categoryOptions}
              />
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex h-10 items-center rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Export to Excel
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Business Name", "Category", "Location", "Join Date", "Status", "Verification", "Boost", "Actions"].map((h) => (
                    <th
                      key={h}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-900 ${h === "Actions" ? "text-right" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {listQuery.isLoading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-sm text-gray-500">
                      Loading businesses...
                    </td>
                  </tr>
                ) : null}
                {filtered.map((b) => (
                  <tr key={b.id} className="group hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-gray-900 whitespace-nowrap">{b.name}</td>
                    <td className="px-6 py-3.5 text-gray-900">{b.category}</td>
                    <td className="px-6 py-3.5 text-gray-900">{b.location}</td>
                    <td className="px-6 py-3.5 text-gray-900 whitespace-nowrap">{formatDate(b.joinDate)}</td>
                    <td className="px-6 py-3.5">
                      <Badge label={b.status} className={statusStyles[b.status]} />
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge label={b.verification} className={verificationStyles[b.verification]} />
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge label={b.boost} className={boostStyles[b.boost]} />
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center justify-end gap-3">
                        <button className="inline-flex h-8 items-center gap-1 rounded-md bg-brand-red px-3 text-xs font-semibold text-white transition-colors hover:bg-brand-red/90">
                          <ArrowUpRight className="size-3" />
                          Message Business
                        </button>
                        <button
                          className="text-gray-700 hover:text-gray-600 transition-colors"
                          onClick={() => {
                            setSelectedBusiness(b);
                            setIsModalOpen(true);
                          }}
                        >
                          <Eye className="size-4" />
                        </button>
                        <button className="hover:text-gray-700 text-green-600 transition-colors">
                          <Check className="size-4" />
                        </button>
                        <button className="hover:text-gray-700 text-red-500 transition-colors">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-sm text-gray-500">
                      No businesses found for current search/filter.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
            <p className="text-xs text-gray-400">
              Showing {filtered.length === 0 ? 0 : 1}-{filtered.length} of {businesses.length} businesses
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>

              {pages.map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === p
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                >
                  {p}
                </button>
              ))}

              <span className="inline-flex h-8 items-center px-1 text-sm text-gray-400">...</span>

              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${currentPage === totalPages
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
              >
                {totalPages}
              </button>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <BusinessDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        business={selectedBusiness}
      />
    </>
  );
}