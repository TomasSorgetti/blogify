import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listApiKeys, createApiKey, invalidateApiKey } from "../../lib/services/apiKeys";
import type { IApiKey } from "../../types/api-key";
import toast from "react-hot-toast";

interface ApiKeysResponse {
  data: IApiKey[];
}

interface SingleApiKeyResponse {
  data: IApiKey;
}

export function useApiKeys(workbenchId?: string) {
  return useQuery({
    queryKey: ["api-keys", workbenchId],
    queryFn: async () => {
      const { data, error } = await listApiKeys(workbenchId);
      if (error) throw new Error(error);
      const typedData = data as ApiKeysResponse | null;
      return typedData?.data ?? [];
    },
  });
}

export function useCreateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { name: string; workbenchId?: string; scopes?: string[]; expiresAt?: string }) => {
      const { data, error } = await createApiKey(payload);
      if (error) throw new Error(error);
      const typedData = data as SingleApiKeyResponse | null;
      if (!typedData?.data) throw new Error("Failed to generate API key");
      return typedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      toast.success("API key generated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to generate API key");
    },
  });
}

export function useRevokeApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (key: string) => {
      const { error } = await invalidateApiKey(key);
      if (error) throw new Error(error);
      return key;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      toast.success("API key revoked successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to revoke API key");
    },
  });
}
