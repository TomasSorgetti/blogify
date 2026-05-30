import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { moveKanbanCard } from "../../lib/services/articles";
import { getWorkbenchActivity } from "../../lib/services/workbench";
import { queryKeys } from "../../lib/react-query/query-keys";
import type { ArticlesListResult } from "./use-articles";
import type { IArticle } from "../../types/article";
import type { IActivityLog } from "../../types/workbench";
import toast from "react-hot-toast";

interface MoveKanbanVariables {
  slug: string;
  kanbanColumn: string;
  workbenchId: string;
}

interface MoveKanbanContext {
  previousArticles?: ArticlesListResult;
}

export function useMoveKanbanCard() {
  const queryClient = useQueryClient();

  return useMutation<IArticle, Error, MoveKanbanVariables, MoveKanbanContext>({
    mutationFn: async ({ slug, kanbanColumn }) => {
      const { data, error } = await moveKanbanCard(slug, kanbanColumn);
      if (error) throw new Error(error);
      return data;
    },
    onMutate: async (newMove) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.articles.list(newMove.workbenchId),
      });

      const previousArticles = queryClient.getQueryData<ArticlesListResult>(
        queryKeys.articles.list(newMove.workbenchId),
      );

      queryClient.setQueryData<ArticlesListResult>(
        queryKeys.articles.list(newMove.workbenchId),
        (old) => {
          if (!old?.data) return old as ArticlesListResult;
          return {
            ...old,
            data: old.data.map((article: IArticle) =>
              article.slug === newMove.slug
                ? { ...article, kanbanColumn: newMove.kanbanColumn }
                : article,
            ),
          };
        },
      );

      return { previousArticles };
    },
    onError: (error, newMove, context) => {
      if (context?.previousArticles) {
        queryClient.setQueryData(
          queryKeys.articles.list(newMove.workbenchId),
          context.previousArticles,
        );
      }
      toast.error(error.message || "Failed to move card");
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.articles.list(variables.workbenchId),
      });
      queryClient.invalidateQueries({
        queryKey: ["workbench", variables.workbenchId, "activity"],
      });
    },
  });
}

export function useWorkbenchActivity(workbenchId: string) {
  return useQuery<IActivityLog[]>({
    queryKey: ["workbench", workbenchId, "activity"],
    queryFn: async () => {
      const { data, error } = await getWorkbenchActivity(workbenchId);
      if (error) throw new Error(error);

      const response = data as { data: IActivityLog[] } | null;
      return response?.data || [];
    },
    enabled: !!workbenchId,
    refetchInterval: 30000,
  });
}
