import { cn } from "../../../../../lib/utils/tw-merge";

export default function PriorityBadge({
  priority,
}: {
  priority: "low" | "medium" | "high";
}) {
  const styles = {
    low: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
    medium: "border-amber-500/25 bg-amber-500/10 text-amber-400",
    high: "border-destructive/25 bg-destructive/10 text-destructive",
  };

  return (
    <span
      className={cn(
        "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        styles[priority],
      )}
    >
      {priority}
    </span>
  );
}
