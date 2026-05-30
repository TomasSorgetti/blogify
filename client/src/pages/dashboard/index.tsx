import { useEffect, useMemo } from "react";
import { ArrowUpRightIcon, TrendingUpIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/dashboard-layout";
import { Header } from "../../components/sections/dashboard/header";
import { QuickActions } from "../../components/sections/dashboard/home/quick-actions";
import { UpgradeBanner } from "../../components/sections/dashboard/home/upgrade-banner";
import { WorkspaceList } from "../../components/sections/dashboard/home/workspace-list";
import { StatCard } from "../../components/ui/cards/stat-card";
import SparklesIcon from "../../components/ui/icons/sparkles-icon";
import WorkspaceIcon from "../../components/ui/icons/workspace-icon";
import { useAuthStore } from "../../lib/store/auth";
import { useWorkbenchStore } from "../../lib/store/workbench";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { workbenches, loadWorkbenches } = useWorkbenchStore();

  useEffect(() => {
    loadWorkbenches();
  }, [loadWorkbenches]);

  const displayName = user?.username || "there";
  const currentPlan =
    typeof user?.subscription?.planId === "object"
      ? user.subscription.planId
      : null;

  const stats = useMemo(() => {
    const totalWorkspaces = workbenches.length;
    const archivedWorkspaces = workbenches.filter(
      (workbench) => workbench.isArchived,
    ).length;
    const activeWorkspaces = Math.max(0, totalWorkspaces - archivedWorkspaces);
    const totalArticles = workbenches.reduce(
      (accumulator, workbench) => accumulator + (workbench.articlesCount ?? 0),
      0,
    );

    return { activeWorkspaces, totalArticles };
  }, [workbenches]);

  const hasAiTools = currentPlan?.features?.aiTools ?? false;

  return (
    <DashboardLayout>
      <Header
        title="Dashboard"
        description={`Welcome back, ${displayName}`}
        action={{
          label: "New Workspace",
          onClick: () => navigate("/dashboard/workspaces"),
        }}
      />

      <main className="mx-auto max-w-7xl p-4 lg:p-8">
        <section className="mb-6 rounded-2xl border border-border/70 bg-card/75 p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Overview</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Welcome back, {displayName}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Keep building your content engine. Manage workspaces, monitor
                activity and publish faster with AI support.
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/workspaces")}
              className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-secondary/35 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
            >
              Open workspaces
              <ArrowUpRightIcon className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Active Workspaces"
            value={stats.activeWorkspaces}
            description="Workspaces ready for publishing"
            icon={WorkspaceIcon}
            tone="accent"
          />

          <StatCard
            label="Published Capacity"
            value={stats.totalArticles}
            description="Total articles across your workspaces"
            icon={TrendingUpIcon}
            tone="success"
          />

          <StatCard
            label="AI Tools"
            value={hasAiTools ? "Enabled" : "Locked"}
            description={
              hasAiTools
                ? "Your plan includes AI features"
                : "Upgrade to unlock AI tools"
            }
            icon={SparklesIcon}
            tone={hasAiTools ? "accent" : "warning"}
          />
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <WorkspaceList workbenches={workbenches} />
          </section>

          <aside className="space-y-6">
            <QuickActions />
            <UpgradeBanner />
          </aside>
        </div>
      </main>
    </DashboardLayout>
  );
}
