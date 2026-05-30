import {
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../../lib/utils/tw-merge";
import { useAuthStore } from "../../../lib/store/auth";
import Badge from "../../ui/badge";
import LogoIcon from "../../ui/icons/logo-icon";
import ChartIcon from "../../ui/icons/chart-icon";
import SparklesIcon from "../../ui/icons/sparkles-icon";
import WorkspaceIcon from "../../ui/icons/workspace-icon";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: ChartIcon },
  { name: "Workspaces", href: "/dashboard/workspaces", icon: WorkspaceIcon },
  {
    name: "AI Tools",
    href: "/dashboard/ai",
    icon: SparklesIcon,
    badge: "Premium",
  },
];

const bottomNav = [
  { name: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
];

function isPathActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarLink({
  href,
  name,
  pathname,
  badge,
  icon: Icon,
  onClick,
}: {
  href: string;
  name: string;
  pathname: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}) {
  const isActive = isPathActive(pathname, href);

  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-all",
        isActive
          ? "border-accent/25 bg-accent/10 text-foreground"
          : "border-transparent text-muted-foreground hover:border-sidebar-border hover:bg-secondary/55 hover:text-foreground",
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 transition-colors",
          isActive ? "text-accent" : "group-hover:text-accent",
        )}
      />
      <span className="flex-1">{name}</span>
      {badge ? (
        <Badge variant="accent" className="px-2 py-0.5 text-[10px]">
          {badge}
        </Badge>
      ) : null}
    </Link>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout, user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    const response = await logout();

    if (response.success) {
      navigate("/auth/signin");
    } else {
      navigate("/500");
    }
  };

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 rounded-xl border border-border/70 bg-card/90 p-2 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:text-foreground lg:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl lg:hidden">
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
              <Link to="/" className="flex items-center gap-2">
                <LogoIcon className="h-6 w-6 text-foreground" />
                <span className="text-lg font-semibold">Blogify</span>
              </Link>

              <button
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-5 px-3 py-4">
              <div className="space-y-1.5">
                {navigation.map((item) => (
                  <SidebarLink
                    key={item.name}
                    {...item}
                    pathname={pathname}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </div>

              <div className="space-y-1.5 border-t border-sidebar-border pt-4">
                {bottomNav.map((item) => (
                  <SidebarLink
                    key={item.name}
                    {...item}
                    pathname={pathname}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </div>
            </nav>
          </aside>
        </>
      )}

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl lg:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-4">
          <Link to="/" className="flex w-full items-center gap-2">
            <LogoIcon className="h-6 w-6 text-foreground" />
            <span className="text-lg font-semibold">Blogify</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-5 px-3 py-4">
          <div>
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Workspace
            </p>
            <div className="mt-2 space-y-1.5">
              {navigation.map((item) => (
                <SidebarLink key={item.name} {...item} pathname={pathname} />
              ))}
            </div>
          </div>

          <div className="border-t border-sidebar-border pt-4">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Account
            </p>
            <div className="mt-2 space-y-1.5">
              {bottomNav.map((item) => (
                <SidebarLink key={item.name} {...item} pathname={pathname} />
              ))}
            </div>
          </div>
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-xl border border-sidebar-border bg-secondary/25 p-3">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-sidebar-border bg-secondary">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserIcon className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {user?.username || "User"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.subscription?.planId?.name || "Free Plan"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <span className="sr-only">Logout session</span>
              <LogOutIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
