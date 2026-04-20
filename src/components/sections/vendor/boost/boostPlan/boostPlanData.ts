import { BadgeCheck, Gem, Sparkles, TrendingUp, Users, Zap } from "lucide-react";

export type Plan = {
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

export const oneTimePlans: Plan[] = [
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

export const subscriptionPlans: Plan[] = [
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

export const benefitItems = [
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
