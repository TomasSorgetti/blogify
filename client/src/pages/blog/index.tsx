import { useEffect, useState } from "react";
import MainLayout from "../../components/layouts/main-layout";
import { useBlogStore } from "../../lib/store/blog";
import BlogHero from "../../components/sections/blog/blog-hero";
import { BlogSearchFilters } from "../../components/sections/blog/blog-search-filters";
import { BlogResultsCount } from "../../components/sections/blog/blog-results-count";
import { BlogArticleGrid } from "../../components/sections/blog/blog-article-grid";
import { BlogPagination } from "../../components/sections/blog/blog-pagination";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const { articles, loadPublicArticles, loading, error } = useBlogStore();

  console.log(articles);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    loadPublicArticles({
      search: debouncedSearch,
      status: "",
      tags: selectedCategories,
      isGlobal: true,
      workbenchId: "",
      page: currentPage,
      limit,
    });
  }, [debouncedSearch, selectedCategories, currentPage, loadPublicArticles]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
    // debouncedSearch will clear automatically via effect
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const totalItems = articles?.total || articles?.items?.length || 0;
  const totalPages = articles?.pages || 1;

  return (
    <MainLayout>
      <div>
        <BlogHero />

        <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-20">
          <BlogSearchFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            onClearFilters={clearFilters}
          />

          <BlogResultsCount
            totalItems={totalItems}
            currentPage={currentPage}
            limit={limit}
          />

          <BlogArticleGrid
            articles={articles?.items || []}
            loading={loading}
            error={error}
            onClearFilters={clearFilters}
          />

          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>
      </div>
    </MainLayout>
  );
}
