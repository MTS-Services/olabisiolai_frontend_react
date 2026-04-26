import { X } from "lucide-react";

export type UserRole = "user" | "vendor" | "admin";

export type UserDetailsRow = {
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  status: "active" | "blocked" | "pending";
  joinDate: string;
};

interface UserDetailsModalProps {
  open: boolean;
  onClose: () => void;
  user: UserDetailsRow | null;
}

function statusClass(status: UserDetailsRow["status"]) {
  if (status === "active") return "bg-success/10 text-success";
  if (status === "pending") return "bg-amber-100 text-amber-600";
  return "bg-tint-red text-brand-red";
}

function roleClass(role: UserRole) {
  if (role === "admin") return "bg-tint-red text-brand-red";
  if (role === "vendor") return "bg-amber-100 text-amber-600";
  return "bg-surface-soft text-chat-accent";
}

export function UserDetailsModal({ open, onClose, user }: UserDetailsModalProps) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-body-secondary hover:bg-muted"
        >
          <X className="size-4" />
        </button>

        <div className="space-y-6">
          <div className="text-left border-b-2 py-4">
            <h2 className="text-2xl font-semibold text-ink">User Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h1>Name</h1>
              <h3 className="text-xs font-medium text-ink">{user.name}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">

                <div>
                  <p className="text-sm font-medium text-ink">Phone</p>
                  <p className="text-sm text-body-secondary">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium text-ink">Email</p>
                  <p className="text-sm text-body-secondary">{user.email}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-ink">Role</p>
                <span
                  className={`inline-flex min-w-[70px] justify-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${roleClass(user.role)}`}
                >
                  {user.role}
                </span>
              </div>

              <div>
                <p>Status</p>
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass(user.status)}`}>
                  {user.status === "active" ? "Active" : user.status === "pending" ? "Pending" : "Blocked"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium text-ink">Join Date</p>
                  <p className="text-sm text-body-secondary">{user.joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
