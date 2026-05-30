import { privateApi } from "./api";
import { handleApiRequest } from "./apiHelpers";

export async function SuscribeToProPlan(planId: string) {
  return handleApiRequest(() =>
    privateApi.post(`/subscriptions/checkout`, { planId })
  );
}

export async function VerifySession(sessionId: string) {
  return handleApiRequest(() =>
    privateApi.post(`/subscriptions/verify-session`, { sessionId })
  );
}

export async function ChangePlan(planId: string, archiveWorkbenchIds?: string[], unarchiveWorkbenchIds?: string[], archiveArticleIds?: string[]) {
  return handleApiRequest(() =>
    privateApi.post(`/subscriptions/change`, { planId, archiveWorkbenchIds, unarchiveWorkbenchIds, archiveArticleIds })
  );
}
