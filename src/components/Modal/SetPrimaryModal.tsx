import { X } from "lucide-react";

type PayoutMethod = {
  id: string;
  bankName: string;
  last4: string;
  isPrimary: boolean;
};

export default function SetPrimaryModal({ open, onClose, method, onConfirm }: {
  open?: boolean;
  onClose?: () => void;
  method?: PayoutMethod | null;
  onConfirm?: () => void;
}) {
  if (!open || !method) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-200/80 p-6 font-sans">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-300/60">

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all hover:bg-slate-50 hover:text-slate-600 active:scale-95"
        >
          <X className="size-3.5" strokeWidth={2.5} />
        </button>

        <div className="px-6 pb-6 pt-7">
          {/* Title */}
          <h2 className="mb-4 text-center text-[22px] font-extrabold tracking-tight text-slate-900">
            Set as Primary
          </h2>

          {/* Method info */}
          <div className="mb-6 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10zm3 3h2v5H7v-5zm5 0h2v5h-2v-5zm5 0h2v5h-2v-5z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900">{method.bankName}</p>
                <p className="text-sm text-slate-500 font-mono">**** {method.last4}</p>
              </div>
            </div>
          </div>

          {/* Confirmation message */}
          <p className="mb-6 text-center text-sm text-slate-600">
            Are you sure you want to set this payout method as your primary payment method?
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-200 bg-white py-3 text-[15px] font-semibold text-slate-600 transition-all hover:bg-slate-50 active:scale-98"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-[15px] font-bold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-px hover:shadow-xl hover:shadow-blue-200 active:scale-98"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}