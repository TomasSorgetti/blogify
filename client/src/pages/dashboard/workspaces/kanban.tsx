import { useNavigate, useParams } from "react-router-dom";
import { cn } from "../../../lib/utils/tw-merge";
import DashboardLayout from "../../../components/layouts/dashboard-layout";
import { Header } from "../../../components/sections/dashboard/header";
import { useWorkbench } from "../../../hooks/queries/use-workspaces";
import WorkspaceSubNav from "../../../components/sections/dashboard/workspaces/workspace-sub-nav";
import { useWorkspacePermissions } from "../../../hooks/use-workspace-permissions";
import { EmptyState } from "../../../components/ui/empty-state";
import WorkspaceIcon from "../../../components/ui/icons/workspace-icon";
import KanbanLegend from "../../../components/sections/dashboard/workspaces/kanban/legend";
import KanbanConnection from "../../../components/sections/dashboard/workspaces/kanban/connection";
import KanbanBoard from "../../../components/sections/dashboard/workspaces/kanban/kanban-board";
import ActivityFeed from "../../../components/sections/dashboard/workspaces/kanban/activity-feed";

import { usePlanLimits } from "../../../hooks/use-plan-limits";
import { LockIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";

export default function WorkspaceKanbanPage() {
  const { workbenchId } = useParams<{ workbenchId: string }>();
  const navigate = useNavigate();
  const { data: workbench } = useWorkbench(workbenchId!);
  const { isMember } = useWorkspacePermissions(workbench);
  const { hasKanban } = usePlanLimits();

  if (!isMember) {
    return (
      <DashboardLayout>
        <Header
          title="Kanban"
          description={workbench?.name || "Workspace kanban"}
          backHref={`/dashboard/workspaces/${workbenchId}`}
        />
        <WorkspaceSubNav workbenchId={workbenchId!} />
        <main className="mx-auto max-w-6xl p-4 lg:p-8">
          <EmptyState
            icon={WorkspaceIcon}
            title="Not a member"
            description="You are not a member of this workspace."
            actionLabel="Go to dashboard"
            onAction={() => navigate("/dashboard")}
          />
        </main>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Header
        title="Kanban"
        description={workbench?.name || "Workspace kanban"}
        backHref={`/dashboard/workspaces/${workbenchId}`}
      />
      <WorkspaceSubNav workbenchId={workbenchId!} />

      <main className="relative p-4 lg:p-8">
        {!hasKanban && (
          <div className="absolute inset-0 z-40 flex items-start justify-center pt-24 px-4 sm:pt-32">
            <div className="sticky top-40 mx-auto max-w-sm w-full rounded-2xl border border-border bg-background/80 p-8 text-center shadow-2xl backdrop-blur-md animate-in fade-in zoom-in duration-500">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20">
                <LockIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Editorial Kanban</h3>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                Unlock the editorial board to manage your content workflow visually across different stages.
              </p>
              <Button 
                onClick={() => navigate("/dashboard/settings/billing")}
                className="w-full bg-accent hover:brightness-110 font-semibold shadow-lg shadow-accent/20"
              >
                Upgrade to Pro
              </Button>
            </div>
          </div>
        )}

        <div className={cn(
          "space-y-4 transition-all duration-700",
          !hasKanban && "pointer-events-none select-none blur-md grayscale opacity-40"
        )}>
          <section className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
            <KanbanConnection workbench={workbench!} />
          </section>

          <section className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
            <KanbanLegend />
          </section>

          <section className="rounded-2xl border border-border/70 bg-card/70 p-3 shadow-sm sm:p-4">
            <KanbanBoard workbenchId={workbenchId!} />
          </section>

          <section className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
            <ActivityFeed workbenchId={workbenchId!} />
          </section>
        </div>
      </main>
    </DashboardLayout>
  );
}
