import { Key, Clock, EyeOff, Eye, Check, Copy, Trash2 } from "lucide-react";
import { Button } from "../../../ui/button";
import type { IApiKey } from "../../../../types/api-key";

interface ApiKeyItemProps {
  apiKey: IApiKey;
  isVisible: boolean;
  isCopied: boolean;
  onToggleVisibility: () => void;
  onCopy: () => void;
  onRevoke: () => void;
}

export function ApiKeyItem({
  apiKey,
  isVisible,
  isCopied,
  onToggleVisibility,
  onCopy,
  onRevoke,
}: ApiKeyItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 hover:bg-card/60 transition-all p-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center border border-border/50">
            <Key className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">{apiKey.name}</h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                Created {new Date(apiKey.createdAt).toLocaleDateString()}
              </span>
              {apiKey.expiresAt && (
                <span className="flex items-center gap-1.5 text-warning">
                  <Clock className="h-3 w-3" />
                  Expires {new Date(apiKey.expiresAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-auto md:mx-10 w-full">
          <div className="relative flex items-center gap-2 bg-background/50 border border-border p-2 pr-1 rounded-xl group/key">
            <code className="flex-1 font-mono text-sm px-2 overflow-hidden text-ellipsis whitespace-nowrap">
              {isVisible ? apiKey.key : "••••••••••••••••••••••••••••••••"}
            </code>
            <div className="flex items-center gap-1">
              <button
                onClick={onToggleVisibility}
                className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                title={isVisible ? "Hide" : "Show"}
              >
                {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <button
                onClick={onCopy}
                className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                title="Copy"
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:bg-destructive/10 border-destructive/20"
            onClick={onRevoke}
          >
            <Trash2 className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Revoke</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
