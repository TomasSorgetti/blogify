import { NavLink } from "react-router-dom";
import { cn } from "../../../../lib/utils/tw-merge";
import { useWorkbench } from "../../../../hooks/queries/use-workspaces";
import { useWorkspacePermissions } from "../../../../hooks/use-workspace-permissions";

interface WorkspaceSubNavProps {
  workbenchId: string;
}

export default function WorkspaceSubNav({ workbenchId }: WorkspaceSubNavProps) {
  const { data: workbench } = useWorkbench(workbenchId!);

  const { isOwner } = useWorkspacePermissions(workbench);

  const tabs = [
    { name: "Articles", href: `/dashboard/workspaces/${workbenchId}` },
    { name: "Kanban", href: `/dashboard/workspaces/${workbenchId}/kanban` },
    { name: "Analytics", href: `/dashboard/workspaces/${workbenchId}/stats` },
    ...(isOwner
      ? [
          {
            name: "API Keys",
            href: `/dashboard/workspaces/${workbenchId}/api-keys`,
          },
        ]
      : []),
    ...(isOwner
      ? [
          {
            name: "Settings",
            href: `/dashboard/workspaces/${workbenchId}/settings`,
          },
        ]
      : []),
  ];

  return (
    <div className="border-b border-border bg-background/50 backdrop-blur-md sticky top-16 z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <nav className="flex gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.href}
              end={tab.name === "Articles"}
              className={({ isActive }) =>
                cn(
                  "py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  isActive
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                )
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
