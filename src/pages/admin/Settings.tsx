import { useState } from "react";

// ─── Icons ───────────────────────────────────────────────────────────────────
const UserIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const CardIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const RocketIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const EyeIcon = ({ open }) =>
  open ? (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
const CheckIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2,6 5,9 10,3" />
  </svg>
);
const SaveIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
  </svg>
);
const SpinIcon = () => (
  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
const DoneIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionCard({ icon, iconBg, iconColor, title, badge, description, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
         
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-900 text-[15px] tracking-tight">{title}</span>
            {badge && (
              <span className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                {badge}
              </span>
            )}
          </div>
          <p className="text-[12px] text-slate-400 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function Label({ children }) {
  return (
    <label className="block text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
      {children}
    </label>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-800 text-[13.5px] placeholder:text-slate-300 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all duration-150 ${className}`}
      {...props}
    />
  );
}

function KeyField({ label, id, value, onChange }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 pl-3.5 pr-10 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-800 text-[13px] font-mono placeholder:text-slate-300 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all duration-150"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <EyeIcon open={visible} />
        </button>
      </div>
    </div>
  );
}

const DOCS = [
  "Valid ID (Driver's License, Passport, etc.)",
  "CAC Registration Document",
  "Proof of Address (Utility Bill, etc.)",
];

const BOOST_TIERS = [
  { key: "day7", label: "7-Day Boost", badge: "Starter", badgeCls: "bg-amber-50 text-amber-700 border-amber-100" },
  { key: "day30", label: "30-Day Boost", badge: "Popular", badgeCls: "bg-violet-50 text-violet-700 border-violet-100", featured: true },
  { key: "top1", label: "Top 1 Position", badge: "Premium", badgeCls: "bg-pink-50 text-pink-700 border-pink-100" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PlatformSettings() {
  // General
  const [general, setGeneral] = useState({ name: "Gidira", email: "admin@gidira.com", phone: "+234 800 123 4567" });
  // Payment
  const [payment, setPayment] = useState({ pk: "pk_test_xxxxxxxxxxxx", sk: "sk_test_xxxxxxxxxxxx" });
  // Verification
  const [docs, setDocs] = useState([true, true, true]);
  const [fee, setFee] = useState("5000");
  // Boost
  const [boost, setBoost] = useState({ day7: "15000", day30: "50000", top1: "100000" });
  // Save state
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved

  const toggleDoc = (i) => setDocs((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const handleSave = () => {
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    }, 1400);
  };

  return (
    <div className=" bg-slate-50 p-4 font-sans">
      <div className="max-w-9xl mx-auto space-y-4">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Setting</h1> 
        </div>

        {/* ── General Settings ── */}
        <SectionCard
          icon={<UserIcon />}
          iconBg="bg-violet-50"
          iconColor="text-violet-500"
          title="General Settings"
          description="Basic platform identity and contact details"
        >
          <div className="space-y-4">
            <div>
              <Label>Platform Name</Label>
              <Input
                value={general.name}
                onChange={(e) => setGeneral((p) => ({ ...p, name: e.target.value }))}
                placeholder="Your platform name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Platform Email</Label>
                <Input
                  type="email"
                  value={general.email}
                  onChange={(e) => setGeneral((p) => ({ ...p, email: e.target.value }))}
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <Label>Platform Phone</Label>
                <Input
                  type="tel"
                  value={general.phone}
                  onChange={(e) => setGeneral((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── Payment Settings ── */}
        <SectionCard
          icon={<CardIcon />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-500"
          title="Payment Settings"
          badge="Paystack"
          description="API credentials for payment processing"
        >
          <div className="space-y-4">
            <KeyField
              label="Public Key"
              id="pk"
              value={payment.pk}
              onChange={(v) => setPayment((p) => ({ ...p, pk: v }))}
            />
            <KeyField
              label="Secret Key"
              id="sk"
              value={payment.sk}
              onChange={(v) => setPayment((p) => ({ ...p, sk: v }))}
            />
          </div>
        </SectionCard>

        {/* ── Verification Settings ── */}
        <SectionCard
          icon={<ShieldIcon />}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
          title="Verification Settings"
          description="Required documents and fees for user verification"
        >
          <div>
            <Label>Required Documents</Label>
            <div className="space-y-2 mb-5">
              {DOCS.map((doc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleDoc(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-[13px] transition-all duration-150 ${
                    docs[i]
                      ? "border-violet-200  text-slate-700"
                      : "border-slate-200 bg-slate-50/60 text-slate-400 hover:border-slate-300"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border transition-all duration-150 ${
                    docs[i] 
                  }`}>
                     
                  </div>
                  {doc}
                </button>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-5">
              <div className="w-48">
                <Label>Verification Fee (₦)</Label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[13px] pointer-events-none">₦</span>
                  <Input
                    type="number"
                    className="pl-7"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── Boost Pricing ── */}
        <SectionCard
          icon={<RocketIcon />}
          iconBg="bg-pink-50"
          iconColor="text-pink-500"
          title="Boost Pricing"
        //   description="Set rates for listing promotion packages"
        >
          <div className="grid grid-cols-3 gap-3">
            {BOOST_TIERS.map(({ key, label, badge, badgeCls, featured }) => (
              <div
                key={key}
                className={`rounded-xl border p-4 transition-all duration-200 ${
                  featured
                    ? "border-violet-200 bg-violet-50/40 shadow-sm shadow-violet-100"
                    : "border-slate-200 bg-slate-50/60 hover:border-slate-300"
                }`}
              >
                <p className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">{label}</p>
                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-3 ${badgeCls}`}>
                  {badge}
                </span>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[12px] pointer-events-none">₦</span>
                  <input
                    type="number"
                    value={boost[key]}
                    onChange={(e) => setBoost((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full h-9 pl-6 pr-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-[13px] font-semibold outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between pt-2 pb-4">
          <p className="text-[12.5px] text-slate-400">
            {saveState === "saved" ? "✓ All settings saved successfully" : "All changes will be saved together"}
          </p>
          <button
            type="button"
            onClick={handleSave}
            disabled={saveState === "saving"}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13.5px] font-semibold text-white transition-all duration-200 active:scale-95 shadow-sm disabled:opacity-80 ${
              saveState === "saved"
                ? "bg-emerald-500 shadow-emerald-200"
                : "bg-slate-900 hover:bg-slate-700 shadow-slate-200"
            }`}
          >
            {saveState === "saving" ? <><SpinIcon /> Saving…</> :
             saveState === "saved"  ? <><DoneIcon /> Saved!</> :
             <><SaveIcon /> Save All Changes</>}
          </button>
        </div>

      </div>
    </div>
  );
}