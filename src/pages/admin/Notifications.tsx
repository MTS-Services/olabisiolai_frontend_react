import { useState } from "react";
import { MessageSquare, Mail, Phone } from "lucide-react";

type Channel = "sms" | "email" | "whatsapp";

type NotificationConfig = {
  id: Channel;
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  placeholder: string;
};

const CHANNELS: NotificationConfig[] = [
  {
    id: "sms",
    label: "SMS Notifications",
    icon: <MessageSquare className="size-5" strokeWidth={1.8} style={{ color: "#3b82f6" }} />,
    iconBg: "bg-blue-50",
    placeholder: "Type your SMS message here…",
  },
  {
    id: "email",
    label: "Email Notifications",
    icon: <Mail className="size-5" strokeWidth={1.8} style={{ color: "#8b5cf6" }} />,
    iconBg: "bg-violet-50",
    placeholder: "Type your email message here…",
  },
  {
    id: "whatsapp",
    label: "WhatsApp Notifications",
    icon: <Phone className="size-5" strokeWidth={1.8} style={{ color: "#22c55e" }} />,
    iconBg: "bg-green-50",
    placeholder: "Enable to edit template…",
  },
];

const VARS = ["{name}", "{business_name}", "{date}"];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        on ? "bg-green-500" : "bg-slate-200"
      }`}
    >
      <span
        className={`inline-block size-[18px] rounded-full bg-white shadow transition-transform duration-200 ${
          on ? "translate-x-[22px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

export default function NotificationSettings() {
  const [enabled, setEnabled] = useState<Record<Channel, boolean>>({
    sms: true,
    email: true,
    whatsapp: false,
  });
  const [templates, setTemplates] = useState<Record<Channel, string>>({
    sms: "",
    email: "",
    whatsapp: "",
  });

  const toggle = (id: Channel) =>
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 sm:p-8 font-sans flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Notification </h1>
      {CHANNELS.map((ch) => {
        const on = enabled[ch.id];
        return (
          <div
            key={ch.id}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-100 px-6 py-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3.5">
                <div className={`flex size-11 items-center justify-center rounded-xl ${ch.iconBg}`}>
                  {ch.icon}
                </div>
                <div>
                  <p className="text-[15px] font-bold tracking-tight text-slate-900">{ch.label}</p>
                  <span
                    className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold ${
                      on
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${on ? "bg-green-500" : "bg-slate-400"}`}
                    />
                    {on ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <Toggle on={on} onToggle={() => toggle(ch.id)} />
            </div>

            {/* Divider */}
            <div className="mb-5 -mx-6 border-t border-slate-100" />

            {/* Textarea */}
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Message Template
            </p>
            <textarea
              rows={ch.id === "email" ? 5 : 3}
              disabled={!on}
              value={templates[ch.id]}
              onChange={(e) =>
                setTemplates((prev) => ({ ...prev, [ch.id]: e.target.value }))
              }
              placeholder={on ? ch.placeholder : "Enable to edit template…"}
              className={`w-full resize-y rounded-xl border px-3.5 py-3 text-[13.5px] leading-relaxed outline-none transition-all duration-150 font-sans ${
                on
                  ? "border-slate-200 bg-slate-50/50 text-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  : "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
              }`}
            />

            {/* Variables */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[11.5px] font-medium text-slate-400">Variables:</span>
              {VARS.map((v) => (
                <span
                  key={v}
                  className={`rounded-md border px-2 py-0.5 font-mono text-[11.5px] font-semibold transition-opacity ${
                    on
                      ? "border-slate-200 bg-slate-100 text-slate-500"
                      : "border-slate-100 bg-slate-50 text-slate-300"
                  }`}
                >
                  {v}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                disabled={!on}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 ${
                  on
                    ? "bg-slate-900 text-white hover:bg-slate-700 shadow-sm"
                    : "cursor-not-allowed bg-slate-100 text-slate-300"
                }`}
              >
                Save Template
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}