import { privateApi } from "./api";
import { handleApiRequest } from "./apiHelpers";

export function getMyCategories() {
  return handleApiRequest(() => privateApi.get(`/categories`));
}
