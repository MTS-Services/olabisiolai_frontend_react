import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import {
    ArrowRight,
    Check,
    CircleUserRound,
    CreditCard,
    FileText,
    Lock,
    ShieldCheck,
    Store,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import verifyImage from "@/assets/verify.jpg";

type PlanId = "individual" | "business" | "ltd";

type Plan = {
    id: PlanId;
    title: string;
    amount: string;
    description: string;
    perks: string[];
    icon: LucideIcon;
    /** Default panel fill when not selected (design: white vs soft blue). */
    surface: "tint" | "white";
    /** Perk row style: bold navy caps vs checklist. */
    perkStyle: "badge" | "list";
};

const plans: Plan[] = [
    {
        id: "individual",
        title: "Individual",
        amount: "2,500",
        description:
            "Best for solo entrepreneurs and independent contractors. Requires government ID and personal biometric verification.",
        perks: ["Trusted badge"],
        icon: CircleUserRound,
        surface: "tint",
        perkStyle: "badge",
    },
    {
        id: "business",
        title: "Business Name",
        amount: "5,000",
        description:
            "For registered sole proprietorships. Includes CAC document validation and business account linkage.",
        perks: ["Vendor priority", "Storefront personalization"],
        icon: Store,
        surface: "white",
        perkStyle: "list",
    },
    {
        id: "ltd",
        title: "Limited Company (LTD)",
        amount: "10,000",
        description:
            "The gold standard for corporate entities. Comprehensive verification of directors, shareholders, and legal status.",
        perks: ["Enterprise blue badge"],
        icon: FileText,
        surface: "tint",
        perkStyle: "badge",
    },
];

function TierRadio({ selected }: { selected: boolean }) {
    return (
        <span
            className={cn(
                "flex size-[22px] shrink-0 items-center justify-center rounded-full border-2 bg-card transition-colors",
                selected ? "border-brand-red" : "border-neutral-300",
            )}
            aria-hidden
        >
            {selected ? <span className="size-2.5 rounded-full bg-brand-red" /> : null}
        </span>
    );
}

export function VendorVerificationType() {
    const [selectedId, setSelectedId] = useState<PlanId>("individual");

    return (
        <section className="text-foreground">
            <div className="space-y-8 md:space-y-10">
                <header className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground font-manrope md:text-4xl">
                        Choose Verification Type
                    </h1>
                    <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                        To unlock full marketplace capabilities and build trust with buyers, please select the identity
                        verification tier that matches your business structure.
                    </p>
                </header>

                <div
                    className="grid gap-4 md:gap-5 lg:grid-cols-3"
                    role="radiogroup"
                    aria-label="Verification tier"
                >
                    {plans.map((plan) => {
                        const selected = selectedId === plan.id;
                        const Icon = plan.icon;
                        return (
                            <button
                                key={plan.id}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                onClick={() => setSelectedId(plan.id)}
                                className={cn(
                                    "flex h-full flex-col rounded-2xl border border-border-light bg-card p-5 text-left shadow-sm transition-all md:p-6",
                                    plan.surface === "white" ? "bg-card" : "bg-[#eef2fb]",
                                    selected
                                        ? "border-brand-red ring-2 ring-brand-red/25"
                                        : "hover:border-neutral-300",
                                )}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-red text-white shadow-sm">
                                        <Icon className="size-5" strokeWidth={2} aria-hidden />
                                    </div>
                                    <div className="flex flex-1 items-start justify-end gap-3">
                                        <p className="text-2xl font-bold leading-none tracking-tight text-slate-900 md:text-[26px]">
                                            ₦{plan.amount}
                                        </p>
                                        <TierRadio selected={selected} />
                                    </div>
                                </div>

                                <div className="mt-5 flex-1 space-y-2">
                                    <h2 className="text-xl font-bold text-slate-900 font-manrope md:text-2xl">{plan.title}</h2>
                                    <p className="text-sm leading-relaxed text-slate-600">{plan.description}</p>
                                </div>

                                <div className="mt-5 space-y-2 border-t border-border-light pt-4">
                                    {plan.perkStyle === "badge" ? (
                                        plan.perks.map((perk) => (
                                            <p
                                                key={perk}
                                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-vendor-header"
                                            >
                                                <Check className="size-4 shrink-0 text-vendor-header" strokeWidth={2.5} aria-hidden />
                                                {perk}
                                            </p>
                                        ))
                                    ) : (
                                        plan.perks.map((perk) => (
                                            <p
                                                key={perk}
                                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground"
                                            >
                                                <Check className="size-3.5 shrink-0 text-foreground" strokeWidth={3} aria-hidden />
                                                {perk}
                                            </p>
                                        ))
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="flex lg:items-stretch lg:gap-6">

                    <Card className="col-span-8 overflow-hidden rounded-2xl border border-slate-200/70 bg-[#F8FAFF] shadow-sm ">
                        <CardContent className="flex h-full min-h-0 flex-col gap-8 p-8 md:flex-row md:items-center md:gap-10 lg:p-10">
                            <div className="min-w-0 flex-1">
                                <h3 className="text-xl font-bold leading-tight text-[#0a1628] font-manrope md:text-2xl">
                                    Why verify your identity?
                                </h3>
                                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                                    <li className="flex gap-3.5">
                                        <ShieldCheck className="mt-0.5 size-[22px] shrink-0 text-brand-red" strokeWidth={2} aria-hidden />
                                        <span>
                                            <span className="font-semibold text-[#0a1628]">Consumer Confidence:</span>{" "}
                                            Verified vendors see a 40% increase in first-time customer conversions.
                                        </span>
                                    </li>
                                    <li className="flex gap-3.5">
                                        <Lock className="mt-0.5 size-[22px] shrink-0 text-brand-red" strokeWidth={2} aria-hidden />
                                        <span>
                                            <span className="font-semibold text-[#0a1628]">Enhanced Security:</span>{" "}
                                            Protect your account against unauthorized access and identity theft.
                                        </span>
                                    </li>
                                    <li className="flex gap-3.5">
                                        <CreditCard className="mt-0.5 size-[22px] shrink-0 text-brand-red" strokeWidth={2} aria-hidden />
                                        <span>
                                            <span className="font-semibold text-[#0a1628]">Higher Limits:</span>{" "}
                                            Increase your daily transaction volume and withdrawal caps.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="mx-auto shrink-0 self-center md:mx-0">
                                <div className="relative h-[168px] w-[132px] overflow-hidden rounded-2xl ring-1 ring-slate-900/5">
                                    <img
                                        src="/src/assets/verify.jpg"
                                        // C:\Users\akhta\Documents\GitHub\olabisiolai_frontend_react\src\assets\verify.jpg
                                        alt=""
                                        width={132}
                                        height={168}
                                        decoding="async"
                                        className=""
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-4 overflow-hidden rounded-2xl border border-slate-800/60 bg-black text-white shadow-md">
                        <CardContent className="w-full flex h-full min-h-[280px] flex-col justify-between gap-10 p-8 lg:p-10">
                            <div className="w-full">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                    Process summary
                                </p>
                                <div className="">
                                <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-[15px]">
                                    Most verifications are completed within{" "}
                                    <span className="font-semibold italic text-brand-red">24 to 48 hours</span> after
                                    submission.
                                </p>
                                </div>
                            </div>

                            <Button
                                type="button"
                                className="h-12 w-full rounded-xl bg-brand-red text-sm font-semibold text-white shadow-sm hover:bg-brand-red/90 active:scale-[0.99]"
                            >
                                Continue
                                <ArrowRight className="size-4" aria-hidden />
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <p className="text-center text-xs text-muted-foreground md:text-sm">
                    Need help choosing the right tier?{" "}
                    <button
                        type="button"
                        className="font-semibold text-brand-red transition-colors hover:text-brand-red/90 hover:underline"
                    >
                        Contact our Vendor Success Team
                    </button>
                </p>
            </div>
        </section>
    );
}
