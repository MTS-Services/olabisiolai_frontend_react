import { User, Building2, Store, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  button: string;
}

export function VerificationTypeSelector({
  className,
}: {
  className?: string;
}) {
  const verificationTypes: VerificationType[] = [
    {
      id: "individual",
      title: "Individual",
      description:
        "Best for solo entrepreneurs and independent contractors. Requires government ID and personal biometric verification.",
      price: "₦49",
      button: "Trusted Badge",
      icon: <User className={cn('h-6', 'w-6')} />,
    },
    {
      id: "business",
      title: "Business Name",
      description:
        "For registered sole proprietorships. Includes CAC document validation and business account linkage.",
      price: "₦99",
      button: "Vendor Priority",
      icon: <Store className={cn('h-6', 'w-6')} />,
    },
    {
      id: "ltd",
      title: "Limited Company (LTD)",
      description:
        "The gold standard for corporate entities. Comprehensive verification of directors, shareholders, and legal status.",
      price: "₦149",
      button: "Enterprise Blue Badge",
      icon: <Building2 className={cn('h-6', 'w-6')} />,
    },
  ];

  return (
    <div className={className}>
      <div className={cn('bg-white', 'p-4', 'sm:p-6')}>
        <div className={cn('mb-6', 'sm:mb-8')}>
          <h2 className={cn('text-xl', 'sm:text-2xl', 'font-medium', 'font-inter', 'mb-4')}>
            Choose Verification Type
          </h2>
          <p className={cn('text-sm', 'text-muted-foreground')}>
            TO unlock full marketplace capabilities and build trust with buyers,
            please select the identity verification tier that matches your
            Structure.
          </p>
        </div>
        <div className={cn('grid', 'gap-4', 'sm:gap-6', 'sm:grid-cols-2', 'xxl:grid-cols-3')}>
          {verificationTypes.map((type) => (
            <div
              key={type.id}
              className={cn('relative', 'rounded-xl', 'border', 'bg-[#d3e4fe]', 'p-4', 'sm:p-6', 'shadow-sm', 'hover:shadow-md', 'transition-shadow', 'cursor-pointer')}
            >
              <div className={cn('flex', 'items-center', 'justify-center', 'mb-4')}>
                <div className={cn('rounded-lg', 'bg-white', 'p-3', 'text-brand-red')}>
                  {type.icon}
                </div>
              </div>

              <h3 className={cn('text-xl', 'sm:text-2xl', 'font-semibold', 'mb-2', 'text-center')}>
                {type.title}
              </h3>
              <div className={cn('mt-8', 'sm:mt-10', 'mb-4', 'sm:mb-5')}>
                <p className={cn('text-xl', 'sm:text-2xl', 'font-semibold', 'text-center')}>
                  {type.price}
                </p>
              </div>
              <p className={cn('text-sm', 'sm:text-base', 'font-normal', 'text-muted-foreground', 'mb-4', 'text-center')}>
                {type.description}
              </p>

              <button className={cn('flex', 'items-center', 'justify-center', 'mx-auto', 'gap-2', 'w-full', 'sm:w-fit', 'mt-4', 'bg-[#FEE2E2]', 'text-brand-red', 'px-4', 'py-2', 'rounded-full', 'font-medium', 'hover:bg-brand-red/20', 'transition-colors')}>
                <Check className={cn('h-4', 'w-4', 'bg-brand-red', 'text-white', 'rounded-full', 'p-0.5')} />
                {type.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
