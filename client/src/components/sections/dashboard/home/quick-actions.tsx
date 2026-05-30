import { ArrowUpRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { QUICK_ACTIONS } from "../../../../lib/constants/dashboard";

const ACTION_DESCRIPTIONS: Record<string, string> = {
  "Manage Workspaces": "Organize your teams, content and permissions.",
  "Generate with AI": "Create first drafts and speed up ideation.",
  "View Analytics": "Track views, performance and growth trends.",
};

export function QuickActions() {
  return (
    <section className="rounded-2xl border border-border/70 bg-card/75 p-4 shadow-sm">
      <header className="mb-3 px-1">
        <h2 className="font-semibold">Quick Actions</h2>
        <p className="text-xs text-muted-foreground">
          Jump straight to your most common tasks.
        </p>
      </header>

      <nav className="space-y-2">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.label}
            to={action.href}
            className="group flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-secondary/35 p-3 transition-all hover:-translate-y-0.5 hover:border-accent/25 hover:bg-accent/[0.08]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/55">
                <action.icon className="h-4 w-4 text-accent" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{action.label}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {ACTION_DESCRIPTIONS[action.label] || "Open section"}
                </span>
              </span>
            </div>
            <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
          </Link>
        ))}
      </nav>
    </section>
  );
}
