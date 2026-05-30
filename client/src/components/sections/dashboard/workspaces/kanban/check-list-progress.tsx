import { cn } from "../../../../../lib/utils/tw-merge";
import type { ChecklistItem } from "../../../../../types/kanban";

export default function ChecklistProgress({
  checklist,
}: {
  checklist: ChecklistItem[];
}) {
  const completed = checklist.filter((item) => item.checked).length;
  const total = checklist.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const requiredMissing = checklist.filter(
    (item) => item.required && !item.checked,
  ).length;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">
          {completed}/{total} tasks
        </span>
        {requiredMissing > 0 ? (
          <span className="font-medium text-destructive">
            {requiredMissing} required
          </span>
        ) : (
          <span className="font-medium text-emerald-400">Ready</span>
        )}
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-secondary/70">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            percentage === 100
              ? "bg-linear-to-r from-emerald-500 to-emerald-400"
              : "bg-linear-to-r from-accent to-cyan-400",
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
