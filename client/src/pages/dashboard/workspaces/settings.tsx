import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWorkbenchStore } from "../../../lib/store/workbench";
import { MembersPanel } from "../../../components/sections/dashboard/workspaces/members-panel";
import { Header } from "../../../components/sections/dashboard/header";
import WorkspaceSubNav from "../../../components/sections/dashboard/workspaces/workspace-sub-nav";
import DashboardLayout from "../../../components/layouts/dashboard-layout";
import { useWorkspacePermissions } from "../../../hooks/use-workspace-permissions";

export default function WorkbenchSettingsPage() {
  const { workbenchId } = useParams<{ workbenchId: string }>();
  const navigate = useNavigate();
  const { workbenches, loadWorkbenches, loading } = useWorkbenchStore();

  useEffect(() => {
    if (workbenches.length === 0) {
      loadWorkbenches();
    }
  }, [workbenches.length, loadWorkbenches]);

  const workbench = useMemo(
    () => workbenches.find((w) => w._id === workbenchId),
    [workbenches, workbenchId],
  );

  const { isOwner } = useWorkspacePermissions(workbench);

  useEffect(() => {
    if (!loading && workbench && !isOwner) {
      navigate(`/dashboard/workspaces/${workbenchId}`, { replace: true });
    }
  }, [loading, workbench, isOwner, navigate, workbenchId]);

  if (loading || !workbench) {
    return <div className="p-8 text-center">Loading settings...</div>;
  }

  if (!isOwner) return null;

  return (
    <DashboardLayout>
      <Header
        title="Settings"
        description={workbench.name}
        backHref={`/dashboard/workspaces/${workbenchId}`}
      />

      <WorkspaceSubNav workbenchId={workbenchId!} />

      <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
        <div className="bg-background border border-border/50 rounded-2xl p-6 shadow-sm">
          <MembersPanel workbench={workbench} />
        </div>
      </div>
    </DashboardLayout>
  );
}
