import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FILTER_CHIPS = [
  "Boiler service",
  "Unvented cylinder",
  "Motorised valve",
  "Fix leak",
  "Install boiler",
  "Boiler repair",
] as const;

type ServicePhotosModalProps = {
  open: boolean;
  onClose: () => void;
  images: {
    hero: string;
    photo1: string;
    photo2: string;
    photo3: string;
    photo4: string;
    photo5: string;
  };
};

function GalleryImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-border-light",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function ServicePhotosModal({
  open,
  onClose,
  images,
}: ServicePhotosModalProps) {
  const [activeFilter, setActiveFilter] = useState<string>("Boiler repair");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/50 p-4 py-6 sm:p-6 sm:py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-photos-modal-title"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-5xl cursor-default rounded-2xl bg-card p-5 shadow-xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="service-photos-modal-title"
            className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            Photos
          </h2>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-10 shrink-0 rounded-full border-border-gray bg-ice hover:bg-border-light"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
          >
            <X className="size-5 text-ink" />
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {FILTER_CHIPS.map((label) => {
            const isActive = activeFilter === label;
            return (
              <button
                key={label}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFilter(label);
                }}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand text-ice"
                    : "border border-border-gray bg-bg-section text-ink hover:bg-border-light",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-3">
          <div className="grid grid-cols-1 gap-3 md:h-[min(420px,52vh)] md:min-h-[280px] md:grid-cols-12 md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="min-h-0 md:col-span-7 md:row-span-2">
              <GalleryImage
                src={images.hero}
                alt=""
                className="aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[200px]"
              />
            </div>
            <div className="min-h-0 md:col-span-5 md:row-span-1">
              <GalleryImage
                src={images.photo1}
                alt=""
                className="aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-0"
              />
            </div>
            <div className="min-h-0 md:col-span-5 md:row-span-1">
              <GalleryImage
                src={images.photo2}
                alt=""
                className="aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-0"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <GalleryImage
              src={images.photo3}
              alt=""
              className="aspect-[4/3] w-full sm:aspect-[5/4]"
            />
            <GalleryImage
              src={images.photo4}
              alt=""
              className="aspect-[4/3] w-full sm:aspect-[5/4]"
            />
            <GalleryImage
              src={images.photo5}
              alt=""
              className="aspect-[4/3] w-full sm:aspect-[5/4]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
