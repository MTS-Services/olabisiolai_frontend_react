import type { LucideIcon } from "lucide-react";
import { ArrowRight, CircleUserRound, FileText, Lock, ShieldCheck, Store } from "lucide-react";

export type PlanId = "individual" | "business" | "ltd";

export type Plan = {
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

export const plans: Plan[] = [
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

export const whyVerifyItems = [
    {
        title: "Increased Trust",
        description: "Verified vendors receive 3x more inquiries and build lasting customer relationships.",
        icon: ShieldCheck,
    },
    {
        title: "Priority Support",
        description: "Get dedicated assistance with verification, disputes, and account management.",
        icon: ArrowRight,
    },
    {
        title: "Secure Payments",
        description: "Access to Gidira Pay with enhanced fraud protection and instant settlements.",
        icon: Lock,
    },
    {
        title: "Marketplace Access",
        description: "Unlock premium features and visibility across all marketplace categories.",
        icon: Store,
    },
];

export const processSteps = [
    {
        step: "1",
        title: "Select Your Tier",
        description: "Choose the verification plan that matches your business structure.",
    },
    {
        step: "2",
        title: "Submit Documents",
        description: "Upload required documents and complete biometric verification.",
    },
    {
        step: "3",
        title: "Review & Approval",
        description: "Our team reviews your application within 24-48 hours.",
    },
    {
        step: "4",
        title: "Get Verified",
        description: "Receive your verification badge and unlock all marketplace features.",
    },
];
