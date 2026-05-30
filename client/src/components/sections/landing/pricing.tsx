import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2Icon } from "lucide-react";
import PricingCard from "../../ui/cards/pricing-card";
import { useEffect, useState } from "react";
import { usePlanStore } from "../../../lib/store/plans";
import { useAuthStore } from "../../../lib/store/auth";
import type { IPlan } from "../../../types/plan";

export function PricingPreview() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { plans, loading, fetchPlans } = usePlanStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const getPrice = (plan: IPlan) => {
    return isAnnual ? plan.price.yearly : plan.price.monthly;
  };

  const getSavings = (plan: IPlan) => {
    if (plan.price.monthly === 0) return 0;
    const monthlyCost = plan.price.monthly * 12;
    const annualCost = plan.price.yearly;
    return Math.round(((monthlyCost - annualCost) / monthlyCost) * 100);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2Icon className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <section className="border-t border-border py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free, scale as you grow. No hidden fees.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span
              className={`text-sm ${!isAnnual ? "font-semibold text-foreground" : "text-muted-foreground"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                isAnnual ? "bg-accent" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-background transition-transform ${
                  isAnnual ? "translate-x-9" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm ${isAnnual ? "font-semibold text-foreground" : "text-muted-foreground"}`}
            >
              Annual
            </span>
            {isAnnual && (
              <span className="ml-2 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                Save up to 20%
              </span>
            )}
          </div>
        </div>

        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {[...plans]
            .sort((a, b) => a.price.monthly - b.price.monthly)
            .map((plan) => {
            const price = getPrice(plan);
            const savings = getSavings(plan);
            const variant = plan.name.toLowerCase().includes("free") 
              ? "free" 
              : plan.name.toLowerCase().includes("pro") 
                ? "pro" 
                : "premium";

            return (
              <li key={plan._id}>
                <PricingCard
                  price={price}
                  savings={savings}
                  isAnnual={isAnnual}
                  name={plan.name}
                  description={plan.name === "Free Plan" ? "Perfect for getting started" : "For growing content teams"}
                  features={plan.featureList}
                  popular={variant === "pro"}
                  variant={variant}
                  monthlyPrice={plan.price.monthly}
                  annualPrice={plan.price.yearly}
                  registered={isAuthenticated}
                  onAction={() => {
                    if (isAuthenticated) {
                      navigate("/dashboard/settings/billing");
                    } else {
                      navigate("/signup");
                    }
                  }}
                />
              </li>
            );
          })}
        </ul>

        <div className="mt-12 text-center">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            View full pricing details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
