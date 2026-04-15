import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function OTPVerification() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-auth-bg p-4">
        <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-start mb-8">
              <h2 className="text-2xl font-inter font-semibold text-foreground mb-2">
               OTP Verification
              </h2>
              <p className="text-base font-inter font-normal text-muted-foreground text-start">
                Enter the verification code we just sent to your Phone number.
              </p>
            </div>

            {/* OTP Input Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Verification Code
                </label>
                <div className="flex justify-between gap-2 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <Input
                      key={index}
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg font-semibold border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="0"
                    />
                  ))}
                </div>
              </div>

              <div className="my-7">
                <Button
                  asChild
                  type="button"
                  variant="default"
                  className="flex justify-center w-full h-11 rounded-lg bg-brand px-6 text-base font-medium text-ice shadow-none hover:bg-brand/90"
                >
                  <Link
                    to="/reset-password"
                    className="inline-flex items-center gap-2 bg-brand"
                  >
                   Verify
                  </Link>
                </Button>
              </div>
            </div>

            {/* Resend Code */}
            <div className="text-center flex items-center justify-center gap-2 mb-5">
              <p className="text-base font-inter font-normal text-muted-foreground">
                Didn’t receive a code? 
              </p>
              <Link to="#" className="text-primary hover:underline font-medium">
                Resend
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}