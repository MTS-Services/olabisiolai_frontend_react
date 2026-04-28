import { useState } from "react";
import { User, Building2, Store, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  button: string;
  buttonVariant: "pink" | "blue";
  cardBg: string;
  iconBg: string;
}

export function VerificationTypeSelector({
  className,
}: {
  className?: string;
}) {
  const [selected, setSelected] = useState<string>("individual");

  const verificationTypes: VerificationType[] = [
    {
      id: "individual",
      title: "Individual",
      description:
        "Best for solo entrepreneurs and independent contractors. Requires government ID and personal biometric verification.",
      price: "₦2,500",
      button: "TRUSTED BADGE",
      buttonVariant: "pink",
      cardBg: "bg-[#DDEAFE]",
      iconBg: "bg-white",
      icon: <User className={cn('h-6', 'w-6', 'text-red-600')} />,
    },
    {
      id: "business",
      title: "Business Name",
      description:
        "For registered sole proprietorships. Includes CAC document validation and business account linkage.",
      price: "₦5,000",
      button: "VENDOR PRIORITY",
      buttonVariant: "blue",
      cardBg: "bg-[#FDF2F2]",
      iconBg: "bg-[#FEE2E2]",
      icon: <Store className={cn('h-6', 'w-6', 'text-red-600')} />,
    },
    {
      id: "ltd",
      title: "Limited Company (LTD)",
      description:
        "The gold standard for corporate entities. Comprehensive verification of directors, shareholders, and legal status.",
      price: "₦10,000",
      button: "ENTERPRISE BLUE BADGE",
      buttonVariant: "blue",
      cardBg: "bg-[#EFF4FF]",
      iconBg: "bg-[#FEE2E2]",
      icon: <Building2 className={cn('h-6', 'w-6', 'text-red-600')} />,
    },
  ];

  return (
    <div className={className}>
      <div className={cn('bg-white', 'p-4', 'sm:p-6')}>
        {/* Header */}
        <div className={cn('mb-6', 'sm:mb-8')}>
          <h2 className={cn('text-xl', 'sm:text-2xl', 'font-semibold', 'mb-2', 'text-gray-900')}>
            Choose Verification Type
          </h2>
          <p className={cn('text-sm', 'text-gray-500')}>
            TO unlock full marketplace capabilities and build trust with buyers,
            please select the identity verification tier that matches your Structure.
          </p>
        </div>

        {/* Cards Grid */}
        <div className={cn('grid', 'gap-4', 'sm:gap-5', 'sm:grid-cols-3')}>
          {verificationTypes.map((type) => {
            const isSelected = selected === type.id;
            return (
              <div
                key={type.id}
                onClick={() => setSelected(type.id)}
                className={cn(
                  "relative rounded-2xl p-5 sm:p-6 cursor-pointer transition-all duration-200",
                  type.cardBg,
                  isSelected
                    ? "border-2 border-red-500 shadow-sm"
                    : "border border-transparent"
                )}
              >
                {/* Radio indicator — top right, only for selected */}
                <div className={cn('absolute', 'top-3', 'right-3')}>
                  {isSelected ? (
                    <div className={cn('w-5', 'h-5', 'rounded-full', 'border-2', 'border-red-500', 'flex', 'items-center', 'justify-center', 'bg-white')}>
                      <div className={cn('w-2.5', 'h-2.5', 'rounded-full', 'bg-red-500')} />
                    </div>
                  ) : (
                    <div className={cn('w-5', 'h-5', 'rounded-full', 'border-2', 'border-gray-300', 'bg-white')} />
                  )}
                </div>

                {/* Icon */}
                <div className={cn('flex', 'justify-center', 'mb-4')}>
                  <div className={cn("rounded-xl p-3", type.iconBg)}>
                    {type.icon}
                  </div>
                </div>

                {/* Selected card: title → price. Unselected: price → title */}
                {isSelected ? (
                  <>
                    <h3 className={cn('text-lg', 'sm:text-xl', 'font-bold', 'text-gray-900', 'text-center', 'mb-3')}>
                      {type.title}
                    </h3>
                    <p className={cn('text-2xl', 'sm:text-3xl', 'font-bold', 'text-gray-900', 'text-center', 'mb-4')}>
                      {type.price}
                    </p>
                  </>
                ) : (
                  <>
                    <p className={cn('text-2xl', 'sm:text-3xl', 'font-bold', 'text-gray-900', 'text-center', 'mb-2')}>
                      {type.price}
                    </p>
                    <h3 className={cn('text-lg', 'sm:text-xl', 'font-bold', 'text-gray-900', 'text-center', 'mb-3')}>
                      {type.title}
                    </h3>
                  </>
                )}

                {/* Description */}
                <p className={cn('text-sm', 'text-gray-500', 'text-center', 'leading-relaxed', 'mb-5')}>
                  {type.description}
                </p>

                {/* Button */}
                {type.buttonVariant === "pink" ? (
                  <button
                    className={cn(
                      "flex items-center justify-center gap-2 w-full py-2 px-4 rounded-full",
                      "bg-[#FEE2E2] text-red-600 text-xs font-semibold tracking-wide",
                      "hover:bg-red-100 transition-colors"
                    )}
                  >
                    <span className={cn('flex', 'items-center', 'justify-center', 'w-4', 'h-4', 'rounded-full', 'bg-red-500')}>
                      <Check className={cn('h-2.5', 'w-2.5', 'text-white')} />
                    </span>
                    {type.button}
                  </button>
                ) : (
                  <button
                    className={cn(
                      "flex items-center justify-center gap-2 w-full py-2 px-4 rounded-full",
                      "bg-[#93B4F5] text-white text-xs font-semibold tracking-wide",
                      "hover:bg-blue-400 transition-colors"
                    )}
                  >
                    <span className={cn('flex', 'items-center', 'justify-center', 'w-4', 'h-4', 'rounded-full', 'bg-white/30')}>
                      <Check className={cn('h-2.5', 'w-2.5', 'text-white')} />
                    </span>
                    {type.button}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}