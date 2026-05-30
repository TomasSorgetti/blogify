import { RefreshCwIcon, SettingsIcon, UserPlusIcon } from "lucide-react";
import type { IWorkbench } from "../../../../../types/workbench";
import { Button } from "../../../../ui/button";

export default function KanbanConnection({
  workbench,
}: {
  workbench: IWorkbench;
}) {
  const members = workbench?.members ?? [];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live collaboration active
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <RefreshCwIcon className="h-4 w-4" />
            Sync
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <SettingsIcon className="h-4 w-4" />
            Board settings
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-secondary/25 p-3">
        <div>
          <p className="text-sm font-medium">Team presence</p>
          <p className="text-xs text-muted-foreground">
            {members.length} collaborator{members.length === 1 ? "" : "s"} on this board
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {members.slice(0, 5).map((member) => {
              const memberUser =
                typeof member.userId === "string"
                  ? {
                      _id: member.userId,
                      username: "Unknown",
                      avatar: "",
                    }
                  : member.userId;

              return (
                <img
                  key={member._id}
                  src={
                    memberUser.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${memberUser.username}`
                  }
                  alt={memberUser.username}
                  className="h-8 w-8 rounded-full border-2 border-background object-cover"
                />
              );
            })}

            {members.length > 5 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-semibold text-muted-foreground">
                +{members.length - 5}
              </div>
            )}
          </div>

          <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent">
            <UserPlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
