import { CreditCardIcon, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/react-query/query-keys";
import { useAuthStore } from "../../../lib/store/auth";
import { usePlanStore } from "../../../lib/store/plans";
import { useWorkbenchStore } from "../../../lib/store/workbench";
import { ChangePlan } from "../../../lib/services/subscriptions";
import { DowngradeModal } from "../../../components/sections/dashboard/billing/downgrade-modal";
import { DowngradeArticlesModal } from "../../../components/sections/dashboard/billing/downgrade-articles-modal";
import type { IWorkbench } from "../../../types/workbench";
import type { IArticle } from "../../../types/article";
import { toast } from "react-hot-toast";
import { CurrentPlanCard } from "../../../components/sections/dashboard/billing/current-plan-card";
import { PlanSelection } from "../../../components/sections/dashboard/billing/plan-selection";

interface IPlanChangeDetails {
  needsSelection?: boolean;
  type?: "UPGRADE_WORKBENCHES" | "DOWNGRADE_WORKBENCHES" | "DOWNGRADE_ARTICLES";
  requiredCount?: number;
  archivedWorkbenches?: IWorkbench[];
  workbenches?: {
    workbench: IWorkbench;
    articles: IArticle[];
    keepLimit: number;
    overflow: number;
  }[];
}

export default function BillingSettings() {
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();
  const { plans, loading: plansLoading, fetchPlans } = usePlanStore();
  const { workbenches, loadWorkbenches } = useWorkbenchStore();
  const [changingPlan, setChangingPlan] = useState<string | null>(null);
  const [planChangeData, setPlanChangeData] = useState<{
    isOpen: boolean;
    mode: "DOWNGRADE" | "UPGRADE";
    planId: string;
    requiredCount: number;
    workbenches: IWorkbench[];
  }>({
    isOpen: false,
    mode: "DOWNGRADE",
    planId: "",
    requiredCount: 0,
    workbenches: [],
  });

  const [articleSelectionData, setArticleSelectionData] = useState<{
    isOpen: boolean;
    planId: string;
    workbenches: {
      workbench: IWorkbench;
      articles: IArticle[];
      keepLimit: number;
      overflow: number;
    }[];
  }>({
    isOpen: false,
    planId: "",
    workbenches: [] as {
      workbench: IWorkbench;
      articles: IArticle[];
      keepLimit: number;
      overflow: number;
    }[],
  });

  const [pendingWorkbenchArchiveIds, setPendingWorkbenchArchiveIds] = useState<
    string[]
  >([]);

  useEffect(() => {
    fetchPlans();
    loadWorkbenches();
  }, [fetchPlans, loadWorkbenches]);

  const currentPlan =
    typeof user?.subscription?.planId === "object"
      ? user.subscription.planId
      : plans.find(
          (p) => p._id === (user?.subscription?.planId as unknown as string),
        );

  const handleChangePlan = async (planId: string) => {
    if (planId === currentPlan?._id) return;
    await performPlanChange(planId);
  };

  const performPlanChange = async (
    planId: string,
    archiveWorkbenchIds?: string[],
    unarchiveWorkbenchIds?: string[],
    archiveArticleIds?: string[],
  ) => {
    setChangingPlan(planId);

    const { data, error, details } = await ChangePlan(
      planId,
      archiveWorkbenchIds,
      unarchiveWorkbenchIds,
      archiveArticleIds,
    );
    const planChangeDetails = details as unknown as IPlanChangeDetails;

    if (error) {
      setChangingPlan(null);

      if (planChangeDetails?.needsSelection) {
        if (planChangeDetails.type === "DOWNGRADE_ARTICLES") {
          setPlanChangeData((prev) => ({ ...prev, isOpen: false }));
          setArticleSelectionData({
            isOpen: true,
            planId,
            workbenches: planChangeDetails.workbenches || [],
          });
          return;
        }

        const mode =
          planChangeDetails.type === "UPGRADE_WORKBENCHES"
            ? "UPGRADE"
            : "DOWNGRADE";
        let workbenchesToSelect: IWorkbench[] = [];

        if (mode === "UPGRADE") {
          workbenchesToSelect = planChangeDetails.archivedWorkbenches || [];
        } else {
          workbenchesToSelect = workbenches.filter((wb) => {
            const isOwner =
              typeof wb.owner === "object"
                ? wb.owner?._id === user?._id
                : wb.owner === user?._id;
            return isOwner && !wb.isArchived;
          });
        }

        setPlanChangeData({
          isOpen: true,
          mode,
          planId,
          requiredCount: planChangeDetails.requiredCount || 0,
          workbenches: workbenchesToSelect,
        });
        return;
      } else {
        toast.error(error || "Failed to update plan");
      }
    } else if (data?.success) {
      toast.success("Plan updated successfully!");
      setPendingWorkbenchArchiveIds([]);
      if (user) {
        const updatedUser = { ...user };
        updatedUser.subscription = data.data;
        setUser(updatedUser);
        loadWorkbenches();

        queryClient.invalidateQueries({ queryKey: queryKeys.workbenches.all });
      }
    }

    setChangingPlan(null);
    setPlanChangeData((prev) => ({ ...prev, isOpen: false }));
  };

  if (plansLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-border/60 bg-card/60">
        <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CurrentPlanCard plan={currentPlan} />

      <PlanSelection
        plans={plans}
        currentPlanId={currentPlan?._id}
        changingPlanId={changingPlan}
        onPlanChange={handleChangePlan}
      />

      <section className="rounded-2xl border border-border/70 bg-card/75 p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold">Payment Method</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Billing is currently handled as direct plan assignment.
        </p>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-border/60 bg-secondary/35 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-border/60 bg-card/75">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Direct Plan Assignment</p>
              <p className="text-sm text-muted-foreground">
                No credit card required for current phase.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border/70 bg-card/75 p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold">Billing History</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Invoices and payments will appear here.
        </p>
        <div className="mt-4 rounded-xl border border-dashed border-border/70 bg-secondary/20 py-8 text-center text-sm text-muted-foreground">
          No billing history available yet.
        </div>
      </section>

      <DowngradeModal
        isOpen={planChangeData.isOpen}
        mode={planChangeData.mode}
        workbenches={planChangeData.workbenches}
        requiredCount={planChangeData.requiredCount}
        onConfirm={(selectedIds) => {
          if (planChangeData.mode === "UPGRADE") {
            performPlanChange(planChangeData.planId, undefined, selectedIds);
          } else {
            const archiveIds = planChangeData.workbenches
              .map((wb) => wb._id!)
              .filter((id) => !selectedIds.includes(id));
            setPendingWorkbenchArchiveIds(archiveIds);
            performPlanChange(planChangeData.planId, archiveIds, undefined);
          }
        }}
        onCancel={() =>
          setPlanChangeData((prev) => ({ ...prev, isOpen: false }))
        }
      />

      <DowngradeArticlesModal
        isOpen={articleSelectionData.isOpen}
        workbenches={articleSelectionData.workbenches}
        onConfirm={(archiveIds) => {
          performPlanChange(
            articleSelectionData.planId,
            pendingWorkbenchArchiveIds.length > 0
              ? pendingWorkbenchArchiveIds
              : undefined,
            undefined,
            archiveIds,
          );
          setArticleSelectionData((prev) => ({ ...prev, isOpen: false }));
        }}
        onCancel={() =>
          setArticleSelectionData((prev) => ({ ...prev, isOpen: false }))
        }
      />
    </div>
  );
}
