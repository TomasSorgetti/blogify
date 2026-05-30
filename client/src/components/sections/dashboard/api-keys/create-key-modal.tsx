import { Plus, Info } from "lucide-react";
import { Button } from "../../../ui/button";
import CustomInput from "../../../ui/forms/custom-input";
import Field from "../../../ui/forms/field";

interface CreateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  nameValue: string;
  onNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CreateKeyModal({
  isOpen,
  onClose,
  nameValue,
  onNameChange,
  onSubmit,
}: CreateKeyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md bg-background/60">
      <div className="w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-border bg-accent/5">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Plus className="h-6 w-6 text-accent" />
            New API Key
          </h2>
          <p className="text-muted-foreground mt-2">
            Give your key a descriptive name to help you identify it
            later.
          </p>
        </div>

        <form onSubmit={onSubmit} className="p-8 space-y-6">
          <Field label="Key Name" htmlFor="key-name" required>
            <CustomInput
              id="key-name"
              placeholder="e.g. Production Backend, VS Code Plugin..."
              value={nameValue}
              onChange={(e) => onNameChange(e.target.value)}
              autoFocus
            />
          </Field>

          <div className="p-4 rounded-xl bg-secondary/30 flex gap-3 items-start">
            <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-normal">
              This key will have access to all your articles and
              workbenches. You can revoke it at any time.
            </p>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              variant="ghost"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-accent hover:brightness-110"
            >
              Generate Key
            </Button>
          </div>
        </form>
      </div>
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  );
}
