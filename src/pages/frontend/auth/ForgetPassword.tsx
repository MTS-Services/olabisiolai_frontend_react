import {  Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  return (
    <div>
      {" "}
      <div className="min-h-screen flex items-center justify-center bg-auth-bg p-4">
        <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-inter font-semibold text-foreground mb-2">
                Forget Password
              </h2>
              <p className="text-base font-inter font-normal text-muted-foreground text-center">
                Enter the email address or mobile phone number associated with
                your account.
              </p>
            </div>

            {/* Email Login Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email/phone
                </label>
                <Input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div className="my-7">
                <Button
                  asChild
                  type="button"
                  variant="default"
                  className="flex justify-center w-full h-11 rounded-lg bg-brand px-6 text-base font-medium text-ice shadow-none hover:bg-brand/90"
                >
                  <Link
                    to="/otp-verification"
                    className="inline-flex items-center gap-2 bg-brand"
                  >
                    Send Code
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="flex items-center gap-2 mb-2">
              <p className="text-base font-inter font-normal text-muted-foreground">
                Already have account?
              </p>
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <p className="text-base font-inter font-normal text-muted-foreground">
                Don't have an account?
              </p>
              <Link to="/signup" className="text-primary hover:underline">
                Sign Up
              </Link>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm"></div>
            </div>

            <div className="">
              <p className="text-base font-inter font-normal text-muted-foreground">You may contact <Link to="#" className="text-lg text-brand-red">Customer Service</Link> for help restoring access to your account.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
