import { ChevronDown, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

type SlotOption = { label: string; value: string; max: number };

const SLOT_OPTIONS: SlotOption[] = [
  { label: "Top 3", value: "3", max: 3 },
  { label: "Top 5", value: "5", max: 5 },
  { label: "Top 10", value: "10", max: 10 },
];

type ActiveBoost = {
  id: number;
  name: string;
  locationLine: string;
  expiresLabel: string;
  durationLabel: string;
};

type WaitingEntry = {
  id: number;
  name: string;
  categoryLine: string;
  locationLine: string;
  rank: number;
};

const INITIAL_ACTIVE: ActiveBoost[] = [
  {
    id: 1,
    name: "Fresh Groceries Ltd",
    locationLine: "Yaba, Lagos",
    expiresLabel: "Expires: May 1, 2024",
    durationLabel: "30-day",
  },
  {
    id: 2,
    name: "Mama Put Restaurant",
    locationLine: "Ikeja, Lagos",
    expiresLabel: "Expires: Apr 28, 2024",
    durationLabel: "7-day",
  },
  {
    id: 3,
    name: "TechHub Solutions",
    locationLine: "Victoria Island, Lagos",
    expiresLabel: "Expires: May 12, 2024",
    durationLabel: "30-day",
  },
];

const INITIAL_WAITING: WaitingEntry[] = [
  { id: 1, name: "AutoFix Mechanics", categoryLine: "Auto Services", locationLine: "Festac", rank: 1 },
  { id: 2, name: "Divine Salon & Spa", categoryLine: "Beauty Services", locationLine: "Surulere, Lagos", rank: 2 },
  { id: 3, name: "QuickFix Plumbing", categoryLine: "Home Services", locationLine: "Lekki, Lagos", rank: 3 },
];

const BOOST_PLANS = [
  {
    title: "7-Day Boost",
    price: "₦15,000",
    description: "Featured in category for 7 days",
    wrapClass: "bg-blue-50 border-blue-100",
    titleClass: "text-blue-700",
    priceClass: "text-blue-600",
    descClass: "text-blue-600/80",
  },
  {
    title: "30-Day Boost",
    price: "₦50,000",
    description: "Featured in category for 30 days",
    wrapClass: "bg-purple-50 border-purple-100",
    titleClass: "text-purple-700",
    priceClass: "text-purple-600",
    descClass: "text-purple-600/80",
  },
  {
    title: "Top 1 Position",
    price: "₦100,000",
    description: "Guaranteed #1 spot for 30 days",
    wrapClass: "bg-emerald-50 border-emerald-100",
    titleClass: "text-emerald-700",
    priceClass: "text-emerald-600",
    descClass: "text-emerald-600/80",
  },
] as const;

export default function BoostSystem() {
  const [slotOpen, setSlotOpen] = useState(false);
  const [slotValue, setSlotValue] = useState("5");
  const [activeList, setActiveList] = useState<ActiveBoost[]>(INITIAL_ACTIVE);
  const [waitingList, setWaitingList] = useState<WaitingEntry[]>(INITIAL_WAITING);

  const slotOption = useMemo(() => SLOT_OPTIONS.find((o) => o.value === slotValue) ?? SLOT_OPTIONS[1], [slotValue]);
  const activeCount = activeList.length;
  const slotLabel = useMemo(() => `Top ${slotOption.value}`, [slotOption.value]);

  function removeActive(id: number) {
    setActiveList((list) => list.filter((a) => a.id !== id));
  }

  const atSlotCapacity = activeCount >= slotOption.max;

  function assignFromWaiting(entry: WaitingEntry) {
    if (activeCount >= slotOption.max) return;
    setWaitingList((list) => list.filter((w) => w.id !== entry.id));
    setActiveList((list) => [
      ...list,
      {
        id: Date.now(),
        name: entry.name,
        locationLine: entry.locationLine,
        expiresLabel: "Expires: —",
        durationLabel: "30-day",
      },
    ]);
  }

  return (
    <div className="font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold leading-tight text-ink-heading sm:text-3xl">Boost System</h1>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Slot Limit:</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setSlotOpen((o) => !o)}
              className="inline-flex h-10 min-w-34 items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-800 shadow-sm hover:border-gray-300"
            >
              {slotLabel}
              <ChevronDown className="size-4 shrink-0 text-gray-500" />
            </button>
            {slotOpen ? (
              <div className="absolute left-0 z-20 mt-1 w-full min-w-40 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-md">
                {SLOT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSlotValue(opt.value);
                      setSlotOpen(false);
                    }}
                    className="flex w-full px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <p className="text-sm font-medium text-gray-500">
          Active: {activeCount} / {slotOption.max}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-gray-900">Active Boosts</h2>
          <div className="flex flex-col gap-4">
            {activeList.length === 0 ? (
              <p className="text-sm text-gray-500">No active boosts.</p>
            ) : null}
            {activeList.map((item) => (
              <div
                key={item.id}
                className="relative rounded-xl border border-slate-100 bg-white p-4 pr-12 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => removeActive(item.id)}
                  className="absolute right-3 top-3 rounded-md p-1 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                  aria-label={`Remove boost for ${item.name}`}
                >
                  <X className="size-4" strokeWidth={2.5} />
                </button>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="mt-1 text-sm text-gray-500">{item.locationLine}</p>
                <p className="text-sm text-gray-500">{item.expiresLabel}</p>
                <span className="mt-3 inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                  {item.durationLabel}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-gray-900">Waiting List</h2>
          <div className="flex flex-col gap-4">
            {waitingList.length === 0 ? (
              <p className="text-sm text-gray-500">No businesses waiting.</p>
            ) : null}
            {waitingList.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="mt-1 text-sm text-gray-500">{item.categoryLine}</p>
                  <p className="text-sm text-gray-500">{item.locationLine}</p>
                  <span className="mt-2 inline-flex rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-600">
                    #{item.rank}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={atSlotCapacity}
                  onClick={() => assignFromWaiting(item)}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 sm:self-center"
                >
                  <Plus className="size-4" strokeWidth={2.5} />
                  Assign
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Boost Plans</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {BOOST_PLANS.map((plan) => (
            <article
              key={plan.title}
              className={`rounded-xl border p-6 shadow-sm ${plan.wrapClass}`}
            >
              <h3 className={`text-base font-semibold ${plan.titleClass}`}>{plan.title}</h3>
              <p className={`mt-3 text-2xl font-bold ${plan.priceClass}`}>{plan.price}</p>
              <p className={`mt-2 text-sm ${plan.descClass}`}>{plan.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
