import { Skeleton } from "../../../ui/skeleton";

export function ApiKeySkeleton() {
  return (
    <Skeleton className="h-24 w-full rounded-2xl border border-border/50" />
  );
}

export function ApiKeyListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <ApiKeySkeleton key={i} />
      ))}
    </div>
  );
}
