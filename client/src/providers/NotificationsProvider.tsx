import { useEffect } from "react";
import { useNotificationStore } from "../lib/store/notifications";
import { useNotificationsSocket } from "../hooks/useNotificationsSocket";
import { useAuthStore } from "../lib/store/auth";

export default function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications
  );
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const user = useAuthStore((state) => state.user);

  // todo=> unsuscribe?
  useEffect(() => {
    if (!user) return;
    fetchNotifications();
  }, [fetchNotifications, user]);

  useNotificationsSocket(user?.id, addNotification);

  return children;
}
