import { cn } from "../../../lib/utils/tw-merge";

interface StatCardProps {
  label: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "default" | "accent" | "success" | "warning";
}

const toneStyles: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "border-border/70 bg-card/80",
  accent: "border-accent/25 bg-accent/[0.08]",
  success: "border-emerald-500/25 bg-emerald-500/[0.08]",
  warning: "border-amber-500/25 bg-amber-500/[0.08]",
};

const toneIconStyles: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "text-muted-foreground",
  accent: "text-accent",
  success: "text-emerald-400",
  warning: "text-amber-400",
};

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
  tone = "default",
}: StatCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
        toneStyles[tone],
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-secondary/45">
          <Icon className={cn("h-4 w-4", toneIconStyles[tone])} />
        </span>
      </div>

      <p className="relative z-10 mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="relative z-10 mt-1 text-xs text-muted-foreground">{description}</p>
    </article>
  );
}
