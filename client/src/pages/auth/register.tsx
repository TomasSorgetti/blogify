import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import MainLayout from "../../components/layouts/main-layout";
import { useRegisterForm } from "../../hooks/use-register-form";
import {
  AccountStep,
  BenefitsList,
  StepIndicator,
  WorkspaceStep,
} from "../../components/sections/auth/register-steps";

const benefits = [
  "Free plan with 3 articles",
  "No credit card required",
  "AI-powered writing tools",
  "Collaborative workspaces",
];

export default function RegisterPage() {
  const {
    step,
    formData,
    loading,
    error,
    updateForm,
    updatePreferences,
    prevStep,
    submitForm,
    nextStep,
  } = useRegisterForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      nextStep();
    } else {
      submitForm();
    }
  };

  return (
    <MainLayout>
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-150 w-150 rounded-full bg-accent/5 blur-[150px]" />
        </div>
        <div className="relative w-full max-w-md">
          <div className="rounded-xl border border-border bg-card p-8">
            <div className="mb-8 text-center">
              <Link to="/" className="mb-4 inline-flex items-center gap-2">
                Blogify
              </Link>
              <h1 className="text-2xl font-bold">Create your account</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {step === 1
                  ? "Start your free account today"
                  : "Set up your workspace"}
              </p>
            </div>

            <StepIndicator currentStep={step} />

            {error && (
              <div className="mb-4 rounded-md border border-red-500 bg-red-500/10 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <AccountStep formData={formData} updateForm={updateForm} />
              ) : (
                <WorkspaceStep
                  formData={formData}
                  updateForm={updateForm}
                  updatePreferences={updatePreferences}
                />
              )}

              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full bg-foreground text-background hover:bg-foreground/90 py-6"
                  disabled={loading}
                >
                  {loading
                    ? "Creating account..."
                    : step === 1
                      ? "Continue"
                      : "Create account"}
                </Button>

                {step === 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={loading}
                    className="w-full"
                  >
                    Back
                  </Button>
                )}
              </div>
            </form>

            {step === 1 && <BenefitsList benefits={benefits} />}

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/auth/signin"
                className="font-medium text-foreground hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
