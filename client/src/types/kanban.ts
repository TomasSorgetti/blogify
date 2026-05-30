export interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  required: boolean;
}

export interface ArticleCard {
  id: string;
  articleId: string;
  articleSlug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  wordCount: number;
  collaborators: Collaborator[];
  checklist: ChecklistItem[];
  priority: "low" | "medium" | "high";
  dueDate?: string;
  tags: string[];
}

export interface Column {
  id: string;
  title: string;
  color: string;
  cards: ArticleCard[];
  isCustom?: boolean;
}
