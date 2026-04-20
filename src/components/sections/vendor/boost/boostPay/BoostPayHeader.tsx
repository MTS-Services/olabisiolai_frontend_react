import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BoostPayHeader() {
  const navigate = useNavigate();

  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/vendor/boost/configure")}
        className="inline-flex items-center gap-1 text-sm font-inter text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Configure
      </button>

      <div className="space-y-1">
        <h2 className="text-4xl font-extrabold font-inter text-foreground">Review & Pay</h2>
        <p className="text-base font-inter  text-muted-foreground">
          Complete your transaction to activate your business visibility boost.
        </p>
      </div>
    </>
  );
}
