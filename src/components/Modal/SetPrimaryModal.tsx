import { X } from "lucide-react";

type PayoutMethod = {
  id: string;
  bankName: string;
  last4: string;
  isPrimary: boolean;
};

type SetPrimaryModalProps = {
  open: boolean;
  onClose: () => void;
  method: PayoutMethod | null;
  onConfirm: () => void;
};

export function SetPrimaryModal({ open, onClose, method, onConfirm }: SetPrimaryModalProps) {
  if (!open || !method) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="set-primary-title"
      >
        <div className="flex h-[61px] items-center justify-between border-b border-border-gray px-6">
          <h2 id="set-primary-title" className="text-lg font-semibold leading-7 text-ink-heading">
            Set Primary Payout Method
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
          <p className="text-base text-ink">
            Are you sure you want to set <strong>{method.bankName} **** {method.last4}</strong> as your primary payout method?
          </p>
          <p className="text-sm text-body-secondary">
            This will replace your current primary payout method.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-border-gray px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-body-secondary hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Set as Primary
          </button>
        </div>
      </div>
    </div>
  );
}