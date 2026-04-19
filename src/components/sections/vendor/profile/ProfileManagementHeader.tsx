import { Button } from "@/components/ui/button";

export function ProfileManagementHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-manrope md:text-3xl">
          Profile Management
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground font-inter">
          Keep your business information up-to-date to attract more clients.
        </p>
      </div>
      <Button
        type="button"
        className="h-11 shrink-0 rounded-lg bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-sky-600/90"
      >
        Edit Profile
      </Button>
    </div>
  );
}
