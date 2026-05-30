import { create } from "zustand";
import {
  listApiKeys,
  createApiKey,
  invalidateApiKey,
} from "../services/apiKeys";
import type { IValidationError } from "../../types/api";
import type { IApiKey } from "../../types/api-key";

interface ApiKeysState {
  apiKeys: IApiKey[];
  loading: boolean;
  error: string | null;
  loadApiKeys: (workbenchId?: string) => Promise<void>;
  generateKey: (data: { name: string; workbenchId?: string }) => Promise<{
    success: boolean;
    errors?: IValidationError[];
  }>;
  revokeKey: (key: string) => Promise<boolean>;
}

export const useApiKeysStore = create<ApiKeysState>((set, get) => ({
  apiKeys: [],
  loading: false,
  error: null,

  loadApiKeys: async (workbenchId?: string) => {
    set({ loading: true, error: null });
    const response = await listApiKeys(workbenchId);
    if (!response.error) {
      set({ apiKeys: response?.data?.data || [], loading: false });
    } else {
      set({ error: response.error, loading: false });
    }
  },

  generateKey: async (data: { name: string; workbenchId?: string }) => {
    set({ loading: true, error: null });
    const response = await createApiKey(data);
    if (!response.error && response.data) {
      set({
        apiKeys: [response?.data?.data, ...get().apiKeys],
        loading: false,
      });
      return { success: true };
    } else {
      set({ loading: false });
      return { success: false, errors: response.details };
    }
  },

  revokeKey: async (key: string) => {
    const response = await invalidateApiKey(key);
    if (!response.error) {
      set({
        apiKeys: get().apiKeys.filter((k) => k.key !== key),
      });
      return true;
    }
    return false;
  },
}));
