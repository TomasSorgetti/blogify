import WorkspaceIcon from "../../components/ui/icons/workspace-icon";
import SparklesIcon from "../../components/ui/icons/sparkles-icon";
import { TrendingUpIcon } from "lucide-react";

export const QUICK_ACTIONS = [
  {
    label: "Manage Workspaces",
    href: "/dashboard/workspaces",
    icon: WorkspaceIcon,
  },
  { label: "Generate with AI", href: "/dashboard/ai", icon: SparklesIcon },
  {
    label: "View Analytics",
    href: "/dashboard/stats",
    icon: TrendingUpIcon,
  },
];
