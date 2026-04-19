import { Card, CardContent } from "@/components/ui/card";

export function BillingInformationCard() {
  return (
    <Card>
      <CardContent className="space-y-2 p-4 bg-[#EFF4FF]">
        <div className="flex items-center justify-between mb-6">
          <p className="text-base font-inter font-bold">Billing Information</p>
          <button type="button" className="text-xs font-semibold text-brand-red hover:underline">
            Edit
          </button>
        </div>
        <p className="text-sm font-inter font-medium m-0 p-0">The Curator Premium Hub</p>
        <p className="text-sm font-inter font-normal m-0 p-0">12th Avenue, Victoria Island</p>
        <p className="text-sm font-inter font-normal">Lagos, Nigeria</p>
      </CardContent>
    </Card>
  );
}
