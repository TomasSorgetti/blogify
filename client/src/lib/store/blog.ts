import { create } from "zustand";
import { getPublicArticles, getArticle } from "../services/articles";
import type { IArticle, IGetPublicArticlesParams } from "../../types/article";

export interface IBlogState {
  articles: { items: IArticle[]; total: number; page: number; pages: number };
  article: IArticle | null;
  loading: boolean;
  error: string | null;

  loadPublicArticles: (params: IGetPublicArticlesParams) => Promise<void>;
  loadPublicArticle: (articleSlug: string) => Promise<void>;
}

export const useBlogStore = create<IBlogState>((set) => ({
  articles: { items: [], total: 0, page: 1, pages: 1 },
  article: null,
  loading: false,
  error: null,

  async loadPublicArticles({
    search,
    status,
    tags,
    isGlobal,
    workbenchId,
    page,
    limit,
  }: IGetPublicArticlesParams) {
    set((state: IBlogState) => ({ ...state, loading: true }));

    const { data, error } = await getPublicArticles({
      search,
      status,
      tags,
      isGlobal,
      workbenchId,
      page,
      limit,
    });

    if (!error) {
      set((state: IBlogState) => ({
        ...state,
        articles: data.data,
        loading: false,
      }));
    } else {
      set((state: IBlogState) => ({ ...state, error, loading: false }));
    }
  },

  async loadPublicArticle(articleSlug: string) {
    set((state: IBlogState) => ({ ...state, loading: true }));

    const { data, error } = await getArticle(articleSlug);

    if (!error) {
      set((state: IBlogState) => ({
        ...state,
        article: data.data,
        loading: false,
      }));
    } else {
      set((state: IBlogState) => ({ ...state, error, loading: false }));
    }
  },
}));
