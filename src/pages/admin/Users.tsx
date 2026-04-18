import { Ban, ChevronDown, ChevronLeft, ChevronRight, Eye, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

type UserRow = {
  name: string;
  phone: string;
  email: string;
  status: "active" | "blocked";
  joinDate: string;
};
type StatusFilter = "all" | UserRow["status"];

const users: UserRow[] = [
  {
    name: "Chukwudi Okafor",
    phone: "+234 803 123 4567",
    email: "chukwudi@email.com",
    status: "active",
    joinDate: "Jan 15, 2024",
  },
  {
    name: "Aisha Mohammed",
    phone: "+234 805 987 6543",
    email: "aisha@email.com",
    status: "active",
    joinDate: "Jan 18, 2024",
  },
  {
    name: "Oluwaseun Adeyemi",
    phone: "+234 807 234 5678",
    email: "seun@email.com",
    status: "active",
    joinDate: "Jan 20, 2024",
  },
  {
    name: "Ngozi Eze",
    phone: "+234 809 876 5432",
    email: "ngozi@email.com",
    status: "blocked",
    joinDate: "Jan 22, 2024",
  },
  {
    name: "Ibrahim Musa",
    phone: "+234 810 345 6789",
    email: "ibrahim@email.com",
    status: "active",
    joinDate: "Jan 25, 2024",
  },
  {
    name: "Ibrahim Musa",
    phone: "+234 810 345 6789",
    email: "ibrahim@email.com",
    status: "active",
    joinDate: "Jan 25, 2024",
  },
  {
    name: "Ibrahim Musa",
    phone: "+234 810 345 6789",
    email: "ibrahim@email.com",
    status: "active",
    joinDate: "Jan 25, 2024",
  },
  {
    name: "Ibrahim Musa",
    phone: "+234 810 345 6789",
    email: "ibrahim@email.com",
    status: "active",
    joinDate: "Jan 25, 2024",
  },
];

function statusClass(status: UserRow["status"]) {
  if (status === "active") return "bg-success/10 text-success";
  return "bg-tint-red text-brand-red";
}

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      if (!matchesStatus) return false;

      if (!query) return true;
      return (
        user.name.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    });
  }, [searchTerm, statusFilter]);

  const statusLabel = statusFilter === "all" ? "Select Status" : statusFilter;

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-3xl font-semibold leading-8 text-ink-heading">Users</h1>
      </div>

      <section className="rounded-2xl border border-border-gray bg-card p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <label className="relative w-full max-w-[971px] flex-1 min-w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-chat-meta" />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-10 w-full rounded-xl border border-border-gray bg-card pl-10 pr-4 text-base text-ink placeholder:text-ink/50 focus:outline-none"
            />
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsStatusMenuOpen((prev) => !prev)}
              className="inline-flex h-10 min-w-48 items-center justify-between rounded-xl border border-border-gray bg-card px-4 text-sm text-body-secondary"
            >
              <span className="capitalize">{statusLabel}</span>
              <ChevronDown className="size-4" />
            </button>
            {isStatusMenuOpen ? (
              <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-border-gray bg-card shadow-sm">
                {(["all", "active", "blocked"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setStatusFilter(status);
                      setIsStatusMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm capitalize text-ink hover:bg-muted"
                  >
                    <span>{status === "all" ? "Select Status" : status}</span>
                    {statusFilter === status ? <span className="text-xs text-chat-accent">Selected</span> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="border-b border-border-gray">
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Phone / Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-body-secondary">Join Date</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-body-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={`${user.email}-${index}`} className="border-b border-border-light">
                  <td className="px-4 py-5 text-base font-medium text-ink">{user.name}</td>
                  <td className="px-4 py-4">
                    <p className="text-sm leading-5 text-ink">{user.phone}</p>
                    <p className="text-sm leading-5 text-chat-meta">{user.email}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-body-secondary">{user.joinDate}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" className="inline-flex h-7 w-10 items-center justify-center rounded-xl hover:bg-muted">
                        <Eye className="size-4 text-body-secondary" />
                      </button>
                      <button type="button" className="inline-flex h-7 w-10 items-center justify-center rounded-xl hover:bg-muted">
                        <Ban className="size-4 text-amber-500" />
                      </button>
                      <button type="button" className="inline-flex h-7 w-10 items-center justify-center rounded-xl hover:bg-muted">
                        <Trash2 className="size-4 text-brand-red" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-chat-meta">
                    No users found for the current search/filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-tint-red/20 px-1 pb-0 pt-4">
          <p className="text-xs font-medium text-body-secondary">
            Showing {filteredUsers.length === 0 ? 0 : 1}-{filteredUsers.length} of {users.length} users
          </p>
          <div className="inline-flex items-center gap-2">
            <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-body-secondary/30">
              <ChevronLeft className="size-3.5" />
            </button>
            <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red text-xs font-semibold text-ice">
              1
            </button>
            <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold text-body-secondary">
              2
            </button>
            <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold text-body-secondary">
              3
            </button>
            <span className="px-1 text-base text-body-secondary">...</span>
            <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold text-body-secondary">
              49
            </button>
            <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-body-secondary">
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
