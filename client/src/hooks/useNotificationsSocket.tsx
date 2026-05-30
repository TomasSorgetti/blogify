import { useCallback, useEffect } from "react";
import { io } from "socket.io-client";
import type { INotification } from "../types/notification";

export function useNotificationsSocket(
  userId: string | undefined,
  addNotification: (notification: INotification) => void
): void {
  const handleNotification = useCallback(
    (notification: INotification) => {
      addNotification(notification);
    },
    [addNotification]
  );

  useEffect(() => {
    if (!userId) return;

    const socket = io(import.meta.env.VITE_API_URI);

    socket.emit("join", userId);
    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
      socket.disconnect();
    };
  }, [userId, handleNotification]);
}
