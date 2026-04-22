import { useState } from "react";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Placeholder until listings load a real phone from the API. */
export const LISTING_DUMMY_PHONE_DISPLAY = "+234 803 123 4567";

type ShowPhoneNumberRevealProps = {
  className?: string;
  iconClassName?: string;
  /** Use shadcn `Button` (e.g. favorites / service sidebar). */
  useShadcnButton?: boolean;
  /**
   * When true, stops the click (and space/enter on the control) from bubbling.
   * Use on cards whose parent navigates on click.
   */
  isolateFromParentClicks?: boolean;
};

export function ShowPhoneNumberReveal({
  className,
  iconClassName,
  useShadcnButton = false,
  isolateFromParentClicks = true,
}: ShowPhoneNumberRevealProps) {
  const [shown, setShown] = useState(false);

  const isolateClick = (event: React.MouseEvent) => {
    if (!isolateFromParentClicks) return;
    event.stopPropagation();
  };

  const isolateKey = (event: React.KeyboardEvent) => {
    if (!isolateFromParentClicks) return;
    if (event.key === "Enter" || event.key === " ") {
      event.stopPropagation();
    }
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const reveal = () => setShown(true);

  if (shown) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 font-semibold tabular-nums tracking-wide",
          className,
          "cursor-default select-text",
        )}
      >
        <Phone className={iconClassName} aria-hidden />
        {LISTING_DUMMY_PHONE_DISPLAY}
      </div>
    );
  }

  const content = (
    <>
      <Phone className={iconClassName} aria-hidden />
      Show phone number
    </>
  );

  if (useShadcnButton) {
    return (
      <Button
        type="button"
        className={className}
        onKeyDown={isolateKey}
        onClick={(event) => {
          isolateClick(event);
          reveal();
        }}
      >
        {content}
      </Button>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onKeyDown={isolateKey}
      onClick={(event) => {
        isolateClick(event);
        reveal();
      }}
    >
      {content}
    </button>
  );
}
