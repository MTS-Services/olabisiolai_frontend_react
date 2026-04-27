import { TrendingUp, Shield, Check } from "lucide-react";

export function HighlightCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-blue-100 p-3">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-normal text-footer-bar">Higher Ranking</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Verified vendors are prioritized in search results. increasing visibility by up to 40%,
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-green-100 p-3">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-normal text-footer-bar">Trust Badge</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The Gidira Trust Badge signals legitimacy to international buyers and reduces transaction friction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
