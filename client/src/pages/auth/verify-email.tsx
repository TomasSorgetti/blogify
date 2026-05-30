import { Link, useLocation } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import MainLayout from "../../components/layouts/main-layout";
import { Button } from "../../components/ui/button";
import { useEffect, useState, useCallback } from "react";

export default function VerifyEmail() {
  const location = useLocation();
  const { email, expiresIn } = location.state || {
    email: "your email",
    expiresIn: null,
  };

  const [isVerifiedExternally, setIsVerifiedExternally] = useState(() => {
    return localStorage.getItem("email-verified") === "true";
  });

  const calculateTimeLeft = useCallback(() => {
    if (!expiresIn) return null;
    const difference = +new Date(expiresIn) - +new Date();
    if (difference > 0) {
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }
    return "Expired";
  }, [expiresIn]);

  const [timeLeft, setTimeLeft] = useState<string | null>(calculateTimeLeft());

  useEffect(() => {
    if (!expiresIn) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresIn, calculateTimeLeft]);

  useEffect(() => {
    const checkVerification = () => {
      if (localStorage.getItem("email-verified") === "true") {
        setIsVerifiedExternally(true);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "email-verified" && e.newValue === "true") {
        setIsVerifiedExternally(true);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    window.addEventListener("focus", checkVerification);
    document.addEventListener("visibilitychange", checkVerification);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", checkVerification);
      document.removeEventListener("visibilitychange", checkVerification);
    };
  }, []);

  // Dynamic Meta Tags / Title
  useEffect(() => {
    if (isVerifiedExternally) {
      document.title = "✓ Email Verified | Blogify";
      const metaDescription = document.querySelector(
        'meta[name="description"]',
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          "Your email has been successfully verified. You can now close this tab.",
        );
      }
    } else {
      document.title = "Verify Your Email | Blogify";
    }
  }, [isVerifiedExternally]);

  useEffect(() => {
    if (isVerifiedExternally) {
      const timer = setTimeout(() => {
        localStorage.removeItem("email-verified");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVerifiedExternally]);

  return (
    <MainLayout>
      <div className="relative flex min-h-screen items-center justify-center bg-background p-4 sm:p-8 lg:py-20">
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <div className="h-150 w-150 rounded-full bg-accent/5 blur-[150px]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div>
            <div className="p-8 sm:p-10">
              {/* Header Icon */}
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 p-0.5 shadow-lg shadow-accent/5">
                <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-card">
                  {isVerifiedExternally ? (
                    <CheckCircle2 className="h-8 w-8 text-green-500 animate-in zoom-in duration-500" />
                  ) : (
                    <Mail className="h-8 w-8 text-accent" />
                  )}
                </div>
              </div>

              <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground transition-all">
                  {isVerifiedExternally
                    ? "Verification confirmed!"
                    : "Check your email"}
                </h1>
                <p className="mt-3 text-muted-foreground">
                  {isVerifiedExternally
                    ? "Your email has been successfully verified. You can now close this window and continue to sign in."
                    : "We've sent a temporary verification link to:"}
                </p>
                {!isVerifiedExternally && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-foreground border border-border/50">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    {email}
                  </div>
                )}
              </div>

              {isVerifiedExternally ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex gap-4 rounded-xl border border-green-500/20 bg-green-500/5 p-4 items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Account Secured
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Your workspace is ready. You can safely close this tab.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="group flex gap-4 rounded-xl border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50 min-h-20 items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Secure Verification
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Only you can activate using the unique link.
                      </p>
                    </div>
                  </div>

                  <div className="group flex gap-4 rounded-xl border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50 min-h-20 items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground">
                          Token Expiration
                        </h3>
                        <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">
                          {timeLeft || "--:--"}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        The link expires shortly for security reasons.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-10 space-y-4">
                <Link to="/auth/signin" className="block">
                  <Button
                    className={`w-full py-6 text-base font-bold shadow-xl transition-all active:scale-[0.98] ${
                      isVerifiedExternally
                        ? "bg-green-600 text-background hover:bg-green-700 hover:text-foreground shadow-green-500/10"
                        : "bg-foreground text-background hover:bg-foreground/90 shadow-foreground/5"
                    }`}
                  >
                    {isVerifiedExternally
                      ? "Continue to Sign In"
                      : "I've verified my email"}
                  </Button>
                </Link>

                {!isVerifiedExternally && (
                  <div className="flex flex-col items-center gap-2 pt-2">
                    <p className="text-xs text-muted-foreground">
                      Didn't receive the email?
                    </p>
                    <button className="text-xs font-bold text-accent hover:underline decoration-2 underline-offset-4 transition-all uppercase tracking-wider cursor-pointer">
                      Resend Verification Email
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-center border-t border-border/50 pt-6">
                <Link
                  to="/auth/register"
                  className="group inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase"
                >
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                  Back to Registration
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3 w-3 text-accent" />
              Check your spam or junk folder if not found.
            </div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
              © 2026 Blogify Content Platforms
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
