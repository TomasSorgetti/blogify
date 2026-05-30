import {
  ArrowUpRightIcon,
  CalendarIcon,
  PencilIcon,
  SparklesIcon,
  TagIcon,
  Trash2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { IArticle } from "../../../../types/article";
import { ConfirmDialog } from "../../../ui/confirm-dialog";
import { useState } from "react";
import { useDeleteArticle } from "../../../../hooks/queries/use-articles";
import { cn } from "../../../../lib/utils/tw-merge";

interface ArticleListItemProps {
  article: IArticle;
  workbenchId: string;
  canEdit: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  PUBLISHED: "bg-emerald-500/15 text-emerald-400",
  DRAFT: "bg-secondary text-muted-foreground",
};

const STATUS_LABELS: Record<string, string> = {
  PUBLISHED: "Published",
  DRAFT: "Draft",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArticleListItem({
  article,
  workbenchId,
  canEdit,
}: ArticleListItemProps) {
  const { mutateAsync: deleteArticle } = useDeleteArticle();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(
    null,
  );

  const handleDeleteConfirm = async () => {
    setIsConfirmOpen(false);
    try {
      const idToDelete = article._id || article.slug;
      await deleteArticle(idToDelete);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not delete article.";
      setDeleteErrorMessage(message);
    }
  };

  const statusStyle = STATUS_STYLES[article.status] ?? STATUS_STYLES.DRAFT;
  const statusLabel = STATUS_LABELS[article.status] ?? article.status;
  const categoryLabels = article.categories
    .map((category) => (typeof category === "string" ? category : category.name))
    .filter(Boolean)
    .slice(0, 2);

  return (
    <>
      <article className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-card hover:shadow-lg hover:shadow-accent/5 focus-within:ring-2 focus-within:ring-accent/25">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Link
          to={`/dashboard/workspaces/${workbenchId}/articles/${article.slug}`}
          className="absolute inset-0 z-10 cursor-pointer rounded-2xl"
          aria-label={`View ${article.title}`}
        />

        <div className="relative z-0 min-w-0">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3
              className={cn(
                "line-clamp-2 text-base font-semibold leading-tight transition-colors group-hover:text-accent",
                article.isArchived && "text-muted-foreground line-through",
              )}
            >
              {article.title}
            </h3>
            <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {article.isArchived ? (
              <span className="rounded-full border border-destructive/20 bg-destructive/10 px-2.5 py-1 font-medium text-destructive">
                Archived
              </span>
            ) : (
              <span
                className={`rounded-full border border-transparent px-2.5 py-1 font-medium ${statusStyle}`}
              >
                {statusLabel}
              </span>
            )}
            {article.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 font-medium text-amber-400">
                <SparklesIcon className="h-3 w-3" />
                Featured
              </span>
            )}
            {categoryLabels.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-secondary/50 px-2.5 py-1 font-medium text-muted-foreground"
              >
                <TagIcon className="h-3 w-3" />
                {label}
              </span>
            ))}
          </div>

          {article.summary && (
            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground/90">
              {article.summary}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {article.createdAt && (
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary/40 px-2 py-1">
                <CalendarIcon className="h-3 w-3" />
                Created {formatDate(article.createdAt)}
              </span>
            )}
            {article.updatedAt && (
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary/40 px-2 py-1">
                <CalendarIcon className="h-3 w-3" />
                Updated {formatDate(article.updatedAt)}
              </span>
            )}
          </div>
        </div>

        <div className="relative z-20 mt-4 flex shrink-0 items-center justify-end gap-2">
          {canEdit ? (
            <>
              <Link
                to={`/dashboard/workspaces/${workbenchId}/articles/${article.slug}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-secondary/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
                aria-label={`Edit ${article.title}`}
              >
                Edit
                <PencilIcon className="h-4 w-4" />
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsConfirmOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-secondary/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                aria-label={`Delete ${article.title}`}
              >
                Delete
                <Trash2Icon className="h-4 w-4" />
              </button>
            </>
          ) : (
            <span className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              Read only
            </span>
          )}
        </div>
      </article>

      {deleteErrorMessage && (
        <p
          role="alert"
          className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive"
        >
          {deleteErrorMessage}
        </p>
      )}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete article"
        description={`Are you sure you want to delete "${article.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isDestructive
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
