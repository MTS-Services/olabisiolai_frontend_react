import { CreditCard, Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VerifyIdentity() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="space-y-6">
        {/* Dark info card */}
        <div className="bg-[#1c1c1c] rounded-2xl p-12">
          <h2 className="text-white text-xl font-bold mb-5">
            Why verify your identity?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-gray-300">
              <ShieldCheck className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <span>
                <span className="font-semibold text-white">
                  Consumer Confidence:
                </span>{" "}
                Verified vendors see a 40% increase in first-time customer
                conversions.
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-300">
              <Lock className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <span>
                <span className="font-semibold text-white">
                  Enhanced Security:
                </span>{" "}
                Protect your account against unauthorized access and identity
                theft.
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-300">
              <CreditCard className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <span>
                <span className="font-semibold text-white">Higher Limits:</span>{" "}
                Increase your daily transaction volume and withdrawal caps.
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center my-10">
        <button
          onClick={() => {
            sessionStorage.setItem("paymentSource", "verification");
            navigate("/vendor/after-verification");
          }}
          className="w-full bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          Submit Documents
        </button>
      </div>
    </div>
  );
}
