import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../../components/layouts/dashboard-layout";
import ArticleForm from "../../../components/sections/dashboard/articles/article-form";
import { useArticlesStore } from "../../../lib/store/articles";

export default function EditArticlePage() {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const { article, loading, loadArticle } = useArticlesStore();

  useEffect(() => {
    if (articleSlug) {
      loadArticle(articleSlug);
    }
  }, [articleSlug, loadArticle]);

  if (loading || !article) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-7xl p-6 lg:p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-72 rounded-xl bg-secondary/50" />
            <div className="h-52 rounded-2xl border border-border/60 bg-card/60" />
            <div className="grid gap-4 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-8">
                <div className="h-40 rounded-xl border border-border/60 bg-card/60" />
                <div className="h-72 rounded-xl border border-border/60 bg-card/60" />
              </div>
              <div className="space-y-4 lg:col-span-4">
                <div className="h-40 rounded-xl border border-border/60 bg-card/60" />
                <div className="h-40 rounded-xl border border-border/60 bg-card/60" />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ArticleForm
        mode="edit"
        articleSlug={articleSlug}
        initialData={article}
      />
    </DashboardLayout>
  );
}
