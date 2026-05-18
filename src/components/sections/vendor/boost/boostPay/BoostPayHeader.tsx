import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type BoostPayHeaderProps = {
  variant?: "boost" | "subscription";
};

export function BoostPayHeader({ variant = "boost" }: BoostPayHeaderProps) {
  const navigate = useNavigate();
  const isSubscription = variant === "subscription";

  return (
    <>
      <button
        type="button"
        onClick={() => navigate(isSubscription ? "/vendor/dashboard" : "/vendor/boost/configure")}
        className="inline-flex items-center gap-1 text-sm font-inter text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {isSubscription ? "Back to business profile" : "Back to Configure"}
      </button>

      <div className="space-y-1">
        <h2 className="text-4xl font-extrabold font-inter text-foreground">Review & Pay</h2>
        <p className="text-base font-inter text-muted-foreground">
          {isSubscription
            ? "Complete payment to activate your premium plan and verified badge."
            : "Complete your transaction to activate your business visibility boost."}
        </p>
      </div>
    </>
  );
}
