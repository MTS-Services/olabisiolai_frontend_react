import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { VendorLayout } from '@/layouts/vendor/VendorLayout'


export default function VendorDashboard() {
  return (
    <div className="">
      <VendorLayout >
        <Card>
        <CardHeader>
          <CardTitle>Vendor Dashboard</CardTitle>
          <CardDescription>Vendor-only area</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Replace this with vendor pages (stores, listings, fulfillment, etc.).
        </CardContent>
      </Card>
      </VendorLayout>
    </div>
  )
}

