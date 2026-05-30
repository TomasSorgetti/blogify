import { useParams } from "react-router-dom";
import DashboardLayout from "../../../components/layouts/dashboard-layout";
import ArticleIcon from "../../../components/ui/icons/article-icon";
import { Header } from "../../../components/sections/dashboard/header";
import { StatsDashboard } from "../../../components/sections/dashboard/stats";
import WorkspaceSubNav from "../../../components/sections/dashboard/workspaces/workspace-sub-nav";
import { Eye, TrendingUp, Award } from "lucide-react";
import { useStats } from "../../../hooks/queries/use-stats";
import { useWorkbench } from "../../../hooks/queries/use-workspaces";

export default function WorkspaceAnalyticsPage() {
  const { workbenchId } = useParams<{ workbenchId: string }>();

  const { data: stats, isLoading: loadingStats } = useStats(workbenchId);
  const { data: workbench, isLoading: loadingWorkbench } = useWorkbench(
    workbenchId!,
  );

  const loading = loadingStats || loadingWorkbench;

  const overviewStats = [
    {
      label: "Total Views",
      value: stats?.totalViews || "0",
      change: "+0%",
      icon: Eye,
    },
    {
      label: "API Requests",
      value: stats?.apiRequests || "0",
      change: "+0%",
      icon: TrendingUp,
    },
    {
      label: "Articles",
      value: stats?.articles || "0",
      change: "+0",
      icon: ArticleIcon,
    },
    {
      label: "Engagement Rate",
      value: stats?.engagementRate || "0%",
      change: "+0%",
      icon: Award,
    },
  ];

  return (
    <DashboardLayout>
      <Header
        title="Analytics"
        description={workbench?.name || "Workspace performance and API usage"}
        backHref={`/dashboard/workspaces/${workbenchId}`}
      />

      <WorkspaceSubNav workbenchId={workbenchId!} />

      <div className="p-4 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {overviewStats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-accent/20 ${loading ? "animate-pulse" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </span>
                <stat.icon className="h-5 w-5 text-muted-foreground/60" />
              </div>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-xs text-accent/80 font-medium">
                {stat.change} vs last month
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <StatsDashboard data={stats ?? null} loading={loading} />
        </div>
      </div>
    </DashboardLayout>
  );
}
