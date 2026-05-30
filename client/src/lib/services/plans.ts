import { publicApi } from "./api";
import { handleApiRequest } from "./apiHelpers";

export async function GetAllPlans() {
  return handleApiRequest(() => publicApi.get(`/plans`));
}
