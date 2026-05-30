import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CircleDotIcon, SaveIcon } from "lucide-react";
import { Button } from "../../../ui/button";
import type { IArticle, ArticleFormViewIds } from "../../../../types/article";

interface FormHeaderProps {
  mode: "create" | "edit";
  ids: ArticleFormViewIds;
  isSubmitting: boolean;
  formData: IArticle;
  backHref?: string;
  hasReachedLimit: boolean;
  onSaveDraft: () => void;
}

export function FormHeader({
  mode,
  ids,
  isSubmitting,
  formData,
  backHref,
  hasReachedLimit,
  onSaveDraft,
}: FormHeaderProps) {
  const navigate = useNavigate();
  const canSaveDraft = !isSubmitting && !!formData.title && !hasReachedLimit;
  const canPublish = !isSubmitting && !!formData.title && !!formData.content;

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="flex min-h-18 flex-wrap items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            to={backHref ?? "/dashboard/workspaces"}
            className="inline-flex items-center gap-2 rounded-lg border border-transparent px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:border-border/60 hover:bg-secondary/50 hover:text-foreground"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Articles</span>
          </Link>
          <div className="h-8 w-px bg-border/80" />
          <div className="min-w-0 space-y-1">
            <h1 className="truncate text-lg font-semibold">
              {mode === "create" ? "Create Article" : "Edit Article"}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/40 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                <CircleDotIcon className="h-3 w-3" />
                {formData.status === "PUBLISHED" ? "Published" : "Draft"}
              </span>
              {hasReachedLimit && (
                <span className="rounded-full border border-destructive/20 bg-destructive/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-destructive">
                  Limit reached
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onSaveDraft}
            disabled={!canSaveDraft}
          >
            <SaveIcon className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          {hasReachedLimit ? (
            <Button
              type="button"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => navigate("/dashboard/billing")}
            >
              Upgrade Plan
            </Button>
          ) : (
            <Button
              type="submit"
              form={ids.form}
              disabled={!canPublish}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isSubmitting
                ? "Publishing..."
                : mode === "create"
                  ? "Publish"
                  : "Update"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
