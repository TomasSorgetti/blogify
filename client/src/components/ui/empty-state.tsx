import { PlusIcon } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <section className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="mt-6 bg-foreground text-background hover:bg-foreground/90"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </section>
  );
}
