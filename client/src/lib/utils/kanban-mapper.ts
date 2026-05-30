import type { IArticle } from "../../types/article";
import type { ArticleCard, Column, ChecklistItem } from "../../types/kanban";

export function mapArticlesToColumns(
  articles: IArticle[],
  columnDefs: Column[],
): Column[] {
  // Initialize columns with empty cards
  const columns = columnDefs.map((col) => ({
    ...col,
    cards: [] as ArticleCard[],
  }));

  articles.forEach((article) => {
    // Determine which column the article belongs to
    const columnId = article.kanbanColumn || "idea";
    const column = columns.find((col) => col.id === columnId);

    if (column) {
      column.cards.push(mapArticleToCard(article));
    }
  });

  return columns;
}

function mapArticleToCard(article: IArticle): ArticleCard {
  const wordCount = article.content 
    ? article.content.trim().split(/\s+/).length 
    : 0;

  const checklist: ChecklistItem[] = [
    {
      id: "topic",
      label: "Topic approved",
      checked: !!article.title && article.title.length >= 10,
      required: true,
    },
    {
      id: "outline",
      label: "Outline created",
      checked: !!article.summary && article.summary.length > 20,
      required: true,
    },
    {
      id: "wordcount",
      label: "Min 1500 words",
      checked: wordCount >= 1500,
      required: true,
    },
    {
      id: "cover",
      label: "Has cover image",
      checked: !!article.imageUrl,
      required: true,
    },
  ];

  return {
    id: article._id || Math.random().toString(36).substr(2, 9),
    articleId: article._id || "",
    articleSlug: article.slug,
    title: article.title,
    excerpt: article.summary,
    coverImage: article.imageUrl,
    wordCount,
    collaborators: article.author ? [
      {
        id: article.author._id,
        name: article.author.name,
        avatar: article.author.avatar,
        isOnline: false, // In a real app, this would come from a presence service
      }
    ] : [],
    checklist,
    priority: "medium", // Default priority
    dueDate: article.createdAt, // Fallback to createdAt if no dueDate exists
    tags: article.tags ? article.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
  };
}
