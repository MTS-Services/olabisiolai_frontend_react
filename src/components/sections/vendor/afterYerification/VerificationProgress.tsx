import { Check, Clock, Dot, Lock } from "lucide-react";

interface ProgressStep {
  id: string;
  title: string;
  status: "completed" | "pending" | "locked";
  description?: string;
}

export function VerificationProgress({ className }: { className?: string }) {
  const steps: ProgressStep[] = [
    {
      id: "profile",
      title: "Profile Setup",
      status: "completed",
      description: "Completed on Oct 12",
    },
    {
      id: "review",
      title: "Document Review",
      status: "pending",
      description: "Pending • 2 documents missing",
    },
    {
      id: "verified",
      title: "Account Verified",
      status: "locked",
      description: "Locked",
    },
  ];

  const verificationStrength = 35; // percentage

  const getStatusIcon = (status: ProgressStep["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="h-5 w-5 text-white" />;
      case "pending":
        return <Dot className="h-5 w-5 text-white" />;
      case "locked":
        return <Lock className="h-5 w-5 text-[#F2C94C]" />;
    }
  };

  const getStatusColor = (status: ProgressStep["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-600";
      case "pending":
        return "bg-primary";
      case "locked":
        return "bg-white";
    }
  };

  return (
    <div className={className}>
      <div className="bg-white p-6">
        <h2 className="text-xl font-medium mb-6">Verification Progress</h2>

        {/* Timeline */}
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStatusColor(step.status)}`}
              >
                {getStatusIcon(step.status)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-base font-inter">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-5 mt-10 w-0.5 h-8 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>

        {/* Verification Strength */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-inter font-medium">Verification Strength</span>
            <span className="text-base font-inter text-muted-foreground">
              {verificationStrength}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#D97706] h-2 rounded-full transition-all duration-300"
              style={{ width: `${verificationStrength}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
