import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

type ActionButtonsProps = {
  onDiscard: () => void;
  onSave: () => void;
  isSaving?: boolean;
  canSave?: boolean;
};

export function ActionButtons({
  onDiscard,
  onSave,
  isSaving = false,
  canSave = true,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        type="button"
        variant="outline"
        className="min-w-[140px] border-foreground/20 bg-card font-inter"
        onClick={onDiscard}
        disabled={isSaving || !canSave}
      >
        Discard changes
      </Button>
      <Button
        type="button"
        className="min-w-[160px] bg-brand-red font-inter font-semibold text-white shadow-sm hover:bg-brand-red/90"
        onClick={onSave}
        disabled={isSaving || !canSave}
      >
        {isSaving ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Save className="size-4" aria-hidden />
        )}
        Save changes
      </Button>
    </div>
  );
}
