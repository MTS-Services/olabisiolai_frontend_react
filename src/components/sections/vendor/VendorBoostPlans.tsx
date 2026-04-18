import { useMemo, useState } from "react";
import { BadgeCheck, CircleCheck, Gem, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Plan = {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    duration: string;
    features: string[];
    cta: string;
    icon: React.ComponentType<{ className?: string }>;
    highlighted?: boolean;
    tone?: "default" | "soft";
};

const oneTimePlans: Plan[] = [
    {
        id: "basic",
        title: "Basic Boost",
        subtitle: "Perfect for short-term visibility",
        price: "2,000",
        duration: "1 week",
        features: ["Top 10 placement", "Search highlighting", "Priority support"],
        cta: "Select Basic",
        icon: Zap,
    },
    {
        id: "pro",
        title: "Pro Boost",
        subtitle: "Balanced reach for active vendors",
        price: "5,000",
        duration: "2 weeks",
        features: ["Top 10 placement", "Search highlighting", "Priority support"],
        cta: "Get Started with Pro",
        icon: Sparkles,
        highlighted: true,
    },
    {
        id: "premium",
        title: "Premium Boost",
        subtitle: "The ultimate visibility package",
        price: "12,000",
        duration: "1 month",
        features: ["Top 10 placement", "Search highlighting", "Priority support"],
        cta: "Go Premium",
        icon: Gem,
        tone: "soft",
    },
];

const subscriptionPlans: Plan[] = [
    {
        id: "starter-sub",
        title: "Starter Subscription",
        subtitle: "Consistent weekly exposure",
        price: "6,000",
        duration: "monthly",
        features: ["Weekly boost slots", "Search highlighting", "Email support"],
        cta: "Start Starter Plan",
        icon: Zap,
    },
    {
        id: "growth-sub",
        title: "Growth Subscription",
        subtitle: "For growing vendor storefronts",
        price: "15,000",
        duration: "monthly",
        features: ["Priority placement", "Boost scheduling", "Priority support"],
        cta: "Choose Growth",
        icon: Sparkles,
        highlighted: true,
    },
    {
        id: "elite-sub",
        title: "Elite Subscription",
        subtitle: "Maximum reach and premium placement",
        price: "30,000",
        duration: "monthly",
        features: ["Premium boost slots", "Featured badge", "Dedicated manager"],
        cta: "Go Elite",
        icon: Gem,
        tone: "soft",
    },
];

const benefitItems = [
    {
        title: "2.4x Views",
        description: "Average increase in store visibility with Pro Boost",
        icon: TrendingUp,
    },
    {
        title: "New Audience",
        description: "Reach customers who would not normally find you",
        icon: Users,
    },
    {
        title: "Instant Start",
        description: "Your boost goes live within minutes of purchase",
        icon: Zap,
    },
    {
        title: "Verified Badge",
        description: "Gain immediate trust with the featured seller badge",
        icon: BadgeCheck,
    },
];

function PlanCard({ plan }: { plan: Plan }) {
    const navigate = useNavigate();
    return (
        <Card
            className={cn(
                "relative overflow-hidden border-border/60",
                plan.tone === "soft" && "bg-slate-50",
                plan.highlighted && "border-brand-red/50",
            )}
        >
            {plan.highlighted ? (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-md bg-brand-red px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most Popular
                </div>
            ) : null}
            <CardContent className="space-y-4 p-8">
                <div className={cn("inline-flex rounded-lg p-2", plan.highlighted ? "bg-brand-red text-white" : "bg-muted text-brand-red")}>
                    <plan.icon className="size-5" />
                </div>

                <div>
                    <p className="text-2xl font-bold font-manrope">{plan.title}</p>
                    <p className="mt-1 text-sm font-inter font-medium text-muted-foreground">{plan.subtitle}</p>
                </div>

                <p className="text-5xl font-bold leading-none tracking-tight">
                    ₦{plan.price}
                    <span className="ml-1 text-sm font-medium text-muted-foreground">/ {plan.duration}</span>
                </p>

                <div className="space-y-2">
                    {plan.features.map((feature) => (
                        <p key={feature} className="flex items-center gap-3 text-sm font-inter font-medium text-foreground">
                            <CircleCheck className="size-5 text-brand-red" />
                            {feature}
                        </p>
                    ))}
                </div>

                <Button
                    onClick={() => navigate(`/vendor/boost/configure?plan=${plan.id}`)} // 👈 add this
                    variant={plan.highlighted ? "default" : "outline"}
                    className={cn(
                        "mt-2 w-full py-6 text-base font-inter font-semibold",
                        plan.highlighted && "bg-brand-red text-white hover:bg-brand-red/90",
                        plan.tone === "soft" &&
                        !plan.highlighted &&
                        "bg-blue-100 text-foreground hover:bg-blue-100/80 py-6 text-base font-inter font-semibold",
                    )}
                >
                    {plan.cta}
                </Button>
            </CardContent>
        </Card>
    );
}

export function VendorBoostPlans() {
    const [mode, setMode] = useState<"one-time" | "subscription">("one-time");
    const plans = useMemo(() => (mode === "one-time" ? oneTimePlans : subscriptionPlans), [mode]);
    const navigate = useNavigate();

    return (
        <section className="space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-4xl font-extrabold font-manrope tracking-tight text-foreground mb-4">Boost Your Business Visibility</h2>
                    <p className="max-w-2xl text-xl font-inter font-medium text-muted-foreground">
                        Choose a plan to reach more customers in your area and grow your sales volume.
                    </p>
                </div>
                <div className="inline-flex rounded-2xl border bg-background p-1">
                    <button
                        type="button"
                        onClick={() => setMode("one-time")}
                        className={cn(
                            "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                            mode === "one-time" ? "bg-muted text-foreground" : "text-muted-foreground",
                        )}
                    >
                        One-time Boost
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("subscription")}
                        className={cn(
                            "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                            mode === "subscription" ? "bg-muted text-foreground" : "text-muted-foreground",
                        )}
                    >
                        Subscription
                    </button>
                </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-3">
                {plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} />
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {benefitItems.map((item) => (
                    <Card key={item.title}>
                        <CardContent className="space-y-2 p-4 text-center">
                            <item.icon className="mx-auto size-5 text-brand-red" />
                            <p className="text-lg font-inter font-semibold text-foreground">{item.title}</p>
                            <p className="text-center text-xs font-inter text-muted-foreground max-w-[150px] mx-auto ">
                                {item.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}

