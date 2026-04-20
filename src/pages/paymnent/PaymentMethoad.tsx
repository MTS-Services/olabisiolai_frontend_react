import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Landmark, Trash2 } from "lucide-react";

export function PaymentMethoad() {
    return (
        <div className="grid gap-4 xl:grid-cols-2">
                <Card>
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="inline-flex items-center gap-3">
                            <div className="rounded-md bg-[#E5EEFF] p-2 text-muted-foreground">
                                <Landmark className="size-6" />
                            </div>
                            <div>
                                <p className="text-sm font-inter font-bold">Zenith Bank</p>
                                <p className="text-sm font-normal font-inter text-foreground">**** 4590</p>
                            </div>
                        </div>
                        <Badge className="bg-[#0078B233] text-[#004B71] hover:bg-sky-100">Primary</Badge>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="inline-flex items-center gap-3">
                            <div className="rounded-md bg-[#E5EEFF] p-2 text-muted-foreground">
                                <Landmark className="size-6" />
                            </div>
                            <div>
                                <p className="text-sm font-inter font-bold">Access Bank</p>
                                <p className="text-sm font-normal font-inter text-foreground">**** 1288</p>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <Badge className="bg-[#0078B233] text-chat-accent hover:bg-sky-100">Set as primary </Badge>
                            <Trash2 />
                        </div>
                    </CardContent>
                </Card>
            </div>
    );
}