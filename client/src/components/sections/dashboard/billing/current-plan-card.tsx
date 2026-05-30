import { BadgeCheckIcon, SparklesIcon } from "lucide-react";
import type { IPlan } from "../../../../types/plan";

interface CurrentPlanCardProps {
  plan: IPlan | undefined;
}

function formatLimit(value: number): string {
  return value < 0 ? "Unlimited" : String(value);
}

export function CurrentPlanCard({ plan }: CurrentPlanCardProps) {
  const monthlyPrice = plan?.price?.monthly ?? 0;
  const isFree = monthlyPrice === 0;

  return (
    <section className="overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-sm">
      <div className="border-b border-border/60 bg-secondary/25 px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Current Plan</h2>
          <span className="inline-flex items-center gap-1 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
            <BadgeCheckIcon className="h-3.5 w-3.5" />
            Active
          </span>
        </div>
      </div>

      <div className="space-y-5 px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xl font-semibold">{plan?.name || "No active plan"}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {isFree ? "Free plan" : `$${monthlyPrice}/month`}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/35 px-2.5 py-1 text-xs text-muted-foreground">
            <SparklesIcon className="h-3.5 w-3.5" />
            {plan?.currency?.toUpperCase() || "USD"}
          </span>
        </div>

        {plan && (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm">
              <p className="text-xs text-muted-foreground">Workspaces</p>
              <p className="font-semibold">{formatLimit(plan.features.workbenches)}</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm">
              <p className="text-xs text-muted-foreground">Articles / workspace</p>
              <p className="font-semibold">
                {formatLimit(plan.features.articlesPerWorkbench)}
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm">
              <p className="text-xs text-muted-foreground">Collaborators</p>
              <p className="font-semibold">{formatLimit(plan.features.collaborators)}</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm">
              <p className="text-xs text-muted-foreground">API Keys</p>
              <p className="font-semibold">{formatLimit(plan.features.apiKeys)}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
