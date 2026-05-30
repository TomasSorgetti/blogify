import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layouts/main-layout";
import ArticleIcon from "../../components/ui/icons/article-icon";
import KeyIcon from "../../components/ui/icons/key-icon";
import SparklesIcon from "../../components/ui/icons/sparkles-icon";
import WorkspaceIcon from "../../components/ui/icons/workspace-icon";
import { useState } from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

const steps = [
  {
    icon: ArticleIcon,
    title: "Create your first article",
    description: "Write and publish content with our powerful editor",
  },
  {
    icon: WorkspaceIcon,
    title: "Organize with workspaces",
    description: "Group articles by project, team, or topic",
  },
  {
    icon: SparklesIcon,
    title: "Enhance with AI",
    description: "Use AI to generate drafts, improve writing, and optimize SEO",
  },
  {
    icon: KeyIcon,
    title: "Connect with API",
    description: "Access your content programmatically from anywhere",
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  }

  function handleSkip() {
    navigate("/dashboard");
  }

  return (
    <MainLayout>
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-150 w-150 rounded-full bg-accent/5 blur-[150px]" />
        </div>
        <div className="relative w-full max-w-md">
          <div className="w-full max-w-xl">
            <div className="mb-8 flex items-center justify-center">Blogify</div>

            <div className="mb-8 flex items-center justify-center gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-8 rounded-full transition-colors ${
                    i <= currentStep ? "bg-foreground" : "bg-secondary"
                  }`}
                />
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                {(() => {
                  const Icon = steps[currentStep].icon;
                  return <Icon className="h-8 w-8 text-accent" />;
                })()}
              </div>
              <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
              <p className="mt-2 text-muted-foreground">
                {steps[currentStep].description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="order-2 sm:order-1 bg-transparent"
                >
                  Skip tour
                </Button>
                <Button
                  onClick={handleNext}
                  className="order-1 bg-foreground text-background hover:bg-foreground/90 sm:order-2"
                >
                  {currentStep < steps.length - 1 ? "Next" : "Go to dashboard"}
                </Button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className={`flex flex-col items-center rounded-lg p-3 text-center ${
                    i <= currentStep ? "bg-secondary" : ""
                  }`}
                >
                  <div
                    className={`mb-2 ${
                      i <= currentStep ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {i < currentStep ? (
                      <CheckIcon className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {step.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
