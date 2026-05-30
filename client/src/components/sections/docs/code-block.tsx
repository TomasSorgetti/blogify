import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils/tw-merge";

interface CodeSnippet {
  label: string;
  code: string;
  language?: string;
}

interface CodeBlockProps {
  snippets?: CodeSnippet[];
  // Backwards compatibility
  code?: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({
  snippets,
  code,
  language = "typescript",
  filename,
}: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const displaySnippets = snippets || [{ label: filename || "Default", code: code || "", language }];
  const currentSnippet = displaySnippets[activeTab];

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg border border-border bg-muted/30 overflow-hidden my-6">
      <div className="flex items-center justify-between px-4 border-b border-border bg-muted/50 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 py-2">
          {displaySnippets.length > 1 && displaySnippets.map((snippet, idx) => (
            <button
              key={snippet.label + idx}
              onClick={() => setActiveTab(idx)}
              className={cn(
                "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all border",
                activeTab === idx
                  ? "bg-accent border-accent text-accent-foreground"
                  : "bg-background/50 border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
              )}
            >
              {snippet.label}
            </button>
          ))}
          {displaySnippets.length === 1 && filename && (
            <span className="text-xs text-muted-foreground font-mono">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-muted-foreground/50 uppercase font-bold">{currentSnippet.language || language}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="relative">
        <pre className="p-4 overflow-x-auto bg-black/20">
          <code className="text-sm font-mono text-foreground leading-relaxed">
            {currentSnippet.code.trim()}
          </code>
        </pre>
      </div>
    </div>
  );
}

