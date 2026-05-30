import { CheckIcon } from "lucide-react";
import { Button } from "../../ui/button";
import type { IPlan } from "../../../types/plan";

interface PlanCardProps {
  plan: IPlan;
  isCurrent: boolean;
  isAuthenticated: boolean;
  onAction: () => void;
}

export function PlanCard({ plan, isCurrent, isAuthenticated, onAction }: PlanCardProps) {
  const isPro = plan.name.toLowerCase().includes("pro");

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 transition-all hover:shadow-2xl hover:shadow-accent/5 ${
        isPro
          ? "border-accent/50 bg-accent/5 shadow-lg shadow-accent/10 scale-105 z-10"
          : "border-border bg-card"
      }`}
    >
      {isPro && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-accent-foreground uppercase tracking-wider">
          Most popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-5xl font-bold">${plan.price.monthly}</span>
          <span className="ml-1 text-muted-foreground">/mo</span>
        </div>
      </div>

      <ul className="mb-8 flex-1 space-y-4">
        {plan.featureList.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onAction}
        disabled={isCurrent}
        className={`w-full h-12 rounded-xl text-base font-semibold transition-all ${
          isPro
            ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
            : "bg-secondary text-foreground hover:bg-secondary/80"
        }`}
        variant={isPro ? "default" : "outline"}
      >
        {isCurrent
          ? "Current Plan"
          : isAuthenticated
            ? "Upgrade Now"
            : "Get Started"}
      </Button>
    </div>
  );
}
