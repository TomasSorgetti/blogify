import { CheckIcon, Loader2Icon } from "lucide-react";
import { Button } from "../../../ui/button";
import type { IPlan } from "../../../../types/plan";

interface PlanSelectionProps {
  plans: IPlan[];
  currentPlanId: string | undefined;
  changingPlanId: string | null;
  onPlanChange: (planId: string) => void;
}

export function PlanSelection({
  plans,
  currentPlanId,
  changingPlanId,
  onPlanChange,
}: PlanSelectionProps) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold">Available Plans</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Compare options and switch the plan that best fits your team.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[...plans]
          .sort((a, b) => a.price.monthly - b.price.monthly)
          .map((plan) => {
            const isCurrent = plan._id === currentPlanId;
            const isChanging = changingPlanId === plan._id;

            return (
              <article
                key={plan._id}
                className={`relative flex h-full flex-col overflow-hidden rounded-xl border p-5 transition-all ${
                  isCurrent
                    ? "border-accent/35 bg-accent/[0.08] ring-1 ring-accent/30"
                    : "border-border/70 bg-card/75 hover:border-accent/25 hover:bg-card"
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <div className="mt-1 flex items-end gap-1">
                      <span className="text-2xl font-bold">${plan.price.monthly}</span>
                      <span className="pb-0.5 text-sm text-muted-foreground">/mo</span>
                    </div>
                  </div>
                  {isCurrent && (
                    <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                      Current
                    </span>
                  )}
                </div>

                <ul className="mb-5 space-y-2.5 text-sm">
                  {plan.featureList.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onPlanChange(plan._id)}
                  disabled={isCurrent || changingPlanId !== null}
                  variant={isCurrent ? "outline" : "default"}
                  className="mt-auto w-full"
                >
                  {isChanging ? (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isCurrent ? "Current plan" : "Switch plan"}
                </Button>
              </article>
            );
          })}
      </div>
    </section>
  );
}
