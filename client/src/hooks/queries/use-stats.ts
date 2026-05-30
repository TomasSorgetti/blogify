import { useQuery } from "@tanstack/react-query";
import { getWorkbenchStats } from "../../lib/services/stats";
import { queryKeys } from "../../lib/react-query/query-keys";
import type { IStats } from "../../lib/store/stats";

interface StatsResponse {
  data: IStats;
}

export function useStats(workbenchId?: string) {
  return useQuery({
    queryKey: queryKeys.stats.workbench(workbenchId || "all"),
    queryFn: async () => {
      const { data, error } = await getWorkbenchStats(workbenchId);
      if (error) throw new Error(error);
      const typedData = data as StatsResponse | null;
      return typedData?.data ?? null;
    },
    enabled: true,
  });
}
