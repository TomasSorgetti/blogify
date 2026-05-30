import React from "react";
import { AlertTriangleIcon, XIcon } from "lucide-react";
import { Button } from "./button";

interface ConfirmDialogProps {
  title: React.ReactNode;
  description: React.ReactNode;
  confirmLabel?: string;
  isDestructive?: boolean;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel = "Confirm",
  isDestructive = false,
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onCancel}
      />

      <article className="relative z-10 w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl">
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangleIcon className="h-5 w-5 text-destructive" />
            </div>
            <h2
              id="confirm-dialog-title"
              className="text-base font-semibold"
            >
              {title}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Close dialog"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </header>

        <div className="mt-4 text-sm text-muted-foreground">{description}</div>

        <footer className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant={isDestructive ? "destructive" : "default"}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </footer>
      </article>
    </div>
  );
}
