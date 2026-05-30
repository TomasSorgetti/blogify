export const queryKeys = {
  workbenches: {
    all: ["workbenches"] as const,
    list: () => [...queryKeys.workbenches.all, "list"] as const,
    detail: (id: string) => [...queryKeys.workbenches.all, "detail", id] as const,
  },
  articles: {
    all: ["articles"] as const,
    list: (workbenchId?: string) => [...queryKeys.articles.all, "list", { workbenchId }] as const,
    detail: (id: string) => [...queryKeys.articles.all, "detail", id] as const,
  },
  user: {
    profile: ["user", "profile"] as const,
    limits: ["user", "limits"] as const,
  },
  stats: {
    all: ["stats"] as const,
    workbench: (id: string) => [...queryKeys.stats.all, "workbench", id] as const,
  },
};
