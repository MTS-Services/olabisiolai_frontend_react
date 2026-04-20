import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Views", value: "1,248" },
  { label: "Total Bookings", value: "162" },
  { label: "Reviews", value: "28" },
  { label: "Conversion", value: "3.4%" },
];

const barHeights = [45, 60, 55, 70, 50, 90, 80, 65, 75, 85, 55, 40];

export function BasicAnalytics() {
  const navigate = useNavigate();
  
  const handleUpgradeClick = () => {
    navigate("/vendor/choose-your-plan");
  };

  return (
    <div className="relative">
      {/* Full Page Overlay */}
      <div className="absolute inset-0 bg-white/40 z-20 flex flex-col items-center justify-center gap-3 p-8">
        <div className="w-13 h-13 rounded-full bg-brand-red flex items-center justify-center p-3">
          <Lock className="text-popover-foreground w-6 h-6" />
        </div>
        <p className="text-lg font-semibold text-popover-foreground">Upgrade to Premium</p>
        <p className="text-sm text-popover-foreground text-center max-w-[260px]">
          Unlock deep analytics, conversion tracking, and competitor benchmarks.
        </p>
        <button 
          onClick={handleUpgradeClick}
          className="bg-red-600 hover:bg-brand-red text-text-white rounded-full px-6 py-3 text-sm font-medium"
        >
          Get Premium Access
        </button>
      </div>
      
      <Card className="opacity-40 h-screen">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold font-inter mb-5">Analytics Dashboard</h2>

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {stats.map((s) => (
              <div key={s.label} className="bg-muted rounded-lg p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{s.label}</p>
                <p className="text-2xl font-semibold">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Locked Chart */}
          <div className="relative border rounded-lg overflow-hidden min-h-[240px]">
            {/* Blurred Bar Chart */}
            <div className="flex items-end gap-2 h-48 p-4 blur-sm opacity-30 pointer-events-none">
              {barHeights.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-red-500 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}