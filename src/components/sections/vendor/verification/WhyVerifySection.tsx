import { Card, CardContent } from "@/components/ui/card";
import { whyVerifyItems } from "./verificationData";
import verifyImage from "@/assets/verify.jpg";

export function WhyVerifySection() {
  return (
    <Card className="col-span-8 overflow-hidden rounded-2xl border border-slate-200/70 bg-[#F8FAFF] shadow-sm ">
      <CardContent className="flex h-full min-h-0 flex-col gap-8 p-8 md:flex-row md:items-center md:gap-10 lg:p-10">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold leading-tight text-[#0a1628] font-manrope md:text-2xl">
            Why verify your identity?
          </h3>
          <div className="mt-4">
            {whyVerifyItems.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                  <item.icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0a1628] font-inter">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 font-inter">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative w-full max-w-[280px] shrink-0 overflow-hidden rounded-xl bg-slate-100 md:w-80">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-brand-red/5" />
          <img
            src={verifyImage}
            alt="Verification illustration"
            className="relative h-full w-full object-cover"
          />
        </div>
      </CardContent>
    </Card>
  );
}
