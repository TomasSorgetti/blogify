import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import DashboardLayout from "../../../components/layouts/dashboard-layout";
import { Header } from "../../../components/sections/dashboard/header";
import { ArticleListItem } from "../../../components/sections/dashboard/workspaces/article-list-item";
import { EmptyState } from "../../../components/ui/empty-state";
import { Button } from "../../../components/ui/button";
import ArticleIcon from "../../../components/ui/icons/article-icon";
import { useAuthStore } from "../../../lib/store/auth";
import { usePlanLimits } from "../../../hooks/use-plan-limits";
import { UsageBar } from "../../../components/ui/usage-bar";
import { ConfirmDialog } from "../../../components/ui/confirm-dialog";
import WorkspaceSubNav from "../../../components/sections/dashboard/workspaces/workspace-sub-nav";
import { useArticles } from "../../../hooks/queries/use-articles";
import { useWorkbench } from "../../../hooks/queries/use-workspaces";
import { useWorkspacePermissions } from "../../../hooks/use-workspace-permissions";
import { ArticleListSkeleton } from "../../../components/sections/dashboard/workspaces/article-list-skeleton";
import { removeMember } from "../../../lib/services/workbench";
import toast from "react-hot-toast";

const ARTICLES_PER_PAGE = 10;

export default function WorkbenchDetailPage() {
  const { workbenchId } = useParams<{ workbenchId: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const { user } = useAuthStore();

  const { data: workbench, isLoading: isLoadingWorkbench } = useWorkbench(
    workbenchId!,
  );
  const { data: articlesData, isLoading: isLoadingArticles } = useArticles({
    workbenchId: workbenchId!,
    page: currentPage,
    limit: ARTICLES_PER_PAGE,
  });

  const articles = articlesData?.data ?? [];
  const pagination = articlesData?.pagination ?? {
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  };

  const { isOwner, canEdit } = useWorkspacePermissions(workbench);

  const handleNewArticle = () => {
    navigate(`/dashboard/workspaces/${workbenchId}/articles/new`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleLeaveWorkspace = async () => {
    if (!user || !workbenchId) return;
    const { error } = await removeMember(workbenchId, user._id);
    if (!error) {
      toast.success("Left workspace successfully");
      navigate("/dashboard/workspaces");
    } else {
      toast.error(error || "Failed to leave workspace");
    }
  };

  const { maxArticlesPerWorkbench, isUnlimited } = usePlanLimits();

  const unlimitedArticles = isUnlimited("articlesPerWorkbench");
  const hasReachedLimit =
    !unlimitedArticles && pagination.totalItems >= maxArticlesPerWorkbench;

  const workspaceName = workbench?.name ?? "Workspace";
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < pagination.totalPages;

  const usageText = unlimitedArticles
    ? `${pagination.totalItems} articles`
    : `${pagination.totalItems} / ${maxArticlesPerWorkbench} articles used`;

  const isLoading = isLoadingWorkbench || isLoadingArticles;

  return (
    <DashboardLayout>
      <Header
        title={workspaceName}
        description={usageText}
        backHref="/dashboard/workspaces"
        action={
          hasReachedLimit
            ? {
                label: "Upgrade Plan",
                onClick: () => navigate("/dashboard/settings/billing"),
              }
            : isOwner || canEdit
              ? {
                  label: "New Article",
                  onClick: handleNewArticle,
                }
              : !isOwner
                ? {
                    label: "Leave Workspace",
                    onClick: () => setShowLeaveConfirm(true),
                  }
                : undefined
        }
      />

      <WorkspaceSubNav workbenchId={workbenchId!} />

      <main className="p-4 lg:p-8">
        <UsageBar
          label="Articles Usage"
          current={pagination.totalItems}
          max={maxArticlesPerWorkbench}
          isUnlimited={unlimitedArticles}
          className="mb-8"
        />

        {isLoading ? (
          <ArticleListSkeleton />
        ) : articles.length === 0 ? (
          <EmptyState
            icon={ArticleIcon}
            title="No articles yet"
            description={
              canEdit
                ? "Create your first article in this workspace to get started."
                : "There are no articles in this workspace yet."
            }
            actionLabel={canEdit ? "Create Article" : undefined}
            onAction={canEdit ? handleNewArticle : undefined}
          />
        ) : (
          <>
            <div className="space-y-3">
              {articles.map((article) => (
                <ArticleListItem
                  key={article._id}
                  article={article}
                  workbenchId={workbenchId!}
                  canEdit={canEdit}
                />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <nav
                aria-label="Pagination"
                className="mt-6 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
              >
                <p className="text-sm text-muted-foreground">
                  Page {pagination.currentPage} of {pagination.totalPages}
                  <span className="ml-1 hidden sm:inline">
                    ({pagination.totalItems} total)
                  </span>
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!hasPreviousPage}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <ChevronLeftIcon className="mr-1 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!hasNextPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                    <ChevronRightIcon className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </nav>
            )}
          </>
        )}
      </main>
      <ConfirmDialog
        isOpen={showLeaveConfirm}
        onCancel={() => setShowLeaveConfirm(false)}
        onConfirm={handleLeaveWorkspace}
        title="Leave Workspace"
        description="Are you sure you want to leave this workspace? You will lose access to all its articles."
        confirmLabel="Leave"
        isDestructive={true}
      />
    </DashboardLayout>
  );
}
