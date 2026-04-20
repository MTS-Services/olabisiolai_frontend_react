import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PlanPromoBanner() {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex flex-col items-stretch justify-between gap-6 rounded-2xl p-8 md:flex-row md:items-center md:p-10",
        "bg-linear-to-br from-brand-red via-brand-red to-red-950",
      )}
    >
      <p className="max-w-2xl text-base leading-relaxed text-white font-inter md:text-lg">
        Unlock premium visibility… Join 2,000+ top-tier vendors who have increased their sales by up to 40% with our
        Premium growth tools.
      </p>
      <Button
        type="button"
        className="shrink-0 rounded-full bg-white px-8 py-6 text-base font-inter font-semibold text-brand-red hover:bg-white/90"
        onClick={() => navigate("/vendor/boost")}
      >
        Get premium now
      </Button>
    </div>
  );
}
