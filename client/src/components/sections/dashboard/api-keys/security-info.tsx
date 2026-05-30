import { ShieldAlert } from "lucide-react";

export function SecurityInfo() {
  return (
    <div className="mb-10 p-6 rounded-2xl bg-secondary/30 border border-border/50 flex gap-4 items-start">
      <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
        <ShieldAlert className="h-5 w-5 text-accent" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-1">Security Best Practices</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          API keys carry full access to your articles. Never share them or commit
          them to public repositories. We recommend rotating your keys every 90 days.
        </p>
      </div>
    </div>
  );
}
