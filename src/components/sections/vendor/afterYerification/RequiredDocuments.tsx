import { Upload, FileText, Home, CheckCircle, Clock } from "lucide-react";

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
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "identity-proof",
      title: "Identity Proof",
      description: "Government-issued photo ID of authorized representative",
      status: "in_review",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "address-proof",
      title: "Address Proof",
      description: "Recent utility bill or bank statement",
      status: "missing",
      icon: <Home className="h-5 w-5" />,
    },
  ];

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "missing":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
            MISSING
          </span>
        );
      case "in_review":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
            IN REVIEW
          </span>
        );
      case "approved":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
            APPROVED
          </span>
        );
    }
  };

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "missing":
        return null;
      case "in_review":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  return (
    <div className={className}>
      <div className="bg-card p-6">
        <div className="flex items-center gap-2 py-4">
          <h2 className="text-xl font-semibold">Required Documents</h2>
          <div className="">
            <h2 className="bg-[#FFD12766] px-3 py-1 rounded-full text-xl font-semibold">
              3 ACTION REQUIRED
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="border rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {doc.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div>
                    <h3 className="font-medium text-base font-inter">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {doc.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {getStatusBadge(doc.status)}
                  {doc.status === "missing" && (
                    <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-primary border border-primary rounded-md hover:bg-primary/5 transition-colors">
                      <Upload className="h-3 w-3" />
                      Upload
                    </button>
                  )}

                  {doc.status === "in_review" && (
                    <button className="px-3 py-1.5 text-xs font-medium text-muted-foreground border border-muted rounded-md cursor-not-allowed">
                      View Document
                    </button>
                  )}

                  {doc.status === "approved" && (
                    <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-green-700 border border-green-200 rounded-md hover:bg-green-50 transition-colors">
                      <CheckCircle className="h-3 w-3" />
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
