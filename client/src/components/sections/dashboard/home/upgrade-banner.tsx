import { ArrowUpRightIcon, CheckIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import SparklesIcon from "../../../ui/icons/sparkles-icon";

export function UpgradeBanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-accent/25 bg-accent/[0.08] p-4 shadow-sm">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/15 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-accent/15 blur-2xl" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
          <SparklesIcon className="h-3.5 w-3.5" />
          Premium
        </div>

        <h3 className="mt-3 text-base font-semibold">Upgrade your workspace</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Unlock AI tools, unlimited articles and advanced analytics.
        </p>

        <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          <li className="flex items-center gap-2">
            <CheckIcon className="h-3.5 w-3.5 text-accent" />
            Unlimited content scaling
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="h-3.5 w-3.5 text-accent" />
            AI-powered drafting tools
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="h-3.5 w-3.5 text-accent" />
            Deeper performance insights
          </li>
        </ul>

        <Link to="/dashboard/settings/billing" className="mt-4 block">
          <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
            Upgrade now
            <ArrowUpRightIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
