import type { IArticle } from "../../../types/article";
import { BlogCard } from "./blog-card";
import { Button } from "../../ui/button";

interface BlogArticleGridProps {
  articles: IArticle[];
  loading: boolean;
  error: string | null;
  onClearFilters: () => void;
}

function BlogCardSkeleton() {
  return (
    <article className="h-full flex flex-col rounded-xl border border-border/50 bg-card/50 overflow-hidden animate-pulse]">
      <div className="relative aspect-video overflow-hidden bg-muted/30" />
      <div className="flex flex-col flex-1 p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-5 w-16 bg-muted/40 rounded" />
          <div className="h-5 w-24 bg-muted/40 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-muted/40 rounded mb-3" />
        <div className="h-4 w-full bg-muted/30 rounded mb-2" />
        <div className="h-4 w-5/6 bg-muted/30 rounded mb-4" />
        <div className="flex-1" />
        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
          <div className="w-8 h-8 rounded-full bg-muted/40" />
          <div className="space-y-2">
            <div className="h-3 w-20 bg-muted/40 rounded" />
            <div className="h-2 w-16 bg-muted/30 rounded" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function BlogArticleGrid({
  articles,
  loading,
  error,
  onClearFilters,
}: BlogArticleGridProps) {
  if (loading) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <span className="text-destructive">Error: {error}</span>;
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-border rounded-xl">
        <p className="text-muted-foreground mb-4">
          No articles match your filters.
        </p>
        <Button variant="outline" onClick={onClearFilters}>
          Clear filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article: IArticle) => (
        <BlogCard key={article._id} post={article} />
      ))}
    </div>
  );
}
