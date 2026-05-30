import { Loader2Icon } from "lucide-react";
import MainLayout from "../components/layouts/main-layout";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/store/auth";
import { usePlanStore } from "../lib/store/plans";
import { useEffect } from "react";
import { PlanCard } from "../components/sections/pricing/plan-card";
import { FeatureComparison } from "../components/sections/pricing/feature-comparison";
import { FAQSection } from "../components/sections/pricing/pricing-faq";
import Badge from "../components/ui/badge";

export default function PricingPage() {
  const { isAuthenticated, user } = useAuthStore();
  const { plans, loading, fetchPlans } = usePlanStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const currentPlanId =
    typeof user?.subscription?.planId === "object"
      ? user?.subscription?.planId?._id
      : user?.subscription?.planId;

  const handleAction = () => {
    if (!isAuthenticated) {
      navigate("/signup");
      return;
    }
    navigate("/dashboard/settings/billing");
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-screen items-center justify-center">
          <Loader2Icon className="h-12 w-12 animate-spin text-accent" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 my-20 lg:my-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="accent" className="mb-6">
            Pricing Plans
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/60">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {[...plans]
            .sort((a, b) => a.price.monthly - b.price.monthly)
            .map((plan) => (
              <PlanCard
                key={plan._id}
                plan={plan}
                isCurrent={plan._id === currentPlanId}
                isAuthenticated={isAuthenticated}
                onAction={handleAction}
              />
            ))}
        </div>

        <FeatureComparison />
        <FAQSection />
      </div>
    </MainLayout>
  );
}
