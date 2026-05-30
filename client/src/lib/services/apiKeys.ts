import { handleApiRequest } from "./apiHelpers";
import { privateApi } from "./api";

export const listApiKeys = async (workbenchId?: string) => {
  return handleApiRequest(() => privateApi.get(`/api-keys`, { params: { workbenchId } }));
};

export const createApiKey = async (data: {
  name: string;
  workbenchId?: string;
  scopes?: string[];
  expiresAt?: string;
}) => {
  return handleApiRequest(() => privateApi.post(`/api-keys`, data));
};

export const invalidateApiKey = async (key: string) => {
  return handleApiRequest(() => privateApi.delete(`/api-keys/${key}`));
};
