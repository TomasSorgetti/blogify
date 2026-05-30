import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useArticlesStore } from "../../lib/store/articles";
import MainLayout from "../../components/layouts/main-layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, Clock, User, ArrowLeft, Tag, Share2 } from "lucide-react";
import type { ICategory } from "../../types/category";
import type { IAuthor } from "../../types/article";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { article, loadArticle, loading, error } = useArticlesStore();

  useEffect(() => {
    if (slug) {
      loadArticle(slug);
    }
  }, [slug, loadArticle]);

  if (loading) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-4xl px-4 py-20 animate-pulse">
          <div className="h-4 w-24 bg-secondary rounded mb-8" />
          <div className="h-12 w-3/4 bg-secondary rounded mb-4" />
          <div className="h-6 w-1/2 bg-secondary rounded mb-12" />
          <div className="aspect-video w-full bg-secondary rounded-xl mb-12" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-secondary rounded" />
            <div className="h-4 w-full bg-secondary rounded" />
            <div className="h-4 w-2/3 bg-secondary rounded" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !article) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-4xl px-4 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-accent hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </MainLayout>
    );
  }

  const tagsArray = article.tags
    ? article.tags.split(",").map((t) => t.trim())
    : [];
  const publishDate = new Date(article.createdAt || "").toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <MainLayout>
      <article className="relative bg-background pt-20 pb-32">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-accent/5 to-transparent -z-10" />

        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              {(article.categories as ICategory[])?.map((cat: ICategory) => {
                if (!cat.name) return null;
                return (
                  <span
                    key={cat._id}
                    className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20"
                  >
                    {cat.name}
                  </span>
                );
              })}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y border-border py-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="font-medium text-foreground">
                  {typeof article.author === "object"
                    ? (article.author as IAuthor).name
                    : "Article Hub Author"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {publishDate}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />8 min read
              </div>
              <button
                className="ml-auto p-2 hover:bg-secondary rounded-full transition-colors"
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {(article.coverImage || article.imageUrl) && (
            <div className="relative aspect-video w-full mb-16 overflow-hidden rounded-2xl border border-border bg-secondary shadow-2xl shadow-accent/5">
              <img
                src={article.coverImage || article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="prose-custom max-w-none mb-16">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => (
                  <h1 className="text-4xl font-bold mt-12 mb-6" {...props} />
                ),
                h2: ({ ...props }) => (
                  <h2
                    className="text-3xl font-bold mt-10 mb-5 border-b border-border pb-2"
                    {...props}
                  />
                ),
                h3: ({ ...props }) => (
                  <h3 className="text-2xl font-bold mt-8 mb-4" {...props} />
                ),
                p: ({ ...props }) => (
                  <p
                    className="text-lg leading-relaxed mb-6 text-foreground/90"
                    {...props}
                  />
                ),
                ul: ({ ...props }) => (
                  <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />
                ),
                ol: ({ ...props }) => (
                  <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />
                ),
                li: ({ ...props }) => <li className="text-lg" {...props} />,
                blockquote: ({ ...props }) => (
                  <blockquote
                    className="border-l-4 border-accent bg-accent/5 px-6 py-4 italic my-8 rounded-r-lg"
                    {...props}
                  />
                ),
                code: ({
                  inline,
                  ...props
                }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) =>
                  inline ? (
                    <code
                      className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono"
                      {...props}
                    />
                  ) : (
                    <pre
                      className="bg-secondary p-6 rounded-xl overflow-x-auto my-8 border border-border font-mono text-sm leading-relaxed"
                      {...props}
                    />
                  ),
                a: ({ ...props }) => (
                  <a
                    className="text-accent hover:underline decoration-2 underline-offset-4"
                    {...props}
                  />
                ),
                hr: () => <hr className="my-12 border-border" />,
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          <div className="border-t border-border pt-12">
            <div className="flex items-center gap-3 mb-4 text-muted-foreground">
              <Tag className="h-4 w-4" />
              <span className="text-sm font-medium">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tagsArray.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-lg bg-secondary hover:bg-border transition-colors text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-24 p-12 rounded-3xl bg-accent/5 border border-accent/10 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
            <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Join our newsletter to receive the latest articles, tutorials, and
              tech news directly in your inbox.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
              <button className="px-6 py-2 rounded-xl bg-accent text-accent-foreground font-bold hover:brightness-110 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </article>

      <style>{`
        .prose-custom {
            font-family: inherit;
        }
        .prose-custom img {
            border-radius: 1rem;
            margin: 2rem 0;
            border: 1px solid var(--border);
        }
        .prose-custom pre code {
            background: transparent;
            padding: 0;
            border-radius: 0;
        }
      `}</style>
    </MainLayout>
  );
}
