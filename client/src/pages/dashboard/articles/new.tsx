import DashboardLayout from "../../../components/layouts/dashboard-layout";
import ArticleForm from "../../../components/sections/dashboard/articles/article-form";

export default function NewArticlePage() {
  return (
    <DashboardLayout>
      <ArticleForm mode="create" />
    </DashboardLayout>
  );
}
