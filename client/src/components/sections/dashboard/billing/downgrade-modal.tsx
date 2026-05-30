import { useState } from "react";
import { AlertTriangleIcon, CheckCircle2Icon, XIcon, ArrowUpCircleIcon } from "lucide-react";
import { Button } from "../../../ui/button";
import type { IWorkbench } from "../../../../types/workbench";

interface PlanChangeModalProps {
  isOpen: boolean;
  mode: "UPGRADE" | "DOWNGRADE";
  workbenches: IWorkbench[];
  requiredCount: number;
  onConfirm: (selectedIds: string[]) => void;
  onCancel: () => void;
}

export function DowngradeModal({
  isOpen,
  mode,
  workbenches,
  requiredCount,
  onConfirm,
  onCancel,
}: PlanChangeModalProps) {
  const [selectedToKeep, setSelectedToKeep] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleToggle = (id: string) => {
    setSelectedToKeep((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length < requiredCount) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleConfirm = () => {
    if (selectedToKeep.length !== requiredCount) return;
    onConfirm(selectedToKeep);
  };

  const isUpgrade = mode === "UPGRADE";

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

      <article className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-xl border border-border bg-card shadow-2xl">
        <header className="flex shrink-0 items-start justify-between gap-4 p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isUpgrade ? 'bg-accent/10' : 'bg-destructive/10'}`}>
              {isUpgrade ? (
                <ArrowUpCircleIcon className="h-5 w-5 text-accent" />
              ) : (
                <AlertTriangleIcon className="h-5 w-5 text-destructive" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold leading-none">
                {isUpgrade ? "Select Workspaces to Unarchive" : "Workspace Limit Reached"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {isUpgrade 
                  ? `Your new plan allows you to reactivate ${requiredCount} workspace${requiredCount === 1 ? "" : "s"}. Select which ones to keep.`
                  : `Your new plan only supports ${requiredCount} workspace${requiredCount === 1 ? "" : "s"}. Select which ones to keep active.`}
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

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {workbenches.map((wb) => {
              const isSelected = selectedToKeep.includes(wb._id!);
              const isDisabled = !isSelected && selectedToKeep.length >= requiredCount;

              return (
                <div
                  key={wb._id}
                  onClick={() => !isDisabled && handleToggle(wb._id!)}
                  className={`relative flex cursor-pointer flex-col rounded-xl border p-4 transition-all ${
                    isSelected
                      ? "border-accent bg-accent/5"
                      : isDisabled
                        ? "opacity-50 border-border bg-card/50 cursor-not-allowed"
                        : "border-border bg-card hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-foreground line-clamp-1">{wb.name}</div>
                    {isSelected && (
                      <CheckCircle2Icon className="h-5 w-5 shrink-0 text-accent" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {wb.description || "No description"}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {wb.articlesCount || 0} Articles
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <footer className="shrink-0 flex items-center justify-between border-t border-border p-6 bg-secondary/30">
          <div className="text-sm font-medium">
            <span className={selectedToKeep.length === requiredCount ? "text-accent" : "text-muted-foreground"}>
              {selectedToKeep.length} of {requiredCount}
            </span>
            {" "}selected
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel}>
              Cancel {isUpgrade ? "Upgrade" : "Downgrade"}
            </Button>
            <Button
              disabled={selectedToKeep.length !== requiredCount}
              className={isUpgrade ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-destructive text-destructive-foreground hover:bg-destructive/90"}
              onClick={handleConfirm}
            >
              {isUpgrade ? "Confirm Unarchive" : "Archive Extras & Downgrade"}
            </Button>
          </div>
        </footer>
      </article>
    </div>
  );
}
