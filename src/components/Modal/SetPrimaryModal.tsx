import { useState } from "react";
import { X, CreditCard, Layers, Info } from "lucide-react";

type Tab = "card" | "gpay" | "paystack";

type PayoutMethod = {
  id: string;
  bankName: string;
  last4: string;
  isPrimary: boolean;
};

export default function SetPrimaryModal({
  open,
  onClose,
  method,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  method: PayoutMethod | null;
  onConfirm: () => void;
}) {
  const [tab, setTab] = useState<Tab>("card");
  const [form, setForm] = useState({ name: "", number: "", month: "", year: "", cvv: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  if (!open) return null;

  return (
    <div>
      
    </div>
  );
}