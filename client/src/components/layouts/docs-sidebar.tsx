import {
  Book,
  Code,
  Zap,
  Settings,
  Key,
  BarChart3,
  Sparkles,
  Webhook,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Badge from "../ui/badge";

const docsNav = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", icon: Book },
      { title: "Quick Start", href: "/docs/quickstart", icon: Zap },
      {
        title: "Installation",
        href: "/docs/installation",
        icon: Settings,
        comingSoon: true,
      },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      {
        title: "Workspaces",
        href: "/docs/workspaces",
        icon: Settings,
        comingSoon: true,
      },
      {
        title: "Articles",
        href: "/docs/articles",
        icon: Book,
        comingSoon: true,
      },
      {
        title: "API Keys",
        href: "/docs/api-keys",
        icon: Key,
        comingSoon: true,
      },
    ],
  },
  {
    title: "API Reference",
    items: [
      {
        title: "Authentication",
        href: "/docs/api/auth",
        icon: Key,
        comingSoon: true,
      },
      { title: "Endpoints", href: "/docs/api/endpoints", icon: Code },
      {
        title: "Webhooks",
        href: "/docs/api/webhooks",
        icon: Webhook,
        comingSoon: true,
      },
    ],
  },
  {
    title: "AI Features",
    items: [
      {
        title: "AI Writing",
        href: "/docs/ai/writing",
        icon: Sparkles,
        comingSoon: true,
      },
      {
        title: "SEO Optimization",
        href: "/docs/ai/seo",
        icon: BarChart3,
        comingSoon: true,
      },
    ],
  },
];

export function DocsSidebar() {
  const pathname = useLocation().pathname;

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 space-y-8">
        {docsNav.map((section) => (
          <div key={section.title}>
            <h4 className="text-sm font-semibold mb-3 text-foreground">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href} className="relative">
                    <Link
                      to={item.comingSoon ? "#" : item.href}
                      className={`flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-lg transition-colors
                        ${
                          isActive
                            ? "bg-accent/10 text-accent font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }
                        ${
                          item.comingSoon
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }
                        `}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <p>{item.title}</p>
                      </div>

                      {item.comingSoon && (
                        <Badge variant="accent" className="px-1.5 py-0.5">
                          soon
                        </Badge>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
