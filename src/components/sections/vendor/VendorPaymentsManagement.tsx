import { useState } from "react";
import {
    Banknote,
    CalendarDays,
    CheckCircle2,
    CircleAlert,
    Copy,
    CreditCard,
    Delete,
    Download,
    Landmark,
    LucideDelete,
    RotateCcw,
    ShieldCheck,
    TextAlignStart,
    Trash2,
    WalletCards,
    X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ModalStep = "none" | "email" | "verify" | "accountType" | "success";

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

export function VendorPaymentsManagement() {
    const [modalStep, setModalStep] = useState<ModalStep>("none");
    const [email, setEmail] = useState("");

    return (
        <section className="space-y-4">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold font-inter">Payout Methods</h1>
                </div>
                <button type="button" className="text-sm font-inter font-semibold text-brand-red hover:underline cursor-pointer" onClick={() => setModalStep("accountType")}>
                    + Add Payout Method
                </button>
            </div>

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
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Status</th>
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
                                    <td className="px-4 py-3"><TypeBadge type={row.type} /></td>
                                    <td className={cn("px-4 py-3 font-semibold", row.negative ? "text-rose-700" : "text-foreground")}>{row.amount}</td>
                                    <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
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

            {modalStep !== "none" ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
                    <Card className="w-full max-w-md p-5 bg-[#EFF6FF] rounded-xl">
                        <CardContent className="w-sm relative space-y-6 ">
                            <button
                                type="button"
                                className="absolute right-4 top-0 rounded-full border p-1 text-muted-foreground"
                                onClick={() => setModalStep("none")}
                            >
                                <X className="size-4" />
                            </button>

                            {modalStep === "email" ? (
                                <>
                                    <p className="text-base font-inter font-normal">Email</p>
                                    <Input
                                        placeholder="example@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="border-brand-red p-4 h-14"
                                    />
                                    <Button className="w-full bg-brand-red text-white hover:bg-brand-red/90" onClick={() => setModalStep("verify")}>
                                        Continue
                                    </Button>
                                </>
                            ) : null}

                            {modalStep === "verify" ? (
                                <>
                                    <p className="text-center text-2xl font-inter font-semibold">Verify Your Account</p>
                                    <p className="text-center text-sm text-muted-foreground">
                                        We sent a 4-digit verification code to your email {email || "example@gmail.com"}.
                                    </p>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[5, 3, 3, 6].map((n, i) => (
                                            <div key={`${n}-${i}`} className="rounded-md border bg-muted/30 py-2 text-center text-3xl font-semibold">
                                                {n}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-center text-xs text-muted-foreground">
                                        Didn't receive the code? <button className="underline">Resend Code</button>
                                    </p>
                                    <Button className="w-full bg-brand-red text-white hover:bg-brand-red/90" onClick={() => setModalStep("success")}>
                                        Continue
                                    </Button>
                                </>
                            ) : null}

                            {modalStep === "accountType" ? (
                                <>
                                    <div className="">
                                        <div className="">
                                            <p className="text-center font-inter text-4xl font-semibold mb-6">Account Type</p>
                                        </div>
                                        <div className="flex items-center gap-2 mb-8">
                                            <div className="flex gap-2 items-center text-text-white py-2 px-3 bg-brand rounded-md">
                                                <CreditCard className="size-4" />
                                                <p className="font-inter text-base font-normal">Card</p>
                                            </div>
                                            <div className="flex gap-2 items-center text-text-white py-2 px-3 bg-[#DDDDDD] rounded-md">
                                                <WalletCards className="size-4" />
                                                <p className="font-inter text-base font-normal">Pay</p>
                                            </div>
                                            <div className="flex gap-2 items-center text-text-white py-2 px-3 bg-[#DDDDDD] rounded-md">
                                                <TextAlignStart className="size-4 text-brand" />
                                                <p className="font-inter text-base font-normal">Paystack</p>
                                            </div>

                                        </div>
                                        <div className="space-y-2 rounded-md bg-[#9FD8FF] py-6 px-4 mb-6">
                                            <div className="flex gap-4 items-center mb-5">
                                                <CreditCard className="text-chat-accent" />
                                                <p className="text-sm text-chat-accent font-normal font-inter">Add Credit / Debit Card</p>
                                            </div>
                                            <Input placeholder=" Card Holder's Name" className="bg-[#F6F6F6] p-4 h-14" />
                                            <Input placeholder="Card Number" className="bg-[#F6F6F6] p-4 h-14" />
                                            <div className="grid grid-cols-2 gap-2">
                                                <Input placeholder="Month" className="bg-[#F6F6F6] p-4 h-14" />
                                                <Input placeholder="Year" className="bg-[#F6F6F6] p-4 h-14" />
                                                <div className="flex gap-1 items-center">
                                                    <Input placeholder="Security Code" className="bg-[#F6F6F6] p-4 h-14" />
                                                    <CircleAlert className="text-chat-accent" />
                                                </div>
                                            </div>

                                        </div>
                                        <Button className="w-full bg-brand-red text-white hover:bg-brand-red/90" onClick={() => setModalStep("email")}>
                                            Continue
                                        </Button>
                                    </div>
                                </>
                            ) : null}

                            {modalStep === "success" ? (
                                <>
                                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                                        <CheckCircle2 className="size-8" />
                                    </div>
                                    <h3 className="text-center text-2xl font-inter font-semibold mb-2">Account Added Successful!</h3>
                                    <p className="text-center text-sm font-inter text-muted-foreground">
                                        Your bank account has been linked to your profile. You can now receive payments and manage your transactions seamlessly.
                                    </p>
                                    <Button className="w-full bg-brand-red text-white hover:bg-brand-red/90" onClick={() => setModalStep("none")}>
                                        Close
                                    </Button>
                                </>
                            ) : null}
                        </CardContent>
                    </Card>
                </div>
            ) : null}
        </section>
    );
}

