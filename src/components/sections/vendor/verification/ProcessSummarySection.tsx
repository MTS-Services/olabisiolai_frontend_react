import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProcessSummarySection() {
  const navigate = useNavigate();
  return (
    <div className=" col-span-12 xl:col-span-4 space-y-4 bg-black p-4 sm:p-6 lg:p-8 rounded-2xl relative flex flex-col">
      <h3 className="text-base font-bold text-[#F8F9FF99] font-inter sm:text-lg">
        Process summary
      </h3>

      <div className="space-y-3">
        <p className="w-full sm:w-[200px] text-[#F8F9FF] text-sm sm:text-base">
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
          className="w-full bg-brand-red text-white hover:bg-brand-red/90 py-2.5 px-4 text-sm sm:py-3 sm:px-6 sm:text-base"
         onClick={() => navigate("vendor/document-upload")}
        >
          <span>Continue</span>
          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
}