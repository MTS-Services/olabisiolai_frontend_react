import { Card, CardContent } from "@/components/ui/card";

export function DashboardWelcomeCard() {
  return (
    <Card className="border-border-light bg-card">
      <CardContent className="flex items-start justify-between gap-4 px-10 py-16">
        <div className="space-y-1">
          <h2 className="text-4xl font-extrabold text-foreground font-manrope">Welcome, Zenith Real Estate</h2>
          <p className="max-w-2xl text-lg font-normal text-muted-foreground font-inter">
            Your agency performance is up this month. Keep your profile updated to attract high-intent leads.
          </p>
        </div>
        <div className="hidden rounded-lg bg-[#B700111A] p-3 shadow-2xl sm:block">
          <img src="/src/assets/Icon.png" alt="vendor-dashboard-avatar" />
        </div>
      </CardContent>
    </Card>
  );
}
