import type { ICategory } from "./category";

export type ArticleStatus = "DRAFT" | "PUBLISHED";

export interface IAuthor {
  _id: string;
  name: string;
  avatar: string;
}
export interface IArticle {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  status: ArticleStatus;
  categories: (string | ICategory)[];
  newCategories: string[];
  tags: string;
  coverImage: string | Blob | File | null;
  imageUrl: string;
  metaTitle: string;
  metaDescription: string;
  isFeatured: boolean;
  isGlobal: boolean;
  workbench: string;
  author: IAuthor | null;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
  kanbanColumn?: "idea" | "writing" | "review" | "published";
}

export type VoiceTone =
  | "professional"
  | "casual"
  | "creative"
  | "authoritative"
  | "empathetic"
  | "humorous"
  | "educational"
  | "minimalist";

export type ArticleFormViewIds = {
  form: string;
  aiHeroTitle: string;
  aiPrompt: string;
  aiToneLabel: string;
  tags: string;
  statusLabel: string;
  categoryLabel: string;
};

export type SetArticleField = <K extends keyof IArticle>(
  key: K,
  value: IArticle[K],
) => void;

export interface IGetPublicArticlesParams {
  search?: string;
  status?: string;
  tags?: string[];
  isGlobal?: boolean;
  workbenchId?: string;
  page?: number;
  limit?: number;
}
