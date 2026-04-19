import { useEffect, useState } from "react";
import { CircleAlert, X } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";

type RejectVerificationModalProps = {
  open: boolean;
  onClose: () => void;
  businessName: string;
  onConfirm: (reason: string) => void;
};

export function RejectVerificationModal({
  open,
  onClose,
  businessName,
  onConfirm,
}: RejectVerificationModalProps) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!open) setReason("");
  }, [open]);

  if (!open) return null;

  const trimmed = reason.trim();
  const canSubmit = trimmed.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-verification-title"
        aria-describedby="reject-verification-desc"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="size-5" strokeWidth={2} />
        </button>

        <div className="flex flex-col gap-5 pr-8">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red-50">
              <CircleAlert className="size-6 text-red-500" strokeWidth={2} aria-hidden />
            </div>
            <div className="min-w-0 space-y-1.5 pt-0.5">
              <h2
                id="reject-verification-title"
                className="text-lg font-semibold leading-tight text-gray-900"
              >
                Reject verification
              </h2>
              <p id="reject-verification-desc" className="text-sm leading-relaxed text-gray-600">
                You are about to reject verification for{" "}
                <span className="font-semibold text-gray-900">{businessName}</span>. The owner will
                be notified. Please add a short reason so they know what to fix.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="reject-reason" className="text-sm font-medium text-gray-900">
              Reason for rejection <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="reject-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. CAC document is unreadable or does not match the business name."
              rows={4}
              className="min-h-[120px] resize-y rounded-xl border-gray-200 bg-gray-50/80 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-gray-300 focus-visible:ring-gray-300"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!canSubmit}
              onClick={() => {
                onConfirm(trimmed);
                onClose();
              }}
              className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition-opacity hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
