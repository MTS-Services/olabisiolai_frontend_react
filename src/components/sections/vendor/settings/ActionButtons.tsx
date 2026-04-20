import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export function ActionButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button type="button" variant="outline" className="min-w-[140px] border-foreground/20 bg-card font-inter">
        Discard changes
      </Button>
      <Button
        type="button"
        className="min-w-[160px] bg-brand-red font-inter font-semibold text-white shadow-sm hover:bg-brand-red/90"
      >
        <Save className="size-4" aria-hidden />
        Save changes
      </Button>
    </div>
  );
}
