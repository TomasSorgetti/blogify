import { create } from "zustand";
import { getMyCategories } from "../services/categories";
import type { ICategory } from "../../types/category";

interface CategoriesState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  loading: false,
  error: null,

  async loadMyCategories() {
    set((state: CategoriesState) => ({ ...state, isLoading: true }));

    const { data, error } = await getMyCategories();
    if (!error) {
      set((state: CategoriesState) => ({
        ...state,
        categories: data.data,
        isLoading: false,
      }));
    } else {
      set((state: CategoriesState) => ({ ...state, isLoading: false }));
    }
  },
}));
