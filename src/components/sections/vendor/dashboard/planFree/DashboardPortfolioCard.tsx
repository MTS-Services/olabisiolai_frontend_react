import { Plus } from "lucide-react";

import { Card } from "@/components/ui/card";

const portfolioPreviewImages: { id: string; src: string; alt: string }[] = [
  { id: "1", src: "/src/assets/protfolio_image/Property Image 1.png", alt: "Portfolio image 1" },
  { id: "2", src: "/src/assets/protfolio_image/Property Image 2.png", alt: "Portfolio image 2" },
  { id: "3", src: "/src/assets/protfolio_image/Property Image 3.png", alt: "Portfolio image 3" },
];

export function DashboardPortfolioCard() {
  return (
    <Card>
      <div className="space-y-3 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground font-manrope">Portfolio Images</h2>
        </div>
        <div className="flex items-center gap-4">
          {portfolioPreviewImages.map((img) => (
            <div key={img.id} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted">
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
          <label
            className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-[#E6BDB8] text-muted-foreground transition-colors hover:bg-muted"
            aria-label="Upload portfolio photo"
          >
            <input type="file" accept="image/*" className="sr-only" />
            <Plus className="size-5" aria-hidden />
          </label>
          <label
            className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-[#E6BDB8] text-muted-foreground transition-colors hover:bg-muted"
            aria-label="Upload portfolio photo"
          >
            <input type="file" accept="image/*" className="sr-only" />
            <Plus className="size-5" aria-hidden />
          </label>
        </div>
        <p className="font-inter text-sm font-normal italic text-muted-foreground">
          Add high-resolution photos of your previous work to boost trust.
        </p>
      </div>
    </Card>
  );
}
