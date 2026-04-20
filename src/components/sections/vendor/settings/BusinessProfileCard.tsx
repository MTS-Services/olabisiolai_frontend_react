import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function Label({ children }: { children: string }) {
  return (
    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

export function BusinessProfileCard() {
  return (
    <Card className="overflow-hidden rounded-xl border-0 border-l-4 border-brand-red shadow-sm ">
      <CardHeader className="relative flex flex-row flex-wrap items-center justify-between gap-4">
        <div className="space-y-1 pr-28 sm:pr-0">
          <CardTitle className="text-2xl font-extrabold text-foreground font-manrope">  
            Business Profile
          </CardTitle>
          <p className="text-sm text-muted-foreground font-inter">
            Manage your public presence and contact details.
          </p>
        </div>
        <div className="absolute right-6 top-5 sm:static sm:shrink-0">
          <div className="flex flex-col items-center justify-center gap-1 px-2 py-3">
            <img src="/src/assets/Background+Border.png" alt="" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Logo
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label>Business name</Label>
            <Input
              defaultValue="Gidira Logistics Premium"
              className="h-11 border-border-light bg-accent/60 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
            />
          </div>
          <div>
            <Label>Contact Person</Label>
            <Input
              defaultValue="Alexander Thorne"
              className="h-11 border-border-light bg-accent/60 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
            />
          </div>
          <div>
            <Label>Business Email</Label>
            <Input
              type="email"
              defaultValue="contact@gidiralogistics.com"
              className="h-11 border-border-light bg-accent/60 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              defaultValue="+1 (555) 000-1234"
              className="h-11 border-border-light bg-accent/60 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500/25"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
