import GetMyNotificationsUseCase from "../../../../application/notification/getMyNotifications.usecase.js";
import DeleteOneNotificationUseCase from "../../../../application/notification/deleteOneNotification.usecase.js";
import MarkAllAsReadUseCase from "../../../../application/notification/markAllAsRead.usecase.js";

export const registerNotificationUseCases = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "getMyNotificationsUseCase",
    new GetMyNotificationsUseCase({
      notificationRepository: resolveDependency("notificationRepository"),
    }),
  );
  container.register(
    "deleteOneNotificationUseCase",
    new DeleteOneNotificationUseCase({
      notificationRepository: resolveDependency("notificationRepository"),
    }),
  );
  container.register(
    "markAllAsReadUseCase",
    new MarkAllAsReadUseCase({
      notificationRepository: resolveDependency("notificationRepository"),
    }),
  );
};
