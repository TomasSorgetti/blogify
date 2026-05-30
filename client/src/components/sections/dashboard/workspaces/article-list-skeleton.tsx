import { Skeleton } from "../../../ui/skeleton";

export function ArticleListItemSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/5 rounded bg-secondary" />
        <div className="flex gap-3">
          <Skeleton className="h-4 w-16 rounded-full bg-secondary" />
          <Skeleton className="h-4 w-24 rounded bg-secondary" />
        </div>
      </div>
      <div className="flex gap-1">
        <Skeleton className="h-8 w-8 rounded-lg bg-secondary" />
        <Skeleton className="h-8 w-8 rounded-lg bg-secondary" />
      </div>
    </div>
  );
}

export function ArticleListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleListItemSkeleton key={i} />
      ))}
    </div>
  );
}
