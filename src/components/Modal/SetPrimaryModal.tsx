import { useState } from "react";
import { X, CreditCard, Layers, Info } from "lucide-react";

type Tab = "card" | "gpay" | "paystack";

function EmailAdModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/80 p-4">
      <div className="relative w-full max-w-md rounded-[22px] bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex size-5 items-center justify-center text-body-secondary hover:text-ink"
          aria-label="Close"
        >
          <X className="size-5" strokeWidth={2} />
        </button>
        <h2 className="mb-4 text-left text-xl font-extrabold tracking-tight text-gray-900">
          Email
        </h2>
         
        <input
          type="email"
          placeholder="Enter your email"
          className="mb-4 w-full rounded-xl border border-gray-300 px-3.5 py-3.5 text-[14px] text-gray-700 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="w-full rounded-[12px] bg-blue-500 py-[14px] text-[15px] font-bold text-white transition hover:bg-blue-600">
          Continue
        </button>
      </div>
    </div>
  );
}

export default function SetPrimaryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("card");
  const [form, setForm] = useState({ name: "", number: "", month: "", year: "", cvv: "" });
  const [emailAdOpen, setEmailAdOpen] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/80 p-4">
        <div className="relative w-full max-w-[400px] rounded-[22px] bg-white px-5 pb-5 pt-6 shadow-2xl">

          <button
            onClick={onClose}
            className="inline-flex size-5 items-center justify-center text-body-secondary hover:text-ink"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={2} />
          </button>

          <h2 className="mb-5 text-center text-[22px] font-extrabold tracking-tight text-gray-900">
            Account Type
          </h2>

          <div className="mb-5 flex gap-2">
            <button
              onClick={() => setTab("card")}
              className={`inline-flex items-center gap-1.5 rounded-[9px] border px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                tab === "card" ? "border-blue-500 bg-blue-500 text-white" : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              <CreditCard size={14} strokeWidth={2.2} />
              Card
            </button>
            <button
              onClick={() => setTab("gpay")}
              className={`inline-flex items-center gap-1 rounded-[9px] border px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                tab === "gpay" ? "border-blue-500 bg-blue-500 text-white" : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span className="text-[13px] font-bold">
                <span style={{ color: tab === "gpay" ? "#fff" : "#4285f4" }}>G</span>
                <span style={{ color: tab === "gpay" ? "#fff" : "#ea4335" }}>o</span>
                <span style={{ color: tab === "gpay" ? "#fff" : "#fbbc04" }}>o</span>
                <span style={{ color: tab === "gpay" ? "#fff" : "#34a853" }}>g</span>
              </span>
              <span>Pay</span>
            </button>
            <button
              onClick={() => setTab("paystack")}
              className={`inline-flex items-center gap-1.5 rounded-[9px] border px-3.5 py-2 text-[12px] font-semibold transition-colors ${
                tab === "paystack" ? "border-blue-500 bg-blue-500 text-white" : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Layers size={13} strokeWidth={2} />
              paystack
            </button>
          </div>

          {tab === "card" && (
            <div className="mb-4 rounded-2xl bg-[#b3dff5] p-4">
              <div className="mb-3.5 flex items-center gap-2">
                <CreditCard size={18} strokeWidth={2} color="#2b7de9" />
                <span className="text-[14px] font-semibold text-[#1a5fa0]">Add Credit / Debit Card</span>
              </div>
              <input type="text" value={form.name} onChange={set("name")} placeholder="Card Holder's Name"
                className="mb-2.5 w-full rounded-xl border-none bg-white px-3.5 py-3.5 text-[14px] text-gray-700 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400" />
              <input type="text" value={form.number} onChange={set("number")} placeholder="Card Number"
                className="mb-3 w-full rounded-xl border-none bg-white px-3.5 py-3.5 text-[14px] text-gray-700 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400" />
              <p className="mb-2 text-[13.5px] font-bold text-gray-900">Expire Date</p>
              <div className="mb-2.5 grid grid-cols-2 gap-2.5">
                <input type="text" value={form.month} onChange={set("month")} placeholder="Month" maxLength={2}
                  className="rounded-xl border-none bg-white px-3.5 py-3.5 text-[14px] text-gray-700 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400" />
                <input type="text" value={form.year} onChange={set("year")} placeholder="Year" maxLength={4}
                  className="rounded-xl border-none bg-white px-3.5 py-3.5 text-[14px] text-gray-700 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="relative">
                <input type="password" value={form.cvv} onChange={set("cvv")} placeholder="Security Code" maxLength={4}
                  className="w-full rounded-xl border-none bg-white px-3.5 py-3.5 pr-11 text-[14px] text-gray-700 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400" />
                <Info size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          )}

          {tab !== "card" && (
            <div className="mb-4 flex h-48 items-center justify-center rounded-2xl bg-gray-50 text-gray-300">
              <span className="text-sm font-medium">
                {tab === "gpay" ? "Google Pay" : "Paystack"} integration
              </span>
            </div>
          )}

          <button
            onClick={() => setEmailAdOpen(true)}
            className="w-full rounded-[12px] bg-blue-500 py-[14px] text-[15px] font-bold text-white transition hover:bg-blue-600 active:scale-[.98]"
          >
            Continue
          </button>
        </div>
      </div>
      <EmailAdModal open={emailAdOpen} onClose={() => setEmailAdOpen(false)} />
    </>
  );
}