import { ChevronRight } from "lucide-react";

export function AssistanceCard({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="bg-white p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-3">Need Assistance?</h3>

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Our verification experts are here to help you through the process.
            Get personalized guidance and answers to your questions.
          </p>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-foreground rounded-lg font-medium border">
              Chat with Support
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
