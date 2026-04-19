import { Check, X, FileText } from "lucide-react";

type PaymentStatus = "confirmed" | "pending";
type DocStatus = "verified" | "missing";

type VerificationCard = {
  id: number;
  businessName: string;
  owner: string;
  submitted: string;
  paymentStatus: PaymentStatus;
  documents: { label: string; status: DocStatus }[];
};

const DATA: VerificationCard[] = [
  {
    id: 1,
    businessName: "Divine Salon & Spa",
    owner: "Grace Okonkwo",
    submitted: "Mar 28, 2024",
    paymentStatus: "confirmed",
    documents: [
      { label: "Valid ID", status: "verified" },
      { label: "CAC Document", status: "verified" },
      { label: "Proof of Address", status: "verified" },
    ],
  },
  {
    id: 2,
    businessName: "AutoFix Mechanics",
    owner: "Emeka Nwankwo",
    submitted: "Mar 29, 2024",
    paymentStatus: "confirmed",
    documents: [
      { label: "Valid ID", status: "verified" },
      { label: "CAC Document", status: "verified" },
      { label: "Proof of Address", status: "missing" },
    ],
  },
  {
    id: 3,
    businessName: "Fresh & Clean Laundry",
    owner: "Fatima Bello",
    submitted: "Mar 30, 2024",
    paymentStatus: "pending",
    documents: [
      { label: "Valid ID", status: "verified" },
      { label: "CAC Document", status: "missing" },
      { label: "Proof of Address", status: "verified" },
    ],
  },
  {
    id: 4,
    businessName: "QuickFix Plumbing",
    owner: "John Okoro",
    submitted: "Apr 1, 2024",
    paymentStatus: "confirmed",
    documents: [
      { label: "Valid ID", status: "verified" },
      { label: "CAC Document", status: "verified" },
      { label: "Proof of Address", status: "verified" },
    ],
  },
];

function PaymentBadge({ status }: { status: PaymentStatus }) {
  return status === "confirmed" ? (
    <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-0.5 text-xs font-medium text-green-600">
      Payment Confirmed
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-0.5 text-xs font-medium text-orange-500">
      Payment Pending
    </span>
  );
}

function DocRow({ label, status }: { label: string; status: DocStatus }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
      <div className="flex items-center gap-3">
        <FileText className="size-4 text-gray-400" />
        <span className="text-sm text-gray-700">{label}</span>
      </div>
      {status === "verified" ? (
        <Check className="size-4 text-green-500" strokeWidth={2.5} />
      ) : (
        <X className="size-4 text-red-500" strokeWidth={2.5} />
      )}
    </div>
  );
}

function Card({ card }: { card: VerificationCard }) {
  const canApprove = card.paymentStatus === "confirmed";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{card.businessName}</h3>
          <p className="mt-0.5 text-sm text-gray-500">Owner: {card.owner}</p>
          <p className="text-xs text-gray-400">Submitted: {card.submitted}</p>
        </div>
        <div className="shrink-0 pt-0.5">
          <PaymentBadge status={card.paymentStatus} />
        </div>
      </div>

      {/* Documents */}
      <div className="flex flex-col gap-2">
        {card.documents.map((doc) => (
          <DocRow key={doc.label} label={doc.label} status={doc.status} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          disabled={!canApprove}
          className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-opacity ${
            canApprove
              ? "bg-blue-500 text-white hover:bg-blue-600 active:opacity-80"
              : "cursor-not-allowed bg-blue-100 text-blue-300"
          }`}
        >
          Approve
        </button>
        <button className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 active:opacity-80 transition-opacity">
          Reject
        </button>
      </div>
    </div>
  );
}

export default function VerificationGrid() {
  return (
    <div className=" bg-gray-100 ">
      <div className="mx-auto grid max-w-9xl grid-cols-1 gap-5 sm:grid-cols-2">
        {DATA.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}