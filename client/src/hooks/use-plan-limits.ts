import { useAuthStore } from "../lib/store/auth";

export interface PlanLimits {
  planName: string;
  maxWorkbenches: number;
  maxArticlesPerWorkbench: number;
  maxApiKeys: number;
  maxCollaborators: number;
  hasAiTools: boolean;
  hasKanban: boolean;
  isUnlimited: (feature: "workbenches" | "articlesPerWorkbench" | "apiKeys" | "collaborators") => boolean;
}

export function usePlanLimits(): PlanLimits {
  const { user } = useAuthStore();
  
  const features = user?.subscription?.planId?.features;

  if (user?.subscription && !features) {
    console.warn("[usePlanLimits] Subscription found but plan features are missing. Ensure planId is populated.");
  }
  
  const limits: PlanLimits = {
    planName: user?.subscription?.planId?.name ?? "Free Plan",
    maxWorkbenches: features?.workbenches ?? 1,
    maxArticlesPerWorkbench: features?.articlesPerWorkbench ?? 3,
    maxApiKeys: features?.apiKeys ?? 0,
    maxCollaborators: features?.collaborators ?? 1,
    hasAiTools: features?.aiTools ?? false,
    hasKanban: features?.kanban ?? false,
    isUnlimited: (feature) => features?.[feature] === -1,
  };

  return limits;
}
