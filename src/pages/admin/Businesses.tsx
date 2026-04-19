import { useState } from "react";
import { Search, ChevronDown, Eye, Check, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { BusinessDetailsModal } from "@/components/Modal/BusinessDetailsModal";

type Status = "pending" | "active" | "suspended";
type Verification = "pending" | "verified" | "rejected";
type Boost = "none" | "active";

type Business = {
  id: number;
  name: string;
  category: string;
  location: string;
  status: Status;
  verification: Verification;
  boost: Boost;
};

const DATA: Business[] = [
  { id: 1, name: "Divine Salon & Spa", category: "Beauty Services", location: "Surulere, Lagos", status: "pending", verification: "pending", boost: "none" },
  { id: 2, name: "Divine Salon & Spa", category: "Beauty Services", location: "Surulere, Lagos", status: "pending", verification: "pending", boost: "none" },
  { id: 3, name: "Divine Salon & Spa", category: "Beauty Services", location: "Surulere, Lagos", status: "pending", verification: "pending", boost: "none" },
  { id: 4, name: "Divine Salon & Spa", category: "Beauty Services", location: "Surulere, Lagos", status: "pending", verification: "pending", boost: "none" },
  { id: 5, name: "Divine Salon & Spa", category: "Beauty Services", location: "Surulere, Lagos", status: "pending", verification: "pending", boost: "none" },
  { id: 6, name: "Mama Put Restaurant", category: "Restaurants", location: "Ikeja, Lagos", status: "active", verification: "verified", boost: "active" },
  { id: 7, name: "TechHub Solutions", category: "Technology", location: "Victoria Island, Lagos", status: "active", verification: "verified", boost: "none" },
  { id: 8, name: "Fresh Groceries Ltd", category: "Retail", location: "Yaba, Lagos", status: "active", verification: "verified", boost: "active" },
  { id: 9, name: "AutoFix Mechanics", category: "Auto Services", location: "Festac, Lagos", status: "active", verification: "pending", boost: "none" },
  { id: 10, name: "EduLearn Academy", category: "Education", location: "Lekki, Lagos", status: "suspended", verification: "rejected", boost: "none" },
];

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

function SelectFilter({ placeholder }: { placeholder: string }) {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-colors">
      {placeholder}
      <ChevronDown className="size-4 text-gray-400" />
    </button>
  );
}

export default function BusinessTable() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 49;
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = DATA.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase())
  );

  const pages = [1, 2, 3];

  return (
    <>

      <div className="mb-4">
        <h1 className="text-2xl font-semibold leading-tight text-ink-heading sm:text-3xl">Businesses</h1></div>
      <div className=" bg-gray-50  font-sans">
        <div className="mx-auto max-w-9xl rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-4">
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
            <div className="flex items-center gap-3">
              <SelectFilter placeholder="Select Type" />
              <SelectFilter placeholder="Select Category" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Business Name", "Category", "Location", "Status", "Verification", "Boost", "Actions"].map((h) => (
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
                {filtered.map((b) => (
                  <tr key={b.id} className="group hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-gray-900 whitespace-nowrap">{b.name}</td>
                    <td className="px-6 py-3.5 text-gray-900">{b.category}</td>
                    <td className="px-6 py-3.5 text-gray-900">{b.location}</td>
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
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
            <p className="text-xs text-gray-400">Showing 1-10 of 482 transactions</p>
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