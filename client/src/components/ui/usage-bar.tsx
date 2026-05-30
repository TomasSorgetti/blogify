import {
  ArrowUpRightIcon,
  CheckCircle2Icon,
  CrownIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils/tw-merge";

interface UsageBarProps {
  current: number;
  max: number;
  label: string;
  isUnlimited?: boolean;
  onUpgrade?: () => void;
  className?: string;
}

export function UsageBar({
  current,
  max,
  label,
  isUnlimited,
  onUpgrade,
  className,
 }: UsageBarProps) {
  const navigate = useNavigate();
  const safeMax = max > 0 ? max : 1;
  const percentage = isUnlimited
    ? 0
    : Math.min(Math.round((current / safeMax) * 100), 100);
  const isReached = !isUnlimited && current >= max;
  const isNearLimit = !isUnlimited && percentage >= 85 && !isReached;

  const statusLabel = isUnlimited
    ? "Unlimited plan"
    : isReached
      ? "Limit reached"
      : isNearLimit
        ? "Near limit"
        : "Healthy";

  return (
    <aside
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/70 bg-card/75 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-card sm:p-6",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-foreground">{label}</h2>
          <p className="text-sm text-muted-foreground">
            {isUnlimited
              ? `${current} used - No cap`
              : `${current} / ${max} used`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
              isUnlimited && "border-accent/25 bg-accent/10 text-accent",
              isReached &&
                "border-destructive/25 bg-destructive/10 text-destructive",
              isNearLimit &&
                "border-amber-500/25 bg-amber-500/10 text-amber-400",
              !isUnlimited &&
                !isReached &&
                !isNearLimit &&
                "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
            )}
          >
            {isUnlimited ? (
              <CrownIcon className="h-3 w-3" />
            ) : isReached || isNearLimit ? (
              <TriangleAlertIcon className="h-3 w-3" />
            ) : (
              <CheckCircle2Icon className="h-3 w-3" />
            )}
            {statusLabel}
          </span>

          {!isUnlimited && (
            <button
              onClick={
                onUpgrade ||
                (() => navigate("/dashboard/settings/billing"))
              }
              className="inline-flex items-center gap-1 rounded-lg border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/15 hover:text-accent"
            >
              Upgrade
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {!isUnlimited && (
        <div className="relative z-10 mt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">
              Consumption
            </span>
            <span
              className={cn(
                "font-semibold",
                isReached
                  ? "text-destructive"
                  : isNearLimit
                    ? "text-amber-400"
                    : "text-accent",
              )}
            >
              {percentage}%
            </span>
          </div>

          <div
            className="h-2.5 overflow-hidden rounded-full border border-border/60 bg-secondary/45"
            role="progressbar"
            aria-label={`${label} usage`}
            aria-valuemin={0}
            aria-valuemax={safeMax}
            aria-valuenow={Math.min(current, safeMax)}
          >
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                isReached &&
                  "bg-linear-to-r from-destructive to-destructive/70 shadow-[0_0_14px_rgba(239,68,68,0.35)]",
                isNearLimit &&
                  "bg-linear-to-r from-amber-500 to-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.35)]",
                !isReached &&
                  !isNearLimit &&
                  "bg-linear-to-r from-accent to-[#5eead4] shadow-[0_0_14px_rgba(45,212,191,0.35)]",
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </aside>
  );
}
