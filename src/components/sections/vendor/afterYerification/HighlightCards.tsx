import { TrendingUp, Check } from "lucide-react";

export function HighlightCards() {
  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
      <div className="bg-card p-4 sm:p-6">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="shrink-0 rounded-lg bg-blue-100 p-2 sm:p-3">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-normal text-footer-bar">Higher Ranking</h3>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
              Verified vendors are prioritized in search results. increasing visibility by up to 40%,
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card p-4 sm:p-6">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="shrink-0 rounded-lg bg-green-100 p-2 sm:p-3">
            <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-normal text-footer-bar">Trust Badge</h3>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
              The Gidira Trust Badge signals legitimacy to international buyers and reduces transaction friction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
