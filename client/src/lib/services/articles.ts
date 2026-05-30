import type { IArticle, IGetPublicArticlesParams } from "../../types/article";
import { privateApi, publicApi } from "./api";
import { handleApiRequest } from "./apiHelpers";

export function getMyArticles(
  workbenchId: string,
  { page = 1, limit = 10 }: { page?: number; limit?: number } = {},
) {
  return handleApiRequest(() =>
    privateApi.get(`/articles/me`, {
      params: { workbenchId, page, limit },
    }),
  );
}

export function getPublicArticles({
  search,
  status,
  tags,
  isGlobal,
  workbenchId,
  page,
  limit,
}: IGetPublicArticlesParams) {
  return handleApiRequest(() =>
    publicApi.get(`/articles/search`, {
      params: {
        search,
        status,
        tags,
        isGlobal,
        workbenchId,
        page,
        limit,
      },
    }),
  );
}

export function getArticle(articleSlug: string) {
  return handleApiRequest(() => privateApi.get(`/articles/${articleSlug}`));
}

export function createArticle(article: IArticle) {
  const isMultipart = article.coverImage && typeof article.coverImage !== "string";
  
  if (isMultipart) {
    const formData = new FormData();
    Object.entries(article).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "categories" || key === "newCategories") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string | Blob);
        }
      }
    });

    return handleApiRequest(() =>
      privateApi.post(`/articles`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
  }

  return handleApiRequest(() => privateApi.post(`/articles`, article));
}

export function updateArticle(articleSlug: string, article: IArticle) {
  const isMultipart = article.coverImage && typeof article.coverImage !== "string";

  if (isMultipart) {
    const formData = new FormData();
    Object.entries(article).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "categories" || key === "newCategories") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string | Blob);
        }
      }
    });

    return handleApiRequest(() =>
      privateApi.patch(`/articles/${articleSlug}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
  }

  return handleApiRequest(() =>
    privateApi.patch(`/articles/${articleSlug}`, article),
  );
}

export function deleteArticle(articleId: string) {
  return handleApiRequest(() => privateApi.delete(`/articles/${articleId}`));
}

export function generateAiArticle(prompt: string, tone: string) {
  return handleApiRequest(() =>
    privateApi.post(`/articles/generate-ai-article`, { prompt, tone }),
  );
}

export function moveKanbanCard(articleSlug: string, kanbanColumn: string) {
  return handleApiRequest(() =>
    privateApi.patch(`/articles/${articleSlug}/kanban-move`, { kanbanColumn }),
  );
}

