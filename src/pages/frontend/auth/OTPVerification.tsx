import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import { getAuthErrorMessage } from "@/features/auth/errorMessage";
import { resolveAuthRole, saveAuthRole } from "@/features/auth/roleSelection";
import { getAccessToken } from "@/auth/token";
import {
  requestPasswordResetOtp,
  resendRegistrationOtp,
  resolveDashboardPath,
  verifyRegistrationOtp,
} from "@/features/auth/service";
import { type AuthRole } from "@/features/auth/types";

const OTP_LENGTH = 6;

export default function OTPVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setToken, setUser, refreshSession, resetAuthState, authStrategy } = useAuth();

  const [otp, setOtp] = React.useState<string[]>(Array.from({ length: OTP_LENGTH }, () => ""));
  const [loading, setLoading] = React.useState(false);
  const [resending, setResending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [resendMessage, setResendMessage] = React.useState<string | null>(null);

  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

  const purpose = searchParams.get("purpose");
  const email = searchParams.get("email")?.trim() ?? "";
  const role: AuthRole = resolveAuthRole(searchParams.get("role"));

  // Sync the registration token from storage into React auth state so the
  // user appears logged in immediately after registration (without reload).
  // GuestGate's register-OTP bypass ensures this page still renders.
  React.useEffect(() => {
    if (purpose === "register") {
      const storedToken = getAccessToken();
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [purpose, setToken]);

  React.useEffect(() => {
    saveAuthRole(role);
  }, [role]);

  function updateOtpAtIndex(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function onKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const otpCode = otp.join("");
    if (otpCode.length !== OTP_LENGTH) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    // Existing forgot-password flow still uses this screen without register context.
    if (purpose !== "register") {
      navigate("/reset-password", { replace: true });
      return;
    }

    if (!email) {
      setError("Missing email for OTP verification. Please register again.");
      return;
    }

    setLoading(true);
    saveAuthRole(role);

    try {
      const loggedInUser = await verifyRegistrationOtp(
        { email, otp: otpCode },
        { authStrategy, setToken, setUser, refreshSession, resetAuthState },
      );
      navigate(resolveDashboardPath(loggedInUser, role), { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err, "OTP verification failed. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  async function onResend() {
    setError(null);
    setResendMessage(null);

    if (!email) {
      setError("Missing email. Please go back and try again.");
      return;
    }

    setResending(true);
    try {
      if (purpose === "register") {
        await resendRegistrationOtp({ email });
      } else {
        await requestPasswordResetOtp({ email });
      }
      setResendMessage("A new OTP has been sent.");
    } catch (err) {
      setError(getAuthErrorMessage(err, "Unable to resend OTP. Please try again."));
    } finally {
      setResending(false);
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-auth-bg p-4">
        <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            <div className="text-start mb-8">
              <h2 className="text-2xl font-inter font-semibold text-foreground mb-2">
                OTP Verification
              </h2>
              <p className="text-base font-inter font-normal text-muted-foreground text-start">
                Enter the verification code we just sent to your Phone number.
              </p>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Verification Code
                </label>
                <div className="flex justify-between gap-2 mb-6">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(element) => {
                        inputRefs.current[index] = element;
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      value={digit}
                      onChange={(event) => updateOtpAtIndex(index, event.target.value)}
                      onKeyDown={(event) => onKeyDown(index, event)}
                      className="w-12 h-12 text-center text-lg font-semibold border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="0"
                    />
                  ))}
                </div>
              </div>

              {error ? (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              ) : null}
              {resendMessage ? (
                <div className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  {resendMessage}
                </div>
              ) : null}

              <div className="my-7">
                <Button
                  type="submit"
                  variant="default"
                  disabled={loading}
                  className="flex justify-center w-full h-11 rounded-lg bg-brand px-6 text-base font-medium text-ice shadow-none hover:bg-brand/90"
                >
                  {loading ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </form>

            <div className="text-center flex items-center justify-center gap-2 mb-5">
              <p className="text-base font-inter font-normal text-muted-foreground">
                Didn’t receive a code?
              </p>
              <button
                type="button"
                onClick={onResend}
                disabled={resending}
                className="text-primary hover:underline font-medium disabled:opacity-60"
              >
                {resending ? "Resending..." : "Resend"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}