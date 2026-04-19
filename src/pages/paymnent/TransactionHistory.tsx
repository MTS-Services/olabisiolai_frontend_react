import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge, CalendarDays, Download, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";


const txRows = [
    {
        id: "#TXN-10293",
        date: "Oct 24, 2023",
        time: "09:42AM",
        description: "Service Booking #GB-9921",
        note: "Client: Michael Adebayo",
        type: "Booking",
        amount: "₦45,000.00",
        negative: false,
        status: "Completed",
    },
    {
        id: "#TXN-10288",
        date: "Oct 24, 2023",
        time: "09:42AM",
        description: "Boost Subscription - Pro",
        note: "Monthly recurring charge",
        type: "Boost",
        amount: "-₦12,500.00",
        negative: true,
        status: "Completed",
    },
    {
        id: "#TXN-10275",
        date: "Oct 24, 2023",
        time: "09:42AM",
        description: "Weekly Earnings Payout",
        note: "Direct deposit to GTBank",
        type: "Payout",
        amount: "-₦158,200.00",
        negative: true,
        status: "Processing",
    },
    {
        id: "#TXN-10264",
        date: "Oct 24, 2023",
        time: "09:42AM",
        description: "Vendor Verification Fee",
        note: "Identity check & vetting",
        type: "Verification",
        amount: "-₦5,000.00",
        negative: true,
        status: "Failed",
    },
    {
        id: "#TXN-10259",
        date: "Oct 24, 2023",
        time: "09:42AM",
        description: "Service Booking #GB-9850",
        note: "Client: Sarah Wilson",
        type: "Booking",
        amount: "₦28,000.00",
        negative: false,
        status: "Completed",
    },
];


function StatusBadge({ status }: { status: string }) {
    if (status === "Completed") return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Completed</Badge>;
    if (status === "Processing") return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Processing</Badge>;
    return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">Failed</Badge>;
}

function TypeBadge({ type }: { type: string }) {
    const style =
        type === "Booking"
            ? "bg-sky-100 text-sky-700"
            : type === "Boost"
                ? "bg-rose-100 text-rose-700"
                : type === "Payout"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-cyan-100 text-cyan-700";
    return <Badge className={cn(style, "hover:opacity-90")}>{type}</Badge>;
}

export function TransactionHistory() {
    return (
        <Card>
                <CardContent className="overflow-x-auto p-0">
                    <div className="flex items-center justify-between border-b px-4 py-3">
                        <p className="text-xl font-bold font-inter">Transaction History</p>
                        <div className="flex flex-wrap items-center gap-2">

                            <Button variant="outline" size="sm" className="bg-[#EFF4FF]">
                                <select>
                                    <option>All Types</option>
                                </select>
                            </Button>

                            <Button variant="outline" size="sm" className="bg-[#EFF4FF]">
                                <CalendarDays className="size-2" />
                                Last 30 Days
                            </Button>
                            <Button variant="outline" size="sm" className="bg-[#EFF4FF] hover:bg-[#EFF4FF/90]">
                                <Download />
                            </Button>
                        </div>
                    </div>

                    <table className="w-full min-w-[980px] text-left text-sm">
                        <thead className="text-xs font-inter font-bold uppercase tracking-wide text-muted-foreground  bg-[#EFF4FF]">
                            <tr>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Transaction ID</th>
                                <th className="px-4 py-3">Description</th>
                                {/* <th className="px-4 py-3">Type</th> */}
                                <th className="px-4 py-3">Amount</th>
                                {/* <th className="px-4 py-3">Status</th> */}
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {txRows.map((row) => (
                                <tr key={row.id} className="border-t">
                                    <td className="px-4 py-3">
                                        <p className="font-inter text-sm font-normal">{row.date}</p>
                                    </td>
                                    <td className="px-4 py-3 text-xs font-semibold text-muted-foreground">{row.id}</td>
                                    <td className="px-4 py-3">
                                        <p className="font-inter font-semibold text-sm">{row.description}</p>
                                        <p className="text-xs font-inter font-normal text-muted-foreground">{row.note}</p>
                                    </td>
                                    {/* <td className="px-4 py-3"><TypeBadge type={row.type} /></td> */}
                                    <td className={cn("px-4 py-3 font-semibold", row.negative ? "text-rose-700" : "text-foreground")}>{row.amount}</td>
                                    {/* <td className="px-4 py-3"><StatusBadge status={row.status} /></td> */}
                                    <td className="px-4 py-3">
                                        <div className="inline-flex items-center gap-2">
                                            <RotateCcw className="size-4 text-sky-700" />
                                            <Trash2 className="size-4 text-rose-600" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
                        <p>Showing 1-10 of 482 transactions</p>
                        <div className="inline-flex items-center gap-2">
                            <button type="button" className="rounded-md border px-2 py-1">{`<`}</button>
                            <button type="button" className="rounded-md bg-brand-red px-2 py-1 text-text-white">1</button>
                            <button type="button" className="rounded-md border px-2 py-1">2</button>
                            <button type="button" className="rounded-md border px-2 py-1">3</button>
                            <span>...</span>
                            <button type="button" className="rounded-md border px-2 py-1">49</button>
                            <button type="button" className="rounded-md border px-2 py-1">{`>`}</button>
                        </div>
                    </div>
                </CardContent>
            </Card>
    );
}