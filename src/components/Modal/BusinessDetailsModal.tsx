import { X } from "lucide-react";

type Status = "pending" | "active" | "suspended";
type Verification = "pending" | "verified" | "rejected";
type Boost = "none" | "active";

export type BusinessDetailsModalBusiness = {
  id: number;
  name: string;
  category: string;
  location: string;
  status: Status;
  verification: Verification;
  boost: Boost;
};

interface BusinessDetailsModalProps {
  open: boolean;
  onClose: () => void;
  business: BusinessDetailsModalBusiness | null;
}

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

export function BusinessDetailsModal({ open, onClose, business }: BusinessDetailsModalProps) {
  if (!open || !business) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
        >
          <X className="size-4" />
        </button>

        <div className="space-y-6">
          <div className="text-left border-b-2 py-4">
            <h2 className="text-2xl font-semibold text-gray-900">Business Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Name</p>
              <p className="text-lg font-semibold text-gray-900">{business.name}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">Category</p>
              <p className="text-sm text-gray-600">{business.category}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">Location</p>
              <p className="text-sm text-gray-600">{business.location}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">Status</p>
              <Badge label={business.status} className={statusStyles[business.status]} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">Verification</p>
              <Badge label={business.verification} className={verificationStyles[business.verification]} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">Boost</p>
              <Badge label={business.boost} className={boostStyles[business.boost]} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">Join Date</p>
              <p className="text-sm text-gray-600">{new Date(business.id).toLocaleDateString()}</p>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
