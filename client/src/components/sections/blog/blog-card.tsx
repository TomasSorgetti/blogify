import { Link } from "react-router-dom";
import type { IArticle } from "../../../types/article";

interface BlogCardProps {
  post: IArticle;
}

export function BlogCard({ post }: BlogCardProps) {
  const tags = post.tags?.split(",").slice(0, 3);

  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article className="h-full flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-accent/50 transition-all">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={post.coverImage || "/blog-card-placeholder.png"}
            alt={post.title}
            className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col flex-1 p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs text-muted-foreground bg-muted rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {post.summary}
          </p>
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <img
              src={post.author?.avatar || "/placeholder.svg"}
              alt={post.author?.name || "Author"}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="w-full">
              <p className="text-sm font-medium">
                {post?.author?.name || "AI Agent"}
              </p>
              <div className="text-xs text-muted-foreground flex items-center justify-between w-full gap-2">
                <p className="block">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="block">3 min read</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
