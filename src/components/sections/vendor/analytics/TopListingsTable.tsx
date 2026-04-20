import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { listings } from "./analyticsData";

export function TopListingsTable() {
  return (
    <Card>
      <CardContent className="overflow-x-auto p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-2xl font-semibold">Top Performing Listings</p>
          <button type="button" className="text-xs font-semibold text-brand-red hover:underline">
            Export Report
          </button>
        </div>
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Service Name</th>
              <th className="px-4 py-3">Views</th>
              <th className="px-4 py-3">Clicks</th>
              <th className="px-4 py-3">CTR</th>
              <th className="px-4 py-3">Enquiries</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-3 font-medium">{listing.name}</td>
                <td className="px-4 py-3">{listing.views}</td>
                <td className="px-4 py-3">{listing.clicks}</td>
                <td className="px-4 py-3">{listing.ctr}</td>
                <td className="px-4 py-3">{listing.enquiries}</td>
                <td className="px-4 py-3">
                  <Badge variant={listing.status === "Active" ? "default" : "secondary"}>
                    {listing.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
