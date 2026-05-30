import { useState } from "react";
import { XIcon } from "lucide-react";
import { Button } from "../../../ui/button";
import { useCreateWorkspace } from "../../../../hooks/queries/use-workspaces";

interface CreateWorkbenchModalProps {
  onClose: () => void;
}

const EMPTY_FORM = { name: "", description: "" };

export function CreateWorkbenchModal({ onClose }: CreateWorkbenchModalProps) {
  const { mutateAsync: createWorkspace, isPending } = useCreateWorkspace();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSubmittable =
    form.name.trim().length > 0 && form.description.trim().length > 0;

  const handleFieldChange =
    (field: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      await createWorkspace({
        name: form.name.trim(),
        description: form.description.trim(),
        colaborators: [],
      });
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setErrorMessage(message);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-workspace-title"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <article className="relative z-10 w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl">
        <header className="flex items-center justify-between">
          <h2 id="create-workspace-title" className="text-lg font-semibold">
            New Workspace
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Close modal"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="workspace-name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="workspace-name"
              type="text"
              placeholder="My Workspace"
              value={form.name}
              onChange={handleFieldChange("name")}
              className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="workspace-description"
              className="text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="workspace-description"
              placeholder="What will this workspace be used for?"
              value={form.description}
              onChange={handleFieldChange("description")}
              rows={3}
              className="resize-none rounded-lg border border-border bg-secondary px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>

          {errorMessage && (
            <p role="alert" className="text-sm text-destructive">
              {errorMessage}
            </p>
          )}

          <footer className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isSubmittable || isPending}
              className="bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
            >
              {isPending ? "Creating..." : "Create Workspace"}
            </Button>
          </footer>
        </form>
      </article>
    </div>
  );
}
