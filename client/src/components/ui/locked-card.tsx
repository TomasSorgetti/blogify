import { ArrowUpRightIcon, LockIcon, SparklesIcon } from "lucide-react";
import { Button } from "./button";
import { Link } from "react-router-dom";

interface LockedCardProps {
  title: string;
  description: string;
  upgradeText?: string;
  className?: string;
}

export function LockedCard({
  title,
  description,
  upgradeText = "Upgrade Plan",
  className = "",
}: LockedCardProps) {
  return (
    <div
      className={`group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/75 p-6 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-xl hover:shadow-accent/10 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/4 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
          <LockIcon className="h-5 w-5" />
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
          <SparklesIcon className="h-3 w-3" />
          Limit
        </span>
      </div>

      <div className="relative z-10 mt-1 flex flex-1 flex-col">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-border/60 bg-secondary/35 px-3 py-2 text-xs text-muted-foreground">
          Upgrade to unlock more workspaces and keep collaborating without
          interruptions.
        </div>

        <Link to="/dashboard/settings/billing" className="mt-6 block">
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {upgradeText}
            <ArrowUpRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
      <div className="pointer-events-none absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
    </div>
  );
}
