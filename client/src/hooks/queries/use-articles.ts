import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getMyArticles, 
  getArticle, 
  createArticle, 
  updateArticle, 
  deleteArticle,
  generateAiArticle
} from "../../lib/services/articles";
import { queryKeys } from "../../lib/react-query/query-keys";
import type { IArticle } from "../../types/article";
import toast from "react-hot-toast";

interface UseArticlesParams {
  workbenchId: string;
  page?: number;
  limit?: number;
}

interface ArticlesResponse {
  data: {
    items: IArticle[];
    page: number;
    pages: number;
    total: number;
  };
}

interface SingleArticleResponse {
  data: IArticle;
}

export interface ArticlesListResult {
  data: IArticle[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

export function useArticles({ workbenchId, page = 1, limit = 10 }: UseArticlesParams) {
  return useQuery<ArticlesListResult>({
    queryKey: queryKeys.articles.list(workbenchId),
    queryFn: async () => {
      const { data, error } = await getMyArticles(workbenchId, { page, limit });
      if (error) throw new Error(error);
      
      const response = data as ArticlesResponse | null;
      if (!response?.data) {
        return { data: [], pagination: { totalItems: 0, totalPages: 1, currentPage: 1 } };
      }

      return {
        data: response.data.items,
        pagination: {
          totalItems: response.data.total,
          totalPages: response.data.pages,
          currentPage: response.data.page,
        },
      };
    },
    enabled: !!workbenchId,
  });
}

export function useArticle(articleSlug: string) {
  return useQuery({
    queryKey: queryKeys.articles.detail(articleSlug),
    queryFn: async () => {
      const { data, error } = await getArticle(articleSlug);
      if (error) throw new Error(error);
      const typedData = data as SingleArticleResponse | null;
      if (!typedData?.data) throw new Error("Article not found");
      return typedData.data;
    },
    enabled: !!articleSlug,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IArticle) => {
      const { data, error } = await createArticle(payload);
      if (error) throw new Error(error);
      const typedData = data as SingleArticleResponse | null;
      if (!typedData?.data) throw new Error("Failed to create article");
      return typedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.workbenches.all });
      toast.success("Article created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create article");
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slug, payload }: { slug: string; payload: IArticle }) => {
      const { data, error } = await updateArticle(slug, payload);
      if (error) throw new Error(error);
      const typedData = data as SingleArticleResponse | null;
      if (!typedData?.data) throw new Error("Failed to update article");
      return typedData.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      if (data._id) {
        queryClient.setQueryData(queryKeys.articles.detail(data._id), data);
      }
      toast.success("Article updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update article");
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await deleteArticle(id);
      if (error) throw new Error(error);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.workbenches.all });
      toast.success("Article deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete article");
    },
  });
}

export function useGenerateAiArticle() {
  return useMutation({
    mutationFn: async ({ prompt, tone }: { prompt: string; tone: string }) => {
      const { data, error } = await generateAiArticle(prompt, tone);
      if (error) throw new Error(error);
      const typedData = data as { data: Partial<IArticle> } | null;
      if (!typedData?.data) throw new Error("Failed to generate article");
      return typedData.data;
    },
  });
}
