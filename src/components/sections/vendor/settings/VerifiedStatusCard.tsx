import { Link } from "react-router-dom";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function VerifiedStatusCard() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-brand-red p-6 text-white shadow-sm">
      <BadgeCheck className="mb-2 size-5 opacity-90" aria-hidden />
      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/90">
        Authority status
      </p>
      <p className="mt-2 text-2xl font-bold font-manrope">Verified</p>
      <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-white/90 font-inter">
        Completing verification helps buyers trust your business and unlocks premium placement.
      </p>
      <Button
        asChild
        variant="secondary"
        className="mt-5 rounded-full border-0 bg-white/20 px-5 text-white backdrop-blur-sm hover:bg-white/30"
      >
        <Link to="/vendor/verification">
          Try verify
          <ExternalLink className="size-4" aria-hidden />
        </Link>
      </Button>
      <BadgeCheck
        className="pointer-events-none absolute -bottom-2 -right-2 size-32 text-white/8"
        strokeWidth={1}
        aria-hidden
      />
    </div>
  );
}
