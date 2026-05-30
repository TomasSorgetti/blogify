import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import DashboardLayout from "../../components/layouts/dashboard-layout";
import { Header } from "../../components/sections/dashboard/header";
import { WorkbenchCard } from "../../components/sections/dashboard/workspaces/workbench-card";
import { WorkbenchCardSkeleton } from "../../components/sections/dashboard/workspaces/workbench-card-skeleton";
import { CreateWorkbenchModal } from "../../components/sections/dashboard/workspaces/create-workbench-modal";
import { EmptyState } from "../../components/ui/empty-state";
import WorkspaceIcon from "../../components/ui/icons/workspace-icon";
import { LockedCard } from "../../components/ui/locked-card";
import { usePlanLimits } from "../../hooks/use-plan-limits";
import { UsageBar } from "../../components/ui/usage-bar";
import { useWorkspaces } from "../../hooks/queries/use-workspaces";

const SKELETON_COUNT = 3;

export default function WorkspacesPage() {
  const { data: workbenches = [], isLoading } = useWorkspaces();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { maxWorkbenches, isUnlimited, planName } = usePlanLimits();

  const unlimitedWorkbenches = isUnlimited("workbenches");
  const hasReachedLimit =
    !unlimitedWorkbenches && workbenches.length >= maxWorkbenches;

  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <Header
        title="Workspaces"
        description="Organize your content into separate workspaces"
        action={
          hasReachedLimit
            ? {
                label: "Upgrade Plan",
                onClick: () => navigate("/dashboard/settings/billing"),
              }
            : {
                label: "New Workspace",
                onClick: () => setIsCreateModalOpen(true),
              }
        }
      />

      <main className="p-4 lg:p-8">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <WorkbenchCardSkeleton key={i} />
            ))}
          </div>
        ) : workbenches.length === 0 ? (
          <EmptyState
            icon={WorkspaceIcon}
            title="No workspaces yet"
            description="Create your first workspace to start organizing your articles."
            actionLabel="Create Workspace"
            onAction={() => setIsCreateModalOpen(true)}
          />
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {workbenches.map((workbench) => (
                <WorkbenchCard key={workbench._id} workbench={workbench} />
              ))}

              {hasReachedLimit ? (
                <LockedCard
                  title="Workspace Limit Reached"
                  description={`Your ${planName} plan only allows up to ${maxWorkbenches} workspaces.`}
                />
              ) : (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="group flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-6 text-muted-foreground transition-colors hover:border-accent hover:text-foreground cursor-pointer"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                    <PlusIcon className="h-6 w-6 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <span className="mt-4 font-medium">New Workspace</span>
                  <span className="mt-1 text-sm">Organize your content</span>
                </button>
              )}
            </div>

            <UsageBar
              label="Workspace Usage"
              current={workbenches.length}
              max={maxWorkbenches}
              isUnlimited={unlimitedWorkbenches}
              className="mt-8"
            />
          </>
        )}
      </main>

      {isCreateModalOpen && (
        <CreateWorkbenchModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </DashboardLayout>
  );
}
