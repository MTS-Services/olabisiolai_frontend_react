import { ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

const galleryImages: { id: string; src: string; alt: string }[] = [
  { id: "1", src: "/src/assets/protfolio_image/Property Image 1.png", alt: "Living space" },
  { id: "2", src: "/src/assets/protfolio_image/Property Image 2.png", alt: "Kitchen" },
  { id: "3", src: "/src/assets/protfolio_image/Property Image 3.png", alt: "Bedroom" },
  { id: "4", src: "/src/assets/protfolio_image/Property Image 1.png", alt: "Interior detail" },
];

export function PremiumPortfolioGallery() {
  return (
    <Card className="rounded-2xl border-border-light bg-card shadow-sm">
      <CardContent className="space-y-6 p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-foreground font-manrope">Portfolio gallery</h3>
          <Link
            to="/vendor/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline font-inter"
          >
            <ImageIcon className="size-4" aria-hidden />
            Manage media
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {galleryImages.map((img, index) => (
            <div
              key={`${img.id}-${index}`}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border-light bg-muted"
            >
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
