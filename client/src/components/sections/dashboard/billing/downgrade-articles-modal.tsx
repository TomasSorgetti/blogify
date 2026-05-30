import { useState } from "react";
import { AlertTriangleIcon, CheckCircle2Icon, XIcon, FileText } from "lucide-react";
import { Button } from "../../../ui/button";
import type { IWorkbench } from "../../../../types/workbench";
import type { IArticle } from "../../../../types/article";

interface WorkbenchWithArticles {
  workbench: IWorkbench;
  articles: IArticle[];
  keepLimit: number;
  overflow: number;
}

interface DowngradeArticlesModalProps {
  isOpen: boolean;
  workbenches: WorkbenchWithArticles[];
  onConfirm: (selectedToArchiveIds: string[]) => void;
  onCancel: () => void;
}

export function DowngradeArticlesModal({
  isOpen,
  workbenches,
  onConfirm,
  onCancel,
}: DowngradeArticlesModalProps) {
  const [selectedToKeep, setSelectedToKeep] = useState<Record<string, string[]>>({});

  if (!isOpen) return null;

  const handleToggle = (workbenchId: string, articleId: string, limit: number) => {
    setSelectedToKeep((prev) => {
      const current = prev[workbenchId] || [];
      if (current.includes(articleId)) {
        return { ...prev, [workbenchId]: current.filter((id) => id !== articleId) };
      }
      if (current.length < limit) {
        return { ...prev, [workbenchId]: [...current, articleId] };
      }
      return prev;
    });
  };

  const isAllSelected = workbenches.every(
    (wb) => (selectedToKeep[wb.workbench._id!] || []).length === wb.keepLimit
  );

  const handleConfirm = () => {
    if (!isAllSelected) return;

    const archiveIds: string[] = [];
    workbenches.forEach((wb) => {
      const keepIds = selectedToKeep[wb.workbench._id!] || [];
      wb.articles.forEach((art) => {
        if (art._id && !keepIds.includes(art._id)) {
          archiveIds.push(art._id);
        }
      });
    });

    onConfirm(archiveIds);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
    >
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-xl"
        onClick={onCancel}
      />

      <article className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl border border-border bg-card shadow-2xl">
        <header className="flex shrink-0 items-start justify-between gap-4 p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangleIcon className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-lg font-semibold leading-none">
                Article Limit Reached
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your new plan has a limit on the number of articles per workspace. Select which ones to keep active.
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {workbenches.map((wb) => (
            <div key={wb.workbench._id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {wb.workbench.name}
                  <span className="text-xs font-normal text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">
                    Keep {wb.keepLimit} of {wb.articles.length}
                  </span>
                </h3>
                <span className={`text-xs font-medium ${(selectedToKeep[wb.workbench._id!] || []).length === wb.keepLimit ? "text-accent" : "text-destructive"}`}>
                  {(selectedToKeep[wb.workbench._id!] || []).length} / {wb.keepLimit} selected
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {wb.articles.map((art) => {
                  if (!art._id || !art.createdAt) return null;
                  const isSelected = (selectedToKeep[wb.workbench._id!] || []).includes(art._id);
                  const isDisabled = !isSelected && (selectedToKeep[wb.workbench._id!] || []).length >= wb.keepLimit;

                  return (
                    <div
                      key={art._id}
                      onClick={() => !isDisabled && handleToggle(wb.workbench._id!, art._id!, wb.keepLimit)}
                      className={`relative flex cursor-pointer flex-col rounded-xl border p-4 transition-all ${
                        isSelected
                          ? "border-accent bg-accent/5"
                          : isDisabled
                            ? "opacity-50 border-border bg-card/50 cursor-not-allowed"
                            : "border-border bg-card hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-medium text-sm text-foreground line-clamp-2">{art.title}</div>
                        {isSelected && (
                          <CheckCircle2Icon className="h-4 w-4 shrink-0 text-accent" />
                        )}
                      </div>
                      <p className="mt-2 text-[10px] text-muted-foreground">
                        Created: {new Date(art.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <footer className="shrink-0 flex items-center justify-between border-t border-border p-6 bg-secondary/30">
          <div className="text-sm font-medium text-muted-foreground">
            Archive extras to continue with downgrade
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel}>
              Cancel Downgrade
            </Button>
            <Button
              disabled={!isAllSelected}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirm}
            >
              Archive & Downgrade
            </Button>
          </div>
        </footer>
      </article>
    </div>
  );
}
