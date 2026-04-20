import { Card, CardContent } from "@/components/ui/card";

export function TargetLocationCard() {
  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <p className="inline-flex items-center gap-2 text-xl font-manrope font-bold">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-muted text-xl font-manrope font-bold">
            1
          </span>
          Select Target Location
        </p>

        <div className="max-w-xl m-auto grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            <div>
              <p className="mb-1 text-sm font-semibold font-inter text-muted-foreground">
                Region Focus
              </p>
              <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500">
                <option>Lagos State (All)</option>
                <option>Abuja</option>
                <option>Kano</option>
              </select>
            </div>

            <div>
              <p className="mb-1 text-sm font-semibold font-inter text-muted-foreground">
                Specific LGA
              </p>
              <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500">
                <option>Eti-Osa</option>
                <option>Ikeja</option>
                <option>Surulere</option>
              </select>
            </div>

            <p className="inline-flex items-start gap-2 text-xs text-muted-foreground">
              Selected areas will prioritize users who frequently visit or reside within these coordinates.
            </p>
          </div>
          <div className="">
            <img src="/src/assets/Background.png" alt="" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
