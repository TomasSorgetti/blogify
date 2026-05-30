import { Skeleton } from "../../../ui/skeleton";

export function WorkbenchCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <Skeleton className="h-6 w-6 rounded" />
      </div>
      <Skeleton className="mt-4 h-5 w-3/4 rounded" />
      <Skeleton className="mt-2 h-4 w-full rounded" />
      <Skeleton className="mt-1 h-4 w-2/3 rounded" />
      <Skeleton className="mt-4 h-4 w-1/3 rounded" />
    </div>
  );
}
