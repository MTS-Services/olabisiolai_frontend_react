import { X } from "lucide-react";

import type { PaymentMethod, PaymentRow, PaymentStatus } from "@/components/Modal/PaymentDetailsModal.types";

export type { PaymentRow, PaymentMethod, PaymentStatus } from "@/components/Modal/PaymentDetailsModal.types";

type PaymentDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  payment: PaymentRow | null;
};

function formatNgn(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function methodLabel(method: PaymentMethod) {
  if (method === "card") return "Card";
  if (method === "bank_transfer") return "Bank transfer";
  return "Wallet";
}

function statusBadge(status: PaymentStatus) {
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

export function PaymentDetailsModal({ open, onClose, payment }: PaymentDetailsModalProps) {
  if (!open || !payment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-card shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-details-title"
      >
        <div className="flex h-[61px] items-center justify-between border-b border-border-gray px-6">
          <h2 id="payment-details-title" className="text-lg font-semibold leading-7 text-ink-heading">
            Payment details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-5 items-center justify-center text-body-secondary hover:text-ink"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 pb-6 pt-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-body-secondary">Business</p>
            <p className="text-base font-normal leading-6 text-ink">{payment.business}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-body-secondary">Payer</p>
            <p className="text-base font-normal leading-6 text-ink">{payment.payerName}</p>
            <p className="text-sm text-gray-500">{payment.payerEmail}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-body-secondary">Reference</p>
            <p className="font-mono text-base font-normal leading-6 text-ink">{payment.reference}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-body-secondary">Amount</p>
            <p className="text-base font-semibold leading-6 text-ink">{formatNgn(payment.amountNgn)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-body-secondary">Method</p>
            <p className="text-base font-normal leading-6 text-ink">{methodLabel(payment.method)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-body-secondary">Status</p>
            <div className="pt-1">{statusBadge(payment.status)}</div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-body-secondary">Date &amp; time</p>
            <p className="text-base font-normal leading-6 text-ink">{payment.dateTimeLong}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
