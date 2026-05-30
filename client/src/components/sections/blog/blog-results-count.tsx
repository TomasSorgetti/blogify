interface BlogResultsCountProps {
  totalItems: number;
  currentPage: number;
  limit: number;
}

export function BlogResultsCount({
  totalItems,
  currentPage,
  limit,
}: BlogResultsCountProps) {
  return (
    <div className="mb-8 text-sm text-muted-foreground">
      {totalItems === 0 ? (
        "No articles found"
      ) : (
        <>
          Showing {(currentPage - 1) * limit + 1}-
          {Math.min(currentPage * limit, totalItems)} of {totalItems} articles
        </>
      )}
    </div>
  );
}
