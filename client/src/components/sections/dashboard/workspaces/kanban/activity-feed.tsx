import { ArrowRightIcon, Clock3Icon, Loader2Icon } from "lucide-react";
import { useWorkbenchActivity } from "../../../../../hooks/queries/use-kanban";
import { formatDistanceToNow } from "date-fns";

export default function ActivityFeed({ workbenchId }: { workbenchId: string }) {
  const { data: activities, isLoading } = useWorkbenchActivity(workbenchId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2Icon className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <header className="flex items-center justify-between">
        <h3 className="font-semibold">Recent Activity</h3>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Clock3Icon className="h-3.5 w-3.5" />
          Live updates
        </span>
      </header>

      <div className="space-y-2">
        {activities?.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No activity yet in this workspace.
          </div>
        ) : (
          activities?.map((activity, index) => (
            <article
              key={activity._id || index}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-secondary/20 p-3"
            >
              <img
                src={activity.userId?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.userId?.username}`}
                alt={activity.userId?.username}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1 text-sm">
                <p className="leading-relaxed">
                  <span className="font-medium">{activity.userId?.username}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>{" "}
                  <span className="font-medium">{activity.details?.articleTitle}</span>
                  {activity.details?.from ? (
                    <span className="ml-1 inline-flex items-center gap-1 text-muted-foreground">
                      <span className="rounded bg-secondary/80 px-1.5 py-0.5 text-[11px] text-foreground capitalize">
                        {activity.details.from}
                      </span>
                      <ArrowRightIcon className="h-3 w-3" />
                      <span className="rounded bg-secondary/80 px-1.5 py-0.5 text-[11px] text-foreground capitalize">
                        {activity.details.to}
                      </span>
                    </span>
                  ) : (
                    activity.details?.detail && <span className="text-muted-foreground"> - {activity.details.detail}</span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                </p>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
