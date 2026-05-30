import { cn } from "../../lib/utils/tw-merge";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-secondary/20", className)}
      {...props}
    />
  );
}
