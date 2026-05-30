import { create } from "zustand";
import { GetAllPlans } from "../services/plans";
import type { IPlan } from "../../types/plan";

interface IPlanState {
  plans: IPlan[];
  loading: boolean;
  error: string | null;
  maxWorkspaces?: number;

  fetchPlans: () => Promise<void>;
}

export const usePlanStore = create<IPlanState>((set) => ({
  plans: [],
  loading: false,
  error: null,

  fetchPlans: async () => {
    set({ loading: true, error: null });

    const { data, error } = await GetAllPlans();

    if (!error) {
      set({
        plans: data.data,
        loading: false,
      });
    } else {
      set({
        loading: false,
        error,
      });
    }
  },
}));
