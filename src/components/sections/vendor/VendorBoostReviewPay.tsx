import { ArrowLeft, Building2, CircleDot, CreditCard, Landmark, Lock, PlugZap } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export function VendorBoostReviewPay() {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState<"card" | "bank">("card");

    return (
        <section className="space-y-4">
            <button
                type="button"
                onClick={() => navigate("/vendor/boost/configure")}
                className="inline-flex items-center gap-1 text-sm font-inter text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="size-4" />
                Back to Configure
            </button>

            <div className="space-y-1">
                <h2 className="text-4xl font-extrabold font-inter text-foreground">Review & Pay</h2>
                <p className="text-base font-inter  text-muted-foreground">
                    Complete your transaction to activate your business visibility boost.
                </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1fr_390px] mt-10">
                <div className="space-y-4">
                    <h2 className="font-inter font-semibold text-base uppercase text-foreground">Payment Methods</h2>

                    {/* Pay with Card */}
                    <Card
                        className={`cursor-pointer transition-colors ${selectedMethod === "card" ? "border-brand-red" : ""}`}
                        onClick={() => setSelectedMethod("card")}
                    >
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="inline-flex items-center gap-3">
                                <div className={`rounded-md p-2 ${selectedMethod === "card" ? "bg-red-50 text-brand-red" : "bg-slate-100 text-slate-700"}`}>
                                    <CreditCard className="w-10 h-10" />
                                </div>
                                <div>
                                    <p className="font-inter font-semibold text-sm text-foreground">Pay with Card</p>
                                    <p className="font-inter font-normal text-sm text-muted-foreground">Secure checkout via Paystack</p>
                                </div>
                            </div>
                            {selectedMethod === "card" ? (
                                // <CircleDot className="size-4 text-brand-red" />
                                <div className="border-2 border-brand-red rounded-full p-1">
                                    <div className="w-4 h-4 bg-brand-red rounded-full"></div>
                                </div>
                            ) : (
                                <div className="size-6 rounded-full border" />
                            )}
                        </CardContent>
                    </Card>

                    {/* Bank Transfer */}
                    <Card
                        className={`cursor-pointer transition-colors bg-[#EFF4FF] ${selectedMethod === "bank" ? "border-brand-red" : ""}`}
                        onClick={() => setSelectedMethod("bank")}
                    >
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="inline-flex items-center gap-3">
                                <div className={`rounded-md p-2 ${selectedMethod === "bank" ? "bg-red-50 text-brand-red" : "bg-slate-100 text-slate-700"}`}>
                                    <Landmark className="size-4" />
                                </div>
                                <div>
                                    <p className="font-inter font-semibold text-sm text-foreground">Bank Transfer</p>
                                    <p className="font-inter font-normal text-sm text-muted-foreground">Direct deposit to Gidira accounts</p>
                                </div>
                            </div>
                            {selectedMethod === "bank" ? (
                               <div className="border-2 border-brand-red rounded-full p-1">
                               <div className="w-4 h-4 bg-brand-red rounded-full"></div>
                           </div>
                            ) : (
                                <div className="size-6 rounded-full border" />
                            )}
                        </CardContent>
                    </Card>

                    {/* Billing Information */}
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
                </div>

                <Card>
                    <CardContent className="space-y-4 p-5">
                        <p className="text-2xl font-semibold">Order Summary</p>

                        <div className="inline-flex items-center gap-3">
                            <div className="rounded-md bg-brand-red p-2 text-success-foreground">
                                <PlugZap className="size-5" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Plan Selected</p>
                                <p className="text-base font-semibold">Visibility Pro Plus</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 border-y py-3 text-sm">
                            <div>
                                <p className="text-xs uppercase text-muted-foreground">Duration</p>
                                <p className="font-semibold">30 Days</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-muted-foreground">Target Areas</p>
                                <p className="font-semibold">Lagos Metro, Abuja</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>₦4,650.00</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Processing Fee</span>
                                <span>₦350.00</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t pt-3">
                            <span className="text-lg font-semibold">Total Price</span>
                            <span className="text-4xl font-bold text-brand-red">₦5,000.00</span>
                        </div>

                        <Button className="w-full bg-brand-red text-white hover:bg-brand-red/90">
                            <Lock className="size-4" />
                            Confirm & Pay
                        </Button>

                        <p className="text-center text-[10px] uppercase tracking-wide text-muted-foreground">
                            SSL Encrypted & PCI-DSS Compliant
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

