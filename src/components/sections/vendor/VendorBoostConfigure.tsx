import { AlarmCheck, ArrowLeft, ArrowRight, CalendarDays, ChevronRight, MapPin, Search, ShieldCheck, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function VendorBoostConfigure() {
    const navigate = useNavigate();

    return (
        <section className="space-y-4">

            <div className="space-y-1">
                <div className="flex gap-1">
                    <p className="text-xs font-inter font-medium uppercase text-muted-foreground">Business Center</p>
                    <ChevronRight className="w-4 h-4" />
                    <p className="text-xs font-inter font-medium uppercase text-brand-red">Configure your boost</p>
                </div>
                <h1 className="text-4xl font-extrabold font-manrope tracking-tight text-foreground mb-4">Configure Your Boost</h1>
                <p className="max-w-xl text-base font-inter font-normal text-muted-foreground">
                    Target your audience with precision. Select specific Lagos areas and define your timeline to maximize your
                    business visibility.
                </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
                <div className="space-y-4">
                    <Card>
                        <CardContent className="space-y-4 p-5">
                            <p className="inline-flex items-center gap-2 text-xl font-manrope font-bold">
                                <span className="inline-flex size-8 items-center justify-center rounded-full bg-muted text-xl font-manrope font-bold">1</span>
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

                    <Card>
                        <CardContent className="space-y-4 p-5">
                            <p className="inline-flex items-center gap-2 text-xl font-manrope font-bold">
                                <span className="inline-flex size-8 items-center justify-center rounded-full bg-muted text-xl font-manrope font-bold">2</span>
                                Boost Schedule
                            </p>
                            <div className="grid gap-3 md:grid-cols-2">
                                <div>
                                    <p className="mb-1 text-xs font-medium text-muted-foreground">Start Date</p>
                                    <div className="inline-flex w-full items-center gap-2 rounded-md border bg-muted/20 px-3 py-2 text-sm">
                                        <CalendarDays className="size-4 text-muted-foreground" />
                                        11/20/2023
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-1 text-xs font-medium text-muted-foreground">End Date</p>
                                    <div className="inline-flex w-full items-center gap-2 rounded-md border bg-muted/20 px-3 py-2 text-sm">
                                        <CalendarDays className="size-4 text-muted-foreground" />
                                        11/27/2023
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 items-center rounded-md border bg-muted/20 px-3 py-2 text-sm">
                                <AlarmCheck className="text-brand-red" />
                                <p className="w-xs"> Your boost will run for 7 consecutive days starting next Monday.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <Card className="border-0 bg-gradient-to-b from-[#0a2a5f] to-[#092047] text-white">
                        <CardContent className="space-y-4 p-5">
                            <div className="flex gap-2 items-center">
                                <div className="relative w-10 h-10">
                                    <TrendingUp className="w-6 h-6 text-pink-200" />
                                    <Search className="w-6 h-6 absolute bottom-0 right-0 text-pink-200" />
                                </div>
                                <p className="text-lg font-inter font-bold text-success-foreground">Estimated Reach</p>
                            </div>
                            <div className="mt-8">
                                <p className="text-xs font-inter  text-success-foreground/80">Potential Views</p>
                                <p className="text-5xl font-extrabold font-inter">42.5K <span className="text-sm font-extrabold font-inter">+12%</span> </p>
                            </div>

                            <div>
                                <div className="mb-4 flex items-center justify-between text-xs">
                                    <span className="text-success-foreground/80">Target Accuracy</span>
                                    <span className="font-semibold">High (88%)</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/20">
                                    <div className="h-full w-[88%] rounded-full bg-brand-red" />
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs">
                                    <span className="text-success-foreground/80">Target Accuracy</span>
                                    <span className="font-semibold">180 - 240</span>
                                </div>
                            </div>

                            <div className="mt-8 rounded-md bg-white/10 p-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="font-normal font-inter text-xs text-success-foreground/80">Current Plan</span>
                                    <span className="font-normal font-inter text-xs text-success-foreground/80">Premium Vendor</span>
                                </div>
                                <div className="mt-1 flex items-center  justify-between">
                                    <span className="font-bold font-inter text-xs text-success-foreground">Daily Limit</span>
                                    <span className="font-bold font-inter text-xs text-success-foreground">6,000 Views</span>
                                </div>
                            </div>

                            <Button className="w-full bg-brand-red text-white hover:bg-brand-red/90" onClick={() => navigate("/vendor/boost/review-pay")}>
                                Proceed to Payment
                                <ArrowRight className="size-4" />
                            </Button>

                            <p className="text-center text-[10px] uppercase tracking-wide text-sky-100/80">Secure checkout by Gidira Pay</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-sky-50">
                        <CardContent className="inline-flex items-start gap-2 p-4 text-sm text-sky-900">
                            <ShieldCheck className="mt-0.5 size-4" />
                            If your reach falls below 80% of our estimate, we'll extend your boost for 24 hours at no extra cost.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}

