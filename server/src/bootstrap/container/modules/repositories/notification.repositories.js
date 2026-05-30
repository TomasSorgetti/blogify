import NotificationRepository from "../../../../infrastructure/database/repositories/notification.repository.js";

export const registerNotificationRepository = (container, models) => {
  container.register(
    "notificationRepository",
    new NotificationRepository(models.Notification),
  );
};
