import { Shield, Lock, TrendingUp, ShieldCheck, Banknote } from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function WhyVerifySection() {
  const benefits: Benefit[] = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-brand-red" />,
      title: "Consumer Confidence",
      description:
        "Build trust with buyers through verified status and secure transactions",
    },
    {
      icon: <Lock className="h-6 w-6 text-brand-red" />,
      title: "Enhanced Security",
      description:
        "Advanced fraud protection and secure payment processing for verified vendors",
    },
    {
      icon: <Banknote className="h-6 w-6 text-brand-red" />,
      title: "Higher Limits",
      description:
        "Access to increased transaction limits and premium marketplace features",
    },
  ];

  return (
    <div className="rounded-xl border bg-black p-6 shadow-sm">
      <div className="">
        <h2 className="text-xl font-semibold mb-6 text-white">Why verify your identity?</h2>
      </div>

      <div className="flex flex-col gap-1">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white">
              {benefit.icon}
            </div>
            <div className="flex items-center gap-1">
              <h3 className="font-medium text-base text-white">{benefit.title}: </h3>
              <p className="text-sm text-white">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
