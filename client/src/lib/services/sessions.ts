import { privateApi } from "./api";
import { handleApiRequest } from "./apiHelpers";

export function getMySessions() {
  return handleApiRequest(() => privateApi.get(`/sessions`));
}
