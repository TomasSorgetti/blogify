import { create } from "zustand";
import { getWorkbenchStats } from "../services/stats";

export interface IStats {
  totalViews: string;
  apiRequests: string;
  articles: string;
  engagementRate: string;
  topArticles: Array<{ title: string; views: number }>;
  history: Array<{ name: string; views: number }>;
}

export interface IStatsState {
  stats: IStats | null;
  loading: boolean;
  error: string | null;

  loadStats: (workbenchId?: string) => Promise<void>;
}

export const useStatsStore = create<IStatsState>((set) => ({
  stats: null,
  loading: false,
  error: null,

  loadStats: async (workbenchId) => {
    set({ loading: true, error: null });

    const { data, error } = await getWorkbenchStats(workbenchId);

    if (error) {
      set({ loading: false, error });
      return;
    }

    set({ stats: data.data, loading: false });
  },
}));
