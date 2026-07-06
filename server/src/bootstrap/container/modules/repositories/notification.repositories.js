import NotificationRepository from "../../../../infrastructure/modules/notification/notification.repository.js";

export const registerNotificationRepository = (container, models) => {
  container.register(
    "notificationRepository",
    new NotificationRepository(models.Notification),
  );
};
