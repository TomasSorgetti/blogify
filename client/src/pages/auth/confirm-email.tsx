import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { VerifyEmail as verifyEmailService } from "../../lib/services/auth";
import MainLayout from "../../components/layouts/main-layout";
import { Button } from "../../components/ui/button";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let isMounted = true;

    const verify = async () => {
      if (!token) {
        if (isMounted) setStatus("error");
        return;
      }

      try {
        const { data, error } = await verifyEmailService(token);
        if (isMounted) {
          if (error || !data?.success) {
            setStatus("error");
          } else {
            localStorage.setItem("email-verified", "true");
            setStatus("success");
          }
        }
      } catch (err) {
        console.error("Verification failed:", err);
        if (isMounted) setStatus("error");
      }
    };

    verify();

    return () => {
      isMounted = false;
    };
  }, [token]);

  // Dynamic Meta Tags / Title
  useEffect(() => {
    switch (status) {
      case "verifying":
        document.title = "Verifying... | Blogify";
        break;
      case "success":
        document.title = "✓ Verification Successful | Blogify";
        break;
      case "error":
        document.title = "✕ Verification Failed | Blogify";
        break;
    }
  }, [status]);

  useEffect(() => {
    let timer: number;
    if (status === "success") {
      if (countdown > 0) {
        timer = window.setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        navigate("/auth/signin");
      }
    }

    return () => clearInterval(timer);
  }, [status, countdown, navigate]);

  return (
    <MainLayout>
      <div className="relative flex min-h-screen items-center justify-center bg-background p-4 sm:p-8">
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <div className="h-150 w-150 rounded-full bg-accent/5 blur-[150px]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-accent/5">
            <div className="p-8 sm:p-10">
              {status === "verifying" && (
                <div className="flex flex-col items-center text-center py-4">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Verifying your email...
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Please wait while we secure your account.
                  </p>
                </div>
              )}

              {status === "success" && (
                <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 shadow-lg shadow-green-500/5">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Email verified!
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your account is now active and ready to use.
                  </p>

                  <div className="mt-8 overflow-hidden rounded-xl border border-border/50 bg-secondary/30 p-4 w-full">
                    <p className="text-sm font-medium text-foreground">
                      Redirecting you to sign in...
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <span className="text-2xl font-bold text-accent">
                        {countdown}
                      </span>
                      <span className="text-xs text-muted-foreground uppercase tracking-widest">
                        seconds left
                      </span>
                    </div>
                  </div>

                  <Link to="/auth/signin" className="mt-10 w-full">
                    <Button className="w-full bg-foreground text-background hover:bg-foreground/90 py-6 font-bold shadow-xl shadow-foreground/5 transition-all active:scale-[0.98]">
                      Go to Sign In now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}

              {status === "error" && (
                <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 shadow-lg shadow-red-500/5">
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Verification failed
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The link is invalid or has already expired.
                  </p>

                  <div className="mt-8 space-y-4 w-full">
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-left text-xs text-muted-foreground">
                      <p className="flex gap-3">
                        <ShieldCheck className="h-4 w-4 shrink-0 text-red-500" />
                        <span>
                          Try registering again or requesting a new verification
                          link.
                        </span>
                      </p>
                    </div>

                    <Link to="/auth/register" className="block">
                      <Button className="w-full" variant="outline">
                        Back to Registration
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="mt-10 border-t border-border/50 pt-8 text-center">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
                  © 2026 Blogify Content Platforms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
