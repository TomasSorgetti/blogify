import { BellIcon, CreditCardIcon, ShieldIcon, UserIcon } from "lucide-react";
import DashboardLayout from "../../components/layouts/dashboard-layout";
import { Header } from "../../components/sections/dashboard/header";
import { Link, Outlet, useLocation } from "react-router-dom";

const tabs = [
  {
    id: "profile",
    name: "Profile",
    icon: UserIcon,
    path: "/dashboard/settings/profile",
  },
  {
    id: "billing",
    name: "Billing",
    icon: CreditCardIcon,
    path: "/dashboard/settings/billing",
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: BellIcon,
    path: "/dashboard/settings/notifications",
  },
  {
    id: "security",
    name: "Security",
    icon: ShieldIcon,
    path: "/dashboard/settings/security",
  },
];

export default function SettingsPage() {
  const location = useLocation();
  const activeTab = tabs.find((tab) => location.pathname === tab.path) ?? tabs[0];
  const ActiveIcon = activeTab.icon;

  return (
    <DashboardLayout>
      <Header
        title="Settings"
        description="Manage your account and preferences"
      />
      <div className="mx-auto max-w-7xl p-4 lg:p-8">
        <section className="mb-6 rounded-2xl border border-border/70 bg-card/70 p-4 backdrop-blur-sm sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
              <ActiveIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{activeTab.name}</h2>
              <p className="text-sm text-muted-foreground">
                Configure {activeTab.name.toLowerCase()} preferences for your account.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-6 lg:flex-row">
          <nav className="w-full lg:w-56">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                return (
                  <Link
                    key={tab.id}
                    to={tab.path}
                    className={`group flex items-center gap-3 whitespace-nowrap rounded-xl border px-3 py-2.5 text-sm transition-all ${
                      isActive
                        ? "border-accent/25 bg-accent/10 text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border/70 hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <tab.icon
                      className={`h-4 w-4 transition-colors ${
                        isActive ? "text-accent" : "group-hover:text-accent"
                      }`}
                    />
                    <span>{tab.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
