import { Upload, FileText, Home, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  description: string;
  status: "missing" | "in_review" | "approved";
  icon: React.ReactNode;
}

export function RequiredDocuments({ className }: { className?: string }) {
  const documents: Document[] = [
    {
      id: "business-registration",
      title: "Business Registration",
      description: "Certificate of business registration or incorporation",
      status: "missing",
      icon: <FileText className={cn('h-5', 'w-5')} />,
    },
    {
      id: "identity-proof",
      title: "Identity Proof",
      description: "Government-issued photo ID of authorized representative",
      status: "in_review",
      icon: <FileText className={cn('h-5', 'w-5')} />,
    },
    {
      id: "address-proof",
      title: "Address Proof",
      description: "Recent utility bill or bank statement",
      status: "missing",
      icon: <Home className={cn('h-5', 'w-5')} />,
    },
  ];

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "missing":
        return (
          <span className={cn('px-2', 'py-1', 'text-xs', 'font-medium', 'rounded-full', 'bg-red-100', 'text-red-700')}>
            MISSING
          </span>
        );
      case "in_review":
        return (
          <span className={cn('px-2', 'py-1', 'text-xs', 'font-medium', 'rounded-full', 'bg-yellow-100', 'text-yellow-700')}>
            IN REVIEW
          </span>
        );
      case "approved":
        return (
          <span className={cn('px-2', 'py-1', 'text-xs', 'font-medium', 'rounded-full', 'bg-green-100', 'text-green-700')}>
            APPROVED
          </span>
        );
    }
  };

  return (
    <div className={className}>
      <div className={cn('bg-card', 'p-4', 'sm:p-6')}>
        <div className={cn('flex', 'flex-col', 'sm:flex-row', 'sm:items-center', 'gap-2', 'sm:gap-4', 'py-4')}>
          <h2 className={cn('text-lg', 'sm:text-xl', 'font-semibold')}>Required Documents</h2>
          <div className="">
            <h2 className={cn('bg-[#FFD12766]', 'px-3', 'py-1', 'rounded-full', 'text-base', 'sm:text-xl', 'font-semibold')}>
              3 ACTION REQUIRED
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className={cn('border', 'rounded-lg', 'p-3', 'sm:p-4')}>
              <div className={cn('flex', 'flex-col', 'sm:flex-row', 'sm:items-start', 'gap-3', 'sm:gap-4')}>
                <div className={cn('shrink-0', 'w-10', 'h-10', 'rounded-lg', 'bg-primary/10', 'flex', 'items-center', 'justify-center', 'text-primary')}>
                  {doc.icon}
                </div>

                <div className={cn('flex-1', 'min-w-0')}>
                  <div>
                    <h3 className={cn('font-medium', 'text-sm', 'sm:text-base', 'font-inter')}>
                      {doc.title}
                    </h3>
                    <p className={cn('text-xs', 'text-muted-foreground', 'mt-1')}>
                      {doc.description}
                    </p>
                  </div>
                </div>
                <div className={cn('flex', 'flex-col', 'sm:flex-row', 'items-start', 'sm:items-center', 'gap-2', 'mt-2', 'sm:mt-0')}>
                  {getStatusBadge(doc.status)}
                  {doc.status === "missing" && (
                    <button className={cn('flex', 'items-center', 'gap-2', 'px-3', 'py-1.5', 'text-xs', 'font-medium', 'text-primary', 'border', 'border-primary', 'rounded-md', 'hover:bg-primary/5', 'transition-colors')}>
                      <Upload className={cn('h-3', 'w-3')} />
                      Upload
                    </button>
                  )}

                  {doc.status === "in_review" && (
                    <button className={cn('px-3', 'py-1.5', 'text-xs', 'font-medium', 'text-muted-foreground', 'border', 'border-muted', 'rounded-md', 'cursor-not-allowed')}>
                      View Document
                    </button>
                  )}

                  {doc.status === "approved" && (
                    <button className={cn('flex', 'items-center', 'gap-2', 'px-3', 'py-1.5', 'text-xs', 'font-medium', 'text-green-700', 'border', 'border-green-200', 'rounded-md', 'hover:bg-green-50', 'transition-colors')}>
                      <CheckCircle className={cn('h-3', 'w-3')} />
                      View Document
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
