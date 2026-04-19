import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, CircleAlert, CreditCard, TextAlignStart, WalletCards, X } from "lucide-react";
import { useState } from "react";

type ModalStep = "none" | "email" | "verify" | "accountType";

export function PaymentHeader() {
        const [modalStep, setModalStep] = useState<ModalStep>("none");
    const [email, setEmail] = useState("");
  return (
    <div>
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-inter">Payout Methods</h1>
        </div>
        <button
          type="button"
          className="text-sm font-inter font-semibold text-brand-red hover:underline cursor-pointer"
          onClick={() => setModalStep("accountType")}
        >
          + Add Payout Method
        </button>
      </header>
      {modalStep !== "none" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <Card className="w-full max-w-md p-5 bg-[#EFF6FF] rounded-xl">
            <CardContent className="w-sm relative space-y-6 ">
              <button
                type="button"
                className="absolute right-4 top-0 rounded-full border p-1 text-muted-foreground"
                onClick={() => setModalStep("none")}
              >
                <X className="size-4" />
              </button>

              {modalStep === "email" ? (
                <>
                  <p className="text-base font-inter font-normal">Email</p>
                  <Input
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-brand-red p-4 h-14"
                  />
                  <Button
                    className="w-full bg-brand-red text-white hover:bg-brand-red/90"
                    onClick={() => setModalStep("verify")}
                  >
                    Continue
                  </Button>
                </>
              ) : null}

              {modalStep === "verify" ? (
                <>
                  <p className="text-center text-2xl font-inter font-semibold">
                    Verify Your Account
                  </p>
                  <p className="text-center text-sm text-muted-foreground">
                    We sent a 4-digit verification code to your email{" "}
                    {email || "example@gmail.com"}.
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 3, 3, 6].map((n, i) => (
                      <div
                        key={`${n}-${i}`}
                        className="rounded-md border bg-muted/30 py-2 text-center text-3xl font-semibold"
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    Didn't receive the code?{" "}
                    <button className="underline">Resend Code</button>
                  </p>
                  <Button
                    className="w-full bg-brand-red text-white hover:bg-brand-red/90"
                    onClick={() => setModalStep("success")}
                  >
                    Continue
                  </Button>
                </>
              ) : null}

              {modalStep === "accountType" ? (
                <>
                  <div className="">
                    <div className="">
                      <p className="text-center font-inter text-4xl font-semibold mb-6">
                        Account Type
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mb-8">
                      <div className="flex gap-2 items-center text-text-white py-2 px-3 bg-brand rounded-md">
                        <CreditCard className="size-4" />
                        <p className="font-inter text-base font-normal">Card</p>
                      </div>
                      <div className="flex gap-2 items-center text-text-white py-2 px-3 bg-[#DDDDDD] rounded-md">
                        <WalletCards className="size-4" />
                        <p className="font-inter text-base font-normal">Pay</p>
                      </div>
                      <div className="flex gap-2 items-center text-text-white py-2 px-3 bg-[#DDDDDD] rounded-md">
                        <TextAlignStart className="size-4 text-brand" />
                        <p className="font-inter text-base font-normal">
                          Paystack
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 rounded-md bg-[#9FD8FF] py-6 px-4 mb-6">
                      <div className="flex gap-4 items-center mb-5">
                        <CreditCard className="text-chat-accent" />
                        <p className="text-sm text-chat-accent font-normal font-inter">
                          Add Credit / Debit Card
                        </p>
                      </div>
                      <Input
                        placeholder=" Card Holder's Name"
                        className="bg-[#F6F6F6] p-4 h-14"
                      />
                      <Input
                        placeholder="Card Number"
                        className="bg-[#F6F6F6] p-4 h-14"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Month"
                          className="bg-[#F6F6F6] p-4 h-14"
                        />
                        <Input
                          placeholder="Year"
                          className="bg-[#F6F6F6] p-4 h-14"
                        />
                        <div className="flex gap-1 items-center">
                          <Input
                            placeholder="Security Code"
                            className="bg-[#F6F6F6] p-4 h-14"
                          />
                          <CircleAlert className="text-chat-accent" />
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-brand-red text-white hover:bg-brand-red/90"
                      onClick={() => setModalStep("email")}
                    >
                      Continue
                    </Button>
                  </div>
                </>
              ) : null}

              {modalStep === "success" ? (
                <>
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="text-center text-2xl font-inter font-semibold mb-2">
                    Account Added Successful!
                  </h3>
                  <p className="text-center text-sm font-inter text-muted-foreground">
                    Your bank account has been linked to your profile. You can
                    now receive payments and manage your transactions
                    seamlessly.
                  </p>
                  <Button
                    className="w-full bg-brand-red text-white hover:bg-brand-red/90"
                    onClick={() => setModalStep("none")}
                  >
                    Close
                  </Button>
                </>
              ) : null}
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
