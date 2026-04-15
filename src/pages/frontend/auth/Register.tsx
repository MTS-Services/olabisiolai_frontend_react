import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, PoundSterling, SignalZero, WifiZero } from "lucide-react";

export default function Register() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-auth-bg p-4">
        <div className="max-w-2xl w-full bg-card p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-left mb-8">
              <h2 className="text-2xl font-inter font-semibold text-foreground mb-2">
                Welcome to Gidira Marketplace
              </h2>
              <p className="text-sm font-inter text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </div>

            {/* Registration Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-normal text-muted-foreground mb-2">
                    First Name <span className="text-brand-red">*</span>
                  </label>
                  <Input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-normal text-muted-foreground mb-2">
                    Last Name <span className="text-brand-red">*</span>
                  </label>
                  <Input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-normal text-muted-foreground mb-2">
                    Email <span className="text-brand-red">*</span>
                  </label>
                  <Input
                    type="email"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-normal text-muted-foreground mb-2">
                    Phone Number <span className="text-brand-red">*</span>
                  </label>
                  <Input
                    type="tel"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-normal text-muted-foreground mb-2">
                  Password <span className="text-brand-red">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    className="w-full px-3 py-2 pr-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="8+ characters"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-normal text-muted-foreground mb-2">
                  Confirm Password <span className="text-brand-red">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    className="w-full px-3 py-2 pr-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full flex items-center justify-center" >
                  </div>
                  <span>Use 8 or more characters</span>
                </div>
                <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full flex items-center justify-center" >
                  </div>
                  <span>One Uppercase character</span>
                </div>
                <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full flex items-center justify-center" >
                  </div>
                  <span>One lowercase character</span>
                </div>
                <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full flex items-center justify-center" >
                  </div>
                  <span>One special character</span>
                </div>
                <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full flex items-center justify-center" >
                  </div>
                  <span>One number</span>
                </div>
              </div>

              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </div>
            </div>

            {/* Login Link */}
            <div className="flex items-center gap-2 mb-5">
              <p className="text-base font-inter font-normal text-muted-foreground">
                Already have an account?
              </p>
              <Link to="/login/email" className="text-primary hover:underline">
                Login
              </Link>
            </div>
            <div className="my-7">
              <Button
                asChild
                type="button"
                variant="default"
                className="flex justify-center max-w-xs w-full h-11 rounded-lg bg-brand px-6 text-base font-medium text-ice shadow-none hover:bg-brand/90"
              >
                <Link
                  to="#"
                  className="inline-flex items-center gap-2 bg-brand"
                >
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
