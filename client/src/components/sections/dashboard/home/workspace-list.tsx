import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../../../lib/utils/tw-merge";
import type { IWorkbench } from "../../../../types/workbench";

interface WorkspaceListProps {
  workbenches: IWorkbench[];
}

export function WorkspaceList({ workbenches }: WorkspaceListProps) {
  const visibleWorkspaces = workbenches.slice(0, 6);

  return (
    <section className="overflow-hidden rounded-2xl border border-border/70 bg-card/75 shadow-sm">
      <header className="flex items-center justify-between border-b border-border/60 px-4 py-3 sm:px-5">
        <div>
          <h2 className="font-semibold">Your Workspaces</h2>
          <p className="text-xs text-muted-foreground">
            {workbenches.length} total workspaces
          </p>
        </div>
        <Link
          to="/dashboard/workspaces"
          className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-secondary/35 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/25 hover:text-accent"
        >
          View all
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </header>

      <div className="divide-y divide-border/60">
        {workbenches.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No workspaces yet. Create your first one to get started.
          </div>
        ) : (
          visibleWorkspaces.map((workbench) => {
            const membersCount = workbench.members?.length ?? 0;
            const articlesCount = workbench.articlesCount ?? 0;
            const isArchived = workbench.isArchived;

            const commonClasses = cn(
              "group flex items-center justify-between gap-3 px-4 py-3 transition-colors sm:px-5",
              isArchived 
                ? "cursor-not-allowed opacity-60 grayscale-[0.4]" 
                : "hover:bg-secondary/35"
            );

            const content = (
              <>
                <div className="flex min-w-0 items-center gap-3">
                  <div className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                    isArchived 
                      ? "border-border bg-secondary/50" 
                      : "border-accent/20 bg-accent/10"
                  )}>
                    <span className={cn(
                      "text-sm font-bold",
                      isArchived ? "text-muted-foreground" : "text-accent"
                    )}>
                      {workbench.name[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium">{workbench.name}</p>
                      {isArchived && (
                        <span className="rounded-full bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive border border-destructive/20">
                          Archived
                        </span>
                      )}
                    </div>
                    <p className="line-clamp-1 text-xs text-muted-foreground">
                      {workbench.description || "No description yet."}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span>{articlesCount} articles</span>
                      <span>-</span>
                      <span>{membersCount} members</span>
                    </div>
                  </div>
                </div>

                {!isArchived && (
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                )}
              </>
            );

            if (isArchived) {
              return (
                <div key={workbench._id} className={commonClasses}>
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={workbench._id}
                to={`/dashboard/workspaces/${workbench._id}`}
                className={commonClasses}
              >
                {content}
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
