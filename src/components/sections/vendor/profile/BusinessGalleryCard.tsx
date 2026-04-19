import { Plus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import gallery1 from "@/assets/protfolio_image/Property Image 1.png";
import gallery2 from "@/assets/protfolio_image/Property Image 2.png";
import gallery3 from "@/assets/protfolio_image/Property Image 3.png";

const galleryImages = [
  { id: "1", src: gallery1, alt: "Gallery preview 1" },
  { id: "2", src: gallery2, alt: "Gallery preview 2" },
  { id: "3", src: gallery3, alt: "Gallery preview 3" },
] as const;

export function BusinessGalleryCard() {
  return (
    <Card className="overflow-hidden rounded-xl border-border-light shadow-sm">
      <CardHeader className="space-y-1 border-b border-border-light px-6 py-5">
        <CardTitle className="text-lg font-bold text-foreground font-manrope">Business Gallery</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border-light bg-muted shadow-sm"
            >
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
          {[1, 2].map((slot) => (
            <label
              key={slot}
              className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-lg border-[3px] border-dashed border-neutral-300 bg-neutral-50/50 text-muted-foreground transition-colors hover:border-sky-400/60 hover:bg-neutral-100/80"
              aria-label="Add gallery image"
            >
              <input type="file" accept="image/*" className="sr-only" />
              <Plus className="size-5 stroke-[2.25]" aria-hidden />
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
