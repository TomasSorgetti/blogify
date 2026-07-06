import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { INotification } from "../types/notification";

export function useNotificationsSocket(
  userId: string | undefined,
  addNotification: (notification: INotification) => void,
): void {
  const addNotificationRef = useRef(addNotification);

  useEffect(() => {
    addNotificationRef.current = addNotification;
  }, [addNotification]);

  useEffect(() => {
    if (!userId) return;

    const socket: Socket = io(import.meta.env.VITE_API_URI, {
      autoConnect: true,
    });

    socket.emit("join", userId);

    const onNotification = (notification: INotification) => {
      addNotificationRef.current(notification);
    };

    socket.on("notification", onNotification);

    return () => {
      socket.off("notification", onNotification);
      socket.disconnect();
    };
  }, [userId]);
}
