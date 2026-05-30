import type { IArticle } from "../types/article";

export const ARTICLE_CATEGORIES = [
  "React",
  "Next.js",
  "CSS",
  "TypeScript",
  "Backend",
  "AI",
  "Product Update",
  "Tutorial",
  "Strategy",
] as const;

export const DEFAULT_ARTICLE_FORM_DATA: IArticle = {
  title: "",
  slug: "",
  content: "",
  summary: "",
  status: "DRAFT",
  categories: [],
  newCategories: [],
  tags: "",
  coverImage: null,
  imageUrl: "",
  metaTitle: "",
  metaDescription: "",
  isFeatured: false,
  isGlobal: false,
  workbench: "",
  author: null,
};
