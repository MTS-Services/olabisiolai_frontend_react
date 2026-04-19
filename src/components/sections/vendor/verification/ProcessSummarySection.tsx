import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProcessSummarySection() {
  const navigate = useNavigate();
  return (
    <div className="col-span-4 space-y-4 bg-black p-8 rounded-2xl relative flex flex-col">
      <h3 className="text-lg font-bold text-[#F8F9FF99] font-inter">
        Process summary
      </h3>

      <div className="space-y-3">
        <p className="w-[200px] text-[#F8F9FF]">
          Most verifications are completed within{" "}
          <span className="text-brand-red font-bold">
            24 to 48 hours
          </span>{" "}
          after submission.
        </p>
      </div>

      {/* 👇 push button to bottom */}
      <div className="mt-auto">
        <Button 
          className="w-full bg-brand-red text-white hover:bg-brand-red/90"
         onClick={() => navigate("/vendor/boost/review-pay")}
        >
          <span>Continue</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}