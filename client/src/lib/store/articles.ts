import { create } from "zustand";
import {
  getMyArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  generateAiArticle,
} from "../services/articles";
import type { IArticle } from "../../types/article";
import type { IValidationError } from "../../types/api";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface IArticleState {
  articles: IArticle[];
  article: IArticle | null;
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo;

  loadMyArticles: (
    workbenchId: string,
    options?: { page?: number; limit?: number },
  ) => Promise<void>;
  loadArticle: (articleSlug: string) => Promise<void>;
  createArticle: (
    article: IArticle,
  ) => Promise<{ success: boolean; errors?: IValidationError[] }>;
  updateArticle: (
    articleSlug: string,
    article: IArticle,
  ) => Promise<{ success: boolean; errors?: IValidationError[] }>;
  deleteArticle: (articleSlug: string) => Promise<{ success: boolean; message?: string }>;
  generateAiArticle: (
    prompt: string,
    tone: string,
  ) => Promise<{ success: boolean; data?: Partial<IArticle> }>;
  clearArticles: () => void;
}

const INITIAL_PAGINATION: PaginationInfo = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
};

export const useArticlesStore = create<IArticleState>((set) => ({
  articles: [],
  article: null,
  loading: false,
  error: null,
  pagination: INITIAL_PAGINATION,

  async loadMyArticles(
    workbenchId: string,
    { page = 1, limit = 10 } = {},
  ) {
    set({ loading: true, error: null });

    const { data, error } = await getMyArticles(workbenchId, { page, limit });

    if (!error) {
      set({
        articles: data.data.items,
        pagination: {
          currentPage: data.data.page,
          totalPages: data.data.pages,
          totalItems: data.data.total,
        },
        loading: false,
      });
    } else {
      set({ error, loading: false });
    }
  },

  async loadArticle(articleSlug: string) {
    set({ loading: true, error: null });

    const { data, error } = await getArticle(articleSlug);

    if (!error) {
      set({ article: data.data, loading: false });
    } else {
      set({ error, loading: false });
    }
  },

  async createArticle(article: IArticle) {
    set({ loading: true, error: null });

    const { data, error, details } = await createArticle(article);

    if (!error) {
      set((state) => ({
        articles: [...state.articles, data.data],
        loading: false,
      }));

      return { success: true };
    } else {
      set({ error, loading: false });
      return { success: false, errors: details };
    }
  },

  async updateArticle(articleSlug: string, article: IArticle) {
    set({ loading: true, error: null });

    const { data, error, details } = await updateArticle(articleSlug, article);

    if (!error) {
      set((state) => ({
        articles: state.articles.map((a) =>
          a._id === data.data._id ? data.data : a,
        ),
        loading: false,
      }));

      return { success: true };
    } else {
      set({ error, loading: false });
      return { success: false, errors: details };
    }
  },

  async deleteArticle(articleSlug: string) {
    set({ loading: true, error: null });

    const { error } = await deleteArticle(articleSlug);

    if (!error) {
      set((state) => ({
        articles: state.articles.filter((a) => a.slug !== articleSlug),
        loading: false,
      }));

      return { success: true };
    } else {
      set({ error, loading: false });
      return { success: false, message: error };
    }
  },

  async generateAiArticle(prompt: string, tone: string) {
    set({ loading: true, error: null });

    const { data, error } = await generateAiArticle(prompt, tone);

    if (!error) {
      set({ loading: false });
      return { success: true, data: data.data };
    } else {
      set({ error, loading: false });
      return { success: false };
    }
  },

  clearArticles: () =>
    set({ articles: [], pagination: INITIAL_PAGINATION }),
}));
