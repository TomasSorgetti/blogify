import { Loader2Icon, MailIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Switch } from "../../../components/ui/forms/custom-switch";
import { useAuthStore } from "../../../lib/store/auth";
import {
  NOTIFICATION_CATEGORIES,
  type NotificationId,
} from "../../../lib/constants/notifications";
import { UpdateProfile } from "../../../lib/services/user";
import type { NotificationPreferences, IUser } from "../../../types/user";

function NotificationList({
  user,
  setUser,
}: {
  user: IUser;
  setUser: (updatedUser: IUser) => void;
}) {
  const [loading, setLoading] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<NotificationPreferences>(
    user.preferences?.notifications || {
      articles: true,
      comments: true,
      api_alerts: true,
      billing: true,
      newsletter: false,
    },
  );

  const activeCount = useMemo(
    () => Object.values(prefs).filter(Boolean).length,
    [prefs],
  );

  const handleToggle = async (id: NotificationId, checked: boolean) => {
    setLoading(id);

    const newNotifications: NotificationPreferences = {
      ...prefs,
      [id]: checked,
    };

    const { data, error } = await UpdateProfile({
      preferences: {
        ...user.preferences,
        notifications: newNotifications,
      },
    });

    if (error) {
      toast.error("Failed to update preferences");
    } else {
      setPrefs(newNotifications);
      setUser({ ...user, preferences: data.preferences });
    }
    setLoading(null);
  };

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-border/70 bg-secondary/20 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
            <MailIcon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Email delivery status</p>
            <p className="text-sm text-muted-foreground">
              {activeCount} of {NOTIFICATION_CATEGORIES.length} categories enabled
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border/70 bg-card/70 p-4">
        <ul className="divide-y divide-border/60">
          {NOTIFICATION_CATEGORIES.map((preference) => (
            <li
              key={preference.id}
              className="flex items-start justify-between gap-4 py-4 first:pt-1 last:pb-1"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{preference.label}</p>
                  {loading === preference.id && (
                    <Loader2Icon className="h-3 w-3 animate-spin text-accent" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{preference.desc}</p>
              </div>
              <Switch
                checked={prefs[preference.id as keyof NotificationPreferences] || false}
                onCheckedChange={(checked) =>
                  handleToggle(preference.id as NotificationId, checked)
                }
                disabled={loading !== null}
                className="data-[state=checked]:bg-accent"
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default function NotificationSettings() {
  const { user, setUser } = useAuthStore();

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-border/60 bg-card/60">
        <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card/75 p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold">Notification Preferences</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose which email updates you receive from your workspaces.
      </p>

      <div className="mt-5">
        <NotificationList key={user._id} user={user} setUser={setUser} />
      </div>
    </div>
  );
}
