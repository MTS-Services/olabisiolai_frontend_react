import { Mail, Phone } from "lucide-react";

export function FooterContact() {
  return (
    <div className="flex items-center justify-center gap-4 text-center py-2 border-t">
      <p className="text-sm text-muted-foreground">
        Need help choosing the right tier?
      </p>
      <div className="flex items-center justify-center gap-4">
        <a 
          href="mailto:vendor-support@example.com" 
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <Mail className="h-4 w-4" />
          Contact our Vendor Success Team
        </a>
      </div>
    </div>
  );
}
