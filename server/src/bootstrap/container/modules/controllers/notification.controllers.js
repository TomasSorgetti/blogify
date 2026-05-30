import NotificationController from "../../../../infrastructure/http/controllers/notification.controller.js";

export const registerNotificationControllers = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "notificationController",
    new NotificationController({
      getMyNotificationsUseCase: resolveDependency("getMyNotificationsUseCase"),
      deleteOneNotificationUseCase: resolveDependency(
        "deleteOneNotificationUseCase",
      ),
      markAllAsReadUseCase: resolveDependency("markAllAsReadUseCase"),
    }),
  );
};
