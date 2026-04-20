import { Plus } from "lucide-react";

import { Card } from "@/components/ui/card";

import img1 from "@/assets/protfolio_image/Property Image 1.png";
import img2 from "@/assets/protfolio_image/Property Image 2.png";
import img3 from "@/assets/protfolio_image/Property Image 3.png";

const portfolioPreviewImages: { id: string; src: string; alt: string }[] = [
  { id: "1", src: img1, alt: "Portfolio image 1" },
  { id: "2", src: img2, alt: "Portfolio image 2" },
  { id: "3", src: img3, alt: "Portfolio image 3" },
];

export function DashboardPortfolioCard() {
  return (
    <Card>
      <div className="space-y-4 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground font-manrope sm:text-xl">
            Portfolio Images
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {portfolioPreviewImages.map((img) => (
            <div
              key={img.id}
              className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted sm:h-20 sm:w-20"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
          <label
            className="flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-[#E6BDB8] text-muted-foreground transition-colors hover:bg-muted sm:h-20 sm:w-20"
            aria-label="Upload portfolio photo"
          >
            <input type="file" accept="image/*" className="sr-only" />
            <Plus className="size-4 sm:size-5" aria-hidden />
          </label>
          <label
            className="flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-[#E6BDB8] text-muted-foreground transition-colors hover:bg-muted sm:h-20 sm:w-20"
            aria-label="Upload portfolio photo"
          >
            <input type="file" accept="image/*" className="sr-only" />
            <Plus className="size-4 sm:size-5" aria-hidden />
          </label>
        </div>
        <p className="font-inter text-xs font-normal italic text-muted-foreground leading-relaxed sm:text-sm">
          Add high-resolution photos of your previous work to boost trust.
        </p>
      </div>
    </Card>
  );
}
